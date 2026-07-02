/* ============================================================
   GLADE — App root: routing, progress, device frame, scaling, tweaks
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;
const LEVELS_EN = window.GLADE.LEVELS;
const S = window.Screens;

// First-launch language picker
function LangPick({ onPick, safe }) {
  return (
    <div className="screen" style={{ paddingTop: safe.top, paddingBottom: safe.bottom, alignItems: "center", justifyContent: "center", padding: "30px" }}>
      {window.DecorField ? <window.DecorField set="intro" /> : null}
      <div style={{ flex: 1 }} />
      <div style={{ textAlign: "center" }}>{window.BookMascot ? <window.BookMascot size={150} /> : null}</div>
      <h1 style={{ fontFamily: "var(--font-letter)", fontSize: 27, fontWeight: 700, color: "var(--ink)", textAlign: "center", lineHeight: 1.4, margin: "20px 0 26px" }}>
        Choose your language<br /><span style={{ fontFamily: '"Cairo", sans-serif' }}>اختر لغتك</span>
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 320 }}>
        <button className="pill-btn" onClick={() => onPick("en")} style={{ justifyContent: "center" }}>English</button>
        <button className="pill-btn" onClick={() => onPick("ar")} style={{ justifyContent: "center", fontFamily: '"Cairo", sans-serif' }}>العربية</button>
      </div>
      <div style={{ flex: 1 }} />
    </div>
  );
}

// In the native Capacitor shell (or ?fullscreen=1) we drop the design playground
// chrome and fill the device screen.
const NATIVE = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
const FULLSCREEN = NATIVE || /[?#&](native|fullscreen)=1/.test(location.search + location.hash);

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "spark",
  "device": "ios",
  "letterFont": "Baloo 2",
  "hero": "book",
  "showBoth": false
}/*EDITMODE-END*/;

const SAVE_KEY = "glade_save_v1";
function loadSave() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY)) || {}; } catch (e) { return {}; }
}
const today = () => new Date().toISOString().slice(0, 10);
const wkKey = () => { const d = new Date(), y = d.getFullYear(), oj = new Date(y, 0, 1); const w = Math.ceil((((d - oj) / 86400000) + oj.getDay() + 1) / 7); return y + "-" + w; };

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const saved = useRef(loadSave());
  // Arabic disabled for now — English only; skip the language picker.
  // Returning players (already played) skip onboarding and land on Home.
  const returning = !!(saved.current.completed && saved.current.completed.length);
  const afterLoad = returning ? "home" : "onboard";
  const [screen, setScreen] = useState("loading");
  const [levelIndex, setLevelIndex] = useState(saved.current.unlocked ? saved.current.unlocked - 1 : 0);
  const [unlocked, setUnlocked] = useState(saved.current.unlocked || 1);
  const [completed, setCompleted] = useState(saved.current.completed || []);
  const [coins, setCoins] = useState(saved.current.coins != null ? saved.current.coins : 250);
  const [streak, setStreak] = useState(saved.current.streak || 0);
  const [dailyDate, setDailyDate] = useState(saved.current.dailyDate || null);
  const [points, setPoints] = useState(saved.current.points || 0);
  const [weekly, setWeekly] = useState(saved.current.weekly || { k: "", pts: 0 });
  const [giftAt, setGiftAt] = useState(saved.current.giftAt || 0); // next free-gift claim time
  const [settings, setSettings] = useState(saved.current.settings || { sound: true, music: true, haptics: true, notify: false });
  const [profile, setProfile] = useState(() => {
    const p = saved.current.profile || {};
    return { name: p.name || "Word Friend", ci: p.ci || 0, joinDate: p.joinDate || today() };
  });
  const lang = "en"; // Arabic disabled for now (data kept for easy re-enable)
  window.LANG = lang;
  const LEVELS = LEVELS_EN;
  const [result, setResult] = useState(null);
  const [activeLevel, setActiveLevel] = useState(LEVELS[levelIndex] || LEVELS[0]);
  const coinsRef = useRef(coins);
  coinsRef.current = coins;

  const [achEarned, setAchEarned] = useState(() => saved.current.achEarned || []);
  const [achToast, setAchToast] = useState(null);
  const achInit = useRef(saved.current.achEarned != null);
  const adCount = useRef(0);

  // persist
  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ unlocked, completed, coins, streak, dailyDate, settings, profile, achEarned, points, weekly, giftAt }));
  }, [unlocked, completed, coins, streak, dailyDate, settings, profile, achEarned, points, weekly, giftAt]);

  // detect newly-unlocked achievements → toast
  useEffect(() => {
    const list = window.achievementsFor ? window.achievementsFor({ coins, streak, completedCount: completed.length }) : [];
    const now = list.filter((a) => a.on).map((a) => a.id);
    if (!achInit.current) { achInit.current = true; setAchEarned(now); return; } // first run: seed silently
    const known = new Set(achEarned);
    const fresh = now.filter((id) => !known.has(id));
    if (fresh.length) {
      const a = list.find((x) => x.id === fresh[fresh.length - 1]);
      setAchEarned(now);
      if (a) { setAchToast(a.label); setTimeout(() => setAchToast(null), 2600); if (window.Sound) window.Sound.bonus && window.Sound.bonus(); }
    }
  }, [coins, streak, completed]);

  // native shell: hide launch splash once painted, warm up ads
  useEffect(() => {
    if (window.Native && window.Native.hideSplash) window.Native.hideSplash();
    if (window.Native && window.Native.ads && window.Native.ads.init) window.Native.ads.init();
    // credit coins when the store confirms a purchase, then start the billing connection
    if (window.Native && window.Native.iap) {
      if (window.Native.iap.onGrant) window.Native.iap.onGrant((pid, coins) => { addCoins(coins); });
      if (window.Native.iap.init) window.Native.iap.init();
    }
  }, []);
  // sync the system bars + letterbox backdrop to the current palette (all looks are light)
  useEffect(() => {
    if (!FULLSCREEN) return;
    const g = document.querySelector(".glade");
    const cs = g ? getComputedStyle(g) : null;
    const bg = cs ? cs.backgroundColor : "#fbf3e8";
    const grad = cs ? cs.backgroundImage : "";
    if (window.Native && window.Native.setStatusBar) window.Native.setStatusBar(false, bg);
    document.documentElement.style.background = bg; document.body.style.background = bg;
    // make the safe-area padding (behind the status + navigation bars) show the
    // theme gradient too, so the screen is seamless top-to-bottom with no white strip
    const fs = document.querySelector(".fsroot");
    if (fs) { fs.style.background = bg; if (grad && grad !== "none") fs.style.backgroundImage = grad; }
    const stage = document.querySelector(".stage"); if (stage) stage.style.background = bg;
  });

  const addCoins = useCallback((delta) => {
    if (delta < 0 && coinsRef.current + delta < 0) return false;
    coinsRef.current += delta;
    setCoins(coinsRef.current);
    return true;
  }, []);

  const dailyLevel = LEVELS[(new Date().getDate() + new Date().getMonth() * 3) % LEVELS.length];
  const dailyDone = dailyDate === today();

  // navigation
  const go = (s) => setScreen(s);
  const nav = (id) => {
    if (id === "home") go("home");
    else if (id === "board") go("board");
    else if (id === "profile") go("profile");
    else if (id === "daily") startDaily();
    else go(id);
  };
  const playLevel = (idx) => { setLevelIndex(idx); setActiveLevel(LEVELS[idx]); setScreen("game"); };
  const startDaily = () => { setActiveLevel(dailyLevel); setScreen("daily"); };

  function finishLevel(res) {
    const lv = activeLevel;
    // Replays earn nothing — coins/points only the FIRST time a level (or the
    // day's daily) is completed. Otherwise players farm coins instead of buying.
    const isReplay = screen === "daily" ? dailyDone : completed.includes(lv.id);
    const earned = isReplay ? 0 : 45 + (res.bonus || 0) * 8;
    if (earned) addCoins(earned);
    const gained = isReplay ? 0 : 100 + ((lv.answers && lv.answers.length) || 0) * 10 + (res.bonus || 0) * 25;
    if (gained) {
      setPoints((p) => p + gained);
      setWeekly((w) => { const k = wkKey(); return (w && w.k === k) ? { k: k, pts: w.pts + gained } : { k: k, pts: gained }; });
    }
    if (screen === "daily") {
      if (!dailyDone) { setStreak((s) => s + 1); }
      setDailyDate(today());
      setResult({ level: lv, coinsEarned: earned, bonus: res.bonus || 0, hasNext: false, daily: true, pts: gained, replay: isReplay });
    } else {
      if (!completed.includes(lv.id)) setCompleted((c) => [...c, lv.id]);
      const idx = LEVELS.findIndex((l) => l.id === lv.id);
      if (idx + 1 >= unlocked) setUnlocked(idx + 2 > LEVELS.length ? LEVELS.length : idx + 2);
      setResult({ level: lv, coinsEarned: earned, bonus: res.bonus || 0, hasNext: idx + 1 < LEVELS.length, daily: false, pts: gained, replay: isReplay });
    }
    setScreen("complete");
  }
  function nextLevel() {
    const idx = LEVELS.findIndex((l) => l.id === result.level.id);
    // light interstitial every 4th level (skipped while an ad-free experience matters most: level 1-2)
    adCount.current += 1;
    if (adCount.current % 4 === 0 && window.Native && window.Native.ads && window.Native.ads.interstitial) {
      try { window.Native.ads.interstitial(); } catch (e) {}
    }
    if (idx + 1 < LEVELS.length) playLevel(idx + 1); else go("map");
  }

  const isAndroid = t.device === "android";
  const safe = FULLSCREEN ? { top: 14, bottom: 12 } : (isAndroid ? { top: 12, bottom: 14 } : { top: 54, bottom: 30 });
  const theme = settings.palette || t.theme;
  const wheelStyle = (theme === "lagoon" || theme === "aurora") ? "glass" : theme === "linen" ? "line" : "solid";

  // keep the audio/haptics engine in sync with the toggles
  useEffect(() => {
    if (window.Sound) { window.Sound.setSound(settings.sound); window.Sound.setHaptics(settings.haptics); window.Sound.setMusic(settings.music); }
  }, [settings.sound, settings.haptics, settings.music]);

  // ---- scaling ----
  const wrapRef = useRef(null), scalerRef = useRef(null);
  const dims = isAndroid ? { w: 412, h: 892 } : { w: 402, h: 874 };
  useEffect(() => {
    function fit() {
      const wrap = wrapRef.current, sc = scalerRef.current;
      if (!wrap || !sc) return;
      const pad = FULLSCREEN ? 0 : 28;
      const s = Math.min((wrap.clientWidth - pad) / dims.w, (wrap.clientHeight - pad) / dims.h);
      sc.style.transform = `translate(-50%,-50%) scale(${Math.min(s, FULLSCREEN ? 3 : 1.1)})`;
    }
    fit();
    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); };
  }, [dims.w, dims.h, t.device]);

  // current screen content
  let body;
  if (screen === "loading") {
    body = <window.Screens2.Loading onDone={() => go(afterLoad)} dur={returning ? 1500 : 2600} />;
  } else if (screen === "lang") {
    body = <LangPick safe={safe} onPick={(L) => { setSettings((s) => ({ ...s, lang: L })); go("onboard"); }} />;
  } else if (screen === "onboard") {
    body = <window.Screens2.Onboard onStart={(name) => { if (name) setProfile((p) => ({ ...p, name })); go("home"); }} safe={safe} />;
  } else if (screen === "board") {
    body = <window.Screens2.Leaderboard coins={coins} streak={streak} completedCount={completed.length} profile={profile} go={nav} safe={safe} points={points} weeklyPts={weekly.pts} />;
  } else if (screen === "profile") {
    body = <window.Screens2.Profile coins={coins} streak={streak} completedCount={completed.length} profile={profile} setProfile={setProfile} go={nav} onSettings={() => go("settings")} safe={safe} />;
  } else if (screen === "home") {
    body = <S.Home coins={coins} level={LEVELS[Math.min(unlocked - 1, LEVELS.length - 1)]} streak={streak}
      dailyDone={dailyDone} safe={safe} hero={t.hero} nav={nav} profile={profile}
      giftAt={giftAt} onGift={() => { addCoins(60); setGiftAt(Date.now() + 12 * 3600 * 1000); if (window.Sound) window.Sound.bonus && window.Sound.bonus(); }}
      onPlay={() => playLevel(Math.min(unlocked - 1, LEVELS.length - 1))}
      onDaily={startDaily} onMap={() => go("map")} onSettings={() => go("settings")} onShop={() => go("shop")} />;
  } else if (screen === "game" || screen === "daily") {
    body = <GameScreen key={screen + activeLevel.id} level={activeLevel} coins={coins} addCoins={addCoins}
      wheelStyle={wheelStyle} isDaily={screen === "daily"} safe={safe} rtl={lang === "ar"}
      onExit={() => go(screen === "daily" ? "home" : "map")} onComplete={finishLevel} />;
  } else if (screen === "complete") {
    body = <S.Complete level={result.level} coinsEarned={result.coinsEarned} bonusWords={result.bonus} pts={result.pts} replay={result.replay}
      hasNext={result.hasNext} safe={safe}
      onNext={result.daily ? () => go("home") : nextLevel}
      onMap={() => go(result.daily ? "home" : "map")} />;
  } else if (screen === "map") {
    body = <S.LevelMap levels={LEVELS} unlocked={unlocked} completed={completed} coins={coins} safe={safe}
      onPlay={playLevel} onBack={() => go("home")} />;
  } else if (screen === "settings") {
    body = <S.Settings settings={settings} setSettings={setSettings} onBack={() => go("home")} safe={safe}
      palette={theme} setPalette={(id) => { setTweak("theme", id); setSettings((s) => ({ ...s, palette: id })); }}
      lang={lang} setLang={(L) => setSettings((s) => ({ ...s, lang: L }))}
      onReset={() => { localStorage.removeItem(SAVE_KEY); location.reload(); }}
      onRestore={() => (window.Native && window.Native.iap ? window.Native.iap.restore() : Promise.resolve())} />;
  } else if (screen === "shop") {
    body = <S.Shop coins={coins} onBuy={(c) => addCoins(c)} onBack={() => go("home")} safe={safe} />;
  }

  const gladeStyle = { "--font-letter": lang === "ar" ? '"Cairo", system-ui, sans-serif' : `"${t.letterFont}", system-ui, sans-serif` };
  if (lang === "ar") gladeStyle.fontFamily = '"Cairo", system-ui, sans-serif';
  const glade = (
    <div className="glade" data-theme={theme} dir={lang === "ar" ? "rtl" : "ltr"} style={gladeStyle}>
      {body}
      {achToast ? (
        <div style={{ position: "absolute", top: safe.top + 10, left: "50%", transform: "translateX(-50%)", zIndex: 200,
          background: "var(--ink)", color: "var(--bg)", fontWeight: 800, fontSize: 13.5, padding: "11px 18px", borderRadius: 999,
          boxShadow: "0 10px 26px rgba(0,0,0,.28)", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
          animation: "toastIn .3s ease" }}>🏆 {achToast} unlocked</div>
      ) : null}
    </div>
  );

  const Device = isAndroid ? AndroidDevice : IOSDevice;

  // PRODUCTION: full-screen app, no design-playground chrome or device frame.
  if (FULLSCREEN) {
    // fluid: fill the device, respect the notch / home-indicator via safe-area insets
    return (
      <div className="fsroot">{glade}</div>
    );
  }

  const THEMES = [
    { id: "spark", name: "Spark", sw: "#f44d18" },
    { id: "cobalt", name: "Cobalt", sw: "#2f6bdd" },
    { id: "aurora", name: "Aurora", sw: "#35d4a7" },
    { id: "bloom", name: "Bloom", sw: "#ff5d8f" },
    { id: "meadow", name: "Meadow", sw: "#3f8a5f" },
    { id: "lagoon", name: "Lagoon", sw: "#2f93a8" },
    { id: "linen", name: "Linen", sw: "#56784b" },
  ];

  return (
    <div className="stage">
      <div className="topbar">
        <div className="brandmark">
          <span className="leaf"></span>
          <span className="name">Words by Cork <span>· word game</span></span>
        </div>
        <div className="seg">
          <span className="lab">Look</span>
          {THEMES.map((th) => (
            <button key={th.id} className={theme === th.id ? "on" : ""} onClick={() => { setTweak("theme", th.id); setSettings((s) => ({ ...s, palette: th.id })); }}>
              <span className="sw" style={{ background: th.sw }}></span>{th.name}
            </button>
          ))}
        </div>
        <div className="seg">
          <span className="lab">Device</span>
          <button className={t.device === "ios" ? "on" : ""} onClick={() => setTweak("device", "ios")}>iPhone</button>
          <button className={t.device === "android" ? "on" : ""} onClick={() => setTweak("device", "android")}>Android</button>
        </div>
      </div>

      <div className="phonewrap" ref={wrapRef}>
        <div className="scaler" ref={scalerRef} style={{ width: dims.w, height: dims.h }}>
          <Device width={dims.w} height={dims.h}>{glade}</Device>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Visual direction" />
        <TweakSelect label="Look" value={t.theme} options={["spark", "cobalt", "aurora", "bloom", "meadow", "lagoon", "linen"]} onChange={(v) => setTweak("theme", v)} />
        <TweakSelect label="Home emblem" value={t.hero || "book"} options={["book", "mascot", "letters", "orb"]} onChange={(v) => setTweak("hero", v)} />
        <TweakButton label="Replay onboarding" onClick={() => go("onboard")} />
        <TweakSection label="Device" />
        <TweakRadio label="Frame" value={t.device} options={["ios", "android"]} onChange={(v) => setTweak("device", v)} />
        <TweakSection label="Typography" />
        <TweakSelect label="Letter font" value={t.letterFont} options={["Outfit", "Quicksand", "Baloo 2", "Comfortaa"]} onChange={(v) => setTweak("letterFont", v)} />
        <TweakSection label="Progress" />
        <TweakButton label="Add 200 coins" onClick={() => addCoins(200)} />
        <TweakButton label="Reset all progress" onClick={() => { localStorage.removeItem(SAVE_KEY); location.reload(); }} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

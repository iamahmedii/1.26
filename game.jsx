/* ============================================================
   GameScreen — the playable puzzle
   exposes window.GameScreen
   ============================================================ */
function Icon({ d, size = 22, stroke = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {d}
    </svg>
  );
}
const ICONS = {
  back: <path d="M15 18l-6-6 6-6" />,
  shuffle: <g><path d="M16 3h5v5" /><path d="M21 3l-7 7" /><path d="M8 21H3v-5" /><path d="M3 21l7-7" /><path d="M21 16v5h-5" /><path d="M15 15l6 6" /><path d="M3 8V3h5" /><path d="M9 9L3 3" /></g>,
  bulb: <g><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" /></g>,
  wand: <g><path d="M5 19l11-11" /><path d="M15 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" /><path d="M19 13l.6 1.2L21 15l-1.4.8L19 17l-.6-1.2L17 15l1.4-.8z" /></g>,
  play: <path d="M7 5l12 7-12 7V5z" />,
  calendar: <g><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></g>,
  gear: <g><circle cx="12" cy="12" r="3.2" /><path d="M19.4 13a7.6 7.6 0 0 0 0-2l1.8-1.4-1.8-3.1-2.1.8a7.6 7.6 0 0 0-1.7-1l-.3-2.3H9.7l-.3 2.3a7.6 7.6 0 0 0-1.7 1l-2.1-.8L3.8 9.6 5.6 11a7.6 7.6 0 0 0 0 2l-1.8 1.4 1.8 3.1 2.1-.8a7.6 7.6 0 0 0 1.7 1l.3 2.3h3.6l.3-2.3a7.6 7.6 0 0 0 1.7-1l2.1.8 1.8-3.1L19.4 13z" /></g>,
  bag: <g><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></g>,
  star: <path d="M12 3l2.6 5.6L20.5 9.3l-4.3 4 1.1 6L12 16.8 6.7 19.3l1.1-6-4.3-4 5.9-.7L12 3z" />,
  lock: <g><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></g>,
  check: <path d="M5 13l4 4L19 7" />,
  flame: <path d="M12 3c1 3-1 4-2 6-1.5 3 .5 5 2 5s3.5-1.5 3-4c2 1.5 2.5 4 1 6.5C18 19 15.5 21 12 21S5 18.5 5 14.5C5 9 11 8 12 3z" />,
  chev: <path d="M9 6l6 6-6 6" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  sound: <g><path d="M11 5L6 9H3v6h3l5 4V5z" /><path d="M16 9a4 4 0 0 1 0 6" /><path d="M19 6a8 8 0 0 1 0 12" /></g>,
  music: <g><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></g>,
  trophy: <g><path d="M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 19h6M10 15v4M14 15v4" /></g>,
  leaf: <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14zM5 19c3-5 6-7 10-9" />,
  bell: <g><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 19a2 2 0 0 0 4 0" /></g>,
  globe: <g><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" /></g>,
  home: <g><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9z" /></g>,
  user: <g><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" /></g>,
  info: <g><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></g>,
};

function Booster({ icon, label, cost, onClick, disabled }) {
  return (
    <button className="booster" onClick={onClick} disabled={disabled} style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
      opacity: disabled ? 0.45 : 1,
    }}>
      <span style={{
        width: 54, height: 54, borderRadius: 17, background: "var(--card)",
        border: "1px solid var(--line)", boxShadow: "var(--shadow-soft)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--primary-deep)", position: "relative",
      }}>
        <Icon d={icon} size={24} />
        {cost != null && (
          <span style={{
            position: "absolute", bottom: -7, right: -7,
            background: "var(--gold)", color: "#5b3d08", fontSize: 11, fontWeight: 800,
            borderRadius: 999, padding: "2px 7px", border: "2px solid var(--bg)",
          }}>{cost}</span>
        )}
        {cost == null && (
          <span style={{
            position: "absolute", bottom: -7, right: -7,
            background: "var(--primary-soft)", color: "var(--primary-deep)", fontSize: 10, fontWeight: 800,
            borderRadius: 999, padding: "2px 7px", border: "2px solid var(--bg)",
          }}>FREE</span>
        )}
      </span>
      <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>{label}</span>
    </button>
  );
}

// speak a word aloud — native TTS on device (via Native.speak), Web Speech as fallback
function speakWord(word) {
  var raw = String(word);
  var ar = /[؀-ۿ]/.test(raw);
  var lang = ar ? "ar-SA" : "en-US";
  var w = ar ? raw : raw.toLowerCase();
  if (window.Native && window.Native.speak) { window.Native.speak(w, lang); return; }
  try {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(w);
      u.lang = lang; u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  } catch (e) {}
}

// Arabic definition fallback: Arabic Wiktionary (cached). Used only for Arabic words
// not in the bundled offline dictionary. English is fully covered offline.
function arDictLookup(word) {
  var key = "arw:" + word;
  try { var c = localStorage.getItem(key); if (c != null) return Promise.resolve(JSON.parse(c)); } catch (e) {}
  var ctl = ("AbortController" in window) ? new AbortController() : null;
  var to = ctl ? setTimeout(function () { ctl.abort(); }, 6000) : null;
  var POS = { "Noun": "اسم", "Verb": "فعل", "Adjective": "صفة", "Adverb": "ظرف", "Proper noun": "اسم علم", "Pronoun": "ضمير", "Preposition": "حرف", "Particle": "حرف" };
  return fetch("https://ar.wiktionary.org/api/rest_v1/page/definition/" + encodeURIComponent(word), ctl ? { signal: ctl.signal } : {})
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      if (to) clearTimeout(to);
      if (!j) return null;
      var secs = j["ar"] || [];
      if (!secs.length) { for (var k in j) { if (j[k] && j[k].length) { secs = j[k]; break; } } }
      var out = [];
      for (var i = 0; i < secs.length && out.length < 3; i++) {
        var defs = secs[i].definitions || [];
        for (var d = 0; d < defs.length && out.length < 3; d++) {
          var t = (defs[d].definition || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
          if (t.length < 2) continue;
          if (t.length > 140) t = t.slice(0, 139) + "…";
          out.push({ p: POS[secs[i].partOfSpeech] || "", d: t });
        }
      }
      var res = out.length ? out : null;
      try { localStorage.setItem(key, JSON.stringify(res)); } catch (e) {}
      return res;
    })
    .catch(function () { if (to) clearTimeout(to); return null; });
}

// Multi-sense dictionary entry with a tap-to-hear pronunciation button.
function DefEntry({ word, divider }) {
  var isAr = /[؀-ۿ]/.test(word);
  var dict = isAr ? (window.GLADE_DEFS_AR || {}) : (window.GLADE_DEFS || {});
  var off = dict[word]; if (off && !Array.isArray(off)) off = [off];
  var sref = React.useState(off || null), senses = sref[0], setSenses = sref[1];
  var lref = React.useState(false), loading = lref[0], setLoading = lref[1];
  React.useEffect(function () {
    if (senses && senses.length) return;
    if (!isAr) return;
    var alive = true; setLoading(true);
    arDictLookup(word).then(function (r) { if (!alive) return; if (r && r.length) setSenses(r); setLoading(false); });
    return function () { alive = false; };
  }, [word]);
  return (
    <div style={{ paddingTop: divider ? 16 : 4, marginTop: divider ? 16 : 0, borderTop: divider ? "1px solid var(--line)" : "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ fontFamily: "var(--font-letter)", fontSize: 26, fontWeight: 700, color: "var(--ink)", letterSpacing: ".02em" }}>{word}</div>
        <button onClick={function () { speakWord(word); }} title="Hear it" aria-label="Hear it" data-sfx="off"
          style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--primary-soft)", color: "var(--primary-deep)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon d={ICONS.sound} size={19} />
        </button>
      </div>
      {senses && senses.length ? senses.map(function (s, i) {
        return (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 15.5, lineHeight: 1.5, color: "var(--ink)" }}>
              <b style={{ color: "var(--ink-faint)" }}>{(i + 1) + "."}</b>{s.p ? <span style={{ color: "var(--primary-deep)", fontWeight: 700 }}>{" (" + s.p + ") "}</span> : " "}{s.d}
            </div>
            {s.e && <div style={{ fontSize: 13, fontStyle: "italic", color: "var(--ink-soft)", marginTop: 4, paddingLeft: 14 }}>“{s.e}”</div>}
          </div>
        );
      }) : <div style={{ fontSize: 14.5, color: "var(--ink-soft)" }}>{loading ? "…" : tr("d_valid")}</div>}
    </div>
  );
}

function WordDef({ words, word, onClose }) {
  var list = (words && words.length) ? words : (word ? [word] : []);
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, zIndex: 130, background: "rgba(0,0,0,.45)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 16 }}>
      <div onClick={function (e) { e.stopPropagation(); }} style={{ width: "100%", maxWidth: 380, maxHeight: "70%", overflowY: "auto", background: "var(--card)", borderRadius: 24, boxShadow: "var(--shadow-card)", padding: "18px 22px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          {list.length > 1 && <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-faint)" }}>{list.length + " " + tr("d_here")}</div>}
          <button onClick={onClose} style={{ marginLeft: "auto", color: "var(--ink-faint)" }}><Icon d={ICONS.x} size={20} /></button>
        </div>
        {list.map(function (wd, idx) { return <DefEntry key={wd} word={wd} divider={idx > 0} />; })}
      </div>
    </div>
  );
}
window.WordDef = WordDef;

function GameScreen({ level, coins, addCoins, onComplete, onExit, isDaily, wheelStyle, safe, rtl }) {
  const layout = React.useMemo(() => window.GLADE.generateCrossword(level.answers), [level.id]);
  const [found, setFound] = React.useState(() => new Set());
  const [bonusFound, setBonusFound] = React.useState(() => new Set());
  const [revealed, setRevealed] = React.useState(() => new Set());
  const [forming, setForming] = React.useState("");
  const [fb, setFb] = React.useState(null);          // 'bad' | 'bonus' | null
  const [flash, setFlash] = React.useState(null);
  const [shuffleKey, setShuffleKey] = React.useState(0);
  const [toast, setToast] = React.useState(null);
  const [floats, setFloats] = React.useState([]);
  const [cell, setCell] = React.useState(40);
  const [defWords, setDefWords] = React.useState(null);
  const [adUsed, setAdUsed] = React.useState(false);   // one free-coins ad per level
  const [adBusy, setAdBusy] = React.useState(false);
  function watchForCoins() {
    if (adBusy || adUsed) return;
    setAdBusy(true);
    window.Native.ads.rewarded().then((ok) => {
      if (ok) { addCoins(30); setAdUsed(true); flashToast("+30 coins!"); sfx("coin"); }
      else { flashToast("No ad available"); }
    }).catch(() => flashToast("No ad available")).then(() => setAdBusy(false));
  }
  function tapCell(r, c) {
    const ws = layout.words.filter((w) => found.has(w.word) && w.cells.some((cc) => cc.r === r && cc.c === c)).map((w) => w.word);
    if (!ws.length) return;
    ws.sort((a, b) => b.length - a.length);
    setDefWords([...new Set(ws)]); sfx("tap");
  }
  const gridArea = React.useRef(null);
  const fbTimer = React.useRef(null);
  const letters = React.useMemo(() => level.letters.split(""), [level.id]);
  const formingLen = React.useRef(0);
  const sfx = (m, ...a) => { try { if (window.Sound && window.Sound[m]) window.Sound[m](...a); } catch (e) {} };
  const onProgress = (w) => { if (w.length > formingLen.current) sfx("pick", w.length); formingLen.current = w.length; setForming(w); };

  // fit grid cells to available area
  React.useLayoutEffect(() => {
    function fit() {
      const el = gridArea.current; if (!el) return;
      const aw = el.clientWidth - 16, ah = el.clientHeight - 16;
      const gf = 0.12;
      const cw = aw / (layout.cols + gf * (layout.cols - 1));
      const ch = ah / (layout.rows + gf * (layout.rows - 1));
      setCell(Math.max(22, Math.min(54, Math.floor(Math.min(cw, ch)))));
    }
    fit();
    const ro = new ResizeObserver(fit);
    if (gridArea.current) ro.observe(gridArea.current);
    return () => ro.disconnect();
  }, [layout]);

  const flashToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 1300); };
  const popFloat = (amt) => {
    const id = Math.random();
    setFloats((f) => [...f, { id, amt }]);
    setTimeout(() => setFloats((f) => f.filter((x) => x.id !== id)), 1100);
  };

  function showFb(kind) {
    setFb(kind);
    clearTimeout(fbTimer.current);
    fbTimer.current = setTimeout(() => setFb(null), kind === "bad" ? 420 : 600);
  }

  function submit(word) {
    if (!word || word.length < 2) return;
    if (level.answers.includes(word)) {
      if (found.has(word)) { showFb(null); return; }
      const nf = new Set(found); nf.add(word); setFound(nf);
      setFlash(word); setTimeout(() => setFlash(null), 550);
      if (nf.size === level.answers.length) {
        sfx("win");
        setTimeout(() => onComplete({ bonus: bonusFound.size }), 700);
      } else { sfx("word"); }
      return;
    }
    if (level.bonus.includes(word)) {
      if (bonusFound.has(word)) { flashToast(tr("g_already")); return; }
      const nb = new Set(bonusFound); nb.add(word); setBonusFound(nb);
      addCoins(10); popFloat(10); showFb("bonus"); sfx("bonus");
      flashToast(tr("g_bonus"));
      return;
    }
    showFb("bad"); sfx("invalid");
  }

  // cells already visible (part of a found word)
  function shownFromFound(fset) {
    const s = new Set();
    layout.words.forEach((w) => { if (fset.has(w.word)) w.cells.forEach((c) => s.add(c.r + "," + c.c)); });
    return s;
  }
  // mark any word whose every cell is now visible as found (so hints/reveals complete words)
  function autoComplete(fset, rset) {
    const shown = shownFromFound(fset); rset.forEach((k) => shown.add(k));
    let changed = true;
    while (changed) {
      changed = false;
      layout.words.forEach((w) => {
        if (fset.has(w.word)) return;
        if (w.cells.every((c) => shown.has(c.r + "," + c.c))) {
          fset.add(w.word); w.cells.forEach((c) => shown.add(c.r + "," + c.c)); changed = true;
        }
      });
    }
    return fset;
  }
  function finishIfDone(fset) {
    if (fset.size >= level.answers.length) { sfx("win"); setTimeout(() => onComplete({ bonus: bonusFound.size }), 700); return true; }
    return false;
  }

  function useHint() {
    // only cells that aren't already visible (not in a found word, not already hinted)
    const shown = shownFromFound(found); revealed.forEach((k) => shown.add(k));
    const targets = [];
    layout.words.forEach((w) => {
      if (found.has(w.word)) return;
      w.cells.forEach((c) => { const k = c.r + "," + c.c; if (!shown.has(k)) targets.push(k); });
    });
    if (!targets.length) { flashToast(tr("g_no_hint")); return; }   // don't charge
    if (!addCoins(-20)) { flashToast(tr("g_not_enough")); sfx("invalid"); return; }
    const k = targets[Math.floor(Math.random() * targets.length)];
    const nr = new Set(revealed); nr.add(k); setRevealed(nr);
    const nf = autoComplete(new Set(found), nr);
    if (nf.size !== found.size) setFound(nf);
    setFlash("__hint"); setTimeout(() => setFlash(null), 400); sfx("hint");
    finishIfDone(nf);
  }
  function useReveal() {
    const remaining = level.answers.filter((w) => !found.has(w));
    if (!remaining.length) { flashToast(tr("g_all_found")); return; }      // don't charge
    if (!addCoins(-60)) { flashToast("Not enough coins"); sfx("invalid"); return; }
    const w = remaining.sort((a, b) => a.length - b.length)[0];
    const wl = layout.words.find((x) => x.word === w);
    const nr = new Set(revealed); if (wl) wl.cells.forEach((c) => nr.add(c.r + "," + c.c)); setRevealed(nr);
    const nf = autoComplete(new Set(found).add(w), nr); setFound(nf);
    setFlash(w); setTimeout(() => setFlash(null), 550); sfx("coin");
    finishIfDone(nf);
  }

  const progress = found.size / level.answers.length;

  return (
    <div className="screen" style={{ paddingTop: safe.top, paddingBottom: safe.bottom }}>
      <DecorField set="sparse" />
      {/* HUD */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px 4px" }}>
        <button className="iconbtn" onClick={onExit}><Icon d={ICONS.back} /></button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            {isDaily ? tr("g_daily") : tr("g_level") + " " + level.id}
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", marginTop: 1 }}>
            {found.size}/{level.answers.length} {tr("g_words")}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div className="coinchip"><span className="coin-dot">ف</span>{coins}</div>
          {floats.map((f) => (
            <div key={f.id} style={{
              position: "absolute", right: 6, top: 6, fontWeight: 800, color: "var(--gold)",
              animation: "floatUp 1.1s ease forwards", pointerEvents: "none", fontSize: 16,
            }}>+{f.amt}</div>
          ))}
        </div>
      </div>

      {/* progress bar */}
      <div style={{ margin: "8px 18px 0", height: 6, borderRadius: 6, background: "var(--grid-empty)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: (progress * 100) + "%", background: "var(--primary)", borderRadius: 6, transition: "width .4s cubic-bezier(.22,.61,.36,1)" }} />
      </div>

      {/* grid */}
      <div ref={gridArea} style={{ flex: "1 1 auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 14px", minHeight: 0 }}>
        <CrosswordGrid layout={layout} found={found} revealed={revealed} cell={cell} flash={flash} onCellTap={tapCell} rtl={rtl} />
      </div>

      {/* forming word */}
      <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {forming ? (
          <div className={"formword" + (fb === "bad" ? " bad" : fb === "bonus" ? " bonus-hit" : "")}>{forming}</div>
        ) : fb === "bad" ? (
          <div className="formword bad" style={{ opacity: 0 }}>x</div>
        ) : found.size > 0 ? (
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-faint)" }}>{tr("g_tap_learn")}</div>
        ) : null}
        {toast && <div className="toast" style={{ top: -6 }}>{toast}</div>}
      </div>

      {defWords && <WordDef words={defWords} onClose={() => setDefWords(null)} />}

      {/* boosters */}
      <div style={{ display: "flex", justifyContent: "center", gap: 26, padding: "2px 0 10px" }}>
        <Booster icon={ICONS.shuffle} label={tr("g_shuffle")} onClick={() => setShuffleKey((k) => k + 1)} />
        <Booster icon={ICONS.bulb} label={tr("g_hint")} cost={20} onClick={useHint} disabled={coins < 20} />
        <Booster icon={ICONS.wand} label={tr("g_reveal")} cost={60} onClick={useReveal} disabled={coins < 60} />
      </div>

      {/* free coins via rewarded ad — once per level */}
      {!adUsed && window.Native && window.Native.ads ? (
        <div style={{ position: "absolute", right: 14, bottom: safe.bottom + 96, zIndex: 5 }}>
          <button onClick={watchForCoins} disabled={adBusy} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "9px 11px",
            background: "var(--card)", border: "1px solid var(--gold)", borderRadius: 16,
            boxShadow: "var(--shadow-card)", cursor: "pointer", opacity: adBusy ? 0.6 : 1,
          }}>
            <span style={{ fontSize: 20 }}>🎁</span>
            <span style={{ fontSize: 10.5, fontWeight: 800, color: "var(--gold-ink)" }}>{adBusy ? "…" : "+30"}</span>
          </button>
        </div>
      ) : null}

      {/* wheel */}
      <div style={{ paddingBottom: 14 }}>
        <LetterWheel
          letters={letters} size={288} wheelStyle={wheelStyle} shuffleKey={shuffleKey}
          onProgress={onProgress} onWord={submit}
        />
      </div>
    </div>
  );
}
window.GameScreen = GameScreen;
window.Icon = Icon;
window.ICONS = ICONS;

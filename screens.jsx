/* ============================================================
   GLADE — Home, LevelMap, Complete, Settings, Shop
   exposes window.Screens
   ============================================================ */
(function () {
  const Icon = window.Icon, ICONS = window.ICONS;

  // soft calm landscape emblem — simple shapes only (legacy "scene" hero)
  function Scene({ size = 168 }) {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%", position: "relative", overflow: "hidden",
        background: "linear-gradient(180deg, var(--sky-soft), var(--primary-soft))",
        boxShadow: "var(--shadow-card)", border: "1px solid var(--line)", flexShrink: 0,
      }}>
        <div style={{ position: "absolute", top: size * 0.2, left: "50%", transform: "translateX(-50%)", width: size * 0.34, height: size * 0.34, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, #fbe7a6, var(--gold))", boxShadow: "0 0 26px rgba(216,162,63,.45)" }} />
        <div style={{ position: "absolute", bottom: -size * 0.22, left: -size * 0.1, width: size * 0.85, height: size * 0.6, borderRadius: "50%", background: "var(--primary)", opacity: .9 }} />
        <div style={{ position: "absolute", bottom: -size * 0.3, right: -size * 0.15, width: size * 0.8, height: size * 0.55, borderRadius: "50%", background: "var(--primary-deep)" }} />
      </div>
    );
  }

  // ---- HERO B: floating letter tiles — modern, dimensional ----
  function HeroLetters({ size = 196 }) {
    const tiles = [
      { ch: "W", x: 0.07, y: 0.34, r: -9, s: 1.00, d: 0.0 },
      { ch: "O", x: 0.30, y: 0.12, r: 7, s: 0.82, d: 0.7 },
      { ch: "R", x: 0.52, y: 0.30, r: -4, s: 1.08, d: 0.3 },
      { ch: "D", x: 0.74, y: 0.10, r: 11, s: 0.78, d: 1.1 },
      { ch: "S", x: 0.44, y: 0.58, r: -7, s: 0.90, d: 1.5 },
    ];
    const base = size * 0.27;
    return (
      <div style={{ width: size, height: size * 0.92, position: "relative", flexShrink: 0 }}>
        <div className="hero-pulse" style={{
          position: "absolute", inset: "6% 2%", borderRadius: "50%",
          background: "radial-gradient(circle at 50% 45%, var(--primary-soft) 0%, transparent 68%)",
          animation: "heroPulse 4.5s ease-in-out infinite alternate",
        }}></div>
        <div style={{ position: "absolute", left: "16%", top: "68%", width: 12, height: 12, borderRadius: "50%", background: "var(--gold)", opacity: .85 }}></div>
        <div style={{ position: "absolute", left: "86%", top: "46%", width: 9, height: 9, borderRadius: "50%", background: "var(--sky)", opacity: .8 }}></div>
        <div style={{ position: "absolute", left: "68%", top: "78%", width: 7, height: 7, borderRadius: "50%", background: "var(--primary)", opacity: .6 }}></div>
        {tiles.map((tl, i) => {
          const w = base * tl.s;
          return (
            <div key={i} className="hero-float" style={{
              position: "absolute", left: tl.x * size, top: tl.y * size, width: w, height: w,
              animation: `heroFloat ${4 + i * 0.6}s ease-in-out ${-tl.d}s infinite alternate`,
            }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "26%",
                background: "var(--card)", border: "1px solid var(--line)",
                boxShadow: "var(--shadow-card)", transform: `rotate(${tl.r}deg)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-letter)", fontWeight: 700,
                fontSize: w * 0.52, color: "var(--tile-ink)",
                backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
              }}>{tl.ch}</div>
            </div>
          );
        })}
      </div>
    );
  }

  // ---- HERO C: gradient orb with orbiting dots ----
  function HeroOrb({ size = 176 }) {
    return (
      <div style={{ width: size, height: size, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px dashed var(--disc-line)" }}></div>
        <div className="hero-spin" style={{ position: "absolute", inset: 0, animation: "heroSpin 16s linear infinite" }}>
          <div style={{ position: "absolute", left: "50%", top: -5, width: 11, height: 11, marginLeft: -5.5, borderRadius: "50%", background: "var(--gold)" }}></div>
          <div style={{ position: "absolute", left: "7%", top: "74%", width: 8, height: 8, borderRadius: "50%", background: "var(--sky)" }}></div>
          <div style={{ position: "absolute", left: "90%", top: "62%", width: 7, height: 7, borderRadius: "50%", background: "var(--primary)" }}></div>
        </div>
        <div style={{
          position: "absolute", inset: "11%", borderRadius: "50%",
          background: "linear-gradient(145deg, var(--primary) 0%, color-mix(in oklab, var(--primary) 45%, var(--sky)) 100%)",
          boxShadow: "var(--btn-glow), var(--shadow-card)",
          display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", left: "12%", top: "8%", width: "46%", height: "34%", borderRadius: "50%", background: "rgba(255,255,255,.28)", filter: "blur(8px)" }}></div>
          <span style={{ fontFamily: "var(--font-letter)", fontWeight: 700, fontSize: size * 0.36, color: "var(--on-primary)", lineHeight: 1, position: "relative" }}>w</span>
        </div>
      </div>
    );
  }

  function Hero({ variant = "mascot", size }) {
    if (variant === "orb") return <HeroOrb size={size || 176} />;
    if (variant === "scene") return <Scene size={size || 168} />;
    if (variant === "book") {
      return (
        <div style={{ width: 250, height: 246, position: "relative" }}>
          <Confetti>
            <div style={{ position: "absolute", left: "50%", top: "52%", transform: "translate(-50%,-50%)" }}>
              <BookMascot size={150} />
            </div>
          </Confetti>
        </div>
      );
    }
    if (variant === "mascot") {
      return (
        <div style={{ width: 230, height: 215, position: "relative" }}>
          <Confetti>
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
              <Mascot size={165} />
            </div>
          </Confetti>
        </div>
      );
    }
    return <HeroLetters size={size || 196} />;
  }

  function StreakChip({ streak }) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--gold)", fontWeight: 700, fontSize: 14 }}>
        <span style={{ color: "var(--gold)" }}><Icon d={ICONS.flame} size={18} /></span>
        {streak} {tr("p_streak")}
      </span>
    );
  }

  // ---------------- HOME ----------------
  function Home({ coins, level, streak, onPlay, onDaily, onMap, onSettings, onShop, dailyDone, safe, hero, nav, profile, giftAt, onGift }) {
    const BottomNav = window.Screens2 && window.Screens2.BottomNav;
    const name = profile && profile.name;
    // timed free gift — re-render every 30s so the countdown ticks
    const [, tick] = React.useState(0);
    React.useEffect(() => { const t = setInterval(() => tick((n) => n + 1), 30000); return () => clearInterval(t); }, []);
    const giftReady = onGift && Date.now() >= (giftAt || 0);
    const giftLeft = Math.max(0, (giftAt || 0) - Date.now());
    const gH = Math.floor(giftLeft / 3600000), gM = Math.ceil((giftLeft % 3600000) / 60000);
    return (
      <div className="screen" style={{ paddingTop: safe.top, paddingBottom: safe.bottom }}>
        <DecorField set="sparse" />
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginRight: "auto" }}>
            <div style={{ width: 30, height: 30, borderRadius: "10px 10px 10px 3px", background: "linear-gradient(150deg, var(--primary), var(--primary-deep))", transform: "rotate(-8deg)" }} />
            <span style={{ fontFamily: "var(--font-letter)", fontWeight: 700, fontSize: 22, letterSpacing: "-.01em", color: "var(--ink)" }}>words <span style={{ fontWeight: 600, fontSize: 14, color: "var(--ink-faint)" }}>by cork</span></span>
          </div>
          <button className="iconbtn" onClick={onShop} style={{ position: "relative" }}><Icon d={ICONS.bag} /></button>
          <button className="iconbtn" onClick={onSettings}><Icon d={ICONS.gear} /></button>
        </div>
        {onGift ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "0 18px" }}>
            {giftReady ? (
              <button onClick={onGift} style={{
                display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 999,
                background: "linear-gradient(135deg, var(--gold), #f6a623)", color: "#5b3c00", fontWeight: 800, fontSize: 14,
                border: "none", boxShadow: "0 8px 20px rgba(246,166,35,.4)", animation: "heroPulse 1.6s ease-in-out infinite alternate", cursor: "pointer",
              }}>🎁 Free gift — claim +60</button>
            ) : (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 15px", borderRadius: 999,
                background: "var(--card)", border: "1px solid var(--line)", color: "var(--ink-faint)", fontWeight: 700, fontSize: 12.5, boxShadow: "var(--shadow-soft)" }}>
                🎁 next gift in {gH > 0 ? gH + "h " : ""}{gM}m
              </div>
            )}
          </div>
        ) : null}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 26px", gap: 18 }}>
          {window.BulbMascot ? <window.BulbMascot size={172} /> : <Hero variant={hero} />}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-faint)" }}>{name ? ("Welcome back, " + name) : "a calm word game"}</div>
            <h1 style={{ fontFamily: "var(--font-letter)", fontSize: 40, margin: "6px 0 10px", fontWeight: 700, letterSpacing: "-.02em", color: "var(--ink)" }}>{tr("home_h1")}</h1>
            <StreakChip streak={streak} />
          </div>
          <div className="coinchip" style={{ fontSize: 16 }}><span className="coin-dot">ف</span>{coins} {tr("coins")}</div>
        </div>

        <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 12 }}>
          <button className="pill-btn" onClick={onPlay} style={{ fontSize: 18, padding: "18px" }}>
            <Icon d={ICONS.play} size={20} /> {tr("home_play")} · {tr("home_level")} {level.id}
          </button>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={onDaily} style={cardBtn}>
              <span style={{ ...iconWrap, color: "var(--sky)" }}><Icon d={ICONS.calendar} size={22} /></span>
              <span style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>{tr("home_daily")}</div>
                <div style={{ fontSize: 12, color: dailyDone ? "var(--primary)" : "var(--ink-faint)" }}>{dailyDone ? tr("home_daily_done") : tr("home_daily_new")}</div>
              </span>
            </button>
            <button onClick={onMap} style={cardBtn}>
              <span style={{ ...iconWrap, color: "var(--primary)" }}><Icon d={ICONS.globe} size={22} /></span>
              <span style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>{tr("home_journey")}</div>
                <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>{tr("home_journey_sub")}</div>
              </span>
            </button>
          </div>
        </div>
        {nav && BottomNav && <BottomNav active="home" go={nav} safe={{ top: 0, bottom: 0 }} />}
      </div>
    );
  }
  const cardBtn = {
    flex: 1, display: "flex", alignItems: "center", gap: 11, padding: "13px 14px",
    background: "var(--card)", border: "1px solid var(--line)", borderRadius: 18,
    boxShadow: "var(--shadow-soft)",
  };
  const iconWrap = { width: 40, height: 40, borderRadius: 12, background: "var(--card-2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 };

  // ---------------- LEVEL MAP — "Word Trail" ----------------
  function Cloud({ x, y, s = 1, o = .8, a = "drift 8s ease-in-out infinite" }) {
    const c = { position: "absolute", borderRadius: "50%", background: "var(--card)", boxShadow: "var(--shadow-soft)" };
    return (
      <div className="decor-item" style={{ position: "absolute", left: x, top: y, width: 74 * s, height: 30 * s, opacity: o, animation: a, pointerEvents: "none" }}>
        <div style={{ ...c, left: 0, bottom: 0, width: 34 * s, height: 22 * s }}></div>
        <div style={{ ...c, left: 18 * s, top: 0, width: 38 * s, height: 30 * s }}></div>
        <div style={{ ...c, right: 0, bottom: 0, width: 30 * s, height: 20 * s }}></div>
      </div>
    );
  }
  function LevelMap({ levels, unlocked, completed, onPlay, onBack, coins, safe }) {
    const W = 340, GAP = 120, PAD = 90, TILE = 76;
    const n = levels.length;
    const H = PAD * 2 + (n - 1) * GAP;
    const ptx = (i) => W / 2 + Math.sin(i * 1.05 + 0.6) * 88;
    const pty = (i) => H - PAD - i * GAP;
    const doneSet = React.useMemo(() => new Set(completed), [completed]);
    const scrollRef = React.useRef(null);
    const tick = React.useRef(false);
    const [view, setView] = React.useState({ top: 0, h: 900 });
    const sync = () => { const el = scrollRef.current; if (el) setView({ top: el.scrollTop, h: el.clientHeight }); };
    React.useEffect(() => { const el = scrollRef.current; if (el) { el.scrollTop = el.scrollHeight; sync(); } }, []);
    const onScroll = () => { if (tick.current) return; tick.current = true; requestAnimationFrame(() => { tick.current = false; sync(); }); };

    // only render tiles whose y is within the viewport (+buffer) → smooth at 5000 levels
    const buf = GAP * 2;
    let iLo = Math.floor((H - PAD - (view.top + view.h + buf)) / GAP);
    let iHi = Math.ceil((H - PAD - (view.top - buf)) / GAP);
    iLo = Math.max(0, iLo); iHi = Math.min(n - 1, iHi);
    const vis = []; for (let i = iLo; i <= iHi; i++) vis.push(i);
    // windowed trail (a small SVG over just the visible band)
    const winTop = Math.max(0, view.top - buf), winH = Math.min(H, view.top + view.h + buf) - winTop;
    const segPath = vis.map((i, k) => {
      const x = ptx(i), y = pty(i) - winTop;
      if (k === 0) return `M ${x} ${y}`;
      const pi = vis[k - 1], px = ptx(pi), py = pty(pi) - winTop, my = (py + y) / 2;
      return `C ${px} ${my}, ${x} ${my}, ${x} ${y}`;
    }).join(" ");

    return (
      <div className="screen" style={{ paddingTop: safe.top, paddingBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px 8px", position: "relative", zIndex: 2 }}>
          <button className="iconbtn" onClick={onBack}><Icon d={ICONS.back} /></button>
          <div style={{ flex: 1, fontSize: 19, fontWeight: 700, fontFamily: "var(--font-letter)", color: "var(--ink)" }}>Word Trail</div>
          <div className="coinchip"><span className="coin-dot">ف</span>{coins}</div>
        </div>
        <div ref={scrollRef} onScroll={onScroll} style={{ flex: 1, overflowY: "auto", minHeight: 0, padding: "6px 0 " + (safe.bottom + 16) + "px" }}>
          <div style={{ position: "relative", width: W, height: H, margin: "0 auto" }}>
            {winH > 0 && (
              <svg width={W} height={winH} style={{ position: "absolute", top: winTop, left: 0, pointerEvents: "none" }}>
                <path d={segPath} fill="none" stroke="var(--primary)" strokeOpacity="0.18" strokeWidth="14" strokeLinecap="round" />
                <path className="trail-dash" d={segPath} fill="none" stroke="var(--primary)" strokeOpacity="0.55" strokeWidth="5"
                  strokeLinecap="round" strokeDasharray="1 18" style={{ animation: "trailDash 26s linear infinite" }} />
              </svg>
            )}
            {/* level tiles (virtualized) */}
            {vis.map((i) => {
              const lv = levels[i];
              const isDone = doneSet.has(lv.id);
              const isUnlocked = i < unlocked;
              const isCurrent = i === unlocked - 1 && !isDone;
              const rot = (i % 2 ? 4 : -4);
              return (
                <div key={lv.id} style={{ position: "absolute", left: ptx(i) - TILE / 2, top: pty(i) - TILE / 2, width: TILE, textAlign: "center" }}>
                  {isCurrent && (
                    <div style={{ position: "absolute", left: "50%", bottom: TILE - 6, transform: "translateX(-50%)", zIndex: 2 }}>
                      <Mascot size={84} />
                    </div>
                  )}
                  <button
                    onClick={() => isUnlocked && onPlay(i)}
                    disabled={!isUnlocked}
                    className={isCurrent ? "hero-float" : ""}
                    style={{
                      width: TILE, height: TILE, borderRadius: 24,
                      transform: `rotate(${rot}deg)`,
                      background: isDone
                        ? "linear-gradient(160deg, var(--primary), var(--primary-deep))"
                        : isUnlocked ? "var(--card)" : "var(--grid-empty)",
                      border: isCurrent ? "3px solid var(--primary)" : "1px solid var(--line)",
                      boxShadow: isUnlocked ? "var(--shadow-card)" : "none",
                      color: isDone ? "var(--on-primary)" : isUnlocked ? "var(--primary-deep)" : "var(--ink-faint)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
                      fontFamily: "var(--font-letter)", fontWeight: 700,
                      cursor: isUnlocked ? "pointer" : "default", position: "relative", zIndex: 1,
                      opacity: isUnlocked ? 1 : .65, transition: "transform .15s",
                    }}>
                    <span style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                      {isDone ? <Icon d={ICONS.star} size={20} stroke={2.2} /> : !isUnlocked ? <span style={{ position: "absolute", top: -16, opacity: 0.7 }}><Icon d={ICONS.lock} size={14} /></span> : null}
                      <span style={{ fontSize: isDone ? 20 : 26, fontWeight: 800 }}>{lv.id}</span>
                    </span>
                  </button>
                  {isCurrent && (
                    <div style={{ position: "absolute", left: "50%", top: TILE + 4, transform: "translateX(-50%)", background: "var(--gold)", color: "#5b3d08", fontSize: 11, fontWeight: 800, padding: "3px 12px", borderRadius: 999, letterSpacing: ".08em", zIndex: 2, whiteSpace: "nowrap" }}>PLAY</div>
                  )}
                  <div style={{ marginTop: 8, fontSize: 12.5, fontWeight: 700, color: isUnlocked ? "var(--ink)" : "var(--ink-faint)", whiteSpace: "nowrap", transform: isCurrent ? "translateY(16px)" : "none" }}>{lv.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ---------------- LEVEL COMPLETE ----------------
  function Complete({ level, coinsEarned, bonusWords, hasNext, onNext, onMap, safe, pts, replay }) {
    const [shown, setShown] = React.useState(0);
    const [defWord, setDefWord] = React.useState(null);
    const [coinShown, setCoinShown] = React.useState(0);
    React.useEffect(() => {
      const t = [];
      [0, 1, 2].forEach((i) => t.push(setTimeout(() => setShown((s) => Math.max(s, i + 1)), 350 + i * 240)));
      // coins count up
      const total = coinsEarned || 0, steps = 24;
      for (let i = 1; i <= steps; i++) t.push(setTimeout(() => setCoinShown(Math.round((total * i) / steps)), 500 + i * 34));
      return () => t.forEach(clearTimeout);
    }, []);
    return (
      <div className="screen" style={{ paddingTop: safe.top, paddingBottom: safe.bottom, alignItems: "center", justifyContent: "center", padding: "40px 28px" }}>
        <DecorField set="full" />
        {window.BulbMascot ? (
          <div style={{ position: "absolute", right: -14, top: safe.top + 4, transform: "rotate(9deg)", animation: "winPop .7s cubic-bezier(.34,1.56,.64,1) both", pointerEvents: "none", zIndex: 1 }}>
            <window.BulbMascot size={96} />
          </div>
        ) : null}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, width: "100%" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                color: shown > i ? "var(--gold)" : "var(--grid-empty)",
                transform: shown > i ? "scale(1)" : "scale(.5)",
                transition: "transform .4s cubic-bezier(.34,1.56,.64,1), color .3s",
              }}><Icon d={ICONS.star} size={i === 1 ? 60 : 48} stroke={1.5} /></span>
            ))}
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--ink-faint)" }}>Level {level.id} · {level.name}</div>
          <h1 style={{ fontFamily: "var(--font-letter)", fontSize: 38, margin: "2px 0 12px", fontWeight: 700, color: "var(--ink)" }}>{tr("c_title")}</h1>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", marginBottom: 16, borderRadius: 999,
            background: "linear-gradient(135deg, #8b5cf6, #6d28d9)", color: "#fff", fontWeight: 800, fontSize: 15, boxShadow: "0 8px 22px rgba(109,40,217,.4)" }}>
            {"✨ " + tr("c_beat").replace("{n}", Math.min(96, 55 + (bonusWords || 0) * 6 + ((level.id * 7) % 30)))}
          </div>

          <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={statRow}><span style={{ color: "var(--ink-soft)" }}>{tr("c_words")}</span><b style={{ color: "var(--ink)" }}>{level.answers.length}/{level.answers.length}</b></div>
            <div style={statRow}><span style={{ color: "var(--ink-soft)" }}>{tr("c_bonus")}</span><b style={{ color: "var(--ink)" }}>{bonusWords}</b></div>
            {replay ? (
              <div style={{ ...statRow, background: "var(--card)", border: "1px dashed var(--line)" }}>
                <span style={{ color: "var(--ink-soft)", fontWeight: 600, fontSize: 13.5 }}>Already completed — rewards are earned once. Play new levels! →</span>
              </div>
            ) : (
              <div style={{ ...statRow, background: "var(--gold-soft)", border: "1px solid var(--gold)" }}>
                <span style={{ color: "var(--gold-ink)", fontWeight: 600 }}>{tr("c_coins")}</span>
                <b style={{ color: "var(--gold-ink)", display: "flex", alignItems: "center", gap: 6 }}><span className="coin-dot">ف</span>+{coinShown}</b>
              </div>
            )}
            {pts ? (
              <div style={{ ...statRow, background: "var(--primary-soft)", border: "1px solid var(--primary)" }}>
                <span style={{ color: "var(--primary-deep)", fontWeight: 600 }}>Ranking points</span>
                <b style={{ color: "var(--primary-deep)" }}>+{pts} ▲</b>
              </div>
            ) : null}
          </div>

          <div style={{ width: "100%", maxWidth: 330, marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-faint)", marginBottom: 8, textAlign: "center" }}>{tr("c_tap_learn")}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>
              {level.answers.map((wd) => (
                <button key={wd} onClick={() => setDefWord(wd)} style={{ fontFamily: "var(--font-letter)", fontWeight: 700, fontSize: 14, color: "var(--ink)", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 999, padding: "6px 13px", boxShadow: "var(--shadow-soft)" }}>{wd}</button>
              ))}
            </div>
          </div>
        </div>
        {defWord && window.WordDef ? React.createElement(window.WordDef, { word: defWord, onClose: () => setDefWord(null) }) : null}
        <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 10 }}>
          {hasNext
            ? <button className="pill-btn" onClick={onNext} style={{ fontSize: 18, padding: "17px" }}>{tr("c_next")} <Icon d={ICONS.chev} size={20} /></button>
            : <button className="pill-btn" onClick={onMap} style={{ fontSize: 18, padding: "17px" }}>{tr("c_back")}</button>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="pill-btn ghost" onClick={onMap} style={{ flex: 1, padding: "15px" }}>{tr("c_map")}</button>
            <button className="pill-btn ghost" onClick={() => {
              const txt = "I just solved Level " + level.id + " on Words by Cork! Can you?";
              if (window.Native && window.Native.share) window.Native.share(txt, "");
              else if (navigator.share) navigator.share({ text: txt }).catch(() => {});
            }} style={{ flex: 1, padding: "15px" }}>{tr("c_share")}</button>
          </div>
        </div>
      </div>
    );
  }
  const statRow = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 17px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 14, fontSize: 15 };

  // ---------------- SETTINGS ----------------
  function Toggle({ on, onToggle }) {
    return (
      <button onClick={onToggle} style={{
        width: 50, height: 30, borderRadius: 999, padding: 3, flexShrink: 0,
        background: on ? "var(--primary)" : "var(--grid-empty)", transition: "background .2s",
        display: "flex", justifyContent: on ? "flex-end" : "flex-start",
      }}>
        <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)", transition: "all .2s" }} />
      </button>
    );
  }
  const SET_PANELS = {
    howto: { title: "How to play", body: [
      ["The board", "Each puzzle gives a ring of letters and a grid of empty slots — one slot per letter of every hidden word."],
      ["Spell a word", "Swipe across the wheel to connect letters in order, then release. Valid words drop into the grid."],
      ["Clear the puzzle", "Fill every slot to finish the level and unlock the next one."],
      ["Bonus words", "Extra valid words that aren't in the grid still earn you bonus coins."],
      ["Stuck?", "Shuffle the wheel, or spend coins on a Hint or a full Reveal."],
    ] },
    privacy: { title: "Privacy & terms", body: [
      ["Your data stays here", "Words by Cork saves your progress, coins and settings only on this device. No accounts, nothing uploaded."],
      ["No tracking", "No analytics, no ads, no third-party trackers."],
      ["Notifications", "The daily reminder is scheduled locally, only if you turn it on. Revoke it any time in system settings."],
      ["Terms", "Provided as-is for personal entertainment. By playing you agree not to misuse or redistribute the app."],
    ] },
    about: { title: "About", body: [
      ["A calm word game", "Words by Cork is a one-puzzle-a-day word game — relaxed, clever, and made to enjoy at your own pace."],
      ["Version", "1.0.0 — 2026"],
      ["Credits", "Made with care. © 2026 Cork. Definitions: Wordset (CC BY-SA 4.0)."],
    ] },
  };

  function SettingsPanel({ which, onClose, safe }) {
    const p = SET_PANELS[which];
    return (
      <div className="screen" style={{ position: "absolute", inset: 0, zIndex: 80, background: "var(--bg)", paddingTop: safe.top, paddingBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px 8px" }}>
          <button className="iconbtn" onClick={onClose}><Icon d={ICONS.back} /></button>
          <div style={{ flex: 1, fontSize: 19, fontWeight: 700, color: "var(--ink)" }}>{p.title}</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 22px " + (safe.bottom + 16) + "px" }}>
          {p.body.map(([h, t]) => (
            <div key={h} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", marginBottom: 5 }}>{h}</div>
              <div style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ink-soft)" }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Settings({ settings, setSettings, onBack, safe, palette, setPalette, lang, setLang, onReset, onRestore }) {
    const [panel, setPanel] = React.useState(null);
    const [confirmReset, setConfirmReset] = React.useState(false);
    const [msg, setMsg] = React.useState(null);
    const set = (k) => () => setSettings((s) => {
      const nv = !s[k];
      // immediate feedback so the toggle clearly "does something"
      if (window.Sound) {
        if (k === "sound" && nv) { window.Sound.setSound(true); setTimeout(() => window.Sound.coin && window.Sound.coin(), 70); }
        if (k === "haptics" && nv) { window.Sound.setHaptics(true); if (window.Native && window.Native.haptic) window.Native.haptic(22); }
      }
      return { ...s, [k]: nv };
    });
    function toggleNotify() {
      const on = !settings.notify;
      if (on) {
        if (window.Native && window.Native.enableDailyReminder) { window.Native.enableDailyReminder(8).then((ok) => setSettings((s) => ({ ...s, notify: !!ok }))); return; }
        if (typeof Notification !== "undefined") {
          try { Promise.resolve(Notification.requestPermission()).then((perm) => setSettings((s) => ({ ...s, notify: perm === "granted" }))); }
          catch (e) { setSettings((s) => ({ ...s, notify: true })); }
          return;
        }
      }
      setSettings((s) => ({ ...s, notify: on }));
    }
    const toggles = [
      ["sound", tr("set_sfx"), ICONS.sound, set("sound")],
      ["music", tr("set_music"), ICONS.music, set("music")],
      ["haptics", tr("set_haptics"), ICONS.bell, set("haptics")],
      ["notify", tr("set_reminder"), ICONS.bell, toggleNotify],
    ];
    const PAL = [["spark","Spark","#f44d18"],["cobalt","Cobalt","#2f6bdd"],["aurora","Aurora","#35d4a7"],["bloom","Bloom","#ff5d8f"],["meadow","Meadow","#3f8a5f"],["lagoon","Lagoon","#2f93a8"],["linen","Linen","#56784b"]];
    const links = [[tr("set_howto"), ICONS.info, "howto"], [tr("set_privacy"), ICONS.lock, "privacy"], [tr("set_aboutapp"), ICONS.leaf, "about"]];
    const LANGS = [["en", "English"], ["ar", "العربية"]];
    const lc = { background: "var(--card)", border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", boxShadow: "var(--shadow-soft)" };
    const lr = { display: "flex", alignItems: "center", gap: 13, padding: "13px 15px" };
    const sectionLab = { fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-faint)", margin: "20px 4px 9px" };

    async function doRestore() {
      try { await (onRestore ? onRestore() : Promise.resolve()); setMsg(tr("restored")); }
      catch (e) { setMsg("Nothing to restore"); }
    }

    return (
      <div className="screen" style={{ paddingTop: safe.top, paddingBottom: 0 }}>
        <DecorField set="sparse" />
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px 8px" }}>
          <button className="iconbtn" onClick={onBack}><Icon d={ICONS.back} /></button>
          <div style={{ flex: 1, fontSize: 19, fontWeight: 700, color: "var(--ink)" }}>{tr("set_title")}</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "0 18px " + (safe.bottom + 16) + "px" }}>
          <div style={sectionLab}>{tr("set_look")}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
            {PAL.map(([id, name, sw]) => {
              const on = palette === id;
              return (
                <button key={id} onClick={() => setPalette && setPalette(id)} style={{
                  display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 13px 8px 9px",
                  background: "var(--card)", borderRadius: 999, cursor: "pointer",
                  border: on ? "2px solid var(--ink)" : "1px solid var(--line)", boxShadow: "var(--shadow-soft)",
                }}>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", background: sw }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: on ? "var(--ink)" : "var(--ink-soft)" }}>{name}</span>
                </button>
              );
            })}
          </div>

          <div style={sectionLab}>{tr("set_sound")}</div>
          <div style={lc}>
            {toggles.map(([k, label, icon, handler], i) => (
              <div key={k} style={{ ...lr, borderTop: i ? "1px solid var(--line)" : "none" }}>
                <span style={{ ...iconWrap, color: "var(--primary)" }}><Icon d={icon} size={20} /></span>
                <span style={{ flex: 1, fontWeight: 600, color: "var(--ink)" }}>{label}</span>
                <Toggle on={settings[k]} onToggle={handler} />
              </div>
            ))}
          </div>

          <div style={sectionLab}>{tr("set_about")}</div>
          <div style={lc}>
            {links.map(([label, icon, key], i) => (
              <div key={key} onClick={() => setPanel(key)} style={{ ...lr, borderTop: i ? "1px solid var(--line)" : "none", cursor: "pointer" }}>
                <span style={{ ...iconWrap, color: "var(--ink-soft)" }}><Icon d={icon} size={20} /></span>
                <span style={{ flex: 1, fontWeight: 600, color: "var(--ink)" }}>{label}</span>
                <span style={{ color: "var(--ink-faint)" }}><Icon d={ICONS.chev} size={18} /></span>
              </div>
            ))}
          </div>

          <div style={sectionLab}>{tr("set_data")}</div>
          <div style={lc}>
            <div onClick={doRestore} style={{ ...lr, cursor: "pointer" }}>
              <span style={{ ...iconWrap, color: "var(--gold)" }}><Icon d={ICONS.bag} size={20} /></span>
              <span style={{ flex: 1, fontWeight: 600, color: "var(--ink)" }}>{tr("set_restore")}</span>
              <span style={{ color: "var(--ink-faint)" }}><Icon d={ICONS.chev} size={18} /></span>
            </div>
            {confirmReset ? (
              <div style={{ ...lr, borderTop: "1px solid var(--line)", gap: 10 }}>
                <span style={{ flex: 1, fontWeight: 600, color: "var(--ink)" }}>{tr("set_reset_q")}</span>
                <button onClick={() => setConfirmReset(false)} style={{ fontWeight: 700, color: "var(--ink-soft)", padding: "6px 12px" }}>{tr("cancel")}</button>
                <button onClick={() => onReset && onReset()} style={{ fontWeight: 800, color: "#fff", background: "#d9543f", borderRadius: 10, padding: "8px 14px" }}>{tr("reset")}</button>
              </div>
            ) : (
              <div onClick={() => setConfirmReset(true)} style={{ ...lr, borderTop: "1px solid var(--line)", cursor: "pointer" }}>
                <span style={{ ...iconWrap, color: "#d9543f" }}><Icon d={ICONS.x} size={20} /></span>
                <span style={{ flex: 1, fontWeight: 600, color: "#d9543f" }}>{tr("set_reset")}</span>
              </div>
            )}
          </div>

          {msg ? <div style={{ textAlign: "center", marginTop: 14, fontSize: 13.5, fontWeight: 600, color: "var(--primary)" }}>{msg}</div> : null}
          <div style={{ textAlign: "center", color: "var(--ink-faint)", fontSize: 12, marginTop: 20 }}>Words by Cork · v1.0 · made for calm</div>
        </div>
        {panel ? <SettingsPanel which={panel} onClose={() => setPanel(null)} safe={safe} /> : null}
      </div>
    );
  }
  const listCard = { background: "var(--card)", border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden", boxShadow: "var(--shadow-soft)" };
  const listRow = { display: "flex", alignItems: "center", gap: 13, padding: "13px 15px" };

  // ---------------- SHOP ----------------
  function Shop({ coins, onBuy, onBack, safe }) {
    const AD_REWARD = 75;
    const [watching, setWatching] = React.useState(false);
    const [adMsg, setAdMsg] = React.useState(null);
    const packs = [
      { id: "p1", pid: "com.corkword.coins.500", coins: 500, price: "$0.99", tag: null },
      { id: "p2", pid: "com.corkword.coins.1800", coins: 1800, price: "$2.99", tag: "Popular" },
      { id: "p3", pid: "com.corkword.coins.3500", coins: 3500, price: "$4.99", tag: "Best value" },
      { id: "p4", pid: "com.corkword.coins.8000", coins: 8000, price: "$9.99", tag: null },
      { id: "p5", pid: "com.corkword.coins.18000", coins: 18000, price: "$19.99", tag: "Mega" },
    ];
    function buy(p) {
      const iap = window.Native && window.Native.iap;
      // Coins are credited by the store-confirmed handler (Native.iap.onGrant → addCoins),
      // so we just kick off the order here. Dev/browser simulates a confirmed purchase.
      if (iap && iap.order) { iap.order(p.pid).catch(() => {}); }
      else { onBuy(p.coins); }
    }
    function watchAd() {
      if (watching) return;
      const ads = window.Native && window.Native.ads;
      if (!ads || !ads.rewarded) { setAdMsg(tr("ad_none")); return; }
      setWatching(true); setAdMsg(null);
      ads.rewarded().then((ok) => {
        if (ok) { onBuy(AD_REWARD); setAdMsg(tr("ad_added").replace("{n}", AD_REWARD)); if (window.Sound) window.Sound.coin && window.Sound.coin(); }
        else { setAdMsg(tr("ad_none")); }
      }).catch(() => setAdMsg(tr("ad_none"))).then(() => setWatching(false));
    }
    return (
      <div className="screen" style={{ paddingTop: safe.top, paddingBottom: 0 }}>
        <DecorField set="sparse" />
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px 8px" }}>
          <button className="iconbtn" onClick={onBack}><Icon d={ICONS.back} /></button>
          <div style={{ flex: 1, fontSize: 19, fontWeight: 700, color: "var(--ink)" }}>Coins</div>
          <div className="coinchip"><span className="coin-dot">ف</span>{coins}</div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 18px " + (safe.bottom + 16) + "px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px", background: "linear-gradient(135deg, var(--gold-soft), var(--card))", border: "1px solid var(--gold)", borderRadius: 20, marginBottom: 18 }}>
            <FilsCoin size={58} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>Fils — our game coin</div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>A nod to Bahrain, where this game was born. Spend on hints & reveals.</div>
            </div>
          </div>
          <button onClick={watchAd} disabled={watching} style={{
            display: "flex", alignItems: "center", gap: 13, width: "100%", textAlign: "start",
            padding: "14px 16px", marginBottom: 16, background: "var(--card)", border: "1px solid var(--gold)",
            borderRadius: 18, boxShadow: "var(--shadow-soft)", cursor: watching ? "default" : "pointer", opacity: watching ? 0.7 : 1,
          }}>
            <span style={{ fontSize: 26 }}>📺</span>
            <span style={{ flex: 1 }}>
              <span style={{ display: "block", fontWeight: 800, fontSize: 15.5, color: "var(--ink)" }}>{tr("ad_free")}</span>
              <span style={{ display: "block", fontSize: 12.5, color: "var(--ink-soft)" }}>{watching ? tr("ad_watching") : tr("ad_get").replace("{n}", AD_REWARD)}</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--primary-soft)", color: "var(--primary-deep)", fontWeight: 800, fontSize: 14, padding: "8px 12px", borderRadius: 999 }}>
              <FilsCoin size={18} /> +{AD_REWARD}
            </span>
          </button>
          {adMsg && <div style={{ textAlign: "center", color: "var(--primary-deep)", fontWeight: 700, fontSize: 13, marginBottom: 12 }}>{adMsg}</div>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {packs.map((p) => {
              const wide = p.id === "p5";
              return (
              <button key={p.id} onClick={() => buy(p)} style={{
                position: "relative", display: "flex",
                flexDirection: wide ? "row" : "column", alignItems: "center", justifyContent: "center", gap: wide ? 14 : 8,
                gridColumn: wide ? "1 / -1" : "auto",
                padding: wide ? "16px" : "20px 12px 14px", background: "var(--card)",
                border: wide ? "1px solid var(--gold)" : "1px solid var(--line)",
                borderRadius: 18, boxShadow: "var(--shadow-soft)",
              }}>
                {p.tag && <span style={{ position: "absolute", top: -9, background: "var(--primary)", color: "var(--on-primary)", fontSize: 10.5, fontWeight: 700, padding: "3px 10px", borderRadius: 999, zIndex: 1 }}>{p.tag}</span>}
                <FilsCoin size={48} />
                <div style={{ fontFamily: "var(--font-letter)", fontWeight: 700, fontSize: 22, color: "var(--ink)" }}>{p.coins}</div>
                <div style={{ width: wide ? "auto" : "100%", minWidth: wide ? 96 : 0, padding: "9px 14px", textAlign: "center", background: "var(--primary-soft)", color: "var(--primary-deep)", fontWeight: 700, borderRadius: 11, fontSize: 14 }}>{p.price}</div>
              </button>
              );
            })}
          </div>
          <div style={{ textAlign: "center", color: "var(--ink-faint)", fontSize: 11.5, marginTop: 18 }}>Coins are credited right after purchase · prices shown at checkout</div>
        </div>
      </div>
    );
  }

  window.Screens = { Home, LevelMap, Complete, Settings, Shop };
})();

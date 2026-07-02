/* ============================================================
   WORDS BY CORK — Onboarding, Leaderboard, Profile, BottomNav
   playful vector-style screens · exposes window.Screens2
   ============================================================ */
(function () {
  const Icon = window.Icon, ICONS = window.ICONS;

  const AV_COLORS = ["var(--primary)", "var(--sky)", "var(--gold)", "var(--primary-deep)"];
  function Avatar({ name, size = 48, ring, ci = 0 }) {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%", flexShrink: 0,
        background: AV_COLORS[ci % AV_COLORS.length], color: "#fff",
        border: ring ? "3px solid var(--card)" : "none",
        boxShadow: ring ? "0 0 0 3px " + ring : "var(--shadow-soft)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-letter)", fontWeight: 700, fontSize: size * 0.4,
      }}>{name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</div>
    );
  }

  // ---------------- BOTTOM NAV ----------------
  function BottomNav({ active, go, safe }) {
    const items = [
      ["home", ICONS.home || ICONS.leaf, tr("nav_home")],
      ["board", ICONS.trophy, tr("nav_rank")],
      ["profile", ICONS.user || ICONS.info, tr("nav_profile")],
    ];
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "6px 18px " + Math.max(10, safe.bottom) + "px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, padding: 7,
          background: "var(--card)", border: "1px solid var(--line)",
          borderRadius: 999, boxShadow: "var(--shadow-card)",
        }}>
          {items.map(([id, icon, label]) => {
            const on = active === id;
            return (
              <button key={id} onClick={() => go(id)} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: on ? "11px 20px" : "11px 13px", borderRadius: 999,
                background: on ? "var(--primary)" : "transparent",
                color: on ? "var(--on-primary)" : "var(--ink-soft)",
                fontWeight: 700, fontSize: 14, transition: "all .2s",
                boxShadow: on ? "var(--btn-glow)" : "none",
              }}>
                <Icon d={icon} size={20} />{on && label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------- ONBOARDING ----------------
  // a real slide-to-start control (drag the knob to the end, or just tap)
  function SlideToStart({ onDone }) {
    const track = React.useRef(null);
    const [x, setX] = React.useState(0);
    const st = React.useRef({ down: false, startX: 0, base: 0, moved: false });
    const KNOB = 54, GAP = 6;
    const maxX = () => Math.max(60, (track.current ? track.current.clientWidth - KNOB - GAP * 2 : 240));
    const cx = (e) => (e.clientX != null ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0));
    function down(e) { st.current = { down: true, startX: cx(e), base: x, moved: false }; try { if (e.currentTarget.setPointerCapture && e.pointerId != null) e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {} }
    function move(e) { if (!st.current.down) return; const d = cx(e) - st.current.startX; if (Math.abs(d) > 4) st.current.moved = true; setX(Math.max(0, Math.min(maxX(), st.current.base + d))); }
    function up() { if (!st.current.down) return; st.current.down = false; if (x >= maxX() * 0.7) onDone(); else setX(0); }
    function tap() { if (!st.current.moved) onDone(); }
    const pct = Math.min(1, x / maxX());
    return (
      <div ref={track} onClick={tap} style={{ position: "relative", height: 62, borderRadius: 999, background: "var(--primary)", boxShadow: "var(--shadow-card)", overflow: "hidden", userSelect: "none", touchAction: "none", cursor: "pointer" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--on-primary)", fontWeight: 800, fontSize: 17, opacity: 1 - pct * 1.5, pointerEvents: "none" }}>{tr("ob_start")}</div>
        <div onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onTouchStart={down} onTouchMove={move} onTouchEnd={up}
          style={{ position: "absolute", top: GAP, left: GAP + x, width: KNOB, height: KNOB, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 8px rgba(0,0,0,.25)", touchAction: "none" }}>
          <span style={{ color: "var(--primary)", display: "flex" }}><Icon d={ICONS.chev} size={24} /></span>
        </div>
      </div>
    );
  }

  function Onboard({ onStart, safe }) {
    const [name, setName] = React.useState("");
    return (
      <div className="screen" style={{ paddingTop: safe.top, paddingBottom: safe.bottom + 26 }}>
        <DecorField set="intro" />
        <div style={{ flex: 1.2, position: "relative", minHeight: 0 }}>
          <Confetti>
            <div style={{ position: "absolute", left: "50%", top: "54%", transform: "translate(-50%,-50%)", animation: "obMascot .8s cubic-bezier(.34,1.56,.64,1) .15s both" }}>
              {window.BulbMascot ? <window.BulbMascot size={200} /> : <BookMascot size={196} />}
            </div>
            {/* cozy speech bubble */}
            <div style={{ position: "absolute", left: "50%", top: "12%", transform: "translateX(-50%)", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, padding: "9px 15px", fontWeight: 700, fontSize: 14, color: "var(--ink)", boxShadow: "var(--shadow-card)", whiteSpace: "nowrap", animation: "obRise .5s ease 1.0s both" }}>
              Hi! I'm Lumo 💡
              <span style={{ position: "absolute", left: "50%", bottom: -6, width: 12, height: 12, background: "var(--card)", borderRight: "1px solid var(--line)", borderBottom: "1px solid var(--line)", transform: "translateX(-50%) rotate(45deg)" }} />
            </div>
          </Confetti>
        </div>
        <div style={{ padding: "0 30px 30px", textAlign: "left" }}>
          <div style={{ width: 46, height: 8, borderRadius: 99, background: "var(--primary)", marginBottom: 18, animation: "obRise .45s ease .55s both" }}></div>
          <h1 style={{ fontFamily: "var(--font-letter)", fontSize: 44, lineHeight: 1.04, margin: 0, fontWeight: 700, letterSpacing: "-.01em", color: "var(--ink)", whiteSpace: "pre-line", animation: "obRise .55s ease .7s both" }}>
            {tr("ob_title")}
          </h1>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", margin: "14px 0 16px", maxWidth: 280, lineHeight: 1.5, animation: "obRise .5s ease .95s both" }}>
            {tr("ob_sub")}
          </p>
          <div style={{ animation: "obRise .5s ease 1.15s both" }}>
            <input value={name} maxLength={18} onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") onStart(name.trim()); }}
              placeholder={tr("ob_name")}
              style={{ width: "100%", fontSize: 16, fontWeight: 600, color: "var(--ink)", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 14, padding: "13px 15px", marginBottom: 12, outline: "none", boxShadow: "var(--shadow-soft)" }} />
            <SlideToStart onDone={() => onStart(name.trim())} />
          </div>
        </div>
      </div>
    );
  }

  // ---------------- LEADERBOARD ----------------
  function achievementsFor({ coins, streak, completedCount }) {
    return [
      { id: "first",  label: "First Win",      icon: ICONS.check,  on: completedCount >= 1 },
      { id: "five",   label: "Getting Going",  icon: ICONS.play,   on: completedCount >= 5 },
      { id: "bright", label: "Bright Spark",   icon: ICONS.bulb,   on: completedCount >= 10 },
      { id: "l25",    label: "Explorer",       icon: ICONS.globe,  on: completedCount >= 25 },
      { id: "l50",    label: "Half Century",   icon: ICONS.trophy, on: completedCount >= 50 },
      { id: "s3",     label: "On a Streak",    icon: ICONS.flame,  on: streak >= 3 },
      { id: "s7",     label: "Week Strong",    icon: ICONS.star,   on: streak >= 7 },
      { id: "c500",   label: "Coin Collector", icon: ICONS.bag,    on: coins >= 500 },
    ];
  }
  window.achievementsFor = achievementsFor;

  // ---- offline bot leaderboard: ~500 international players, stable identities,
  //      the player's real points slot them in and their rank climbs as they play ----
  function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const LB_FIRST = ["Ahmed", "Yuki", "Carlos", "Priya", "Liam", "Fatima", "Chen", "Sofía", "Mateo", "Aisha", "Kenji", "Olga", "Diego", "Mei", "Omar", "Emma", "Raj", "Nina", "Tariq", "Lucas", "Hana", "Ali", "Zara", "Ivan", "Leila", "Sven", "Amara", "Youssef", "Elena", "Kwame", "Sara", "Marco", "Yara", "Noah", "Ling", "Hassan", "Freya", "Pablo", "Ananya", "Tomás", "Layla", "Nikolai", "Grace", "Sami", "Ingrid", "Dev", "Chloe", "Bilal", "Rin", "Mia"];
  const LB_LAST = ["M.", "K.", "R.", "S.", "L.", "T.", "B.", "N.", "A.", "D.", "P.", "C.", "G.", "V.", "H.", "O."];
  const LB_FLAGS = ["🇺🇸", "🇬🇧", "🇧🇷", "🇮🇳", "🇯🇵", "🇪🇬", "🇨🇳", "🇪🇸", "🇲🇽", "🇸🇦", "🇩🇪", "🇫🇷", "🇮🇹", "🇳🇬", "🇰🇷", "🇦🇪", "🇹🇷", "🇨🇦", "🇦🇺", "🇸🇪", "🇵🇭", "🇵🇰", "🇮🇩", "🇷🇺", "🇿🇦", "🇦🇷", "🇳🇱", "🇵🇱"];
  const LB_BOTS = (function () {
    const r = mulberry32(9973);
    const a = [];
    for (let i = 0; i < 500; i++) {
      const skill = Math.pow(r(), 1.7);
      a.push({ id: i, name: LB_FIRST[Math.floor(r() * LB_FIRST.length)] + " " + LB_LAST[Math.floor(r() * LB_LAST.length)],
        flag: LB_FLAGS[Math.floor(r() * LB_FLAGS.length)], ci: i % 4, skill: skill, g: 3 + Math.floor(r() * 26) });
    }
    return a;
  })();

  function Leaderboard({ coins, streak, completedCount, profile, go, safe, points, weeklyPts }) {
    const [tab, setTab] = React.useState("Weekly");
    const day = Math.floor(Date.now() / 86400000);
    const isWk = tab === "Weekly";
    const base = isWk ? 3200 : 26000, exp = isWk ? 1.7 : 1.5, mod = isWk ? 7 : 40;
    const rows = LB_BOTS.map((b) => ({ name: b.name, flag: b.flag, ci: b.ci,
      pts: Math.round(base * Math.pow(b.skill, exp)) + (day % mod) * b.g }));
    // fall back to level progress so players who advanced before points existed aren't ranked last
    const cc = completedCount || 0;
    const youPts = isWk ? Math.max(weeklyPts || 0, Math.min(cc * 30, 2200)) : Math.max(points || 0, cc * 130);
    const you = { name: (profile && profile.name) || "You", flag: "🏠", ci: (profile && profile.ci) || 0, you: true, pts: Math.round(youPts) };
    rows.push(you);
    rows.sort((a, b) => b.pts - a.pts);
    const rank = rows.findIndex((r) => r.you) + 1;
    const total = rows.length;
    const podium = [{ p: rows[1], place: 2, h: 84 }, { p: rows[0], place: 1, h: 116 }, { p: rows[2], place: 3, h: 68 }];
    // list: ranks 4..18, plus a window around the player if they're further down
    const listTop = rows.slice(3, 18).map((p, i) => ({ p: p, rank: i + 4 }));
    let windowRows = [];
    if (rank > 19) {
      const s = Math.max(18, rank - 3);
      windowRows = rows.slice(s, Math.min(total, rank + 2)).map((p, i) => ({ p: p, rank: s + 1 + i }));
    }
    const Row = ({ p, rank }) => (
      <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 14px 9px 10px",
        background: p.you ? "var(--primary-soft)" : "var(--card)",
        border: "1px solid " + (p.you ? "var(--primary)" : "var(--line)"),
        borderRadius: 999, boxShadow: "var(--shadow-soft)" }}>
        <span style={{ width: 26, textAlign: "center", fontWeight: 800, fontSize: 13, color: p.you ? "var(--primary-deep)" : "var(--ink-faint)" }}>{rank}</span>
        <Avatar name={p.name} size={36} ci={p.ci} />
        <span style={{ flex: 1, fontWeight: 700, fontSize: 14.5, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {p.you ? (p.name + " (you)") : p.name} <span style={{ fontSize: 13 }}>{p.flag}</span>
        </span>
        <span style={{ fontWeight: 800, fontSize: 13.5, color: "var(--ink-soft)" }}>{p.pts.toLocaleString()}</span>
      </div>
    );
    return (
      <div className="screen" style={{ paddingTop: safe.top, paddingBottom: 0 }}>
        <DecorField set="sparse" />
        <div style={{ textAlign: "center", padding: "12px 18px 6px", fontSize: 20, fontWeight: 700, fontFamily: "var(--font-letter)", color: "var(--ink)" }}>{tr("lb_title")}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "2px 18px 6px" }}>
          {[["Weekly", tr("lb_week")], ["AllTime", "All-time"]].map(([tb, tbl]) => (
            <button key={tb} onClick={() => setTab(tb)} style={{
              padding: "9px 20px", borderRadius: 999, fontWeight: 700, fontSize: 13.5,
              background: tab === tb ? "var(--primary)" : "var(--card)",
              color: tab === tb ? "var(--on-primary)" : "var(--ink-soft)",
              border: "1px solid " + (tab === tb ? "transparent" : "var(--line)"),
              boxShadow: tab === tb ? "var(--btn-glow)" : "var(--shadow-soft)", transition: "all .2s",
            }}>{tbl}</button>
          ))}
        </div>
        {/* your rank banner */}
        <div style={{ margin: "2px 18px 8px", padding: "10px 16px", borderRadius: 16, background: "linear-gradient(135deg, var(--primary), var(--primary-deep))", color: "var(--on-primary)", display: "flex", alignItems: "center", gap: 12, boxShadow: "var(--btn-glow)" }}>
          <div style={{ fontFamily: "var(--font-letter)", fontWeight: 800, fontSize: 26, lineHeight: 1 }}>#{rank}</div>
          <div style={{ flex: 1, lineHeight: 1.25 }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>You're #{rank} of {total.toLocaleString()}</div>
            <div style={{ fontSize: 12, opacity: .92 }}>{you.pts.toLocaleString()} pts · {rank <= 3 ? "🏆 top of the board!" : "keep playing to climb ▲"}</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "2px 18px 14px", minHeight: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 8, padding: "4px 6px 0" }}>
            {podium.map(({ p, place, h }) => (
              <div key={place} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 92 }}>
                <Avatar name={p.name} size={place === 1 ? 58 : 48} ci={p.ci} ring={place === 1 ? "var(--gold)" : "var(--primary-soft)"} />
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", textAlign: "center", whiteSpace: "nowrap" }}>{p.name} {p.flag}</div>
                <div style={{ fontWeight: 800, fontSize: 12.5, color: "var(--ink-soft)" }}>{p.pts.toLocaleString()}</div>
                <div style={{ width: "100%", height: h, borderRadius: "14px 14px 4px 4px",
                  background: place === 1 ? "linear-gradient(180deg, var(--primary) 0%, var(--primary-deep) 100%)" : "linear-gradient(180deg, color-mix(in oklab, var(--primary) 55%, var(--card)) 0%, var(--primary) 140%)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-letter)", fontWeight: 700,
                  fontSize: place === 1 ? 44 : 34, color: "var(--on-primary)", boxShadow: "var(--shadow-card)" }}>{place}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
            {listTop.map(({ p, rank }) => <Row key={"t" + rank} p={p} rank={rank} />)}
            {windowRows.length ? <div style={{ textAlign: "center", color: "var(--ink-faint)", fontWeight: 800, letterSpacing: 2, padding: "2px 0" }}>· · ·</div> : null}
            {windowRows.map(({ p, rank }) => <Row key={"w" + rank} p={p} rank={rank} />)}
          </div>
        </div>
        <BottomNav active="board" go={go} safe={safe} />
      </div>
    );
  }

  // ---------------- PROFILE ----------------
  function Profile({ coins, streak, completedCount, profile, setProfile, go, onSettings, safe }) {
    profile = profile || { name: "Word Friend", ci: 0, joinDate: new Date().toISOString().slice(0, 10) };
    const update = (patch) => setProfile && setProfile((p) => ({ ...p, ...patch }));
    const [editing, setEditing] = React.useState(false);
    const [draft, setDraft] = React.useState(profile.name);
    const [pickAv, setPickAv] = React.useState(false);

    function commitName() {
      const n = (draft || "").trim().slice(0, 18) || "Word Friend";
      update({ name: n }); setDraft(n); setEditing(false);
    }
    let since = "2026";
    try { since = new Date(profile.joinDate + "T00:00:00").toLocaleDateString(undefined, { month: "long", year: "numeric" }); } catch (e) {}

    const ach = achievementsFor({ coins, streak, completedCount });
    const earned = ach.filter((a) => a.on).length;
    const statCard = { background: "var(--card)", border: "1px solid var(--line)", borderRadius: 20, boxShadow: "var(--shadow-soft)", padding: "16px 8px", textAlign: "center" };

    return (
      <div className="screen" style={{ paddingTop: safe.top, paddingBottom: 0 }}>
        <DecorField set="sparse" />
        <div style={{ display: "flex", alignItems: "center", padding: "12px 18px 6px" }}>
          <div style={{ flex: 1, textAlign: "center", fontSize: 20, fontWeight: 700, fontFamily: "var(--font-letter)", color: "var(--ink)", paddingLeft: 44 }}>{tr("p_title")}</div>
          <button className="iconbtn" onClick={onSettings}><Icon d={ICONS.gear} /></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 22px 14px", minHeight: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "14px 0 18px" }}>
            <button onClick={() => setPickAv((v) => !v)} style={{ position: "relative", borderRadius: "50%" }} title="Change avatar">
              <div style={{ position: "absolute", inset: -9, borderRadius: "50%", border: "2px dashed var(--disc-line)" }}></div>
              <Avatar name={profile.name} size={96} ci={profile.ci} ring="var(--primary-soft)" />
              <span style={{ position: "absolute", right: -2, bottom: -2, width: 30, height: 30, borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-soft)" }}><Icon d={ICONS.wand} size={15} /></span>
            </button>
            {pickAv ? (
              <div style={{ display: "flex", gap: 12, padding: "4px 0 2px" }}>
                {[0, 1, 2, 3].map((i) => (
                  <button key={i} onClick={() => { update({ ci: i }); setPickAv(false); }}
                    style={{ width: 34, height: 34, borderRadius: "50%", background: AV_COLORS[i], border: profile.ci === i ? "3px solid var(--ink)" : "3px solid var(--card)", boxShadow: "var(--shadow-soft)" }} />
                ))}
              </div>
            ) : null}
            {editing ? (
              <input autoFocus value={draft} maxLength={18} onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") commitName(); }} onBlur={commitName}
                style={{ fontFamily: "var(--font-letter)", fontSize: 22, fontWeight: 700, textAlign: "center", color: "var(--ink)", background: "var(--card-2)", border: "1.5px solid var(--primary)", borderRadius: 12, padding: "6px 12px", width: 210, outline: "none" }} />
            ) : (
              <button onClick={() => { setDraft(profile.name); setEditing(true); }} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-letter)", fontSize: 26, fontWeight: 700, color: "var(--ink)" }}>{profile.name}</span>
                <span style={{ color: "var(--ink-faint)" }}><Icon d={ICONS.wand} size={15} /></span>
              </button>
            )}
            <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{tr("p_since")} {since}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[[String(streak), tr("p_streak"), "var(--gold)"], [String(coins), tr("p_coins"), "var(--primary)"], [String(completedCount), tr("p_levels"), "var(--sky)"]].map(([num, label, color]) => (
              <div key={label} style={statCard}>
                <div style={{ fontFamily: "var(--font-letter)", fontSize: 28, fontWeight: 700, color }}>{num}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)" }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "20px 4px 10px" }}>
            <span style={{ fontFamily: "var(--font-letter)", fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>{tr("p_ach")}</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink-soft)" }}>{earned}/{ach.length}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
            {ach.map((a) => (
              <div key={a.id} style={{ background: "var(--card)", border: "1px solid var(--line)", borderRadius: 16, boxShadow: a.on ? "var(--shadow-soft)" : "none", padding: "12px 4px 9px", textAlign: "center", opacity: a.on ? 1 : 0.45 }}>
                <span style={{ width: 38, height: 38, borderRadius: "50%", margin: "0 auto 6px", display: "flex", alignItems: "center", justifyContent: "center", background: a.on ? "var(--primary)" : "var(--card-2)", color: a.on ? "#fff" : "var(--ink-faint)" }}><Icon d={a.icon} size={19} /></span>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink-soft)", lineHeight: 1.2 }}>{a.label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18, background: "var(--card)", border: "1px solid var(--line)", borderRadius: 22, boxShadow: "var(--shadow-soft)", overflow: "hidden" }}>
            {[["Daily puzzle", ICONS.calendar, "var(--sky)"], ["Journey map", ICONS.globe, "var(--primary)"], ["Coin shop", ICONS.bag, "var(--gold)"]].map(([label, icon, color], i) => (
              <button key={label} onClick={() => go(label === "Daily puzzle" ? "daily" : label === "Journey map" ? "map" : "shop")} style={{
                display: "flex", alignItems: "center", gap: 13, padding: "13px 15px", width: "100%", textAlign: "left",
                borderTop: i ? "1px solid var(--line)" : "none",
              }}>
                <span style={{ width: 40, height: 40, borderRadius: 13, background: "var(--card-2)", display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}><Icon d={icon} size={20} /></span>
                <span style={{ flex: 1, fontWeight: 700, color: "var(--ink)", fontSize: 14.5 }}>{label}</span>
                <span style={{ color: "var(--ink-faint)" }}><Icon d={ICONS.chev} size={18} /></span>
              </button>
            ))}
          </div>
        </div>
        <BottomNav active="profile" go={go} safe={safe} />
      </div>
    );
  }

  // ---- Cork Information Technology logo (recreated as crisp SVG) ----
  function CorkLogo({ size = 210 }) {
    return (
      <svg width={size} height={size * 0.6} viewBox="0 0 240 144" fill="none" aria-label="Cork">
        <path d="M40 58 C 76 28 116 28 150 47 C 173 60 197 57 214 42" stroke="#3FC2D8" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M26 80 C 70 49 120 53 158 70 C 179 79 199 76 216 63" stroke="#1E8FD0" strokeWidth="12" strokeLinecap="round" fill="none" />
        <text x="121" y="130" textAnchor="middle" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontWeight="800" fontSize="54" letterSpacing="3" fill="#1E8FD0">CORK</text>
      </svg>
    );
  }

  // ---- Branded loading screen shown on launch, then enters the game ----
  function Loading({ onDone, dur = 2600 }) {
    React.useEffect(() => {
      const t = setTimeout(() => onDone && onDone(), dur);
      return () => clearTimeout(t);
    }, []);
    return (
      <div className="screen" style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "corkIn .7s cubic-bezier(.22,.61,.36,1) both" }}>
          <div style={{ animation: "corkUp 3s ease-in-out infinite alternate" }}><CorkLogo size={216} /></div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".36em", color: "#1E8FD0", textTransform: "uppercase", marginTop: 2 }}>Information Technology</div>
        </div>
        <div style={{ position: "absolute", bottom: "13%", display: "flex", flexDirection: "column", alignItems: "center", gap: 13, width: "100%", padding: "0 30px" }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--ink-soft)", textAlign: "center", lineHeight: 1.5, animation: "obRise .8s ease .4s both" }}>
            A few calm minutes a day —<br />find your words, clear your mind 🌿
          </div>
          <div style={{ width: 150, height: 4, borderRadius: 99, background: "rgba(30,143,208,.16)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "42%", borderRadius: 99, background: "#1E8FD0", animation: "loadSlide 1.1s ease-in-out infinite" }} />
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-faint)", letterSpacing: ".04em" }}>powered by Cork Information Technology</div>
        </div>
      </div>
    );
  }

  window.Screens2 = { Onboard, Leaderboard, Profile, BottomNav, Loading };
})();

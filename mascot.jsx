/* ============================================================
   Mascot — playful word-tile character built from simple CSS
   shapes (rounded rects + circles only). exposes window.Mascot
   + window.Confetti sparkle layer.
   ============================================================ */
(function () {
  // ---- sample-style vector decor primitives ----
  const STAR_CLIP = "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)";

  // chunky concave twinkle star (like the reference confetti)
  function Twinkle({ x, y, size = 18, color = "var(--gold)", delay = 0, dur = 4 }) {
    return (
      <div className="decor-item" style={{
        position: "absolute", left: x, top: y, width: size, height: size,
        background: color, clipPath: STAR_CLIP, WebkitClipPath: STAR_CLIP,
        animation: `wiggle ${dur}s ease-in-out ${-delay}s infinite`, pointerEvents: "none",
      }}></div>
    );
  }

  // swooshy ribbon — thick rounded stroke, like the orange ribbons in the sample
  function Ribbon({ x, y, w = 90, color = "var(--primary)", flip = false, delay = 0, dur = 7 }) {
    return (
      <svg className="decor-item" width={w} height={w * 0.55} viewBox="0 0 100 55" style={{
        position: "absolute", left: x, top: y, overflow: "visible",
        transform: flip ? "scaleX(-1)" : "none",
        animation: `drift ${dur}s ease-in-out ${-delay}s infinite`, pointerEvents: "none",
      }}>
        <path d="M4 40 C 18 6, 40 6, 52 28 S 84 50, 96 16" fill="none" stroke={color}
          strokeWidth="11" strokeLinecap="round" />
      </svg>
    );
  }

  // confetti chip — fat tilted rounded bar
  function Chip({ x, y, w = 22, color = "var(--sky)", r = -20, delay = 0, dur = 5 }) {
    return (
      <div className="decor-item" style={{
        position: "absolute", left: x, top: y, width: w, height: w * 0.42, borderRadius: 99,
        background: color, transform: `rotate(${r}deg)`,
        animation: `driftB ${dur}s ease-in-out ${-delay}s infinite`, pointerEvents: "none",
      }}></div>
    );
  }

  function Dot({ x, y, s = 10, color = "var(--primary)", delay = 0, dur = 3.4 }) {
    return <div className="decor-item" style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", background: color, animation: `bobS ${dur}s ease-in-out ${-delay}s infinite alternate`, pointerEvents: "none" }}></div>;
  }

  function Confetti({ children }) {
    // Decorations removed for now — just hold the mascot, no scattered shapes.
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {children}
      </div>
    );
  }

  // Friendly letter-tile character — body is a big "W" tile
  function Mascot({ size = 200, mood = "happy" }) {
    const u = size / 100; // unit
    const ink = "var(--ink)";
    return (
      <div className="hero-float" style={{ width: size, height: size * 1.18, position: "relative", margin: "0 auto", animation: "mascotBob 3.2s ease-in-out infinite alternate", transformOrigin: "50% 90%" }}>
        {/* legs */}
        <div style={{ position: "absolute", left: u * 30, top: u * 88, width: u * 7, height: u * 18, borderRadius: 99, background: ink }}></div>
        <div style={{ position: "absolute", left: u * 62, top: u * 88, width: u * 7, height: u * 18, borderRadius: 99, background: ink }}></div>
        {/* sneakers */}
        <div style={{ position: "absolute", left: u * 22, top: u * 102, width: u * 20, height: u * 11, borderRadius: `${u * 8}px ${u * 8}px ${u * 5}px ${u * 5}px`, background: "var(--gold)", border: `${Math.max(2, u * 1.6)}px solid ${ink}` }}></div>
        <div style={{ position: "absolute", left: u * 58, top: u * 102, width: u * 20, height: u * 11, borderRadius: `${u * 8}px ${u * 8}px ${u * 5}px ${u * 5}px`, background: "var(--sky)", border: `${Math.max(2, u * 1.6)}px solid ${ink}` }}></div>
        {/* arms */}
        <div style={{ position: "absolute", left: u * 2, top: u * 46, width: u * 16, height: u * 7, borderRadius: 99, background: ink, transform: "rotate(28deg)" }}></div>
        <div style={{ position: "absolute", left: u * 82, top: u * 34, width: u * 16, height: u * 7, borderRadius: 99, background: ink, transform: "rotate(-50deg)" }}></div>
        {/* hands */}
        <div style={{ position: "absolute", left: u * -2, top: u * 50, width: u * 9, height: u * 9, borderRadius: "50%", background: "var(--card)", border: `${Math.max(2, u * 1.6)}px solid ${ink}` }}></div>
        <div style={{ position: "absolute", left: u * 92, top: u * 26, width: u * 9, height: u * 9, borderRadius: "50%", background: "var(--card)", border: `${Math.max(2, u * 1.6)}px solid ${ink}` }}></div>
        {/* body tile */}
        <div style={{
          position: "absolute", left: u * 14, top: u * 14, width: u * 72, height: u * 78,
          borderRadius: u * 18, background: "linear-gradient(160deg, var(--primary) 0%, var(--primary-deep) 100%)",
          border: `${Math.max(2, u * 2)}px solid ${ink}`, boxShadow: "var(--shadow-card)",
          transform: "rotate(-3deg)",
        }}>
          {/* glasses */}
          <div style={{ position: "absolute", left: "12%", top: "22%", width: "30%", aspectRatio: "1", borderRadius: "50%", background: "#fff", border: `${Math.max(2, u * 1.8)}px solid var(--sky)` }}>
            <div style={{ position: "absolute", left: "30%", top: "34%", width: "32%", height: "32%", borderRadius: "50%", background: ink }}></div>
          </div>
          <div style={{ position: "absolute", left: "56%", top: "22%", width: "30%", aspectRatio: "1", borderRadius: "50%", background: "#fff", border: `${Math.max(2, u * 1.8)}px solid var(--sky)` }}>
            <div style={{ position: "absolute", left: "30%", top: "34%", width: "32%", height: "32%", borderRadius: "50%", background: ink }}></div>
          </div>
          <div style={{ position: "absolute", left: "41%", top: "32%", width: "18%", height: u * 2, borderRadius: 99, background: "var(--sky)" }}></div>
          {/* smile */}
          <div style={{
            position: "absolute", left: "34%", top: mood === "happy" ? "58%" : "62%", width: "32%", height: "18%",
            borderRadius: mood === "happy" ? `0 0 ${u * 20}px ${u * 20}px` : 99,
            background: mood === "happy" ? "#fff" : "transparent",
            border: mood === "happy" ? "none" : `${Math.max(2, u * 1.6)}px solid #fff`,
            overflow: "hidden",
          }}>
            {mood === "happy" && <div style={{ position: "absolute", left: "16%", bottom: 0, width: "32%", height: "44%", borderRadius: `${u * 8}px ${u * 8}px 0 0`, background: "#ff8d9d" }}></div>}
          </div>
          {/* cheek dots */}
          <div style={{ position: "absolute", left: "8%", top: "52%", width: "10%", height: "7%", borderRadius: "50%", background: "rgba(255,255,255,.35)" }}></div>
          <div style={{ position: "absolute", left: "82%", top: "52%", width: "10%", height: "7%", borderRadius: "50%", background: "rgba(255,255,255,.35)" }}></div>
        </div>
      </div>
    );
  }

  // Bahraini fils–inspired coin — pure vector (gradients + type)
  function FilsCoin({ size = 48, spin = true }) {
    const u = size / 100;
    return (
      <div className="fils-coin" style={{
        width: size, height: size, borderRadius: "50%", position: "relative", flexShrink: 0,
        background: "radial-gradient(circle at 35% 28%, #fbe49a 0%, #f0bd55 45%, #d8962a 100%)",
        boxShadow: "inset 0 " + (-3 * u) + "px " + (6 * u) + "px rgba(140,90,10,.35), 0 " + (4 * u) + "px " + (10 * u) + "px rgba(140,90,10,.25)",
      }}>
        {/* beaded edge */}
        <div style={{ position: "absolute", inset: u * 4, borderRadius: "50%", border: Math.max(1.5, u * 3) + "px dotted rgba(122,77,10,.45)" }}></div>
        {/* inner ring */}
        <div style={{ position: "absolute", inset: u * 14, borderRadius: "50%", border: Math.max(1, u * 2) + "px solid rgba(122,77,10,.4)", background: "radial-gradient(circle at 40% 32%, #f7d680, #e3a93c)" }}></div>
        {/* sheen */}
        {spin && <div style={{ position: "absolute", inset: u * 8, borderRadius: "50%", background: "linear-gradient(120deg, transparent 38%, rgba(255,255,255,.4) 50%, transparent 62%)", animation: "coinSheen 3.6s ease-in-out infinite" }}></div>}
        {/* fils inscription */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#7a4d0a", lineHeight: 1 }}>
          <span style={{ fontSize: size * 0.34, fontWeight: 800, fontFamily: "system-ui, sans-serif" }}>فلس</span>
          {size >= 44 && <span style={{ fontSize: Math.max(6, size * 0.11), fontWeight: 800, letterSpacing: ".18em", marginTop: u * 5 }}>FILS</span>}
        </div>
      </div>
    );
  }

  // faint floating dictionary letters (D style)
  function GhostLetter({ x, y, ch, size = 50, color = "var(--primary)", r = 0, op = 0.12, still = false, delay = 0, dur = 7 }) {
    return <div className="decor-item" style={{ position: "absolute", left: x, top: y, fontFamily: "var(--font-letter)", fontWeight: 800, fontSize: size, lineHeight: 1, color, opacity: op, transform: `rotate(${r}deg)`, animation: still ? "none" : `drift ${dur}s ease-in-out ${-delay}s infinite`, pointerEvents: "none", userSelect: "none" }}>{ch}</div>;
  }
  // little open-book doodle (books motif)
  function BookDoodle({ x, y, w = 30, color = "var(--primary)", r = 0, op = 0.9, still = false, delay = 0, dur = 8 }) {
    return (
      <svg className="decor-item" width={w} height={w * 0.82} viewBox="0 0 30 24" style={{ position: "absolute", left: x, top: y, overflow: "visible", transform: `rotate(${r}deg)`, opacity: op, animation: still ? "none" : `driftB ${dur}s ease-in-out ${-delay}s infinite`, pointerEvents: "none" }}>
        <path d="M15 6 C 11 3, 5 3, 2 5 L 2 20 C 5 18, 11 18, 15 21 C 19 18, 25 18, 28 20 L 28 5 C 25 3, 19 3, 15 6 Z" fill="var(--card)" stroke={color} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M15 6 L 15 21" stroke={color} strokeWidth="2.2" />
      </svg>
    );
  }

  // A + D decor: ribbons, twinkles, chips, dots, floating letters, book doodles — mix of moving + still
  function DecorField({ set = "full" }) {
    // Decorations are removed for now everywhere EXCEPT the first three (intro)
    // screens, which get a few subtle twinkles only — no ribbons/ghost letters.
    if (set !== "intro") return null;
    const intro = [
      <Twinkle key="t1" x="10%" y="12%" size={18} color="var(--gold)" delay={0.3} />,
      <Twinkle key="t2" x="85%" y="15%" size={14} color="var(--primary)" delay={0.9} dur={5} />,
      <Twinkle key="t3" x="88%" y="60%" size={16} color="var(--gold)" delay={0.6} />,
      <Dot key="d1" x="12%" y="72%" s={9} color="var(--sky)" delay={1.0} />,
    ];
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {intro}
      </div>
    );
  }

  // ---- Retro rubber-hose BOOK mascot (the "Quiz app" character) ----
  // built from rounded rects + circles only; thick true-black outlines for a
  // crisp print-poster / vector feel. exposes window.BookMascot
  function BookMascot({ size = 200, mood = "happy" }) {
    const u = size / 100;
    const ink = "var(--ink)";
    const bd = Math.max(2.2, u * 2.6);          // outline weight
    const bdS = Math.max(1.8, u * 2.0);
    const Glove = ({ thumbUp }) => (
      <div style={{ width: u * 16, height: u * 16, position: "relative" }}>
        {/* mitt */}
        <div style={{ position: "absolute", inset: 0, borderRadius: "48% 48% 50% 50%", background: "#fff", border: `${bd}px solid ${ink}`, boxShadow: "inset 0 -2px 0 rgba(0,0,0,.06)" }}></div>
        {/* thumb */}
        <div style={{ position: "absolute", left: thumbUp ? u * -2.5 : u * 12, top: thumbUp ? u * -3 : u * 1, width: u * 7, height: u * 9.5, borderRadius: 99, background: "#fff", border: `${bd}px solid ${ink}`, transform: thumbUp ? "rotate(-22deg)" : "rotate(26deg)" }}></div>
        {/* knuckle crease */}
        <div style={{ position: "absolute", left: "26%", top: "30%", width: "48%", height: u * 1.6, borderRadius: 99, background: "rgba(0,0,0,.14)" }}></div>
      </div>
    );
    const Sneaker = ({ color }) => (
      <div style={{ width: u * 28, height: u * 17, position: "relative" }}>
        {/* upper */}
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "74%", borderRadius: `${u * 9}px ${u * 13}px ${u * 6}px ${u * 4}px`, background: color, border: `${bd}px solid ${ink}` }}></div>
        {/* toe cap */}
        <div style={{ position: "absolute", right: u * 1.5, top: "26%", width: "34%", height: "46%", borderRadius: `${u * 8}px ${u * 9}px ${u * 5}px ${u * 4}px`, background: "rgba(255,255,255,.85)", border: `${bdS}px solid ${ink}` }}></div>
        {/* laces / stripe */}
        <div style={{ position: "absolute", left: "20%", top: "16%", width: u * 9, height: u * 3.4, borderRadius: 99, background: "#fff", border: `${bdS}px solid ${ink}`, transform: "rotate(-12deg)" }}></div>
        {/* sole */}
        <div style={{ position: "absolute", left: u * -1, bottom: 0, width: "104%", height: "30%", borderRadius: 99, background: "#fff", border: `${bd}px solid ${ink}` }}></div>
      </div>
    );
    return (
      <div className="hero-float" style={{ width: size, height: size * 1.36, position: "relative", margin: "0 auto", animation: "mascotBob 3.4s ease-in-out infinite alternate", transformOrigin: "50% 88%" }}>
        {/* ---- LEGS ---- */}
        <div style={{ position: "absolute", left: u * 33, top: u * 90, width: u * 9, height: u * 26, borderRadius: 99, background: ink }}></div>
        <div style={{ position: "absolute", left: u * 58, top: u * 90, width: u * 9, height: u * 26, borderRadius: 99, background: ink }}></div>
        {/* ---- SNEAKERS ---- */}
        <div style={{ position: "absolute", left: u * 18, top: u * 110, transform: "rotate(-4deg)" }}><Sneaker color="var(--primary)" /></div>
        <div style={{ position: "absolute", left: u * 52, top: u * 110, transform: "scaleX(-1) rotate(-4deg)" }}><Sneaker color="var(--sky)" /></div>

        {/* ---- ARMS (behind cover) ---- */}
        {/* left arm — raised, thumbs up */}
        <div style={{ position: "absolute", left: u * 12, top: u * 36, width: u * 26, height: u * 8.5, borderRadius: 99, background: ink, transform: "rotate(46deg)", transformOrigin: "left center" }}></div>
        <div style={{ position: "absolute", left: u * -6, top: u * 14 }}><Glove thumbUp /></div>
        {/* right arm — out, waving */}
        <div style={{ position: "absolute", left: u * 66, top: u * 52, width: u * 26, height: u * 8.5, borderRadius: 99, background: ink, transform: "rotate(-22deg)", transformOrigin: "left center" }}></div>
        <div style={{ position: "absolute", left: u * 86, top: u * 50 }}><Glove /></div>

        {/* ---- BOOK ---- */}
        {/* back pages (white, peeking right + bottom) */}
        <div style={{ position: "absolute", left: u * 17, top: u * 7, width: u * 70, height: u * 84, borderRadius: `${u * 8}px ${u * 12}px ${u * 12}px ${u * 8}px`, background: "#fff", border: `${bd}px solid ${ink}`, transform: "rotate(-2deg)" }}>
          {/* page edge lines */}
          <div style={{ position: "absolute", right: u * 4, top: "16%", width: u * 7, height: bdS, borderRadius: 99, background: "rgba(0,0,0,.18)" }}></div>
          <div style={{ position: "absolute", right: u * 4, top: "30%", width: u * 7, height: bdS, borderRadius: 99, background: "rgba(0,0,0,.18)" }}></div>
          <div style={{ position: "absolute", right: u * 4, bottom: "18%", width: u * 7, height: bdS, borderRadius: 99, background: "rgba(0,0,0,.18)" }}></div>
        </div>
        {/* green ribbon bookmark */}
        <div style={{ position: "absolute", left: u * 70, top: u * 2, width: u * 9, height: u * 22, background: "var(--sky)", border: `${bdS}px solid ${ink}`, clipPath: "polygon(0 0,100% 0,100% 100%,50% 78%,0 100%)" }}></div>
        {/* front cover (orange) */}
        <div style={{
          position: "absolute", left: u * 19, top: u * 9, width: u * 62, height: u * 78,
          borderRadius: `${u * 5}px ${u * 13}px ${u * 13}px ${u * 5}px`,
          background: "linear-gradient(158deg, #ff6a33 0%, var(--primary) 42%, var(--primary-deep) 100%)",
          border: `${bd}px solid ${ink}`, boxShadow: "var(--shadow-card)", transform: "rotate(-2deg)", overflow: "hidden",
        }}>
          {/* spine shadow */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: u * 8, background: "rgba(0,0,0,.16)" }}></div>
          <div style={{ position: "absolute", left: u * 9, top: 0, bottom: 0, width: bdS, background: "rgba(0,0,0,.18)" }}></div>
          {/* gloss */}
          <div style={{ position: "absolute", right: u * 6, top: u * 4, width: "30%", height: "40%", borderRadius: "50%", background: "rgba(255,255,255,.18)", filter: "blur(4px)" }}></div>

          {/* ---- FACE ---- */}
          {/* eyebrows */}
          <div style={{ position: "absolute", left: "22%", top: "16%", width: "22%", height: u * 3.4, borderRadius: 99, background: ink, transform: "rotate(-10deg)" }}></div>
          <div style={{ position: "absolute", left: "55%", top: "16%", width: "22%", height: u * 3.4, borderRadius: 99, background: ink, transform: "rotate(10deg)" }}></div>
          {/* glasses bridge */}
          <div style={{ position: "absolute", left: "46%", top: "30%", width: "12%", height: u * 3, borderRadius: 99, background: "var(--sky)", zIndex: 1 }}></div>
          {/* lenses */}
          {[20, 54].map((lx, i) => (
            <div key={i} style={{ position: "absolute", left: `${lx}%`, top: "24%", width: "28%", aspectRatio: "1", borderRadius: "50%", background: "#fff", border: `${bd}px solid var(--sky)`, boxShadow: `0 0 0 ${bdS}px ${ink}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "42%", height: "42%", borderRadius: "50%", background: ink, position: "relative" }}>
                <div style={{ position: "absolute", left: "20%", top: "16%", width: "34%", height: "34%", borderRadius: "50%", background: "#fff" }}></div>
              </div>
            </div>
          ))}
          {/* smile */}
          <div style={{ position: "absolute", left: "30%", top: mood === "happy" ? "58%" : "60%", width: "40%", height: "26%", borderRadius: mood === "happy" ? `${u * 6}px ${u * 6}px ${u * 22}px ${u * 22}px` : 99, background: "#fff", border: `${bd}px solid ${ink}`, overflow: "hidden" }}>
            {mood === "happy" && <>
              {/* teeth line */}
              <div style={{ position: "absolute", left: 0, top: u * 1, width: "100%", height: u * 3.5, background: "#fff", borderBottom: `${bdS}px solid ${ink}` }}></div>
              {/* tongue */}
              <div style={{ position: "absolute", left: "26%", bottom: u * -1, width: "48%", height: "52%", borderRadius: `${u * 9}px ${u * 9}px 0 0`, background: "#ff8d72", border: `${bdS}px solid ${ink}`, borderBottom: "none" }}></div>
            </>}
          </div>
          {/* cheeks */}
          <div style={{ position: "absolute", left: "13%", top: "52%", width: "12%", height: "8%", borderRadius: "50%", background: "rgba(255,160,120,.55)" }}></div>
          <div style={{ position: "absolute", left: "75%", top: "52%", width: "12%", height: "8%", borderRadius: "50%", background: "rgba(255,160,120,.55)" }}></div>
        </div>
      </div>
    );
  }

  // Animated star mascot — transparent looping WebP (from the 3D clip).
  function StarMascot({ size = 200, style }) {
    return (
      <img src="mascot-star.webp" alt="" draggable="false"
        style={Object.assign({
          width: size, height: "auto", display: "block", margin: "0 auto",
          filter: "drop-shadow(0 16px 22px rgba(180,120,0,.20))",
          animation: "mascotBob 3.6s ease-in-out infinite alternate",
          transformOrigin: "50% 90%", pointerEvents: "none", userSelect: "none",
        }, style || {})} />
    );
  }

  // ---- Bulb-head mascot: the real 3D character (transparent looping WebP,
  //      cut from the Kling clip). Floats gently on top. ----
  function BulbMascot({ size = 200, style }) {
    return (
      <img src="mascot-bulb.webp" alt="" draggable="false"
        style={Object.assign({
          width: size, height: "auto", display: "block", margin: "0 auto",
          filter: "drop-shadow(0 14px 20px rgba(210,30,95,.18))",
          animation: "mascotBob 3.6s ease-in-out infinite alternate",
          transformOrigin: "50% 92%", pointerEvents: "none", userSelect: "none",
        }, style || {})} />
    );
  }

  window.Mascot = Mascot;
  window.BookMascot = BookMascot;
  window.StarMascot = StarMascot;
  window.BulbMascot = BulbMascot;
  window.Confetti = Confetti;
  window.FilsCoin = FilsCoin;
  window.DecorField = DecorField;
})();

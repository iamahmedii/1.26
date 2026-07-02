/* ============================================================
   LetterWheel — real swipe-to-connect mechanic (touch + mouse)
   props: letters[], size, onProgress(word), onWord(word, indices)
   exposes window.LetterWheel
   ============================================================ */
function LetterWheel({ letters, size = 290, onProgress, onWord, shuffleKey, wheelStyle = "solid" }) {
  const wrapRef = React.useRef(null);
  const [order, setOrder] = React.useState(() => letters.map((_, i) => i));
  const [sel, setSel] = React.useState([]);      // indices into `order`
  const [pointer, setPointer] = React.useState(null);
  const [dragging, setDragging] = React.useState(false);
  const selRef = React.useRef([]);
  const dragRef = React.useRef(false);

  // re-shuffle positions when shuffleKey changes
  React.useEffect(() => {
    setOrder((o) => {
      const a = o.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    });
  }, [shuffleKey]);

  const n = letters.length;
  const R = size * (n > 5 ? 0.37 : 0.34);
  const cx = size / 2, cy = size / 2;
  const tile = Math.max(50, Math.min(66, size * 0.205));

  // center of each visual slot
  const centers = order.map((_, idx) => {
    const ang = -Math.PI / 2 + (idx / n) * Math.PI * 2;
    return { x: cx + R * Math.cos(ang), y: cy + R * Math.sin(ang) };
  });

  function localPoint(e) {
    const el = wrapRef.current;
    const r = el.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    const sx = r.width / el.offsetWidth || 1;
    const sy = r.height / el.offsetHeight || 1;
    return { x: (t.clientX - r.left) / sx, y: (t.clientY - r.top) / sy };
  }
  function hitTest(p) {
    let best = -1, bestD = tile * 0.6;
    centers.forEach((c, i) => {
      const d = Math.hypot(c.x - p.x, c.y - p.y);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }

  const wordFrom = (arr) => arr.map((slot) => letters[order[slot]]).join("");

  function begin(e) {
    e.preventDefault();
    const p = localPoint(e);
    dragRef.current = true;
    setDragging(true);
    setPointer(p);
    const hit = hitTest(p);
    selRef.current = hit >= 0 ? [hit] : [];
    setSel(selRef.current.slice());
    onProgress && onProgress(wordFrom(selRef.current));
  }
  function move(e) {
    if (!dragRef.current) return;
    const p = localPoint(e);
    setPointer(p);
    const hit = hitTest(p);
    if (hit < 0) return;
    const cur = selRef.current;
    if (cur.length && hit === cur[cur.length - 2]) {
      selRef.current = cur.slice(0, -1);
      setSel(selRef.current.slice()); onProgress && onProgress(wordFrom(selRef.current));
    } else if (!cur.includes(hit)) {
      selRef.current = [...cur, hit];
      setSel(selRef.current.slice()); onProgress && onProgress(wordFrom(selRef.current));
    }
  }
  function end() {
    if (!dragRef.current) return;
    dragRef.current = false;
    setDragging(false);
    const cur = selRef.current;
    if (cur.length) onWord && onWord(wordFrom(cur), cur.map((s) => order[s]));
    selRef.current = [];
    setSel([]); setPointer(null);
    onProgress && onProgress("");
  }

  // path points for the connector line
  const linePts = sel.map((slot) => centers[slot]);
  const tail = dragging && pointer && linePts.length ? [...linePts, pointer] : linePts;

  return (
    <div
      ref={wrapRef}
      className="wheel"
      style={{ width: size, height: size, position: "relative", touchAction: "none", userSelect: "none", margin: "0 auto" }}
      onMouseDown={begin} onMouseMove={move} onMouseUp={end} onMouseLeave={() => dragging && end()}
      onTouchStart={begin} onTouchMove={move} onTouchEnd={end}
    >
      {/* disc backdrop */}
      <div className="wheel-disc" style={{
        position: "absolute", inset: size * 0.06, borderRadius: "50%",
        background: "var(--disc)", border: "1px solid var(--disc-line)",
        backdropFilter: wheelStyle === "glass" ? "blur(8px)" : "none",
        WebkitBackdropFilter: wheelStyle === "glass" ? "blur(8px)" : "none",
        boxShadow: "var(--shadow-soft)",
      }} />
      {/* connector line */}
      <svg width={size} height={size} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
        {tail.length >= 2 && (
          <polyline
            points={tail.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none" stroke="var(--primary)" strokeOpacity="0.45"
            strokeWidth={tile * 0.28} strokeLinejoin="round" strokeLinecap="round"
          />
        )}
        {linePts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={tile * 0.16} fill="var(--primary)" />
        ))}
      </svg>
      {/* letter tiles */}
      {centers.map((c, slot) => {
        const selected = sel.includes(slot);
        const ch = letters[order[slot]];
        return (
          <div key={slot} className={"tile" + (selected ? " sel" : "")} style={{
            position: "absolute", width: tile, height: tile,
            left: c.x - tile / 2, top: c.y - tile / 2, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-letter)", fontWeight: "var(--letter-weight)",
            fontSize: tile * 0.46, zIndex: 3,
            background: selected ? "var(--primary)" : "var(--tile)",
            color: selected ? "var(--on-primary)" : "var(--tile-ink)",
            boxShadow: selected ? "var(--btn-glow)" : "var(--tile-shadow)",
            border: wheelStyle === "line" ? "2px solid var(--disc-line)" : "none",
            transform: selected ? "scale(1.08)" : "scale(1)",
            transition: "transform .12s ease, background .12s, color .12s, box-shadow .12s",
          }}>{ch}</div>
        );
      })}
    </div>
  );
}
window.LetterWheel = LetterWheel;

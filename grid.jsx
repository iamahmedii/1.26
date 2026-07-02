/* ============================================================
   CrosswordGrid — fills as words are found
   props: layout{rows,cols,words}, found(Set), revealed(Set "r,c"),
          cell(px), flash(word|null)
   exposes window.CrosswordGrid
   ============================================================ */
function CrosswordGrid({ layout, found, revealed, cell = 42, flash, onCellTap, rtl }) {
  const gap = Math.max(4, cell * 0.12);
  const cellMap = new Map();
  layout.words.forEach((w) => {
    const isFound = found.has(w.word);
    w.cells.forEach((c) => {
      const k = c.r + "," + c.c;
      const prev = cellMap.get(k) || { ch: c.ch, shown: false, words: [] };
      prev.words.push(w.word);
      if (isFound) prev.shown = true;
      cellMap.set(k, prev);
    });
  });
  revealed.forEach((k) => { if (cellMap.has(k)) cellMap.get(k).shown = true; });

  const W = layout.cols * cell + (layout.cols - 1) * gap;
  const H = layout.rows * cell + (layout.rows - 1) * gap;

  return (
    <div style={{ position: "relative", width: W, height: H, margin: "0 auto" }}>
      {[...cellMap.entries()].map(([k, v]) => {
        const [r, c] = k.split(",").map(Number);
        const x = (rtl ? (layout.cols - 1 - c) : c) * (cell + gap), y = r * (cell + gap);
        const isFlash = flash && v.words.includes(flash);
        return (
          <div key={k} onClick={v.shown && onCellTap ? () => onCellTap(r, c) : undefined} style={{
            position: "absolute", left: x, top: y, width: cell, height: cell,
            borderRadius: Math.max(6, cell * 0.17),
            background: v.shown ? "var(--grid-fill)" : "var(--grid-empty)",
            border: v.shown ? "1px solid var(--line)" : "1.5px dashed var(--disc-line)",
            boxShadow: v.shown ? "var(--shadow-soft)" : "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: v.shown && onCellTap ? "pointer" : "default",
            transition: "background .25s, box-shadow .25s, border .25s",
          }}>
            {v.shown && (
              <span key={"l" + v.shown} style={{
                fontFamily: "var(--font-letter)", fontWeight: "var(--letter-weight)",
                fontSize: cell * 0.5, color: "var(--grid-ink)", lineHeight: 1,
                animation: isFlash ? "pop .5s ease" : "none",
              }}>{v.ch}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
window.CrosswordGrid = CrosswordGrid;

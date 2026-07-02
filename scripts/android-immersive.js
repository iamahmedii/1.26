/* Enables Android immersive full-screen: hides the status + navigation bars so
   the game fills the entire phone; the bars reappear transiently on a swipe
   (the standard pattern for games). Rewrites MainActivity (default is an empty
   BridgeActivity subclass) after `npx cap add android` regenerates it.
   Non-fatal: never breaks the build. */
const fs = require("fs");
const path = require("path");

function findMainActivity(dir) {
  if (!fs.existsSync(dir)) return null;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { const r = findMainActivity(p); if (r) return r; }
    else if (e.name === "MainActivity.java" || e.name === "MainActivity.kt") return p;
  }
  return null;
}

const base = path.join(__dirname, "..", "android", "app", "src", "main", "java");
const file = findMainActivity(base);
if (!file) { console.warn("MainActivity not found — skipping immersive (non-fatal)."); process.exit(0); }

const src = fs.readFileSync(file, "utf8");
const pkg = (src.match(/package\s+([\w.]+)\s*;?/) || [])[1];
if (!pkg) { console.warn("package not found in MainActivity — skipping (non-fatal)."); process.exit(0); }
if (src.includes("IMMERSIVE_STICKY")) { console.log("Immersive already applied — skipping."); process.exit(0); }
if (file.endsWith(".kt")) { console.warn("Kotlin MainActivity detected — skipping immersive (non-fatal)."); process.exit(0); }

const out =
`package ${pkg};

import android.view.View;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            getWindow().getDecorView().setSystemUiVisibility(
                  View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            );
        }
    }
}
`;
fs.writeFileSync(file, out);
console.log("Immersive full-screen applied to", file);
process.exit(0);

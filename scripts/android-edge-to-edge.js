/* Make the Android system bars blend with the app so it looks full-screen with
   no white/black strip — top stays edge-to-edge (handled at runtime by the
   StatusBar plugin), and the bottom navigation bar is painted the app's cream
   colour so it blends instead of showing a black/white bar.

   Run in CI after `npx cap add android` (android/ is regenerated each build).
   Applied to BOTH the main theme and the launch/splash theme so it's correct
   from the very first frame. Non-fatal: never breaks the build. */
const fs = require("fs");
const path = require("path");

const stylesPath = path.join(
  __dirname, "..", "android", "app", "src", "main", "res", "values", "styles.xml"
);

if (!fs.existsSync(stylesPath)) {
  console.warn("styles.xml not found at", stylesPath, "— skipping edge-to-edge (non-fatal).");
  process.exit(0);
}

let xml = fs.readFileSync(stylesPath, "utf8");

// App background (matches capacitor.config.json backgroundColor / Spark theme).
const CREAM = "#FFFBF3E8";

// ensure the tools namespace exists (needed for tools:targetApi)
if (!xml.includes("xmlns:tools")) {
  xml = xml.replace(/<resources(\s|>)/, '<resources xmlns:tools="http://schemas.android.com/tools"$1');
}

const items =
  '\n        <item name="android:statusBarColor">@android:color/transparent</item>' +
  '\n        <item name="android:navigationBarColor">' + CREAM + '</item>' +
  '\n        <item name="android:windowLightStatusBar">true</item>' +
  '\n        <item name="android:windowLightNavigationBar" tools:targetApi="o_mr1">true</item>' +
  '\n        <item name="android:enforceNavigationBarContrast" tools:targetApi="q">false</item>' +
  '\n        <item name="android:windowLayoutInDisplayCutoutMode" tools:targetApi="p">shortEdges</item>\n    ';

// inject the items just before </style> for a given theme name (idempotent)
function patchTheme(name) {
  const re = new RegExp('(<style\\s+name="' + name.replace(/\./g, "\\.") + '"[^>]*>)([\\s\\S]*?)(</style>)');
  const m = xml.match(re);
  if (!m) return false;
  if (m[2].includes("android:navigationBarColor")) return true; // already patched
  xml = xml.replace(re, (full, open, body, close) => open + body + items + close);
  return true;
}

const main = patchTheme("AppTheme.NoActionBar");
patchTheme("AppTheme.NoActionBarLaunch"); // splash/launch theme, so it's right from frame 1

if (main) {
  fs.writeFileSync(stylesPath, xml);
  console.log("Edge-to-edge: status bar transparent, navigation bar cream — applied.");
} else {
  console.warn("AppTheme.NoActionBar not found — left unchanged (non-fatal).");
}
process.exit(0);

/* Injects the AdMob APPLICATION_ID meta-data into the generated Android
   manifest. Run in CI after `npx cap add android`, because the android/
   folder is regenerated on every build and would otherwise lose this.

   Default is Google's official TEST App ID (safe — shows test ads, no money).
   To ship real ads, set ADMOB_APP_ID in the environment or replace TEST_ID. */
const fs = require("fs");
const path = require("path");

const TEST_ID = "ca-app-pub-3940256099942544~3347511713";
const appId = process.env.ADMOB_APP_ID || TEST_ID;
const manifest = path.join(__dirname, "..", "android", "app", "src", "main", "AndroidManifest.xml");

if (!fs.existsSync(manifest)) {
  console.warn("AndroidManifest not found at", manifest, "— skipping AdMob id (non-fatal).");
  process.exit(0);
}

let xml = fs.readFileSync(manifest, "utf8");
if (xml.includes("com.google.android.gms.ads.APPLICATION_ID")) {
  console.log("AdMob APPLICATION_ID already present — skipping.");
  process.exit(0);
}

const meta =
  '        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="' +
  appId + '"/>\n';
xml = xml.replace(/(<application\b[^>]*>)/, "$1\n" + meta);
fs.writeFileSync(manifest, xml);
console.log("AdMob APPLICATION_ID injected (" + appId + ").");

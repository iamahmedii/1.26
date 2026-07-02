/* Build the production web bundle into www/ (Capacitor's webDir).
   - precompiles the .jsx (text/babel) files to plain JS (removes runtime Babel)
   - swaps React dev builds for the minified production builds
   - copies styles, fonts, icons, native bridge and plain scripts
   Run: npm run build */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/standalone");

const SRC = __dirname;
const OUT = path.join(SRC, "www");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

let html = fs.readFileSync(path.join(SRC, "index.html"), "utf8");

// 1) production React, drop the in-browser Babel transformer
html = html
  .replace("vendor/react.development.js", "vendor/react.production.min.js")
  .replace("vendor/react-dom.development.js", "vendor/react-dom.production.min.js")
  .replace(/\n\s*<script src="vendor\/babel\.min\.js"><\/script>/, "");

// 2) precompile every <script type="text/babel" src="X"> to inline plain JS
let n = 0;
html = html.replace(/<script type="text\/babel" src="([^"]+)"><\/script>/g, function (_, file) {
  const code = fs.readFileSync(path.join(SRC, file), "utf8");
  const out = babel.transform(code, { presets: ["react"], compact: false }).code;
  n++;
  return "<script>\n" + out + "\n</script>";
});

fs.writeFileSync(path.join(OUT, "index.html"), html);

// 3) copy runtime assets (plain scripts stay external)
["styles.css", "native.js", "data.js", "data_ar.js", "defs.js", "defs_ar.js", "i18n.js", "sound.js", "music.mp3", "mascot-bulb.webp", "fonts", "icons"].forEach((rel) =>
  fs.cpSync(path.join(SRC, rel), path.join(OUT, rel), { recursive: true })
);
fs.mkdirSync(path.join(OUT, "vendor"), { recursive: true });
["react.production.min.js", "react-dom.production.min.js"].forEach((v) =>
  fs.copyFileSync(path.join(SRC, "vendor", v), path.join(OUT, "vendor", v))
);

console.log(`Built www/ ✓  (precompiled ${n} jsx files, production React)`);

# Words by Cork — Release Guide (iOS + Android via Capacitor)

This repo is the **web game** plus a **Capacitor** wrapper so it can ship to the
Apple App Store and Google Play from one codebase.

```
index.html        # the game (editable source; uses in-browser Babel for fast iteration)
levels.js         # 300 level pack  → window.GLADE_LEVELS
native.js         # native bridge (Capacitor plugins on device, web fallbacks in a browser)
fonts/ icons/     # Hanken Grotesk + JetBrains Mono, app icon, splash wordmark
build.js          # produces www/ (precompiled JSX + production React)  ← Capacitor's webDir
assets/           # source icon + splash for `npx @capacitor/assets generate`
privacy.html      # hostable privacy policy (App Store / Play require a public URL)
capacitor.config.json, package.json
```

## What runs where
- **Web / Android build:** can be done on Linux, macOS, or Windows.
- **iOS build & submission:** **requires macOS + Xcode** — this is an Apple rule, not a
  Capacitor limitation. There is no way around needing a Mac for the iOS binary.

## 0. Preview the game in a browser
```bash
python3 -m http.server 8000      # then open http://localhost:8000
# add ?fullscreen=1 to preview the real edge-to-edge device layout (no mock frame)
```

## 1. One-time setup
```bash
npm install
npm run build                    # generates www/
npx cap add ios                  # macOS only
npx cap add android
npm run assets                   # generate every icon/splash size from assets/
npx cap sync
```

## 2. Each time you change the game
```bash
npm run sync                     # build.js → www/, then `cap sync`
```

## 3. Android (buildable on this machine)
```bash
npm run open:android             # opens Android Studio → Run on a device/emulator
# release: Build > Generate Signed Bundle (.aab) for Google Play
```

## 4. iOS (on a Mac)
```bash
npm run open:ios                 # opens Xcode
# set your Team / signing, then Product > Archive > Distribute to App Store
```

## 5. Store submission checklist
- [ ] **Apple Developer Program** ($99/yr) and/or **Google Play Console** ($25 once)
- [ ] App name: **Words by Cork**, subtitle “A daily word game”, category **Games › Word**
- [ ] Screenshots (use `?fullscreen=1` in a browser at each required device size, or a simulator)
- [ ] **Privacy policy URL** → host `privacy.html` (e.g. GitHub Pages) and paste the URL
- [ ] App Privacy / Data Safety form → **“No data collected”**
- [ ] Age rating questionnaire (all No → 4+)
- [ ] Export compliance → “uses standard encryption only” (HTTPS) → exempt
- [ ] Bundle id `com.corkword.app` (change in `capacitor.config.json` if you own another)

## Native features already wired (via `native.js`)
- **Haptics** → `@capacitor/haptics` (web `vibrate` does nothing on iOS).
- **Daily reminder** → `@capacitor/local-notifications` (real repeating 8am schedule).
- **Splash + status bar** → `@capacitor/splash-screen` / `@capacitor/status-bar`, ink themed.
- Sound & ambient music use Web Audio and work inside the WebView.

## Notes
- The game stores progress in `localStorage` — persistent inside the app, no backend.
- Coins are earned in-game only. If you ever add purchasable coins you must add **StoreKit /
  Play Billing** (a Capacitor IAP plugin) before submitting, per store rules.
- Layout currently letterboxes a tuned 402×874 canvas (looks identical on every phone). A
  later fully-fluid pass is optional polish, not required to ship.

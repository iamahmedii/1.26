# Words by Cork — Project Status & Plan
_A living project-management document. Last updated: 2026-06-11_

---

## 1. Summary
**Words by Cork** is a calm daily word game (find words from a letter wheel into a crossword grid).
It is built as a **web app wrapped with Capacitor** so it ships to **iOS (App Store)** and
**Android (Google Play)** from one codebase. The app runs **100% offline** — no servers, no
backend, no hosting to maintain.

- **Platforms:** iOS + Android (one codebase)
- **Tech:** HTML/CSS/React (UMD) → precompiled → Capacitor native shell
- **Brand:** "Words by Cork", Spark (orange) palette, book mascot, orange-dot app icon
- **Monetization:** in-app coin packs (IAP) + receipt validation (wired, not yet live)
- **Status:** Feature-complete design + functionality in preview; **ready for APK build & QA**

---

## 2. Status at a glance ✅
| Area | State |
|---|---|
| Core gameplay (wheel, grid, bonus words) | ✅ Working |
| 300 levels, common words, easy→hard | ✅ Done |
| Hint / Reveal (charge + complete level) | ✅ Fixed & tested |
| Home / Onboarding (with name capture) | ✅ Working |
| Profile (name, avatar, join date, achievements) | ✅ Working |
| Settings (sound/music/haptics/reminder, palette, panels, reset/restore) | ✅ Working |
| Leaderboard (personalized, Today/Weekly/Monthly) | ✅ Working (simulated cohort) |
| Sound + music + haptics engine | ✅ Working |
| Win-screen Share + achievement toasts | ✅ Working |
| Full-screen fluid layout (fits phones, safe areas) | ✅ Fixed |
| Native bridge (haptics, notifications, splash, status bar, IAP, share) | ✅ Wired |
| Production build pipeline (local fonts, prod React, www/) | ✅ Working |
| App icon + splash (orange dot) | ✅ Generated |
| GitHub Actions → Android APK | ✅ Workflow included |
| **Real IAP purchases (store products + plugin + validator deploy)** | ⏳ Not yet |
| **APK built & tested on device** | ⏳ Pending your push |
| **iOS build (needs a Mac)** | ⏳ Pending |
| **Store listings / accounts** | ⏳ Pending |

---

## 3. What we've done (milestone log)
1. **Brand applied** — initial dark-ink "Cork Word" guide implemented (later superseded).
2. **Settings v1** — functional toggles, info panels, palette switch.
3. **Productionization** — vendored fonts, removed in-browser Babel, minified React, build pipeline.
4. **Capacitor packaging** — native bridge, config, GitHub Actions Android build, privacy policy page.
5. **Coin store foundation** — IAP bridge (with dev simulation), serverless receipt-validator template.
6. **Design switch → "Words by Cork"** — new light/mascot design adopted; verified all screens.
7. **Profile built** — editable name, avatar picker, real join date, achievements.
8. **Settings built (new design)** — real audio engine, palette picker, info panels, reset/restore.
9. **Gameplay SFX** — letter/word/bonus/invalid/hint/win sounds wired.
10. **Leaderboard + polish** — personalized ranking with periods, onboarding name, win Share, achievement toasts.
11. **Consolidation → store-ready build** — merged design into Capacitor bundle (local fonts, native, IAP, icon/splash, build).
12. **Bug-fix pass** — 300 common-word levels, hint/reveal completion fixes, fluid layout, input-zoom fix.

---

## 4. Architecture & key files
```
index.html            production shell (local @font-face, splash, script order)
app.jsx               root: routing, state, persistence, native wiring, full-screen
screens.jsx           Home, LevelMap, Complete, Settings, Shop
screens2.jsx          Onboarding, Leaderboard, Profile, BottomNav, achievements helper
game.jsx / grid.jsx / wheel.jsx   the playable puzzle
mascot.jsx            book mascot + decorative field
data.js               300 levels + crossword generator
sound.js              Web-Audio sound/music/haptics engine
native.js             Capacitor bridge (haptics, notifications, splash, status bar, IAP, share)
build.js              precompiles JSX → www/ with production React
capacitor.config.json / package.json
server/validate-receipt.js   serverless IAP receipt validator (template)
.github/workflows/android-debug.yml   builds the Android APK
```
- **Save data:** `localStorage` (`glade_save_v1`) — progress, coins, streak, settings, profile, achievements.
- **No backend.** Offline by design.

---

## 5. Decisions log
- **Capacitor over Flutter** — reuse the finished web app; iOS needs a Mac either way.
- **Letterbox → fluid layout** — switched to real safe-area insets so it fits all phones.
- **Name "Words by Cork"**, **orange-dot icon**, **Spark default palette**.
- **Leaderboard is a simulated cohort** (no backend) — real online ranking would need a server / Game Center.
- **IAP client + serverless validation** — chosen for anti-fraud without running a full backend.

---

## 6. Open items / backlog (prioritized)
**P0 — before release**
- [ ] Push repo → build **Android APK** → test on a real device (you).
- [ ] **iOS build** on a Mac (Xcode) → TestFlight.
- [ ] Make **IAP real**: create coin products in App Store Connect + Play Console (ids
      `com.corkword.coins.150/500/1200/3000`), add a billing plugin, deploy the validator,
      set `VALIDATE_URL` in `native.js`.
- [ ] Developer accounts: **Apple ($99/yr)**, **Google Play ($25 once)**; host `privacy.html`.

**P1 — polish**
- [ ] Background decorative vectors — art pass to match the reference mockup.
- [ ] QA pass across screen sizes (small phones, tablets).
- [ ] Replace placeholder leaderboard avatars/names if desired.

**P2 — later / optional**
- [ ] Rewarded ads / remove-ads (AdMob).
- [ ] Real online leaderboards + achievements sync (needs backend/Game Center).
- [ ] More level packs / themed categories.
- [ ] Cloud-saved progress / accounts.

---

## 7. Path to release
1. **Android first (no Mac needed):** push repo to GitHub → Actions builds APK → sideload & QA.
2. **Make IAP real** (accounts + products + plugin + validator).
3. **iOS:** on a Mac, `npx cap add ios` → Xcode → Archive → TestFlight → App Store.
4. **Store listings:** screenshots, descriptions, privacy URL, age rating, then submit.

---

## 8. Cost summary
| Item | Cost |
|---|---|
| App hosting / servers | $0 (offline app; stores host the binary) |
| Receipt-validation backend | ~$0–30/mo (serverless; only on purchases) |
| Apple Developer | $99 / year |
| Google Play | $25 one-time |
| Store commission on coin sales | 15% (<$1M/yr) → 30% above |

---

## 9. How to run / build / test
- **Preview the app:** unzip the DEMO → double-click `index.html` (offline, full-screen).
- **Build web bundle:** `npm install && npm run build` → outputs `www/`.
- **Android APK:** push to GitHub → **Actions ▸ Android debug APK** → download artifact.
- **iOS (Mac):** `npm run build && npx cap add ios && npx cap open ios`.
- **Reset a test device:** Settings ▸ Reset progress (or clear app data).

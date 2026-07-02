# Words by Cork — Project Brief

*Prepared for management · 15 June 2026 · non-technical summary*

---

## 1. What the product is
**Words by Cork** is a calm, daily word puzzle game for phones (iPhone and Android).
Players swipe letters to form words and fill a crossword-style grid. It works
**fully offline**, in **English and Arabic**, and is designed to be relaxing rather
than stressful.

## 2. Where we are today
| Area | Status |
|---|---|
| Game design & look | ✅ Done — final "Spark" brand, 7 colour themes |
| Core gameplay | ✅ Done — 5,000 English levels + daily puzzle |
| Arabic version | ✅ Playable — 62 fully-offline levels (see §4) |
| Dictionary (tap a word to learn it) | ✅ Done — English + Arabic, with pronunciation |
| Sound, music & vibration | ✅ Done — relaxing background music, effects, haptics |
| Settings & Profile | ✅ Done — toggles, language switch, avatar, achievements |
| Leaderboard | ✅ Done |
| Coin store (in-app purchases) | ✅ Built and testable; needs store accounts to go live |
| Android test build (APK) | ✅ Builds automatically on GitHub |
| iPhone build | ⏳ Needs a Mac to compile and submit (see §6) |

## 3. What's inside the game (the "content")
- **5,000 English levels** built from common, everyday words.
- **English dictionary: 6,321 words.** Tap any finished word to see its meaning,
  part of speech, an example, and hear it read aloud. Source is an open, reputable
  word dictionary (no licensing cost).
- **Arabic: 62 levels + a 462-word Arabic dictionary**, every word with a simple
  Arabic meaning that works without internet, plus pronunciation.
- **Sound pack:** gentle effects for every action, a relaxing background music
  loop, and phone vibration feedback — all switchable in Settings.
- **Fonts & artwork** are bundled in the app, so it looks and works the same on
  every phone with no internet needed.

## 4. The one honest trade-off to know about
The Arabic version currently has **62 levels vs. 5,000 in English.** This is
deliberate: we chose **"fully offline and correct"** over "large but unreliable."
Every Arabic word has a hand-checked meaning that works with no internet. Growing
Arabic means writing more meanings by hand — roughly **every ~200 new words adds a
few dozen levels.** This is a content task we can schedule, not a technical blocker.

## 5. Money / running costs (plain numbers)
- The game runs **on the phone**, so there is **no server cost** just to play.
- A small server is only needed to **verify coin purchases**. Estimated at scale
  (around 1 million users): low — on the order of a **few hundred dollars/month**,
  and only once we're selling coins.
- **One-time/annual store fees:** Apple Developer **$99/year**, Google Play
  **$25 one-time**. Stores take ~15–30% of purchases.

## 6. What's left before launch
1. **Apple build:** requires a Mac (we're on Windows). Options: borrow/rent a Mac,
   use a cloud Mac service, or a short contractor task. ~1–2 days of work.
2. **Store accounts & listings:** create the coin products, screenshots, app
   description, privacy policy (privacy page already drafted).
3. **Final testing** on a range of real phones.
4. **(Optional) expand Arabic** levels as a content workstream.

## 7. How the Android test build is produced
The code lives in a private GitHub repository. GitHub automatically compiles the
Android app and produces an installable test file (APK) every time we update the
code — no manual build machine required.

---

## Appendix — File structure (what each part is)

```
words-by-cork/
├─ index.html              The app's starting page (loads everything)
├─ app.jsx                 Main app: screens, navigation, saving progress
├─ game.jsx                The puzzle gameplay (grid, swiping, hints, dictionary popup)
├─ screens.jsx             Home, Level Map, Settings, Finish screen, Coin Shop
├─ screens2.jsx            Onboarding, Leaderboard, Profile, bottom menu bar
├─ grid.jsx / wheel.jsx    The crossword grid and the letter wheel
├─ mascot.jsx              The book character and background decorations
│
│  ── CONTENT (the words & meanings) ──
├─ data.js                 5,000 English levels
├─ data_ar.js             62 Arabic levels
├─ defs.js                 English dictionary (6,321 words, meanings + examples)
├─ defs_ar.js             Arabic dictionary (462 words, meanings)
├─ i18n.js                 All on-screen text in English and Arabic
│
│  ── LOOK, SOUND & DEVICE ──
├─ styles.css              Colours, themes, layout
├─ sound.js                Music, sound effects and vibration
├─ native.js               Phone features: vibration, pronunciation, purchases, notifications
├─ fonts/  icons/          Bundled fonts and app icons (work offline)
│
│  ── BUILD & STORE SETUP ──
├─ capacitor.config.json   Settings that wrap the web app into a real phone app
├─ build.js                Prepares the optimised version for release
├─ package.json            List of building blocks the project uses
├─ server/                 Small purchase-verification helper (for the coin store)
├─ privacy.html            Privacy policy page (needed by the app stores)
└─ .github/workflows/      The recipe GitHub uses to auto-build the Android APK
```

*Note: this is the source code structure. Players never see these files — the build
step packages them into a single app for the App Store and Google Play.*

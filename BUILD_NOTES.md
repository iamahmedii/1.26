# Words by Cork — Latest Build Contents
_Build: 2026-06-14 · "Words by Cork" v1.0 (store-ready)_

## What's included in this build
**Content**
- **5,000 levels** — generated from real word-frequency data, ordered easy→hard.
- **Offline dictionary — 100% coverage** of every answer + bonus word (6,419 words).
  Tap any finished word → part of speech + meaning + example (works with no internet).

**Gameplay**
- Letter-wheel → crossword, bonus words, coins.
- **Hint / Reveal fixed:** they now complete words/levels and only charge when there's
  actually something to reveal.
- Sound effects, ambient music, haptics (toggleable).
- Tap-a-word dictionary in-game and a "tap to learn" recap on the win screen.

**Screens**
- Onboarding (with name capture), Home, Game, Win, Journey map (virtualized for 5,000 levels),
  Profile (name/avatar/join date/achievements), Settings (toggles, palette, info panels,
  reset/restore), Leaderboard (personalized, Today/Weekly/Monthly), Coin shop (IAP-ready).

**Brand & platform**
- "Words by Cork", Spark palette, book mascot, **orange-dot icon**, splash.
- Fonts vendored locally (Plus Jakarta Sans + Baloo 2) — fully offline.
- Capacitor native bridge: haptics, local notifications, splash, status bar, IAP, share.
- Production build pipeline (precompiled JSX, minified React) → `www/`.
- GitHub Actions workflow builds the Android APK.

## Word errors — status
- ✅ **Hint reveals nothing / still charged** — fixed (skips already-shown cells; free if nothing to reveal).
- ✅ **Reveal charged but did nothing / didn't advance** — fixed (reveals the word, auto-completes, goes to next level).
- ✅ **Finishing via hint didn't advance** — fixed (hints now complete words and the level).
- ✅ **Obscure words** — answers/bonus are now drawn only from common, dictionary-backed words;
  bonus is capped to **everyday words** and the dictionary shows the **most common sense first**
  (e.g. RUN = the verb "move fast", not the baseball noun).

## Which dictionary?
- **Princeton WordNet** (via NLTK) — provides the part of speech, definition, and example sentence.
- **Word selection & frequency** uses the **`wordfreq`** library so only common words appear and
  levels are ordered by difficulty.
- Definitions are **bundled in the app** (`defs.js`, ~700KB) so the dictionary works **offline**.
- License note: WordNet is free to use (Princeton WordNet license); fine for commercial apps.

## File sizes
- `data.js` (5,000 levels): ~626 KB
- `defs.js` (6,419 definitions): ~700 KB
- Fonts: ~465 KB · everything else small. All offline.

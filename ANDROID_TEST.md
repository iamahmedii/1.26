# Testing Words by Cork on Android (from a Windows PC)

This container can't build the APK (its network blocks Google's Android servers), so use
one of these instead. **Option A** gives you a real installable app with the least setup.

---

## Option A — Get an installable APK from GitHub Actions (recommended)
No Android Studio, no JDK, nothing to install on Windows. GitHub's servers build it.

1. Create a free GitHub repo and push this project to it (GitHub Desktop, or the web
   "upload files" button works). The included workflow is at
   `.github/workflows/android-debug.yml`.
2. On GitHub open the **Actions** tab → run **"Android debug APK"** (it also runs on every
   push). Wait ~3–5 min.
3. Open the finished run → **Artifacts** → download **cork-word-debug-apk** → unzip to get
   `app-debug.apk`.
4. Put the APK on your phone (USB, Google Drive, email to yourself…). Tap it, allow
   **"Install unknown apps"** for that source, install, play.

> Debug APKs are unsigned for the store — perfect for testing, not for publishing.

---

## Option B — Play it on your phone *right now* in the browser (instant, no build)
The web build is identical to what runs inside the Android app.

On your Windows PC, in the project folder:
```
py -m http.server 8000        # or:  npx serve www
```
Find your PC's LAN IP (`ipconfig` → IPv4, e.g. 192.168.1.20). On your Android phone (same
Wi‑Fi), open:
```
http://192.168.1.20:8000/?fullscreen=1
```
`?fullscreen=1` shows the real edge‑to‑edge layout. Add it to your home screen for an
app‑like feel. This tests all gameplay, sound, and the daily‑reminder permission prompt.

---

## Option C — Build locally on Windows (full control)
1. Install **Android Studio** (bundles JDK + Android SDK + Gradle).
2. In the project: `npm install` → `npm run build` → `npx cap add android` → `npx cap sync`.
3. `npx cap open android` → press **Run** with a phone plugged in (USB debugging on) or an
   emulator. For a shareable file: **Build ▸ Build APK(s)**.

---

### Notes
- App id is `com.corkword.app` (change in `capacitor.config.json` if needed).
- Haptics, the scheduled daily reminder, splash and status bar are live in the native build
  (Options A/C). In the browser (Option B) they fall back to web behavior.

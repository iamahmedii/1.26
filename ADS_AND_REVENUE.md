# Ads & Revenue — A to Z (Words by Cork)

*How ads work, how they make money, where to register, and exactly how they're
built into this game. Written for a non-technical reader; the "In this game"
boxes are the specifics.*

---

## 1. The big picture — how ads make money
You don't get paid per "download." You get paid when players **see** (and
sometimes **interact with**) ads inside the game. An ad network fills your ad
slots with ads from companies, those companies pay the network, and the network
pays you (minus its cut).

Three numbers decide your income:
- **Impressions** — how many ads are shown (more active players = more ads).
- **eCPM** — earnings per **1,000** ad views. Depends on ad type and the
  player's country (USA/Gulf/Europe pay far more than low-income regions).
- **Fill rate** — % of ad requests that actually get an ad (usually 90%+).

**Formula:** `Revenue ≈ (Impressions ÷ 1000) × eCPM`.

---

## 2. The ad network we use: Google AdMob
**AdMob** is Google's ad network for apps — the biggest, easiest, and it pays
reliably. It's **free** to join. It works on both Android and iPhone with the
same account.

> **In this game:** the app is already wired for **AdMob**. Nothing else to
> choose — you just create the account and paste in your IDs (Section 7).

---

## 3. The ad types in this game (and where they appear)
| Type | What the player sees | Where in the game | Earnings |
|---|---|---|---|
| **Rewarded video** | Chooses to watch a ~20–30s video for a reward | The Coins screen: **"📺 Watch a short ad → +75 coins"** | **Highest** (~$8–20 per 1,000 in US/Gulf) |
| **Interstitial** | A full-screen ad between actions | **Every ~4 levels** completed | Medium (~$3–10 per 1,000) |
| ~~Banner~~ | Small strip always on screen | **Not used** (kept the calm look) | Low |

> **In this game:** Rewarded is the main earner because it's tied to the coin
> economy — players who never pay still make you money by watching for coins.
> The interstitial is spaced out (every 4th level, never on the first levels) so
> it earns without annoying people.

---

## 4. How much revenue (realistic ranges)
Casual word games typically earn **$0.02–0.10 per active player per day** from
ads (this blended number is called **ARPDAU**). It scales with daily players:

| Daily active players | At ~$0.04/player/day | Per month (approx) |
|---|---|---|
| 500 | $20/day | ~$600 |
| 5,000 | $200/day | ~$6,000 |
| 50,000 | $2,000/day | ~$60,000 |

⚠️ **Be realistic:** early on you'll have few daily players, so ad income starts
small and grows with your user base. Gulf/US/EU players earn multiples of
players from low-income regions. Treat these as ballpark, not a promise.

---

## 5. Where to register — AdMob, step by step (A→Z)
Do this with your **company Google account**.

1. Go to **admob.google.com** → **Sign up**.
2. Pick your country, accept the AdMob terms.
3. Fill **Payments info**: company **name, address**, and **tax info** (must
   match your business). This is also where Google later sends your money.
4. In the AdMob dashboard → **Apps → Add app**.
   - If the app is already on Google Play, link it. If not yet, choose
     **"No, it's not listed yet"** and add it manually (you can link it later).
5. Open your app → **Ad units → Add ad unit**. Create **two**:
   - **Rewarded** → name it e.g. "Coins Rewarded" → **copy its Ad unit ID**.
   - **Interstitial** → name it e.g. "Level Interstitial" → **copy its ID**.
6. From **App settings**, copy your **AdMob App ID** (looks like
   `ca-app-pub-XXXXXXXX~XXXXXXXX`).
7. **Add a payment method** (bank account) under Payments → "How you get paid".

> **You now have 3 things to give me:** the **App ID**, the **Rewarded ad unit
> ID**, and the **Interstitial ad unit ID**.

---

## 6. Getting paid — the money side
- **Threshold:** AdMob pays once your balance reaches **$100** (the minimum). If
  you earn less in a month, it rolls over until you cross $100.
- **Schedule:** paid **monthly** (around the 21st), for the previous month's
  earnings, into your bank account.
- **Verification:** Google requires your **address to be verified** (they mail a
  PIN once you hit ~$10 earned) before your first payment.
- **Tax:** you fill a tax form in AdMob; Google withholds per your country's
  rules.

---

## 7. How it's wired in THIS game (technical — for me or any dev)
Everything's already coded; switching from **test ads** to **real ads** is just
pasting your IDs.

**A) Ad unit IDs** → `native.js`, top of the file, the `ADMOB` block:
```
var ADMOB = {
  rewardedAndroid: "",  interstitialAndroid: "",   // paste your real IDs here
  rewardedIos: "",      interstitialIos: ""
};
```
Leave blank = Google **test ads** (safe). Paste real IDs = real ads.

**B) AdMob App ID** → `scripts/inject-admob.js` (the value `ADMOB_APP_ID`), or
set the `ADMOB_APP_ID` env in the GitHub build. This gets written into the
Android manifest automatically on every build.

**C) Where the calls live:**
- Rewarded: `Native.ads.rewarded()` → Coins screen button → credits 75 coins on
  completion.
- Interstitial: `Native.ads.interstitial()` → fired every 4th level in
  `app.jsx`.
- Initialized once on launch via `Native.ads.init()`.

**D) Current state:** running on **Google test ad units**, so ads work in the
APK right now with **no risk** and no account needed — perfect for testing.

> ⚠️ **Never tap your own *real* ads** (even once) — Google can ban the account
> for "invalid traffic." Always test with the **test ads** that are in there now.

---

## 8. Before you flip on real ads — go-live checklist
1. ✅ AdMob account created + **payment/tax/address** filled.
2. ✅ Created the **Rewarded** + **Interstitial** ad units → sent me the 3 IDs.
3. ✅ I paste the IDs + App ID and rebuild → real ads live.
4. ✅ In **Play Console**, declare ads: **Data safety** + **Content rating**
   say the app **contains ads** (required).
5. ✅ **app-ads.txt** (recommended): a tiny text file on your website's domain
   that proves you own the app — boosts ad rates and prevents fraud. AdMob shows
   you the exact line to publish; I can set the file up.
6. ✅ Keep using **test ads** in all your own testing forever.

---

## 9. One-paragraph summary for your manager
> The game uses **Google AdMob**. Players can **watch a short video to earn coins**
> (our main ad income), and a **full-screen ad shows every few levels**. We get
> paid per ad viewed; income scales with the number of daily players (roughly
> **$0.02–0.10 per player per day**), paid monthly into the company bank account
> once we pass **$100**. The app is **already built** for this — going live just
> needs an AdMob account and pasting three IDs. We currently run Google's safe
> **test ads** so we can verify everything before earning real money.

---

### What I need from you to make ads real
1. Create the AdMob account (Section 5).
2. Send me: **App ID**, **Rewarded ad unit ID**, **Interstitial ad unit ID**.
3. I paste them, rebuild, and (optionally) set up **app-ads.txt**. Done.

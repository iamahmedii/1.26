/* ============================================================
   Cork Word — native bridge
   Uses Capacitor plugins when running inside the native shell,
   and falls back to web APIs (or no-ops) in a plain browser.
   Exposes window.Native.
   ============================================================ */
(function () {
  var Cap = window.Capacitor;
  var isNative = !!(Cap && Cap.isNativePlatform && Cap.isNativePlatform());
  function plugin(name) { return (Cap && Cap.Plugins && Cap.Plugins[name]) || null; }

  var Haptics = plugin("Haptics");
  var LocalNotifications = plugin("LocalNotifications");
  var SplashScreen = plugin("SplashScreen");
  var StatusBar = plugin("StatusBar");

  var REMINDER_ID = 1001;

  // ---- In-app purchase config ----
  // Product ids must match what you create in App Store Connect / Play Console.
  var IAP = [
    { id: "com.corkword.coins.500",   coins: 500,   price: "$0.99" },
    { id: "com.corkword.coins.1800",  coins: 1800,  price: "$2.99" },
    { id: "com.corkword.coins.3500",  coins: 3500,  price: "$4.99" },
    { id: "com.corkword.coins.8000",  coins: 8000,  price: "$9.99" },
    { id: "com.corkword.coins.18000", coins: 18000, price: "$19.99" }
  ];
  // Set this to your deployed receipt-validator URL to enforce server-side validation.
  var VALIDATE_URL = "";
  // In-app purchases use cordova-plugin-purchase, which exposes a global
  // window.CdvPurchase (not a Capacitor plugin). The integration below activates
  // automatically when that global is present. To ship real purchases, add the
  // dependency back ("cordova-plugin-purchase" in package.json) once your store
  // products are created — no code change needed. Until then packs are inert on
  // device (and simulated only in a browser for testing). See Native.iap below.

  // ---- Ads (AdMob) config ----
  // Leave these blank to use Google's official TEST ad units (safe, no real money).
  // Before publishing, paste your real AdMob ad-unit IDs here AND set your real
  // AdMob App ID in the GitHub workflow (android-debug.yml → "Add AdMob App ID").
  var ADMOB = {
    rewardedAndroid: "",  interstitialAndroid: "",
    rewardedIos: "",      interstitialIos: ""
  };
  var AD_TEST = {
    rewarded: "ca-app-pub-3940256099942544/5224354917",
    interstitial: "ca-app-pub-3940256099942544/1033173712"
  };
  function adUnit(kind) {
    var ios = (Cap && Cap.getPlatform && Cap.getPlatform()) === "ios";
    if (kind === "rewarded") return (ios ? ADMOB.rewardedIos : ADMOB.rewardedAndroid) || AD_TEST.rewarded;
    return (ios ? ADMOB.interstitialIos : ADMOB.interstitialAndroid) || AD_TEST.interstitial;
  }

  var Native = {
    isNative: isNative,

    // Map a web-style vibrate pattern to a native impact strength.
    haptic: function (pattern) {
      if (Haptics && Haptics.impact) {
        try {
          var dur = Array.isArray(pattern) ? pattern.reduce(function (a, b) { return a + b; }, 0) : pattern;
          var style = dur >= 60 ? "HEAVY" : (dur >= 20 ? "MEDIUM" : "LIGHT");
          Haptics.impact({ style: style });
        } catch (e) {}
        return;
      }
      if (navigator.vibrate) { try { navigator.vibrate(pattern); } catch (e) {} }
    },

    // Schedule a repeating local notification each morning. Returns Promise<bool granted>.
    enableDailyReminder: function (hour) {
      hour = hour || 8;
      if (LocalNotifications) {
        return Promise.resolve()
          .then(function () { return LocalNotifications.requestPermissions(); })
          .then(function (perm) {
            if (!perm || perm.display !== "granted") return false;
            return LocalNotifications.schedule({
              notifications: [{
                id: REMINDER_ID,
                title: "Cork Word",
                body: "A fresh puzzle is waiting — keep your streak alive.",
                schedule: { on: { hour: hour, minute: 0 }, repeats: true, allowWhileIdle: true }
              }]
            }).then(function () { return true; });
          })
          .catch(function () { return false; });
      }
      // Web fallback: best-effort permission prompt (no real scheduling in a browser).
      if (typeof Notification !== "undefined") {
        return Promise.resolve(Notification.requestPermission()).then(function (p) {
          if (p !== "granted") return false;
          try { new Notification("Cork Word", { body: "Daily reminder on." }); } catch (e) {}
          return true;
        }).catch(function () { return false; });
      }
      return Promise.resolve(true);
    },

    disableDailyReminder: function () {
      if (LocalNotifications) {
        try { return LocalNotifications.cancel({ notifications: [{ id: REMINDER_ID }] }); } catch (e) {}
      }
      return Promise.resolve();
    },

    hideSplash: function () {
      if (SplashScreen && SplashScreen.hide) { try { SplashScreen.hide(); } catch (e) {} }
    },

    // darkUI=true → light text on a dark bar. bg is Android-only.
    // We always overlay the WebView so the app draws edge-to-edge under the
    // status bar; the CSS safe-area padding keeps content clear of the notch.
    setStatusBar: function (darkUI, bg) {
      if (!StatusBar) return;
      try { StatusBar.setOverlaysWebView && StatusBar.setOverlaysWebView({ overlay: true }); } catch (e) {}
      try { StatusBar.setStyle({ style: darkUI ? "DARK" : "LIGHT" }); } catch (e) {}
      // Transparent bar lets the app background show through, top to bottom.
      if (StatusBar.setBackgroundColor) { try { StatusBar.setBackgroundColor({ color: "#00000000" }); } catch (e) {} }
    },

    // Native share sheet (falls back to the Web Share API, then a no-op).
    share: function (text, url) {
      var Share = plugin("Share");
      if (Share && Share.share) { try { return Share.share({ text: text, url: url, dialogTitle: "Cork Word" }); } catch (e) {} }
      if (navigator.share) { try { return navigator.share({ text: text, url: url }); } catch (e) {} }
      return Promise.resolve(false);
    },

    // Speak a word with the device's native TTS engine (Web Speech is unreliable in Android WebView).
    speak: function (text, lang) {
      var t = String(text); lang = lang || "en-US"; var l = lang.slice(0, 2);
      function audio() { try { var a = new Audio("https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=" + encodeURIComponent(l) + "&q=" + encodeURIComponent(t)); a.play().catch(function () {}); } catch (e) {} }
      var TTS = plugin("TextToSpeech");
      if (TTS && TTS.speak) {
        try {
          var p = TTS.speak({ text: t, lang: lang, rate: 1.0, pitch: 1.0, volume: 1.0, category: "ambient" });
          if (p && p.then) p.then(function () {}, function () { audio(); });  // no native voice → online audio
          return p;
        } catch (e) { audio(); return Promise.resolve(); }
      }
      try {
        if (window.speechSynthesis) {
          var voices = window.speechSynthesis.getVoices() || [];
          var has = voices.some(function (v) { return (v.lang || "").toLowerCase().indexOf(l) === 0; });
          if (has) {
            window.speechSynthesis.cancel();
            var u = new SpeechSynthesisUtterance(t); u.lang = lang; u.rate = 0.9;
            window.speechSynthesis.speak(u);
            return Promise.resolve();
          }
        }
      } catch (e) {}
      audio();  // no local voice for this language → online audio fallback
      return Promise.resolve();
    },

    // ---- Rewarded + interstitial ads (AdMob) ----
    ads: {
      ready: false,
      init: function () {
        var Ad = plugin("AdMob");
        if (!Ad) { this.ready = !isNative; return Promise.resolve(); } // browser/dev: pretend available
        var self = this;
        return Ad.initialize({ initializeForTesting: !(ADMOB.rewardedAndroid || ADMOB.rewardedIos) })
          .then(function () { self.ready = true; })
          .catch(function () {});
      },
      // Resolves true only if the player earned the reward (watched enough).
      rewarded: function () {
        var Ad = plugin("AdMob");
        if (!Ad) { return new Promise(function (res) { setTimeout(function () { res(true); }, 600); }); } // dev sim
        var earned = false, sub = null;
        return Ad.prepareRewardVideoAd({ adId: adUnit("rewarded") })
          .then(function () {
            try { sub = Ad.addListener("onRewarded", function () { earned = true; }); } catch (e) {}
            return Ad.showRewardVideoAd();
          })
          .then(function (r) { if (r && (r.amount != null || r.type)) earned = true; return earned; })
          .catch(function () { return false; })
          .then(function (v) { try { if (sub && sub.remove) sub.remove(); } catch (e) {} return v; });
      },
      interstitial: function () {
        var Ad = plugin("AdMob");
        if (!Ad) return Promise.resolve();
        return Ad.prepareInterstitial({ adId: adUnit("interstitial") })
          .then(function () { return Ad.showInterstitial(); })
          .catch(function () {});
      }
    },

    // ---- In-app purchases (cordova-plugin-purchase exposes window.CdvPurchase) ----
    iap: {
      products: IAP.slice(),
      ready: false,
      _granted: null,   // app registers a (productId, coins) handler that credits coins

      onGrant: function (fn) { this._granted = fn; },
      _coinsFor: function (id) { for (var i = 0; i < IAP.length; i++) if (IAP[i].id === id) return IAP[i].coins; return 0; },
      _grant: function (id) { var c = this._coinsFor(id); if (this._granted && c) this._granted(id, c); },

      // Set up the store once on app start. Safe no-op in a browser (dev simulates instead).
      init: function () {
        var CP = window.CdvPurchase; var self = this;
        if (!CP || !CP.store) { this.ready = !isNative; return Promise.resolve(); }
        var plat = (Cap && Cap.getPlatform && Cap.getPlatform() === "ios")
          ? CP.Platform.APPLE_APPSTORE : CP.Platform.GOOGLE_PLAY;
        try {
          CP.store.register(IAP.map(function (p) {
            return { id: p.id, type: CP.ProductType.CONSUMABLE, platform: plat };
          }));
          // Deliver coins, then finish (consume) so the pack can be bought again.
          CP.store.when().approved(function (t) {
            (t.products || []).forEach(function (pr) { self._grant(pr.id || pr.productId); });
            t.finish();
          });
          CP.store.error(function () {});
          return CP.store.initialize([plat]).then(function () { self.ready = true; }).catch(function () {});
        } catch (e) { return Promise.resolve(); }
      },

      // Catalog with live store prices when available, else our defaults.
      getProducts: function () {
        var CP = window.CdvPurchase;
        if (CP && CP.store) {
          return Promise.resolve(IAP.map(function (p) {
            var prod = CP.store.get(p.id);
            var price = prod && prod.pricing && prod.pricing.price;
            return { id: p.id, coins: p.coins, price: price || p.price };
          }));
        }
        return Promise.resolve(IAP.slice());
      },

      // Begin a purchase. Coins are credited via onGrant when the store confirms.
      order: function (productId) {
        var CP = window.CdvPurchase; var self = this;
        if (CP && CP.store) {
          var prod = CP.store.get(productId);
          var offer = prod && prod.getOffer && prod.getOffer();
          if (offer && offer.order) return Promise.resolve(offer.order());
          return Promise.reject(new Error("offer unavailable"));
        }
        // On a real device with no billing layer yet, do nothing (never grant free coins).
        if (isNative) { var e = new Error("Store unavailable"); e.code = "unavailable"; return Promise.reject(e); }
        // Browser / dev only: simulate a confirmed purchase so the flow is testable.
        return new Promise(function (res) { setTimeout(function () { self._grant(productId); res({ simulated: true }); }, 350); });
      },

      restore: function () {
        var CP = window.CdvPurchase;
        if (CP && CP.store && CP.store.restorePurchases) return CP.store.restorePurchases();
        return Promise.resolve([]);
      }
    },

    // Server-side receipt check. Returns Promise<bool>. Skipped for simulated/dev purchases
    // or when VALIDATE_URL is unset; otherwise POSTs the receipt to your validator.
    validateReceipt: function (result) {
      if (!VALIDATE_URL || !result || result.simulated || !result.receipt) return Promise.resolve(true);
      var platform = (Cap && Cap.getPlatform && Cap.getPlatform()) || "unknown";
      return fetch(VALIDATE_URL, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: platform, productId: result.productId, receipt: result.receipt })
      }).then(function (r) { return r.json(); }).then(function (d) { return !!(d && d.valid); }).catch(function () { return false; });
    }
  };

  window.Native = Native;
})();

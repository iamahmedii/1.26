/* ============================================================
   i18n — English + Arabic strings. window.t(key) uses window.LANG.
   ============================================================ */
(function () {
  var I = {
    en: {
      // language picker
      pick_title: "Choose your language",
      lang_en: "English", lang_ar: "العربية", cont: "Continue",
      // onboarding
      ob_title: "Find Words,\nPlay, Win!",
      ob_sub: "Swipe letters into words across calm, clever levels — ready to stretch your brain?",
      ob_name: "What should we call you?",
      ob_start: "Slide to start",
      // home
      home_tag: "A DAILY WORD GAME",
      home_h1: "Find your words",
      home_play: "Play", home_level: "Level",
      home_daily: "Daily", home_daily_new: "New puzzle", home_daily_done: "Done today ✓",
      home_journey: "Journey", home_journey_sub: "Level map",
      coins: "coins", streak_days: "DAY STREAK",
      // game
      g_daily: "Daily", g_level: "Level", g_words: "words",
      g_shuffle: "Shuffle", g_hint: "Hint", g_reveal: "Reveal",
      g_tap_learn: "📖 Tap a finished word to learn it",
      g_not_enough: "Not enough coins", g_bonus: "Bonus word! +10",
      g_already: "Already found", g_no_hint: "Nothing left to hint", g_all_found: "All words found",
      // complete
      c_title: "Beautifully done", c_beat: "You beat {n}% of players!",
      c_words: "Words found", c_bonus: "Bonus words", c_coins: "Coins earned",
      c_next: "Next level", c_back: "Back to journey", c_map: "Journey map", c_share: "Share",
      c_tap_learn: "📖 Tap a word to learn it",
      // map
      trail: "Word Trail", play: "PLAY",
      // settings
      set_title: "Settings", set_look: "Look", set_sound: "Sound & feel",
      set_sfx: "Sound effects", set_music: "Ambient music", set_haptics: "Haptics", set_reminder: "Daily reminder",
      set_language: "Language", set_about: "About",
      set_howto: "How to play", set_privacy: "Privacy & terms", set_aboutapp: "About Words by Cork",
      set_data: "Data", set_restore: "Restore purchases", set_reset: "Reset progress",
      set_reset_q: "Reset all progress?", cancel: "Cancel", reset: "Reset", restored: "Purchases restored",
      // profile
      p_title: "My Profile", p_since: "Playing since", p_streak: "Day streak",
      p_coins: "Coins", p_levels: "Levels done", p_ach: "Achievements",
      // leaderboard
      lb_title: "Leaderboard", lb_today: "Today", lb_week: "Weekly", lb_month: "Monthly",
      // shop
      shop_title: "Coins", shop_top: "Top up your coins",
      ad_free: "Free coins", ad_watch: "Watch a short ad", ad_get: "Get {n} free coins",
      ad_added: "+{n} coins added!", ad_none: "No ad available — try again soon", ad_watching: "Loading ad…",
      // nav + dict
      nav_home: "Home", nav_rank: "Ranking", nav_profile: "Profile",
      d_valid: "It’s a valid word! 🎉", d_here: "words here", d_hear: "Hear it",
    },
    ar: {
      pick_title: "اختر لغتك",
      lang_en: "English", lang_ar: "العربية", cont: "متابعة",
      ob_title: "كوّن الكلمات،\nالعب، اربح!",
      ob_sub: "اسحب الحروف لتكوين كلمات عبر مراحل هادئة وذكية — هل أنت مستعد؟",
      ob_name: "بماذا نناديك؟",
      ob_start: "اسحب للبدء",
      home_tag: "لعبة كلمات يومية",
      home_h1: "اعثر على كلماتك",
      home_play: "العب", home_level: "مرحلة",
      home_daily: "اليومي", home_daily_new: "لغز جديد", home_daily_done: "تم اليوم ✓",
      home_journey: "الرحلة", home_journey_sub: "خريطة المراحل",
      coins: "عملة", streak_days: "يوم متتالي",
      g_daily: "اليومي", g_level: "مرحلة", g_words: "كلمات",
      g_shuffle: "خلط", g_hint: "تلميح", g_reveal: "كشف",
      g_tap_learn: "📖 اضغط على كلمة مكتملة لتتعلّمها",
      g_not_enough: "عملات غير كافية", g_bonus: "كلمة إضافية! +10",
      g_already: "موجودة مسبقًا", g_no_hint: "لا يوجد ما يُكشف", g_all_found: "تم إيجاد كل الكلمات",
      c_title: "أحسنت!", c_beat: "تغلّبت على {n}٪ من اللاعبين!",
      c_words: "الكلمات", c_bonus: "كلمات إضافية", c_coins: "العملات المكتسبة",
      c_next: "المرحلة التالية", c_back: "إلى الرحلة", c_map: "خريطة المراحل", c_share: "مشاركة",
      c_tap_learn: "📖 اضغط على كلمة لتتعلّمها",
      trail: "درب الكلمات", play: "العب",
      set_title: "الإعدادات", set_look: "المظهر", set_sound: "الصوت والإحساس",
      set_sfx: "المؤثرات الصوتية", set_music: "موسيقى هادئة", set_haptics: "الاهتزاز", set_reminder: "تذكير يومي",
      set_language: "اللغة", set_about: "حول",
      set_howto: "كيفية اللعب", set_privacy: "الخصوصية والشروط", set_aboutapp: "حول اللعبة",
      set_data: "البيانات", set_restore: "استعادة المشتريات", set_reset: "إعادة ضبط التقدّم",
      set_reset_q: "إعادة ضبط كل التقدّم؟", cancel: "إلغاء", reset: "إعادة ضبط", restored: "تمت استعادة المشتريات",
      p_title: "ملفّي", p_since: "تلعب منذ", p_streak: "يوم متتالي",
      p_coins: "العملات", p_levels: "مراحل مكتملة", p_ach: "الإنجازات",
      lb_title: "المتصدّرون", lb_today: "اليوم", lb_week: "الأسبوع", lb_month: "الشهر",
      shop_title: "العملات", shop_top: "اشحن عملاتك",
      ad_free: "عملات مجانية", ad_watch: "شاهد إعلانًا قصيرًا", ad_get: "احصل على {n} عملة مجانية",
      ad_added: "تمت إضافة {n} عملة!", ad_none: "لا يوجد إعلان متاح — حاول قريبًا", ad_watching: "جارٍ تحميل الإعلان…",
      nav_home: "الرئيسية", nav_rank: "الترتيب", nav_profile: "ملفّي",
      d_valid: "كلمة صحيحة! 🎉", d_here: "كلمات هنا", d_hear: "استمع",
    },
  };
  window.I18N = I;
  window.LANG = window.LANG || "en";
  window.tr = function (k) {
    var L = I[window.LANG] || I.en;
    return (k in L) ? L[k] : (I.en[k] != null ? I.en[k] : k);
  };
})();

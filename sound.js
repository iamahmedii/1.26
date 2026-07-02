/* Cork Word — Web-Audio sound/music/haptics engine (window.Sound) */
(function () {
  const A = { sound: true, haptics: true, ctx: null, master: null, music: null, musicWant: false, musicOn: false };
  function ensure() {
    if (A.ctx) { if (A.ctx.state === "suspended") A.ctx.resume(); return A.ctx; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    A.ctx = new AC();
    A.master = A.ctx.createGain();
    A.master.gain.value = 0.32;
    A.master.connect(A.ctx.destination);
    return A.ctx;
  }
  // Browsers block audio until a user gesture — unlock on the first one.
  // Retry play() too, in case music was requested before any gesture.
  function unlock() {
    ensure();
    if (!A.musicWant) return;
    if (!A.musicOn) { startMusic(); return; }
    if (A.musicEl && A.musicEl.paused) { try { var p = A.musicEl.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
  }
  window.addEventListener("pointerdown", unlock, true);
  window.addEventListener("keydown", unlock, true);

  // Pause music when the app goes to the background (home button / app switch),
  // resume when it comes back. Without this, music keeps playing after "closing".
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      if (A.musicEl && !A.musicEl.paused) { try { A.musicEl.pause(); } catch (e) {} }
      if (A.ctx && A.ctx.state === "running") { try { A.ctx.suspend(); } catch (e) {} }
    } else {
      if (A.ctx && A.ctx.state === "suspended") { try { A.ctx.resume(); } catch (e) {} }
      if (A.musicWant && A.musicOn && A.musicEl) { try { var p = A.musicEl.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
    }
  });

  function tone(freq, t0, dur, o) {
    o = o || {};
    const ctx = A.ctx; if (!ctx) return;
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = o.type || "sine";
    osc.frequency.setValueAtTime(freq, t0);
    if (o.detune) osc.detune.value = o.detune;
    const peak = o.gain == null ? 0.16 : o.gain;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + (o.attack || 0.006));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(A.master);
    osc.start(t0); osc.stop(t0 + dur + 0.03);
  }
  // C-major pentatonic — every drag spells out a pleasant little melody.
  const PENT = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51, 1567.98];
  function vib(p) {
    if (!A.haptics) return;
    if (window.Native && window.Native.haptic) { window.Native.haptic(p); return; }
    if (navigator.vibrate) { try { navigator.vibrate(p); } catch (e) {} }
  }
  const on = () => A.sound && ensure();
  const now = () => A.ctx.currentTime;

  // ---- Background music: looped MP3, softened (low-pass) and kept low so it's
  //      relaxing, not noisy. Routed through Web Audio for volume/tone control. ----
  const MUSIC_FILE = "music.mp3";
  const MUSIC_VOL = 0.20;        // low so it sits gently under the SFX
  function startMusic() {
    const ctx = ensure(); if (!ctx || A.musicOn) return;
    A.musicOn = true;
    if (!A.musicEl) {
      A.musicEl = new Audio(MUSIC_FILE);
      A.musicEl.loop = true; A.musicEl.preload = "auto";
      try {
        A.musicSrc = ctx.createMediaElementSource(A.musicEl);
        A.musicLP = ctx.createBiquadFilter(); A.musicLP.type = "lowpass"; A.musicLP.frequency.value = 1600; A.musicLP.Q.value = 0.5;
        A.musicGain = ctx.createGain(); A.musicGain.gain.value = 0.0001;
        A.musicSrc.connect(A.musicLP); A.musicLP.connect(A.musicGain); A.musicGain.connect(ctx.destination);
        A.musicRouted = true;
      } catch (e) { A.musicRouted = false; A.musicEl.volume = MUSIC_VOL; }
    }
    try { var p = A.musicEl.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
    if (A.musicRouted && A.musicGain) A.musicGain.gain.setTargetAtTime(MUSIC_VOL, ctx.currentTime, 1.6); // gentle fade in
  }
  function stopMusic() {
    A.musicOn = false;
    if (A.musicRouted && A.musicGain && A.ctx) {
      A.musicGain.gain.setTargetAtTime(0.0001, A.ctx.currentTime, 0.5);   // fade out
      setTimeout(function () { if (!A.musicOn && A.musicEl) { try { A.musicEl.pause(); } catch (e) {} } }, 900);
    } else if (A.musicEl) {
      try { A.musicEl.pause(); } catch (e) {}
    }
  }

  const Sound = {
    setSound(v) { A.sound = !!v; if (v) ensure(); },
    setHaptics(v) { A.haptics = !!v; },
    setMusic(v) { A.musicWant = !!v; if (v) { ensure(); startMusic(); } else stopMusic(); },
    // re-arm music after the first user gesture (autoplay policy)
    nudgeMusic() { if (A.musicWant && !A.musicOn) startMusic(); },
    tap() { if (!on()) return; tone(420, now(), 0.06, { gain: 0.04, attack: 0.004 }); },
    pick(i) { if (!on()) return; tone(PENT[Math.min(i - 1, PENT.length - 1)] || PENT[0], now(), 0.16, { type: "triangle", gain: 0.13 }); vib(7); },
    word() { if (!on()) return; const t = now(); [523.25, 659.25, 783.99].forEach((f, k) => tone(f, t + k * 0.06, 0.24, { gain: 0.15 })); vib([0, 16]); },
    bonus() { if (!on()) return; const t = now(); [783.99, 1046.5, 1318.51].forEach((f, k) => tone(f, t + k * 0.05, 0.2, { type: "triangle", gain: 0.12 })); vib([0, 12, 28, 12]); },
    invalid() { if (!on()) return; const t = now(); tone(196, t, 0.18, { gain: 0.12, detune: -6 }); tone(185, t + 0.02, 0.16, { gain: 0.09 }); vib([0, 28, 40, 28]); },
    hint() { if (!on()) return; const t = now(); tone(1046.5, t, 0.26, { gain: 0.1 }); tone(1318.51, t + 0.08, 0.32, { gain: 0.08 }); vib(10); },
    coin() { if (!on()) return; const t = now(); tone(987.77, t, 0.09, { type: "triangle", gain: 0.07 }); tone(1318.51, t + 0.05, 0.13, { type: "triangle", gain: 0.06 }); },
    win() { if (!on()) return; const t = now(); [523.25, 659.25, 783.99, 1046.5].forEach((f, k) => { tone(f, t + k * 0.1, 0.5, { gain: 0.15 }); tone(f / 2, t + k * 0.1, 0.5, { type: "triangle", gain: 0.045 }); }); tone(1046.5, t + 0.42, 0.8, { gain: 0.11 }); vib([0, 30, 50, 30, 50, 80]); },
  };
  // Subtle tap on any button press, without touching every component.
  document.addEventListener("pointerdown", function (e) {
    if (!A.sound || !e.target.closest) return;
    const b = e.target.closest("button");
    if (b && b.dataset.sfx !== "off") Sound.tap();
  }, true);
  window.Sound = Sound;
})();

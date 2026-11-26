import { getState } from './storage.js';

let audioCtx = null;
let currentAudioEl = null;

function ensureCtx() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioCtx = new Ctx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Plays a soft, calm wooden-marimba tone (never loud or jarring).
 */
export function playTone(freq = 440, duration = 0.14, type = 'sine', volume = 0.07) {
  if (getState().muted) return;
  try {
    const ctx = ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0008, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  } catch {
    // Ignore audio context errors
  }
}

/**
 * Clear, resonant xylophone / music-box note for the Melody Memory game.
 * Boosted volume and warm harmonics so it is clearly audible on mobile speakers.
 */
export function playMelodyNote(freq = 261.63, duration = 0.52) {
  if (getState().muted) return;
  try {
    const ctx = ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Fundamental + 2nd & 3rd xylophone harmonics for clear mobile speaker projection
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const masterGain = ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3, now);

    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.28, now);

    const g3 = ctx.createGain();
    g3.gain.setValueAtTime(0.1, now);
    g3.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    masterGain.gain.setValueAtTime(0.002, now);
    masterGain.gain.linearRampToValueAtTime(0.42, now + 0.015);
    masterGain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

    osc1.connect(masterGain);
    osc2.connect(g2);
    g2.connect(masterGain);
    osc3.connect(g3);
    g3.connect(masterGain);
    masterGain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc1.stop(now + duration + 0.04);
    osc2.stop(now + duration + 0.04);
    osc3.stop(now + duration + 0.04);
  } catch {
    // Ignore audio context errors
  }
}

export function playTap() {
  playTone(392, 0.08, 'sine', 0.05);
}

export function playSuccess() {
  if (getState().muted) return;
  playTone(523.25, 0.14, 'sine', 0.06);
  setTimeout(() => playTone(659.25, 0.18, 'sine', 0.06), 110);
}

export function playGentleWrong() {
  playTone(261.63, 0.16, 'triangle', 0.045);
}

export function playComplete() {
  if (getState().muted) return;
  const notes = [523.25, 587.33, 659.25, 783.99];
  notes.forEach((n, idx) => {
    setTimeout(() => playTone(n, 0.22, 'sine', 0.06), idx * 120);
  });
}

export function stopSpokenAudio() {
  if (currentAudioEl) {
    try {
      currentAudioEl.pause();
      currentAudioEl.currentTime = 0;
    } catch {}
    currentAudioEl = null;
  }
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

/**
 * Speaks the on-demand game instructions when the child taps the "❓🔊" help button.
 * Uses pre-bundled offline MP3 files (/audio/help-{lang}/{gameId}.mp3).
 */
export function speakGameHelp(gameId, fallbackText, lang = 'el') {
  if (getState().muted) return;
  stopSpokenAudio();

  const safeLang = lang === 'en' ? 'en' : 'el';
  if (gameId) {
    try {
      const audio = new Audio(`/audio/help-${safeLang}/${gameId}.mp3`);
      audio.volume = 0.9;
      currentAudioEl = audio;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          fallbackWebSpeech(fallbackText, safeLang);
        });
      }
      return;
    } catch {
      // Fall through to Web Speech API
    }
  }

  fallbackWebSpeech(fallbackText, safeLang);
}

/**
 * Speaks ONLY the country name for Flags of the World using pre-bundled offline MP3 files
 * (/audio/{lang}/{code}.mp3) so Greek & English sound natural on ALL browsers and offline.
 */
export function speakFlagPrompt(code, fallbackText, lang = 'el') {
  if (getState().muted) return;
  stopSpokenAudio();

  const safeLang = lang === 'en' ? 'en' : 'el';
  if (code) {
    try {
      const audio = new Audio(`/audio/${safeLang}/${code}.mp3`);
      audio.volume = 0.85;
      currentAudioEl = audio;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          fallbackWebSpeech(fallbackText, safeLang);
        });
      }
      return;
    } catch {
      // Fall through to Web Speech API
    }
  }

  fallbackWebSpeech(fallbackText, safeLang);
}

function fallbackWebSpeech(text, lang) {
  if (!('speechSynthesis' in window) || !text) return;
  try {
    const voices = window.speechSynthesis.getVoices() || [];
    const prefix = lang === 'el' ? 'el' : 'en';
    const match = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(prefix));
    // Avoid reading Greek text with an English SAPI voice ("Greeklish")
    if (lang === 'el' && !match) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang === 'el' ? 'el-GR' : 'en-US';
    utter.rate = 0.9;
    if (match) utter.voice = match;
    window.speechSynthesis.speak(utter);
  } catch {}
}

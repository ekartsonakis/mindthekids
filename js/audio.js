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
 * Discreet, warm music-box / soft harp note for the Melody Memory game.
 */
export function playMelodyNote(freq = 261.63, duration = 0.42) {
  if (getState().muted) return;
  try {
    const ctx = ensureCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Fundamental sine + very subtle warm triangle harmonic
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.12, now);

    gain.gain.setValueAtTime(0.0005, now);
    gain.gain.linearRampToValueAtTime(0.055, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(gain);
    osc2.connect(g2);
    g2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.03);
    osc2.stop(now + duration + 0.03);
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
 * Speaks the country flag prompt using pre-bundled offline MP3 files (/audio/{lang}/{code}.mp3)
 * so that Greek & English sound natural on ALL browsers (Opera, Chrome, Edge, Firefox, Android, iOS)
 * even when Windows lacks a Greek SAPI TTS voice, and 100% offline in Airplane mode.
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

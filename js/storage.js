const STORAGE_KEY = 'little_brain_v1';

const defaultState = {
  lang: 'el',
  theme: 'light',
  muted: false,
  activity: {}, // { [gameId]: { completed: number, lastPlayed: string } }
  schulteBest: {}, // { [size]: number (seconds) }
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState, activity: {}, schulteBest: {} };
    const parsed = JSON.parse(raw);
    return {
      lang: parsed.lang === 'en' ? 'en' : 'el',
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
      muted: Boolean(parsed.muted),
      activity: parsed.activity && typeof parsed.activity === 'object' ? parsed.activity : {},
      schulteBest: parsed.schulteBest && typeof parsed.schulteBest === 'object' ? parsed.schulteBest : {},
    };
  } catch {
    return { ...defaultState, activity: {}, schulteBest: {} };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function getState() {
  return state;
}

export function setLang(lang) {
  state.lang = lang === 'en' ? 'en' : 'el';
  document.documentElement.lang = state.lang;
  saveState();
}

export function setTheme(theme) {
  state.theme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  const meta = document.getElementById('meta-theme-color');
  if (meta) {
    meta.setAttribute('content', state.theme === 'dark' ? '#131722' : '#F7F5F0');
  }
  saveState();
}

export function toggleMuted() {
  state.muted = !state.muted;
  saveState();
  return state.muted;
}

export function recordGameCompletion(gameId) {
  if (!state.activity[gameId]) {
    state.activity[gameId] = { completed: 0, lastPlayed: null };
  }
  state.activity[gameId].completed += 1;
  state.activity[gameId].lastPlayed = new Date().toISOString();
  saveState();
}

export function clearActivityLog() {
  state.activity = {};
  state.schulteBest = {};
  saveState();
}

export function getSchulteBest(size) {
  if (!state.schulteBest) state.schulteBest = {};
  const val = state.schulteBest[String(size)];
  return typeof val === 'number' ? val : null;
}

export function recordSchulteTime(size, seconds) {
  if (!state.schulteBest) state.schulteBest = {};
  const key = String(size);
  const prevBest = typeof state.schulteBest[key] === 'number' ? state.schulteBest[key] : null;
  const isNewRecord = prevBest === null || seconds < prevBest;
  const beatenPrevious = prevBest !== null && seconds < prevBest;
  if (isNewRecord) {
    state.schulteBest[key] = seconds;
    saveState();
  }
  return { seconds, prevBest, isNewRecord, beatenPrevious };
}

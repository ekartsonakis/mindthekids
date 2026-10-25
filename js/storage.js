const STORAGE_KEY = 'little_brain_v1';

const defaultState = {
  lang: 'el',
  theme: 'light',
  muted: false,
  activity: {}, // { [gameId]: { completed: number, lastPlayed: string } }
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState, activity: {} };
    const parsed = JSON.parse(raw);
    return {
      lang: parsed.lang === 'en' ? 'en' : 'el',
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
      muted: Boolean(parsed.muted),
      activity: parsed.activity && typeof parsed.activity === 'object' ? parsed.activity : {},
    };
  } catch {
    return { ...defaultState, activity: {} };
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
    meta.setAttribute('content', state.theme === 'dark' ? '#181B24' : '#FAF6F0');
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
  saveState();
}

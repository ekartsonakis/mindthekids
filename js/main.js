import { TRANSLATIONS } from './i18n.js';
import {
  getState,
  setLang,
  setTheme,
  toggleMuted,
  recordGameCompletion,
  clearActivityLog,
} from './storage.js';
import { playTap, playComplete, stopSpokenAudio } from './audio.js';
import {
  renderMemoryPairs,
  renderMarbleJump,
  renderMentalRotation,
  renderEmojiMahjong,
  renderNumberMatch,
  renderTargetTap,
  renderWhackAMole,
  renderSchulteTable,
  renderSequenceMemory,
  renderFlagsWorld,
} from './gamesPart1.js';
import {
  renderColorSudoku,
  renderVisualMath,
  renderPatternTrain,
  renderOddOneOut,
  renderTowerHanoi,
  renderShapeSorting,
  renderPatternCopy,
  renderMelodyMemory,
  renderMazeExplorer,
} from './gamesPart2.js';

const GAMES_CATALOG = [
  // Memory & Music
  { id: 'memoryPairs', icon: '🃏', bg: 'var(--accent-primary-soft)', category: 'memory', render: renderMemoryPairs },
  { id: 'sequenceMemory', icon: '🎶', bg: 'var(--accent-purple-soft)', category: 'memory', render: renderSequenceMemory },
  { id: 'melodyMemory', icon: '🎹', bg: 'var(--accent-amber-soft)', category: 'memory', render: renderMelodyMemory },
  { id: 'flagsWorld', icon: '🏳️', bg: 'var(--accent-teal-soft)', category: 'memory', render: renderFlagsWorld },

  // Attention
  { id: 'targetTap', icon: '🐞', bg: 'var(--accent-coral-soft)', category: 'attention', render: renderTargetTap },
  { id: 'whackAMole', icon: '🐹', bg: 'var(--accent-amber-soft)', category: 'attention', render: renderWhackAMole },
  { id: 'schulteTable', icon: '🔢', bg: 'var(--accent-green-soft)', category: 'attention', render: renderSchulteTable },
  { id: 'emojiMahjong', icon: '🀄', bg: 'var(--accent-amber-soft)', category: 'attention', render: renderEmojiMahjong },

  // Math & Numbers
  { id: 'numberMatch', icon: '🎲', bg: 'var(--accent-primary-soft)', category: 'math', render: renderNumberMatch },
  { id: 'visualMath', icon: '🍎', bg: 'var(--accent-coral-soft)', category: 'math', render: renderVisualMath },

  // Logic & Sudoku
  { id: 'colorSudoku', icon: '🎨', bg: 'var(--accent-green-soft)', category: 'logic', render: renderColorSudoku },
  { id: 'marbleJump', icon: '🔮', bg: 'var(--accent-purple-soft)', category: 'logic', render: renderMarbleJump },
  { id: 'patternTrain', icon: '🚂', bg: 'var(--accent-amber-soft)', category: 'logic', render: renderPatternTrain },
  { id: 'oddOneOut', icon: '🔍', bg: 'var(--accent-purple-soft)', category: 'logic', render: renderOddOneOut },
  { id: 'towerHanoi', icon: '🌈', bg: 'var(--accent-primary-soft)', category: 'logic', render: renderTowerHanoi },

  // Shapes & Space
  { id: 'mazeExplorer', icon: '🧭', bg: 'var(--accent-amber-soft)', category: 'spatial', render: renderMazeExplorer },
  { id: 'mentalRotation', icon: '🔄', bg: 'var(--accent-teal-soft)', category: 'spatial', render: renderMentalRotation },
  { id: 'shapeSorting', icon: '🧺', bg: 'var(--accent-teal-soft)', category: 'spatial', render: renderShapeSorting },
  { id: 'patternCopy', icon: '🟦', bg: 'var(--accent-green-soft)', category: 'spatial', render: renderPatternCopy },
];

let activeScreen = 'home'; // 'home' | 'game' | 'activity'
let activeCategory = 'all';
let activeGameId = null;
let currentCleanup = null;

function stopCurrentGame() {
  if (typeof currentCleanup === 'function') {
    currentCleanup();
    currentCleanup = null;
  }
  stopSpokenAudio();
}

function renderApp() {
  const st = getState();
  const t = TRANSLATIONS[st.lang] || TRANSLATIONS.el;
  const appEl = document.getElementById('app');

  const topBarHtml = `
    <header class="top-bar">
      <div class="brand" id="nav-home">
        <img src="/icons/icon.svg" alt="Logo" class="brand-logo" />
        <div>
          <div class="brand-title">${t.appTitle}</div>
          <div class="brand-subtitle">${t.appSubtitle}</div>
        </div>
      </div>
      <div class="top-controls">
        ${
          activeScreen !== 'home'
            ? `<button class="pill-btn exit-btn" id="btn-exit">${t.exit}</button>`
            : `<button class="pill-btn" id="btn-activity">${t.activity}</button>`
        }
        <button class="pill-btn" id="btn-lang">${st.lang === 'el' ? '🇬🇧 EN' : '🇬🇷 ΕΛ'}</button>
        <button class="pill-btn" id="btn-mute" title="Sound">${st.muted ? '🔇' : '🔊'}</button>
        <button class="pill-btn" id="btn-theme" title="Theme">${st.theme === 'dark' ? '☀️' : '🌙'}</button>
      </div>
    </header>
  `;

  if (activeScreen === 'home') {
    const categories = ['all', 'memory', 'attention', 'math', 'logic', 'spatial'];
    const filteredGames =
      activeCategory === 'all'
        ? GAMES_CATALOG
        : GAMES_CATALOG.filter((g) => g.category === activeCategory);

    appEl.innerHTML = `
      <div class="app-shell">
        ${topBarHtml}
        <section class="intro-card">
          <h2 class="intro-title">🌱 ${t.intro.title}</h2>
          <p class="intro-text">${t.intro.p1}</p>
          <p class="intro-text">${t.intro.p2}</p>
          <div class="intro-badges">
            ${t.intro.badges.map((b) => `<span class="intro-badge">${b}</span>`).join('')}
          </div>
          <p class="intro-credits">${t.intro.credits}</p>
        </section>
        <nav class="category-bar">
          ${categories
            .map(
              (cat) => `
            <button class="cat-chip ${activeCategory === cat ? 'active' : ''}" data-cat="${cat}">
              ${t.categories[cat]}
            </button>
          `
            )
            .join('')}
        </nav>
        <main class="games-grid">
          ${filteredGames
            .map((g) => {
              const gt = t.games[g.id];
              const doneCount = st.activity[g.id]?.completed || 0;
              return `
                <button class="game-card" data-game="${g.id}">
                  <div class="game-card-icon" style="background: ${g.bg};">${g.icon}</div>
                  <div class="game-card-title">${gt.title}</div>
                  <div class="game-card-skill">${gt.skill}${doneCount > 0 ? ` · ✓ ${doneCount}` : ''}</div>
                </button>
              `;
            })
            .join('')}
        </main>
        <footer style="text-align:center; font-size:0.8rem; color:var(--text-muted); padding: 8px 0;">
          ${t.offlineReady}
        </footer>
      </div>
    `;
  } else if (activeScreen === 'activity') {
    const entries = GAMES_CATALOG.map((g) => ({
      game: g,
      title: t.games[g.id].title,
      count: st.activity[g.id]?.completed || 0,
    })).filter((e) => e.count > 0);

    appEl.innerHTML = `
      <div class="app-shell">
        ${topBarHtml}
        <main class="game-view">
          <div class="game-header">
            <div class="game-header-left">
              <span class="game-header-icon">📊</span>
              <h2 class="game-header-title">${t.activity}</h2>
            </div>
            <button class="pill-btn" id="btn-clear-act">${t.clearActivity}</button>
          </div>
          <div class="game-stage">
            ${
              entries.length === 0
                ? `<p style="color: var(--text-muted); font-weight: 700;">${t.noActivity}</p>`
                : `<div class="activity-list">
                    ${entries
                      .map(
                        (e) => `
                      <div class="activity-row">
                        <span>${e.game.icon} ${e.title}</span>
                        <span>${t.completedCount}: ${e.count} ${t.times}</span>
                      </div>
                    `
                      )
                      .join('')}
                  </div>`
            }
          </div>
        </main>
      </div>
    `;
  } else if (activeScreen === 'game') {
    const gameObj = GAMES_CATALOG.find((g) => g.id === activeGameId);
    const gt = t.games[gameObj.id];

    appEl.innerHTML = `
      <div class="app-shell">
        ${topBarHtml}
        <main class="game-view">
          <div class="game-header">
            <div class="game-header-left">
              <span class="game-header-icon">${gameObj.icon}</span>
              <h2 class="game-header-title">${gt.title}</h2>
            </div>
            <button class="pill-btn exit-btn" id="btn-exit-inner">${t.exit}</button>
          </div>
          <div class="game-stage" id="game-stage"></div>
        </main>
      </div>
    `;

    const stageEl = document.getElementById('game-stage');
    const launchGame = () => {
      stopCurrentGame();
      const cleanup = gameObj.render(stageEl, {
        t,
        lang: st.lang,
        onWin: () => {
          stopCurrentGame();
          recordGameCompletion(gameObj.id);
          playComplete();
          stageEl.innerHTML = `
            <div class="completion-card">
              <div class="completion-emoji">🌟</div>
              <h3 class="completion-title">${t.wellDone}</h3>
              <p class="completion-msg">${t.completedMsg}</p>
              <div class="completion-actions">
                <button class="pill-btn green-btn" id="btn-replay">${t.playAgain}</button>
                <button class="pill-btn exit-btn" id="btn-done-exit">${t.exit}</button>
              </div>
            </div>
          `;
          stageEl.querySelector('#btn-replay').onclick = () => {
            playTap();
            launchGame();
          };
          stageEl.querySelector('#btn-done-exit').onclick = () => {
            playTap();
            goHome();
          };
        },
      });
      if (typeof cleanup === 'function') {
        currentCleanup = cleanup;
      }
    };

    launchGame();
  }

  bindHeaderEvents();
}

function goHome() {
  stopCurrentGame();
  activeScreen = 'home';
  activeGameId = null;
  renderApp();
}

function bindHeaderEvents() {
  const st = getState();
  const homeBrand = document.getElementById('nav-home');
  if (homeBrand) {
    homeBrand.onclick = () => {
      playTap();
      goHome();
    };
  }

  const exitBtn = document.getElementById('btn-exit');
  if (exitBtn) {
    exitBtn.onclick = () => {
      playTap();
      goHome();
    };
  }

  const exitInnerBtn = document.getElementById('btn-exit-inner');
  if (exitInnerBtn) {
    exitInnerBtn.onclick = () => {
      playTap();
      goHome();
    };
  }

  const actBtn = document.getElementById('btn-activity');
  if (actBtn) {
    actBtn.onclick = () => {
      playTap();
      activeScreen = 'activity';
      renderApp();
    };
  }

  const clearActBtn = document.getElementById('btn-clear-act');
  if (clearActBtn) {
    clearActBtn.onclick = () => {
      playTap();
      clearActivityLog();
      renderApp();
    };
  }

  const langBtn = document.getElementById('btn-lang');
  if (langBtn) {
    langBtn.onclick = () => {
      setLang(st.lang === 'el' ? 'en' : 'el');
      playTap();
      renderApp();
    };
  }

  const muteBtn = document.getElementById('btn-mute');
  if (muteBtn) {
    muteBtn.onclick = () => {
      toggleMuted();
      renderApp();
    };
  }

  const themeBtn = document.getElementById('btn-theme');
  if (themeBtn) {
    themeBtn.onclick = () => {
      setTheme(st.theme === 'dark' ? 'light' : 'dark');
      playTap();
      renderApp();
    };
  }

  document.querySelectorAll('.cat-chip').forEach((chip) => {
    chip.onclick = () => {
      activeCategory = chip.dataset.cat;
      playTap();
      renderApp();
    };
  });

  document.querySelectorAll('.game-card').forEach((card) => {
    card.onclick = () => {
      activeGameId = card.dataset.game;
      activeScreen = 'game';
      playTap();
      renderApp();
    };
  });
}

const initial = getState();
setTheme(initial.theme);
setLang(initial.lang);
renderApp();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}

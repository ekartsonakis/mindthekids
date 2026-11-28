import { TRANSLATIONS } from './i18n.js';
import {
  getState,
  setLang,
  setTheme,
  toggleMuted,
  recordGameCompletion,
  clearActivityLog,
} from './storage.js';
import { playTap, playComplete, stopSpokenAudio, speakGameHelp } from './audio.js';
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
  renderGeographyMap,
} from './gamesPart2.js';

const GAMES_CATALOG = [
  // Memory & Music
  { id: 'memoryPairs', icon: '🃏', theme: 'indigo', bg: 'var(--accent-primary-soft)', category: 'memory', render: renderMemoryPairs },
  { id: 'sequenceMemory', icon: '🎶', theme: 'purple', bg: 'var(--accent-purple-soft)', category: 'memory', render: renderSequenceMemory },
  { id: 'melodyMemory', icon: '🎹', theme: 'amber', bg: 'var(--accent-amber-soft)', category: 'memory', render: renderMelodyMemory },
  { id: 'flagsWorld', icon: '🏳️', theme: 'teal', bg: 'var(--accent-teal-soft)', category: 'memory', render: renderFlagsWorld },

  // Attention
  { id: 'targetTap', icon: '🐞', theme: 'coral', bg: 'var(--accent-coral-soft)', category: 'attention', render: renderTargetTap },
  { id: 'whackAMole', icon: '🐹', theme: 'amber', bg: 'var(--accent-amber-soft)', category: 'attention', render: renderWhackAMole },
  { id: 'schulteTable', icon: '🔢', theme: 'green', bg: 'var(--accent-green-soft)', category: 'attention', render: renderSchulteTable },
  { id: 'emojiMahjong', icon: '🀄', theme: 'amber', bg: 'var(--accent-amber-soft)', category: 'attention', render: renderEmojiMahjong },

  // Math & Numbers
  { id: 'numberMatch', icon: '🎲', theme: 'indigo', bg: 'var(--accent-primary-soft)', category: 'math', render: renderNumberMatch },
  { id: 'visualMath', icon: '🍎', theme: 'coral', bg: 'var(--accent-coral-soft)', category: 'math', render: renderVisualMath },

  // Logic & Sudoku
  { id: 'colorSudoku', icon: '🎨', theme: 'green', bg: 'var(--accent-green-soft)', category: 'logic', render: renderColorSudoku },
  { id: 'marbleJump', icon: '🔮', theme: 'purple', bg: 'var(--accent-purple-soft)', category: 'logic', render: renderMarbleJump },
  { id: 'patternTrain', icon: '🚂', theme: 'amber', bg: 'var(--accent-amber-soft)', category: 'logic', render: renderPatternTrain },
  { id: 'oddOneOut', icon: '🔍', theme: 'purple', bg: 'var(--accent-purple-soft)', category: 'logic', render: renderOddOneOut },
  { id: 'towerHanoi', icon: '🌈', theme: 'indigo', bg: 'var(--accent-primary-soft)', category: 'logic', render: renderTowerHanoi },

  // Shapes & Space
  { id: 'geographyMap', icon: '🗺️', theme: 'teal', bg: 'var(--accent-teal-soft)', category: 'spatial', render: renderGeographyMap },
  { id: 'mazeExplorer', icon: '🧭', theme: 'amber', bg: 'var(--accent-amber-soft)', category: 'spatial', render: renderMazeExplorer },
  { id: 'mentalRotation', icon: '🔄', theme: 'teal', bg: 'var(--accent-teal-soft)', category: 'spatial', render: renderMentalRotation },
  { id: 'shapeSorting', icon: '🧺', theme: 'teal', bg: 'var(--accent-teal-soft)', category: 'spatial', render: renderShapeSorting },
  { id: 'patternCopy', icon: '🟦', theme: 'green', bg: 'var(--accent-green-soft)', category: 'spatial', render: renderPatternCopy },
];

let activeScreen = 'home'; // 'home' | 'game' | 'activity'
let activeCategory = 'all';
let activeGameId = null;
let currentCleanup = null;
let hasPushedSubScreen = false;

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
          activeScreen === 'home'
            ? `<button class="pill-btn" id="btn-activity">${t.activity}</button>`
            : ''
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
        <section class="hero-infographic">
          <div class="infographic-main">
            <div class="infographic-illustration">
              <svg viewBox="0 0 320 210" class="parent-child-svg" role="img" aria-label="Parent and child playing calmly">
                <defs>
                  <linearGradient id="auraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#E8EEFF" stop-opacity="0.9"/>
                    <stop offset="50%" stop-color="#FEF2DE" stop-opacity="0.9"/>
                    <stop offset="100%" stop-color="#E3F8EE" stop-opacity="0.9"/>
                  </linearGradient>
                  <linearGradient id="parentShirt" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#6A85F1"/>
                    <stop offset="100%" stop-color="#4A64CE"/>
                  </linearGradient>
                  <linearGradient id="childShirt" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#52CA94"/>
                    <stop offset="100%" stop-color="#35A572"/>
                  </linearGradient>
                </defs>

                <!-- Soft protective dome / cloud backdrop -->
                <rect x="14" y="16" width="292" height="178" rx="34" fill="url(#auraGrad)" stroke="#FFFFFF" stroke-width="3"/>

                <!-- Floating skill bubbles -->
                <g transform="translate(38, 44)">
                  <circle cx="18" cy="18" r="18" fill="#FFFFFF" opacity="0.92"/>
                  <text x="18" y="24" text-anchor="middle" font-size="18">🧠</text>
                </g>
                <g transform="translate(248, 40)">
                  <circle cx="18" cy="18" r="18" fill="#FFFFFF" opacity="0.92"/>
                  <text x="18" y="24" text-anchor="middle" font-size="18">🎵</text>
                </g>
                <g transform="translate(256, 102)">
                  <circle cx="16" cy="16" r="16" fill="#FFFFFF" opacity="0.92"/>
                  <text x="16" y="22" text-anchor="middle" font-size="16">🧩</text>
                </g>
                <g transform="translate(32, 104)">
                  <circle cx="16" cy="16" r="16" fill="#FFFFFF" opacity="0.92"/>
                  <text x="16" y="22" text-anchor="middle" font-size="16">✈️️</text>
                </g>

                <!-- Parent character (left-center, warm & reassuring) -->
                <g transform="translate(76, 36)">
                  <!-- Shoulders / torso -->
                  <path d="M 10 130 C 10 88, 78 88, 78 130 Z" fill="url(#parentShirt)"/>
                  <!-- Head -->
                  <circle cx="44" cy="56" r="26" fill="#FAD2B8"/>
                  <!-- Hair -->
                  <path d="M 18 52 C 18 26, 70 26, 70 52 C 64 38, 28 38, 18 52 Z" fill="#4A3B32"/>
                  <!-- Calm eyes & smile -->
                  <circle cx="36" cy="56" r="2.8" fill="#252230"/>
                  <circle cx="53" cy="56" r="2.8" fill="#252230"/>
                  <path d="M 37 66 Q 44.5 73 52 66" fill="none" stroke="#252230" stroke-width="2.6" stroke-linecap="round"/>
                  <circle cx="30" cy="62" r="3.5" fill="#F4978E" opacity="0.55"/>
                  <circle cx="59" cy="62" r="3.5" fill="#F4978E" opacity="0.55"/>
                </g>

                <!-- Child character (right-center, leaning in happily) -->
                <g transform="translate(152, 58)">
                  <!-- Shoulders / torso -->
                  <path d="M 12 108 C 12 74, 70 74, 70 108 Z" fill="url(#childShirt)"/>
                  <!-- Head -->
                  <circle cx="41" cy="48" r="22" fill="#FAD2B8"/>
                  <!-- Hair with cute curl -->
                  <path d="M 19 45 C 20 22, 62 22, 63 45 C 54 33, 28 33, 19 45 Z" fill="#6D4C3D"/>
                  <circle cx="41" cy="24" r="5" fill="#6D4C3D"/>
                  <!-- Happy eyes & smile -->
                  <circle cx="34" cy="48" r="2.6" fill="#252230"/>
                  <circle cx="48" cy="48" r="2.6" fill="#252230"/>
                  <path d="M 34 56 Q 41 63 48 56" fill="none" stroke="#252230" stroke-width="2.5" stroke-linecap="round"/>
                  <circle cx="28" cy="53" r="3.2" fill="#F4978E" opacity="0.6"/>
                  <circle cx="54" cy="53" r="3.2" fill="#F4978E" opacity="0.6"/>
                </g>

                <!-- Shared Tablet in the middle with Airplane/Shield badge -->
                <g transform="translate(114, 118)">
                  <rect x="0" y="0" width="84" height="52" rx="12" fill="#252230" stroke="#FFFFFF" stroke-width="3"/>
                  <rect x="6" y="6" width="72" height="40" rx="8" fill="#EEF3FF"/>
                  <circle cx="26" cy="26" r="11" fill="#E3F8EE"/>
                  <text x="26" y="31" text-anchor="middle" font-size="13">🛡️</text>
                  <rect x="43" y="17" width="26" height="8" rx="4" fill="#5574E8" opacity="0.8"/>
                  <rect x="43" y="29" width="18" height="7" rx="3.5" fill="#F0A230" opacity="0.85"/>
                </g>

                <!-- Bottom pill label inside SVG -->
                <g transform="translate(65, 173)">
                  <rect x="0" y="0" width="190" height="24" rx="12" fill="#FFFFFF" opacity="0.95"/>
                  <text x="95" y="16" text-anchor="middle" font-size="11.5" font-weight="800" fill="#252230">
                    👨‍👩‍👧 ${t.intro.svgLabels.parent} + ${t.intro.svgLabels.child} · ${t.intro.svgLabels.safe}
                  </text>
                </g>
              </svg>
            </div>

            <div class="infographic-right">
              <div class="infographic-text-panel">
                <div class="infographic-header">
                  <h2 class="infographic-title">🌱 ${t.intro.title}</h2>
                </div>
                <ul class="infographic-list">
                  ${t.intro.nodes
                    .map(
                      (n) => `
                    <li class="infographic-list-item">
                      <span class="infographic-bullet-icon">${n.icon}</span>
                      <span><strong>${n.title}:</strong> ${n.sub}</span>
                    </li>
                  `
                    )
                    .join('')}
                </ul>
                <div class="infographic-footer-row">
                  <a href="#parent-guide-bottom" class="infographic-more-link">${t.intro.moreLink}</a>
                </div>
              </div>
            </div>
          </div>
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
                <button class="game-card" data-game="${g.id}" data-card-theme="${g.theme}">
                  ${doneCount > 0 ? `<span class="game-card-done" title="${t.completedCount}">✓ ${doneCount}</span>` : ''}
                  <div class="game-card-icon" style="background: ${g.bg};">
                    <span>${g.icon}</span>
                  </div>
                  <div class="game-card-body">
                    <div class="game-card-title">${gt.title}</div>
                    <div class="game-card-skill">${gt.skill}</div>
                  </div>
                </button>
              `;
            })
            .join('')}
        </main>

        <section class="parent-guide-bottom" id="parent-guide-bottom">
          <h3 class="parent-guide-title">${t.intro.bottomTitle}</h3>
          <div class="parent-guide-grid">
            ${t.intro.bottomCards
              .map(
                (c) => `
              <div class="parent-guide-card">
                <div class="parent-guide-card-head">
                  <span class="parent-guide-icon">${c.icon}</span>
                  <h4>${c.title}</h4>
                </div>
                <p>${c.text}</p>
              </div>
            `
              )
              .join('')}
          </div>
          <p class="intro-credits">${t.intro.credits}</p>
        </section>

        <footer class="app-footer">
          <span class="offline-pill">${t.offlineReady}</span>
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
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <button class="pill-btn" id="btn-clear-act">${t.clearActivity}</button>
              <button class="pill-btn exit-btn" id="btn-exit-inner">${t.exit}</button>
            </div>
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
        <main class="game-view" data-card-theme="${gameObj.theme}">
          <div class="game-header">
            <div class="game-header-left">
              <span class="game-header-icon" style="background: ${gameObj.bg};">${gameObj.icon}</span>
              <div>
                <h2 class="game-header-title">${gt.title}</h2>
                <div class="game-header-subtitle">${gt.skill}</div>
              </div>
            </div>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <button class="pill-btn help-audio-btn" id="btn-game-help">${t.helpAudioBtn}</button>
              <button class="pill-btn exit-btn" id="btn-exit-inner">${t.exit}</button>
            </div>
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
        onWin: (customInfo = {}) => {
          stopCurrentGame();
          recordGameCompletion(gameObj.id);
          playComplete();
          const winEmoji = customInfo.emoji || '🌟';
          const winTitle = customInfo.title || t.wellDone;
          const winMsg = customInfo.msg || t.completedMsg;
          const extraHtml = customInfo.extraHtml || '';
          stageEl.innerHTML = `
            <div class="completion-card">
              <div class="completion-emoji">${winEmoji}</div>
              <h3 class="completion-title">${winTitle}</h3>
              <p class="completion-msg">${winMsg}</p>
              ${extraHtml}
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
  if (hasPushedSubScreen) {
    hasPushedSubScreen = false;
    try {
      window.history.back();
    } catch {}
  } else if (window.location.hash) {
    try {
      window.history.replaceState({ screen: 'home', gameId: null }, '', window.location.pathname);
    } catch {}
  }
}

function openSubScreen(screen, gameId = null) {
  stopCurrentGame();
  activeScreen = screen;
  activeGameId = gameId;
  const hash = screen === 'game' && gameId ? `#${gameId}` : '#activity';
  try {
    if (hasPushedSubScreen) {
      window.history.replaceState({ screen, gameId }, '', hash);
    } else {
      hasPushedSubScreen = true;
      window.history.pushState({ screen, gameId }, '', hash);
    }
  } catch {}
  renderApp();
  window.scrollTo({ top: 0, behavior: 'instant' });
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

  const exitInnerBtn = document.getElementById('btn-exit-inner');
  if (exitInnerBtn) {
    exitInnerBtn.onclick = () => {
      playTap();
      goHome();
    };
  }

  const helpBtn = document.getElementById('btn-game-help');
  if (helpBtn && activeGameId) {
    helpBtn.onclick = () => {
      const t = TRANSLATIONS[st.lang] || TRANSLATIONS.el;
      const gt = t.games[activeGameId] || {};
      const fallbackText =
        gt.prompt || gt.watchPrompt || gt.promptSame || gt.promptCount || gt.promptShadows || gt.title || '';
      speakGameHelp(activeGameId, fallbackText, st.lang);
    };
  }

  const actBtn = document.getElementById('btn-activity');
  if (actBtn) {
    actBtn.onclick = () => {
      playTap();
      openSubScreen('activity', null);
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
      playTap();
      openSubScreen('game', card.dataset.game);
    };
  });
}

window.addEventListener('popstate', (e) => {
  const st = e.state;
  if (st && st.screen === 'game' && st.gameId && GAMES_CATALOG.some((g) => g.id === st.gameId)) {
    stopCurrentGame();
    activeScreen = 'game';
    activeGameId = st.gameId;
    hasPushedSubScreen = true;
    renderApp();
  } else if (st && st.screen === 'activity') {
    stopCurrentGame();
    activeScreen = 'activity';
    activeGameId = null;
    hasPushedSubScreen = true;
    renderApp();
  } else {
    hasPushedSubScreen = false;
    if (activeScreen !== 'home') {
      stopCurrentGame();
      activeScreen = 'home';
      activeGameId = null;
      renderApp();
    }
  }
});

const initial = getState();
setTheme(initial.theme);
setLang(initial.lang);
try {
  window.history.replaceState({ screen: 'home', gameId: null }, '', window.location.pathname);
} catch {}
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

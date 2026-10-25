import { playTap, playSuccess, playGentleWrong, speakFlagPrompt, stopSpokenAudio } from './audio.js';
import { FLAGS_DATA } from './flagsData.js';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================================================
// 1. MEMORY PAIRS (6, 12, 16, 20 cards)
// ============================================================================
export function renderMemoryPairs(stage, { t, onWin }) {
  const icons = ['🐶', '🐱', '🐰', '🦊', '🐼', '🐨', '🐸', '🦁', '🍎', '🍓', '🍌', '🌻', '🦋', '🐢'];
  let level = 'easy'; // easy: 6, medium: 12, hard: 16, expert: 20
  let cards = [];
  let flipped = [];
  let lock = false;

  function initBoard() {
    const pairCount = level === 'easy' ? 3 : level === 'medium' ? 6 : level === 'hard' ? 8 : 10;
    const picked = shuffle(icons).slice(0, pairCount);
    cards = shuffle([...picked, ...picked]).map((icon, idx) => ({
      id: idx,
      icon,
      revealed: false,
      matched: false,
    }));
    flipped = [];
    lock = false;
    draw();
  }

  function handleFlip(card) {
    if (lock || card.revealed || card.matched) return;
    playTap();
    card.revealed = true;
    flipped.push(card);
    draw();

    if (flipped.length === 2) {
      lock = true;
      const [a, b] = flipped;
      if (a.icon === b.icon) {
        setTimeout(() => {
          a.matched = true;
          b.matched = true;
          flipped = [];
          lock = false;
          playSuccess();
          draw();
          if (cards.every((c) => c.matched)) {
            setTimeout(onWin, 350);
          }
        }, 300);
      } else {
        setTimeout(() => {
          a.revealed = false;
          b.revealed = false;
          flipped = [];
          lock = false;
          playGentleWrong();
          draw();
        }, 750);
      }
    }
  }

  function draw() {
    const cols = level === 'easy' ? 3 : level === 'expert' ? 5 : 4;
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${level === 'easy' ? 'active' : ''}" data-lvl="easy">${t.levels.easy} (6)</button>
        <button class="level-btn ${level === 'medium' ? 'active' : ''}" data-lvl="medium">${t.levels.medium} (12)</button>
        <button class="level-btn ${level === 'hard' ? 'active' : ''}" data-lvl="hard">${t.levels.hard} (16)</button>
        <button class="level-btn ${level === 'expert' ? 'active' : ''}" data-lvl="expert">${t.levels.expert} (20)</button>
      </div>
      <div class="game-prompt">${t.games.memoryPairs.prompt}</div>
      <div class="memory-grid" style="grid-template-columns: repeat(${cols}, 1fr); max-width: ${level === 'expert' ? '540px' : '480px'};">
        ${cards
          .map(
            (c) => `
          <button class="memory-card ${c.revealed ? 'revealed' : ''} ${c.matched ? 'matched' : ''}" data-id="${c.id}">
            ${c.revealed || c.matched ? c.icon : '🌟'}
          </button>
        `
          )
          .join('')}
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        level = btn.dataset.lvl;
        initBoard();
      };
    });
    stage.querySelectorAll('.memory-card').forEach((btn) => {
      btn.onclick = () => {
        const card = cards[Number(btn.dataset.id)];
        handleFlip(card);
      };
    });
  }

  initBoard();
}

// ============================================================================
// 2. MARBLE JUMP (3, 5, 9, 15 Marbles)
// ============================================================================
export function renderMarbleJump(stage, { t, onWin }) {
  // 0: invalid, 1: marble, 2: empty hole
  const presets = {
    easy: [
      [0, 0, 2, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 2, 1, 1, 0],
      [0, 0, 2, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    medium: [
      [0, 2, 2, 2, 0],
      [2, 2, 1, 2, 2],
      [2, 1, 1, 1, 2],
      [2, 2, 1, 2, 2],
      [0, 2, 2, 2, 0],
    ],
    hard: [
      [0, 2, 1, 1, 0],
      [2, 1, 1, 1, 2],
      [1, 1, 2, 1, 1],
      [0, 2, 1, 2, 0],
      [0, 0, 2, 0, 0],
    ],
    expert: [
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 2, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 2, 1, 2, 0],
    ],
  };

  let level = 'easy';
  let board = [];
  let history = [];
  let selected = null;

  function cloneBoard(b) {
    return b.map((row) => [...row]);
  }

  function initBoard() {
    board = cloneBoard(presets[level]);
    history = [];
    selected = null;
    draw();
  }

  function getValidJumps(r, c) {
    if (!board[r] || board[r][c] !== 1) return [];
    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    const jumps = [];
    for (const [dr, dc] of dirs) {
      const mr = r + dr;
      const mc = c + dc;
      const tr = r + dr * 2;
      const tc = c + dc * 2;
      if (board[mr]?.[mc] === 1 && board[tr]?.[tc] === 2) {
        jumps.push({ mr, mc, tr, tc });
      }
    }
    return jumps;
  }

  function countMarbles() {
    let count = 0;
    for (const row of board) {
      for (const cell of row) {
        if (cell === 1) count++;
      }
    }
    return count;
  }

  function handleCellTap(r, c) {
    const val = board[r][c];
    if (val === 1) {
      playTap();
      selected = selected && selected.r === r && selected.c === c ? null : { r, c };
      draw();
      return;
    }
    if (val === 2 && selected) {
      const jumps = getValidJumps(selected.r, selected.c);
      const jump = jumps.find((j) => j.tr === r && j.tc === c);
      if (jump) {
        history.push(cloneBoard(board));
        board[selected.r][selected.c] = 2;
        board[jump.mr][jump.mc] = 2;
        board[r][c] = 1;
        selected = { r, c };
        playSuccess();
        draw();
        if (countMarbles() === 1) {
          setTimeout(onWin, 400);
        }
      } else {
        playGentleWrong();
      }
    }
  }

  function draw() {
    const validTargets = selected ? getValidJumps(selected.r, selected.c) : [];
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${level === 'easy' ? 'active' : ''}" data-lvl="easy">${t.levels.easy} (3)</button>
        <button class="level-btn ${level === 'medium' ? 'active' : ''}" data-lvl="medium">${t.levels.medium} (5)</button>
        <button class="level-btn ${level === 'hard' ? 'active' : ''}" data-lvl="hard">${t.levels.hard} (9)</button>
        <button class="level-btn ${level === 'expert' ? 'active' : ''}" data-lvl="expert">${t.levels.expert} (15)</button>
      </div>
      <div class="game-prompt">${t.games.marbleJump.prompt}</div>
      <div class="marble-board" style="grid-template-columns: repeat(5, 1fr);">
        ${board
          .map((row, r) =>
            row
              .map((cell, c) => {
                if (cell === 0) return `<div class="marble-cell"></div>`;
                const isSel = selected && selected.r === r && selected.c === c;
                const isTarget = validTargets.some((j) => j.tr === r && j.tc === c);
                return `
                  <button class="marble-cell hole ${isSel ? 'selected' : ''} ${isTarget ? 'valid-target' : ''}" data-r="${r}" data-c="${c}">
                    ${cell === 1 ? '<div class="marble-piece"></div>' : ''}
                  </button>
                `;
              })
              .join('')
          )
          .join('')}
      </div>
      <div class="choice-row" style="margin-top: 16px;">
        <button class="pill-btn" id="mj-undo" ${history.length === 0 ? 'disabled style="opacity:0.5"' : ''}>${t.undo}</button>
        <button class="pill-btn" id="mj-reset">${t.reset}</button>
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        level = btn.dataset.lvl;
        initBoard();
      };
    });
    stage.querySelectorAll('.marble-cell.hole').forEach((btn) => {
      btn.onclick = () => handleCellTap(Number(btn.dataset.r), Number(btn.dataset.c));
    });
    const undoBtn = stage.querySelector('#mj-undo');
    if (undoBtn) {
      undoBtn.onclick = () => {
        if (history.length > 0) {
          board = history.pop();
          selected = null;
          playTap();
          draw();
        }
      };
    }
    stage.querySelector('#mj-reset').onclick = () => {
      playTap();
      initBoard();
    };
  }

  initBoard();
}

// ============================================================================
// 3. MENTAL ROTATION (Easy, Medium, Hard with 4 options & diagonal angles)
// ============================================================================
const ROTATION_SHAPES = [
  {
    name: 'L-Block',
    svg: `<rect x="20" y="15" width="22" height="66" rx="5" fill="#5E7CE2"/>
          <rect x="20" y="59" width="52" height="22" rx="5" fill="#F2A93B"/>
          <circle cx="31" cy="28" r="5" fill="#FFF"/>`,
    wrong1: `<rect x="52" y="15" width="22" height="66" rx="5" fill="#5E7CE2"/>
             <rect x="22" y="59" width="52" height="22" rx="5" fill="#F2A93B"/>
             <circle cx="63" cy="28" r="5" fill="#FFF"/>`,
    wrong2: `<rect x="20" y="15" width="52" height="22" rx="5" fill="#5E7CE2"/>
             <rect x="20" y="59" width="52" height="22" rx="5" fill="#F2A93B"/>`,
    wrong3: `<rect x="20" y="15" width="22" height="66" rx="5" fill="#5E7CE2"/>
             <rect x="20" y="59" width="52" height="22" rx="5" fill="#F2A93B"/>
             <circle cx="60" cy="70" r="5" fill="#FFF"/>`,
  },
  {
    name: 'Flag-Boat',
    svg: `<polygon points="15,62 85,62 70,82 30,82" fill="#E86F68"/>
          <rect x="46" y="20" width="6" height="42" fill="#3D345B"/>
          <polygon points="52,20 80,32 52,44" fill="#48B884"/>`,
    wrong1: `<polygon points="15,62 85,62 70,82 30,82" fill="#E86F68"/>
             <rect x="46" y="20" width="6" height="42" fill="#3D345B"/>
             <polygon points="46,20 18,32 46,44" fill="#48B884"/>`,
    wrong2: `<polygon points="15,62 85,62 70,82 30,82" fill="#E86F68"/>
             <rect x="46" y="20" width="6" height="42" fill="#3D345B"/>
             <circle cx="49" cy="30" r="14" fill="#48B884"/>`,
    wrong3: `<polygon points="15,62 85,62 80,82 20,82" fill="#48B884"/>
             <rect x="46" y="20" width="6" height="42" fill="#3D345B"/>
             <polygon points="52,36 80,48 52,60" fill="#E86F68"/>`,
  },
  {
    name: 'Chimney-House',
    svg: `<rect x="25" y="45" width="50" height="40" rx="4" fill="#F2A93B"/>
          <rect x="56" y="18" width="12" height="26" fill="#E86F68"/>
          <polygon points="18,46 50,18 82,46" fill="#9B72CF"/>
          <circle cx="38" cy="65" r="7" fill="#FFF"/>`,
    wrong1: `<rect x="25" y="45" width="50" height="40" rx="4" fill="#F2A93B"/>
             <rect x="32" y="18" width="12" height="26" fill="#E86F68"/>
             <polygon points="18,46 50,18 82,46" fill="#9B72CF"/>
             <circle cx="62" cy="65" r="7" fill="#FFF"/>`,
    wrong2: `<rect x="25" y="45" width="50" height="40" rx="4" fill="#F2A93B"/>
             <polygon points="18,46 50,18 82,46" fill="#9B72CF"/>
             <rect x="42" y="55" width="16" height="30" fill="#FFF"/>`,
    wrong3: `<rect x="25" y="45" width="50" height="40" rx="4" fill="#F2A93B"/>
             <rect x="56" y="18" width="12" height="26" fill="#E86F68"/>
             <polygon points="18,46 50,18 82,46" fill="#9B72CF"/>
             <circle cx="62" cy="65" r="7" fill="#FFF"/>`,
  },
  {
    name: 'Step-Blocks',
    svg: `<rect x="18" y="50" width="24" height="24" rx="4" fill="#48B884"/>
          <rect x="42" y="50" width="24" height="24" rx="4" fill="#5E7CE2"/>
          <rect x="42" y="26" width="24" height="24" rx="4" fill="#E86F68"/>
          <rect x="66" y="26" width="18" height="24" rx="4" fill="#F2A93B"/>`,
    wrong1: `<rect x="58" y="50" width="24" height="24" rx="4" fill="#48B884"/>
             <rect x="34" y="50" width="24" height="24" rx="4" fill="#5E7CE2"/>
             <rect x="34" y="26" width="24" height="24" rx="4" fill="#E86F68"/>
             <rect x="16" y="26" width="18" height="24" rx="4" fill="#F2A93B"/>`,
    wrong2: `<rect x="26" y="26" width="48" height="48" rx="6" fill="#5E7CE2"/>
             <circle cx="50" cy="50" r="12" fill="#F2A93B"/>`,
    wrong3: `<rect x="18" y="50" width="24" height="24" rx="4" fill="#F2A93B"/>
             <rect x="42" y="50" width="24" height="24" rx="4" fill="#5E7CE2"/>
             <rect x="42" y="26" width="24" height="24" rx="4" fill="#48B884"/>
             <rect x="66" y="50" width="18" height="24" rx="4" fill="#E86F68"/>`,
  },
  {
    name: 'Key-Shape',
    svg: `<circle cx="32" cy="50" r="18" fill="none" stroke="#9B72CF" stroke-width="10"/>
          <rect x="48" y="45" width="38" height="10" rx="4" fill="#9B72CF"/>
          <rect x="72" y="53" width="10" height="16" rx="3" fill="#F2A93B"/>`,
    wrong1: `<circle cx="32" cy="50" r="18" fill="none" stroke="#9B72CF" stroke-width="10"/>
             <rect x="48" y="45" width="38" height="10" rx="4" fill="#9B72CF"/>
             <rect x="72" y="31" width="10" height="16" rx="3" fill="#F2A93B"/>`,
    wrong2: `<circle cx="50" cy="50" r="24" fill="none" stroke="#9B72CF" stroke-width="10"/>
             <rect x="45" y="20" width="10" height="60" fill="#F2A93B"/>`,
    wrong3: `<circle cx="32" cy="50" r="18" fill="none" stroke="#9B72CF" stroke-width="10"/>
             <rect x="48" y="45" width="38" height="10" rx="4" fill="#9B72CF"/>
             <rect x="52" y="31" width="10" height="16" rx="3" fill="#F2A93B"/>`,
  },
];

export function renderMentalRotation(stage, { t, onWin }) {
  let level = 'easy'; // easy, medium, hard
  let round = 0;
  let current = null;

  function getTotalRounds() {
    return level === 'easy' ? 5 : level === 'medium' ? 6 : 8;
  }

  function nextQuestion() {
    const shape = ROTATION_SHAPES[round % ROTATION_SHAPES.length];
    const angles =
      level === 'easy' ? [90, 180, 270] : [45, 90, 135, 180, 225, 270, 315];
    const targetAngle = angles[Math.floor(Math.random() * angles.length)];
    const rawOpts = [
      { svg: shape.svg, angle: targetAngle, correct: true },
      { svg: shape.wrong1, angle: angles[(round + 1) % angles.length], correct: false },
      { svg: shape.wrong2, angle: angles[(round + 2) % angles.length], correct: false },
    ];
    if (level === 'hard') {
      rawOpts.push({ svg: shape.wrong3, angle: angles[(round + 3) % angles.length], correct: false });
    }
    current = { shape, options: shuffle(rawOpts), answered: false };
    draw();
  }

  function draw() {
    const totalRounds = getTotalRounds();
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${level === 'easy' ? 'active' : ''}" data-lvl="easy">${t.levels.easy}</button>
        <button class="level-btn ${level === 'medium' ? 'active' : ''}" data-lvl="medium">${t.levels.medium}</button>
        <button class="level-btn ${level === 'hard' ? 'active' : ''}" data-lvl="hard">${t.levels.hard}</button>
      </div>
      <div class="game-prompt">${t.games.mentalRotation.prompt} (${round + 1}/${totalRounds})</div>
      <div class="choice-card" style="width: 145px; height: 145px; background: var(--bg-elevated);">
        <svg viewBox="0 0 100 100" width="110" height="110">${current.shape.svg}</svg>
      </div>
      <div class="choice-row">
        ${current.options
          .map(
            (opt, idx) => `
          <button class="choice-card rot-opt" data-idx="${idx}" style="width: 120px; height: 120px;">
            <svg viewBox="0 0 100 100" width="90" height="90" style="transform: rotate(${opt.angle}deg); transition: transform 0.45s ease;">
              ${opt.svg}
            </svg>
          </button>
        `
          )
          .join('')}
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        level = btn.dataset.lvl;
        round = 0;
        nextQuestion();
      };
    });

    stage.querySelectorAll('.rot-opt').forEach((btn) => {
      btn.onclick = () => {
        if (current.answered) return;
        const idx = Number(btn.dataset.idx);
        const opt = current.options[idx];
        if (opt.correct) {
          current.answered = true;
          btn.classList.add('correct');
          const svgEl = btn.querySelector('svg');
          if (svgEl) svgEl.style.transform = 'rotate(0deg)';
          playSuccess();
          setTimeout(() => {
            round++;
            if (round >= getTotalRounds()) {
              onWin();
            } else {
              nextQuestion();
            }
          }, 800);
        } else {
          btn.classList.add('wrong');
          playGentleWrong();
        }
      };
    });
  }

  nextQuestion();
}

// ============================================================================
// 4. EMOJI MAHJONG (Easy 10, Medium 14, Hard 22 across 3 layers)
// ============================================================================
export function renderEmojiMahjong(stage, { t, onWin }) {
  const icons = ['🍓', '🐳', '🌻', '🦋', '🐢', '🍄', '🐝', '🍉', '🌈', '⭐', '🦊', '🦉'];
  let level = 'easy';
  let tiles = [];
  let selectedId = null;

  function buildLayout() {
    const layouts = {
      easy: [
        { c: 1, r: 1, z: 0 }, { c: 2, r: 1, z: 0 }, { c: 3, r: 1, z: 0 }, { c: 4, r: 1, z: 0 },
        { c: 1, r: 2, z: 0 }, { c: 2, r: 2, z: 0 }, { c: 3, r: 2, z: 0 }, { c: 4, r: 2, z: 0 },
        { c: 2, r: 1.5, z: 1 }, { c: 3, r: 1.5, z: 1 },
      ],
      medium: [
        { c: 1, r: 0.5, z: 0 }, { c: 2, r: 0.5, z: 0 }, { c: 3, r: 0.5, z: 0 }, { c: 4, r: 0.5, z: 0 },
        { c: 1, r: 1.5, z: 0 }, { c: 2, r: 1.5, z: 0 }, { c: 3, r: 1.5, z: 0 }, { c: 4, r: 1.5, z: 0 },
        { c: 1, r: 2.5, z: 0 }, { c: 2, r: 2.5, z: 0 }, { c: 3, r: 2.5, z: 0 }, { c: 4, r: 2.5, z: 0 },
        { c: 2, r: 1.5, z: 1 }, { c: 3, r: 1.5, z: 1 },
      ],
      hard: [
        // 22 tiles across 3 layers (z = 0, 1, 2)
        { c: 0.5, r: 0.4, z: 0 }, { c: 1.5, r: 0.4, z: 0 }, { c: 2.5, r: 0.4, z: 0 }, { c: 3.5, r: 0.4, z: 0 }, { c: 4.5, r: 0.4, z: 0 },
        { c: 0.5, r: 1.4, z: 0 }, { c: 1.5, r: 1.4, z: 0 }, { c: 2.5, r: 1.4, z: 0 }, { c: 3.5, r: 1.4, z: 0 }, { c: 4.5, r: 1.4, z: 0 },
        { c: 0.5, r: 2.4, z: 0 }, { c: 1.5, r: 2.4, z: 0 }, { c: 2.5, r: 2.4, z: 0 }, { c: 3.5, r: 2.4, z: 0 }, { c: 4.5, r: 2.4, z: 0 },
        { c: 1.5, r: 0.9, z: 1 }, { c: 2.5, r: 0.9, z: 1 }, { c: 3.5, r: 0.9, z: 1 },
        { c: 1.5, r: 1.9, z: 1 }, { c: 2.5, r: 1.9, z: 1 }, { c: 3.5, r: 1.9, z: 1 },
        { c: 2.5, r: 1.4, z: 2 },
      ],
    };

    const coords = layouts[level] || layouts.easy;
    const pairCount = Math.floor(coords.length / 2);
    const picked = shuffle(icons).slice(0, pairCount);
    const pool = shuffle([...picked, ...picked]);

    tiles = coords.slice(0, pairCount * 2).map((pos, id) => ({
      id,
      ...pos,
      icon: pool[id],
      removed: false,
    }));
    selectedId = null;
    draw();
  }

  function isTileFree(tile) {
    if (tile.removed) return false;
    const active = tiles.filter((other) => !other.removed && other.id !== tile.id);
    const covered = active.some(
      (o) => o.z > tile.z && Math.abs(o.c - tile.c) < 0.85 && Math.abs(o.r - tile.r) < 0.85
    );
    if (covered) return false;
    const leftBlocked = active.some(
      (o) => o.z === tile.z && Math.abs(o.r - tile.r) < 0.6 && Math.abs(o.c - (tile.c - 1)) < 0.2
    );
    const rightBlocked = active.some(
      (o) => o.z === tile.z && Math.abs(o.r - tile.r) < 0.6 && Math.abs(o.c - (tile.c + 1)) < 0.2
    );
    return !(leftBlocked && rightBlocked);
  }

  function handleTileTap(tile) {
    if (!isTileFree(tile)) {
      playGentleWrong();
      return;
    }
    playTap();
    if (selectedId === tile.id) {
      selectedId = null;
      draw();
      return;
    }
    if (selectedId === null) {
      selectedId = tile.id;
      draw();
      return;
    }
    const prev = tiles.find((x) => x.id === selectedId);
    if (prev && prev.icon === tile.icon) {
      prev.removed = true;
      tile.removed = true;
      selectedId = null;
      playSuccess();
      draw();
      if (tiles.every((x) => x.removed)) {
        setTimeout(onWin, 350);
      }
    } else {
      selectedId = tile.id;
      playGentleWrong();
      draw();
    }
  }

  function draw() {
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${level === 'easy' ? 'active' : ''}" data-lvl="easy">${t.levels.easy} (10)</button>
        <button class="level-btn ${level === 'medium' ? 'active' : ''}" data-lvl="medium">${t.levels.medium} (14)</button>
        <button class="level-btn ${level === 'hard' ? 'active' : ''}" data-lvl="hard">${t.levels.hard} (22)</button>
      </div>
      <div class="game-prompt">${t.games.emojiMahjong.prompt}</div>
      <div class="mahjong-board">
        ${tiles
          .filter((tile) => !tile.removed)
          .sort((a, b) => a.z - b.z)
          .map((tile) => {
            const free = isTileFree(tile);
            const leftPx = 30 + tile.c * 72 - tile.z * 6;
            const topPx = 32 + tile.r * 86 - tile.z * 8;
            return `
              <button class="mahjong-tile ${free ? '' : 'blocked'} ${selectedId === tile.id ? 'selected' : ''}"
                data-id="${tile.id}"
                style="left: ${leftPx}px; top: ${topPx}px; z-index: ${tile.z * 10 + Math.round(tile.r)};">
                ${tile.icon}
              </button>
            `;
          })
          .join('')}
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        level = btn.dataset.lvl;
        buildLayout();
      };
    });
    stage.querySelectorAll('.mahjong-tile').forEach((btn) => {
      btn.onclick = () => {
        const tile = tiles.find((x) => x.id === Number(btn.dataset.id));
        if (tile) handleTileTap(tile);
      };
    });
  }

  buildLayout();
}

// ============================================================================
// 5. NUMBER MATCH (Same, Make 5, Make 10, Hard Make 10)
// ============================================================================
export function renderNumberMatch(stage, { t, onWin }) {
  let mode = 'same'; // 'same' | 'make5' | 'make10' | 'make10Hard'
  let cells = [];
  let selectedIdx = null;
  let hintPair = [];

  function initGrid() {
    const base =
      mode === 'same'
        ? [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
        : mode === 'make5'
        ? [1, 4, 2, 3, 1, 4, 2, 3, 5, 5, 2, 2]
        : mode === 'make10'
        ? [1, 9, 2, 8, 3, 7, 4, 6, 5, 5, 3, 3]
        : [1, 9, 2, 8, 3, 7, 4, 6, 5, 5, 6, 4, 7, 3, 8, 2, 9, 1, 5, 5];
    cells = shuffle(base).map((val, idx) => ({ idx, val, cleared: false }));
    selectedIdx = null;
    hintPair = [];
    draw();
  }

  function isMatch(a, b) {
    if (a === b) return true;
    if (mode === 'make5' && a + b === 5) return true;
    if ((mode === 'make10' || mode === 'make10Hard') && a + b === 10) return true;
    return false;
  }

  function areNeighbors(i, j) {
    if (i === j) return false;
    const cols = mode === 'make10Hard' ? 5 : 4;
    const r1 = Math.floor(i / cols);
    const c1 = i % cols;
    const r2 = Math.floor(j / cols);
    const c2 = j % cols;
    if (Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1) return true;

    const min = Math.min(i, j);
    const max = Math.max(i, j);
    let allClearedBetween = true;
    for (let k = min + 1; k < max; k++) {
      if (!cells[k].cleared) {
        allClearedBetween = false;
        break;
      }
    }
    if (allClearedBetween) return true;

    if (c1 === c2) {
      const minR = Math.min(r1, r2);
      const maxR = Math.max(r1, r2);
      let colCleared = true;
      for (let r = minR + 1; r < maxR; r++) {
        if (!cells[r * cols + c1].cleared) {
          colCleared = false;
          break;
        }
      }
      if (colCleared) return true;
    }
    return false;
  }

  function findAnyValidPair() {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].cleared) continue;
      for (let j = i + 1; j < cells.length; j++) {
        if (cells[j].cleared) continue;
        if (isMatch(cells[i].val, cells[j].val) && areNeighbors(i, j)) {
          return [i, j];
        }
      }
    }
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].cleared) continue;
      for (let j = i + 1; j < cells.length; j++) {
        if (cells[j].cleared) continue;
        if (isMatch(cells[i].val, cells[j].val)) return [i, j];
      }
    }
    return null;
  }

  function handleTap(idx) {
    if (cells[idx].cleared) return;
    hintPair = [];
    playTap();
    if (selectedIdx === idx) {
      selectedIdx = null;
      draw();
      return;
    }
    if (selectedIdx === null) {
      selectedIdx = idx;
      draw();
      return;
    }
    const a = cells[selectedIdx];
    const b = cells[idx];
    const validPair = findAnyValidPair();
    const canPair =
      isMatch(a.val, b.val) &&
      (areNeighbors(selectedIdx, idx) ||
        (validPair && validPair[0] === Math.min(selectedIdx, idx) && validPair[1] === Math.max(selectedIdx, idx)));

    if (canPair) {
      a.cleared = true;
      b.cleared = true;
      selectedIdx = null;
      playSuccess();
      draw();
      if (cells.every((c) => c.cleared)) {
        setTimeout(onWin, 350);
      }
    } else {
      selectedIdx = idx;
      playGentleWrong();
      draw();
    }
  }

  function draw() {
    const promptText =
      mode === 'same'
        ? t.games.numberMatch.promptSame
        : mode === 'make5'
        ? t.games.numberMatch.promptMake5
        : t.games.numberMatch.promptMake10;

    const cols = mode === 'make10Hard' ? 5 : 4;
    const showDots = mode !== 'make10Hard';

    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${mode === 'same' ? 'active' : ''}" data-mode="same">${t.levels.same}</button>
        <button class="level-btn ${mode === 'make5' ? 'active' : ''}" data-mode="make5">${t.levels.make5}</button>
        <button class="level-btn ${mode === 'make10' ? 'active' : ''}" data-mode="make10">${t.levels.make10}</button>
        <button class="level-btn ${mode === 'make10Hard' ? 'active' : ''}" data-mode="make10Hard">${t.levels.make10Hard}</button>
      </div>
      <div class="game-prompt">${promptText}</div>
      <div class="nummatch-grid" style="grid-template-columns: repeat(${cols}, 1fr); max-width: ${cols === 5 ? '500px' : '440px'};">
        ${cells
          .map(
            (c) => `
          <button class="nummatch-cell ${c.cleared ? 'cleared' : ''} ${selectedIdx === c.idx ? 'selected' : ''} ${
              hintPair.includes(c.idx) ? 'hinted' : ''
            }" data-idx="${c.idx}">
            <span>${c.val}</span>
            ${showDots ? `<span class="dots-helper">${'●'.repeat(c.val)}</span>` : ''}
          </button>
        `
          )
          .join('')}
      </div>
      <div class="choice-row">
        <button class="pill-btn" id="nm-hint">${t.hint}</button>
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        mode = btn.dataset.mode;
        initGrid();
      };
    });
    stage.querySelectorAll('.nummatch-cell').forEach((btn) => {
      btn.onclick = () => handleTap(Number(btn.dataset.idx));
    });
    stage.querySelector('#nm-hint').onclick = () => {
      const pair = findAnyValidPair();
      if (pair) {
        hintPair = pair;
        playTap();
        draw();
      }
    };
  }

  initGrid();
}

// ============================================================================
// 6. TARGET TAP (Easy 4x3, Medium 4x4, Hard 5x5)
// ============================================================================
export function renderTargetTap(stage, { t, onWin }) {
  const pool = ['🐞', '🐝', '🦋', '🐢', '🐸', '🐬', '🦊', '🦉', '🦀', '🐌'];
  let level = 'easy'; // easy, medium, hard
  let round = 0;
  let targetIcon = '';
  let items = [];

  function getTotalRounds() {
    return level === 'easy' ? 4 : level === 'medium' ? 5 : 6;
  }

  function initRound() {
    const shuffled = shuffle(pool);
    targetIcon = shuffled[0];
    const distractors = shuffled.slice(1, 6);
    const totalCells = level === 'easy' ? 12 : level === 'medium' ? 16 : 25;
    const targetCount = level === 'easy' ? 3 : level === 'medium' ? 5 : 7;
    const distractorCount = totalCells - targetCount;

    const raw = [];
    for (let i = 0; i < targetCount; i++) raw.push({ icon: targetIcon, isTarget: true, found: false });
    for (let i = 0; i < distractorCount; i++) {
      raw.push({ icon: distractors[i % distractors.length], isTarget: false, found: false });
    }
    items = shuffle(raw).map((item, id) => ({ ...item, id }));
    draw();
  }

  function draw() {
    const cols = level === 'hard' ? 5 : 4;
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${level === 'easy' ? 'active' : ''}" data-lvl="easy">${t.levels.easy}</button>
        <button class="level-btn ${level === 'medium' ? 'active' : ''}" data-lvl="medium">${t.levels.medium}</button>
        <button class="level-btn ${level === 'hard' ? 'active' : ''}" data-lvl="hard">${t.levels.hard}</button>
      </div>
      <div class="game-prompt">
        <span>${t.games.targetTap.prompt}</span>
        <span style="font-size: 2rem;">${targetIcon}</span>
        <span>(${round + 1}/${getTotalRounds()})</span>
      </div>
      <div class="memory-grid" style="grid-template-columns: repeat(${cols}, 1fr); max-width: ${cols === 5 ? '500px' : '440px'};">
        ${items
          .map(
            (it) => `
          <button class="schulte-cell ${it.found ? 'found' : ''}" data-id="${it.id}" style="font-size: 2rem;">
            ${it.found ? '✓' : it.icon}
          </button>
        `
          )
          .join('')}
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        level = btn.dataset.lvl;
        round = 0;
        initRound();
      };
    });

    stage.querySelectorAll('.schulte-cell').forEach((btn) => {
      btn.onclick = () => {
        const it = items.find((x) => x.id === Number(btn.dataset.id));
        if (!it || it.found) return;
        if (it.isTarget) {
          it.found = true;
          playSuccess();
          draw();
          if (items.filter((x) => x.isTarget).every((x) => x.found)) {
            setTimeout(() => {
              round++;
              if (round >= getTotalRounds()) onWin();
              else initRound();
            }, 400);
          }
        } else {
          playGentleWrong();
        }
      };
    });
  }

  initRound();
}

// ============================================================================
// 7. WHACK-A-MOLE (Easy, Medium, Hard)
// ============================================================================
export function renderWhackAMole(stage, { t, onWin }) {
  let speed = 'easy'; // easy: 2200ms, medium: 1550ms, hard: 1050ms
  let caught = 0;
  let activeHole = -1;
  let isFlower = false;
  let timer = null;

  function getGoal() {
    return speed === 'easy' ? 8 : speed === 'medium' ? 10 : 14;
  }

  function stepMole() {
    activeHole = Math.floor(Math.random() * 9);
    isFlower = Math.random() < (speed === 'hard' ? 0.3 : 0.2);
    draw();
  }

  function startLoop() {
    if (timer) clearInterval(timer);
    const ms = speed === 'easy' ? 2200 : speed === 'medium' ? 1550 : 1050;
    stepMole();
    timer = setInterval(stepMole, ms);
  }

  function draw() {
    const goal = getGoal();
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${speed === 'easy' ? 'active' : ''}" data-spd="easy">${t.levels.easy}</button>
        <button class="level-btn ${speed === 'medium' ? 'active' : ''}" data-spd="medium">${t.levels.medium}</button>
        <button class="level-btn ${speed === 'hard' ? 'active' : ''}" data-spd="hard">${t.levels.hard}</button>
      </div>
      <div class="game-prompt">${t.games.whackAMole.prompt} (${caught}/${goal})</div>
      <div class="mole-grid">
        ${Array.from({ length: 9 })
          .map((_, idx) => {
            const active = idx === activeHole;
            return `
              <button class="mole-hole ${active ? 'active-mole' : ''}" data-idx="${idx}">
                ${active ? (isFlower ? '🌸' : '🐹') : ''}
              </button>
            `;
          })
          .join('')}
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        speed = btn.dataset.spd;
        caught = 0;
        startLoop();
      };
    });

    stage.querySelectorAll('.mole-hole').forEach((btn) => {
      btn.onclick = () => {
        const idx = Number(btn.dataset.idx);
        if (idx !== activeHole) return;
        if (isFlower) {
          playGentleWrong();
          activeHole = -1;
          draw();
        } else {
          caught++;
          activeHole = -1;
          playSuccess();
          draw();
          if (caught >= getGoal()) {
            clearInterval(timer);
            setTimeout(onWin, 350);
          }
        }
      };
    });
  }

  startLoop();
  return () => {
    if (timer) clearInterval(timer);
  };
}

// ============================================================================
// 8. SCHULTE TABLES (2x2, 3x3, 4x4, 5x5)
// ============================================================================
export function renderSchulteTable(stage, { t, onWin }) {
  let size = 3; // 2, 3, 4, 5
  let numbers = [];
  let nextNum = 1;

  function initGrid() {
    const total = size * size;
    numbers = shuffle(Array.from({ length: total }, (_, i) => i + 1));
    nextNum = 1;
    draw();
  }

  function draw() {
    const total = size * size;
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${size === 2 ? 'active' : ''}" data-sz="2">2×2 (1–4)</button>
        <button class="level-btn ${size === 3 ? 'active' : ''}" data-sz="3">3×3 (1–9)</button>
        <button class="level-btn ${size === 4 ? 'active' : ''}" data-sz="4">4×4 (1–16)</button>
        <button class="level-btn ${size === 5 ? 'active' : ''}" data-sz="5">5×5 (1–25)</button>
      </div>
      <div class="game-prompt">
        <span>${t.games.schulteTable.prompt}</span>
        <strong style="font-size: 1.6rem; color: var(--accent-primary);">${nextNum <= total ? nextNum : '✓'}</strong>
      </div>
      <div class="schulte-grid" style="grid-template-columns: repeat(${size}, 1fr); max-width: ${size === 5 ? '480px' : '420px'};">
        ${numbers
          .map(
            (n) => `
          <button class="schulte-cell ${n < nextNum ? 'found' : ''}" data-n="${n}" style="font-size: ${size === 5 ? '1.45rem' : '1.9rem'};">
            ${n}
          </button>
        `
          )
          .join('')}
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        size = Number(btn.dataset.sz);
        initGrid();
      };
    });

    stage.querySelectorAll('.schulte-cell').forEach((btn) => {
      btn.onclick = () => {
        const n = Number(btn.dataset.n);
        if (n === nextNum) {
          nextNum++;
          playSuccess();
          draw();
          if (nextNum > total) {
            setTimeout(onWin, 350);
          }
        } else if (n > nextNum) {
          playGentleWrong();
        }
      };
    });
  }

  initGrid();
}

// ============================================================================
// 9. SEQUENCE MEMORY (Easy 4, Medium 6, Hard 8)
// ============================================================================
export function renderSequenceMemory(stage, { t, onWin }) {
  const pads = [
    { id: 0, color: '#E86F68', icon: '🍓' },
    { id: 1, color: '#5E7CE2', icon: '🐳' },
    { id: 2, color: '#48B884', icon: '🐸' },
    { id: 3, color: '#F2A93B', icon: '⭐' },
  ];

  let targetLen = 4; // 4, 6, 8
  let sequence = [];
  let userStep = 0;
  let playingSeq = false;
  let litPad = -1;
  let timeouts = [];

  function clearTimers() {
    timeouts.forEach((id) => clearTimeout(id));
    timeouts = [];
  }

  function startNewGame() {
    clearTimers();
    sequence = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
    userStep = 0;
    playSequence();
  }

  function playSequence() {
    playingSeq = true;
    userStep = 0;
    litPad = -1;
    draw();

    sequence.forEach((padId, i) => {
      const t1 = setTimeout(() => {
        litPad = padId;
        playTap();
        draw();
      }, 550 + i * 700);
      const t2 = setTimeout(() => {
        litPad = -1;
        draw();
      }, 550 + i * 700 + 420);
      timeouts.push(t1, t2);
    });

    const tEnd = setTimeout(() => {
      playingSeq = false;
      litPad = -1;
      draw();
    }, 550 + sequence.length * 700 + 100);
    timeouts.push(tEnd);
  }

  function handlePadTap(id) {
    if (playingSeq) return;
    litPad = id;
    playTap();
    draw();
    setTimeout(() => {
      litPad = -1;
      draw();
    }, 200);

    if (id === sequence[userStep]) {
      userStep++;
      if (userStep >= sequence.length) {
        playSuccess();
        if (sequence.length >= targetLen) {
          setTimeout(onWin, 450);
        } else {
          sequence.push(Math.floor(Math.random() * 4));
          const tNext = setTimeout(playSequence, 700);
          timeouts.push(tNext);
        }
      }
    } else {
      playGentleWrong();
      const tReplay = setTimeout(playSequence, 800);
      timeouts.push(tReplay);
    }
  }

  function draw() {
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${targetLen === 4 ? 'active' : ''}" data-len="4">${t.levels.easy} (4)</button>
        <button class="level-btn ${targetLen === 6 ? 'active' : ''}" data-len="6">${t.levels.medium} (6)</button>
        <button class="level-btn ${targetLen === 8 ? 'active' : ''}" data-len="8">${t.levels.hard} (8)</button>
      </div>
      <div class="game-prompt">
        ${playingSeq ? t.games.sequenceMemory.watchPrompt : t.games.sequenceMemory.tapPrompt}
        (${sequence.length}/${targetLen})
      </div>
      <div class="seq-grid">
        ${pads
          .map(
            (p) => `
          <button class="seq-pad ${litPad === p.id ? 'lit' : ''}" data-id="${p.id}" style="background: ${p.color};">
            ${p.icon}
          </button>
        `
          )
          .join('')}
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        targetLen = Number(btn.dataset.len);
        startNewGame();
      };
    });

    stage.querySelectorAll('.seq-pad').forEach((btn) => {
      btn.onclick = () => handlePadTap(Number(btn.dataset.id));
    });
  }

  startNewGame();
  return () => clearTimers();
}

// ============================================================================
// 10. FLAGS OF THE WORLD (Easy 2, Medium 4, Hard 6 + Bundled Offline MP3 Voice!)
// ============================================================================
export function renderFlagsWorld(stage, { t, lang, onWin }) {
  let choiceCount = 2; // 2 (easy), 4 (medium), 6 (hard)
  let round = 0;
  let currentTarget = null;
  let options = [];
  let locked = false;

  function getTotalRounds() {
    return choiceCount === 2 ? 6 : choiceCount === 4 ? 8 : 10;
  }

  function speakCurrent() {
    if (!currentTarget) return;
    const countryName = lang === 'el' ? currentTarget.el : currentTarget.en;
    speakFlagPrompt(currentTarget.code, `${t.games.flagsWorld.voicePrefix}${countryName}`, lang);
  }

  function nextQuestion() {
    locked = false;
    const pool = choiceCount === 2 ? FLAGS_DATA.filter((f) => f.tier === 1) : FLAGS_DATA;
    const picked = shuffle(pool).slice(0, choiceCount);
    currentTarget = picked[Math.floor(Math.random() * picked.length)];
    options = picked.map((f) => ({ ...f, status: '' }));
    draw();
    setTimeout(speakCurrent, 180);
  }

  function draw() {
    const countryName = lang === 'el' ? currentTarget.el : currentTarget.en;
    const totalRounds = getTotalRounds();
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${choiceCount === 2 ? 'active' : ''}" data-cnt="2">${t.levels.easy} (2)</button>
        <button class="level-btn ${choiceCount === 4 ? 'active' : ''}" data-cnt="4">${t.levels.medium} (4)</button>
        <button class="level-btn ${choiceCount === 6 ? 'active' : ''}" data-cnt="6">${t.levels.hard} (6)</button>
      </div>
      <div class="game-prompt">
        <span>${t.games.flagsWorld.prompt} <strong>${countryName}</strong> (${round + 1}/${totalRounds})</span>
        <button class="speak-big-btn" id="flag-speak-btn">${t.listen}</button>
      </div>
      <div class="flags-grid" style="${choiceCount === 6 ? 'grid-template-columns: repeat(3, 1fr); max-width: 680px;' : ''}">
        ${options
          .map(
            (opt, idx) => `
          <button class="flag-card choice-card ${opt.status}" data-idx="${idx}">
            <div class="flag-svg-wrap">${opt.svg}</div>
          </button>
        `
          )
          .join('')}
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        choiceCount = Number(btn.dataset.cnt);
        round = 0;
        nextQuestion();
      };
    });

    stage.querySelector('#flag-speak-btn').onclick = () => speakCurrent();

    stage.querySelectorAll('.flag-card').forEach((btn) => {
      btn.onclick = () => {
        if (locked) return;
        const opt = options[Number(btn.dataset.idx)];
        if (opt.code === currentTarget.code) {
          locked = true;
          opt.status = 'correct';
          playSuccess();
          draw();
          setTimeout(() => {
            round++;
            if (round >= getTotalRounds()) onWin();
            else nextQuestion();
          }, 650);
        } else {
          opt.status = 'wrong';
          playGentleWrong();
          draw();
        }
      };
    });
  }

  nextQuestion();
  return () => stopSpokenAudio();
}

import { playTap, playSuccess, playGentleWrong, playMelodyNote } from './audio.js';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================================================
// 11. COLOR & SHAPE SUDOKU (3x3 Easy, 4x4 Medium, 6x6 Hard)
// ============================================================================
export function renderColorSudoku(stage, { t, onWin }) {
  const palette = [
    { val: 1, bg: '#FCEAE8', border: '#E86F68', icon: '🔴' },
    { val: 2, bg: '#E8EEFC', border: '#5E7CE2', icon: '🔵' },
    { val: 3, bg: '#E4F7EE', border: '#48B884', icon: '🟢' },
    { val: 4, bg: '#FDF3E1', border: '#F2A93B', icon: '⭐' },
    { val: 5, bg: '#F2EBF9', border: '#9B72CF', icon: '🟣' },
    { val: 6, bg: '#E3F4F4', border: '#38A3A5', icon: '🔶' },
  ];

  const templates3 = [
    {
      solution: [
        [1, 2, 3],
        [2, 3, 1],
        [3, 1, 2],
      ],
      mask: [
        [1, 0, 1],
        [0, 1, 1],
        [1, 1, 0],
      ],
    },
    {
      solution: [
        [3, 1, 2],
        [1, 2, 3],
        [2, 3, 1],
      ],
      mask: [
        [1, 1, 0],
        [0, 1, 1],
        [1, 0, 1],
      ],
    },
  ];

  const templates4 = [
    {
      solution: [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 1, 4, 3],
        [4, 3, 2, 1],
      ],
      mask: [
        [1, 0, 1, 0],
        [1, 1, 0, 1],
        [0, 1, 1, 0],
        [1, 0, 0, 1],
      ],
    },
    {
      solution: [
        [2, 4, 1, 3],
        [1, 3, 4, 2],
        [4, 2, 3, 1],
        [3, 1, 2, 4],
      ],
      mask: [
        [1, 1, 0, 0],
        [0, 1, 1, 1],
        [1, 0, 1, 0],
        [0, 1, 1, 0],
      ],
    },
  ];

  const templates6 = [
    {
      solution: [
        [1, 2, 3, 4, 5, 6],
        [4, 5, 6, 1, 2, 3],
        [2, 3, 1, 5, 6, 4],
        [5, 6, 4, 2, 3, 1],
        [3, 1, 2, 6, 4, 5],
        [6, 4, 5, 3, 1, 2],
      ],
      mask: [
        [1, 0, 1, 1, 0, 1],
        [1, 1, 0, 0, 1, 1],
        [0, 1, 1, 1, 0, 0],
        [1, 0, 1, 0, 1, 1],
        [0, 1, 0, 1, 1, 0],
        [1, 1, 0, 1, 0, 1],
      ],
    },
  ];

  let size = 3; // 3, 4, or 6
  let grid = [];
  let fixed = [];
  let currentSolution = [];
  let selectedCell = null;

  function initBoard() {
    const list = size === 3 ? templates3 : size === 4 ? templates4 : templates6;
    const tpl = list[Math.floor(Math.random() * list.length)];
    currentSolution = tpl.solution.map((row) => [...row]);
    grid = tpl.solution.map((row, r) => row.map((v, c) => (tpl.mask[r][c] ? v : 0)));
    fixed = tpl.mask.map((row) => [...row]);
    selectedCell = null;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!fixed[r][c]) {
          selectedCell = { r, c };
          break;
        }
      }
      if (selectedCell) break;
    }
    draw();
  }

  function hasConflict(r, c, val) {
    if (!val) return false;
    for (let i = 0; i < size; i++) {
      if (i !== c && grid[r][i] === val) return true;
      if (i !== r && grid[i][c] === val) return true;
    }
    if (size === 4) {
      const br = Math.floor(r / 2) * 2;
      const bc = Math.floor(c / 2) * 2;
      for (let rr = br; rr < br + 2; rr++) {
        for (let cc = bc; cc < bc + 2; cc++) {
          if ((rr !== r || cc !== c) && grid[rr][cc] === val) return true;
        }
      }
    } else if (size === 6) {
      const br = Math.floor(r / 2) * 2;
      const bc = Math.floor(c / 3) * 3;
      for (let rr = br; rr < br + 2; rr++) {
        for (let cc = bc; cc < bc + 3; cc++) {
          if ((rr !== r || cc !== c) && grid[rr][cc] === val) return true;
        }
      }
    }
    return false;
  }

  function isSolved() {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!grid[r][c] || hasConflict(r, c, grid[r][c])) return false;
      }
    }
    return true;
  }

  function handleSwatchTap(val) {
    if (!selectedCell) return;
    const { r, c } = selectedCell;
    if (fixed[r][c]) return;
    grid[r][c] = val;
    if (hasConflict(r, c, val)) {
      playGentleWrong();
    } else {
      playSuccess();
    }
    draw();
    if (isSolved()) {
      setTimeout(onWin, 350);
    }
  }

  function draw() {
    const activePalette = palette.slice(0, size);
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${size === 3 ? 'active' : ''}" data-sz="3">3×3 (${t.levels.easy})</button>
        <button class="level-btn ${size === 4 ? 'active' : ''}" data-sz="4">4×4 (${t.levels.medium})</button>
        <button class="level-btn ${size === 6 ? 'active' : ''}" data-sz="6">6×6 (${t.levels.hard})</button>
      </div>
      <div class="game-prompt">${t.games.colorSudoku.prompt}</div>
      <div class="sudoku-grid" style="grid-template-columns: repeat(${size}, 1fr); max-width: ${size === 6 ? '460px' : '400px'};">
        ${grid
          .map((row, r) =>
            row
              .map((val, c) => {
                const sw = palette.find((p) => p.val === val);
                const isSel = selectedCell && selectedCell.r === r && selectedCell.c === c;
                const conflict = hasConflict(r, c, val);
                return `
                  <button class="sudoku-cell ${fixed[r][c] ? 'fixed' : ''} ${isSel ? 'selected' : ''} ${
                  conflict ? 'conflict' : ''
                }"
                    data-r="${r}" data-c="${c}"
                    style="${sw ? `background:${sw.bg};` : ''} font-size: ${size === 6 ? '1.35rem' : '1.7rem'};">
                    ${sw ? sw.icon : '·'}
                  </button>
                `;
              })
              .join('')
          )
          .join('')}
      </div>
      <div class="palette-bar">
        ${activePalette
          .map(
            (sw) => `
          <button class="palette-swatch" data-val="${sw.val}" style="background:${sw.bg}; border-color:${sw.border};">
            ${sw.icon}
          </button>
        `
          )
          .join('')}
      </div>
      <div class="choice-row">
        <button class="pill-btn" id="sudoku-hint">${t.hint}</button>
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        size = Number(btn.dataset.sz);
        initBoard();
      };
    });

    stage.querySelectorAll('.sudoku-cell').forEach((btn) => {
      btn.onclick = () => {
        const r = Number(btn.dataset.r);
        const c = Number(btn.dataset.c);
        if (fixed[r][c]) return;
        playTap();
        selectedCell = { r, c };
        draw();
      };
    });

    stage.querySelectorAll('.palette-swatch').forEach((btn) => {
      btn.onclick = () => handleSwatchTap(Number(btn.dataset.val));
    });

    const hintBtn = stage.querySelector('#sudoku-hint');
    if (hintBtn) {
      hintBtn.onclick = () => {
        let target = selectedCell;
        if (!target || fixed[target.r][target.c] || grid[target.r][target.c] === currentSolution[target.r][target.c]) {
          target = null;
          for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
              if (!fixed[r][c] && grid[r][c] !== currentSolution[r][c]) {
                target = { r, c };
                break;
              }
            }
            if (target) break;
          }
        }
        if (target) {
          selectedCell = target;
          handleSwatchTap(currentSolution[target.r][target.c]);
        }
      };
    }
  }

  initBoard();
}

// ============================================================================
// 12. VISUAL MATH & COUNTING (Count, Add, Sub, Mixed up to 20)
// ============================================================================
export function renderVisualMath(stage, { t, onWin }) {
  const emojis = ['🍎', '🍓', '🍌', '🌟', '🦋', '🐞', '🍊'];
  let mode = 'count'; // 'count' | 'add' | 'sub' | 'mixedHard'
  let round = 0;
  const totalRounds = 5;
  let problem = null;

  function makeProblem() {
    const icon = emojis[Math.floor(Math.random() * emojis.length)];
    let a = 1;
    let b = 1;
    let op = '+';
    let answer = 2;

    if (mode === 'count') {
      answer = 2 + Math.floor(Math.random() * 8); // 2..9
      a = answer;
    } else if (mode === 'add') {
      a = 1 + Math.floor(Math.random() * 5); // 1..5
      b = 1 + Math.floor(Math.random() * 5); // 1..5
      op = '+';
      answer = a + b;
    } else if (mode === 'sub') {
      a = 3 + Math.floor(Math.random() * 6); // 3..8
      b = 1 + Math.floor(Math.random() * (a - 1));
      op = '-';
      answer = a - b;
    } else {
      // mixedHard: addition and subtraction up to 20
      if (Math.random() < 0.55) {
        a = 5 + Math.floor(Math.random() * 8); // 5..12
        b = 3 + Math.floor(Math.random() * 8); // 3..10
        op = '+';
        answer = a + b;
      } else {
        a = 10 + Math.floor(Math.random() * 10); // 10..19
        b = 3 + Math.floor(Math.random() * (a - 4));
        op = '-';
        answer = a - b;
      }
    }

    const opts = new Set([answer]);
    while (opts.size < (mode === 'mixedHard' ? 4 : 3)) {
      const cand = Math.max(1, answer + (Math.floor(Math.random() * 7) - 3));
      opts.add(cand);
    }

    problem = {
      icon,
      a,
      b,
      op,
      answer,
      options: shuffle([...opts]).map((v) => ({ val: v, status: '' })),
      locked: false,
    };
    draw();
  }

  function draw() {
    const promptText =
      mode === 'count'
        ? t.games.visualMath.promptCount
        : problem.op === '+'
        ? t.games.visualMath.promptAdd
        : t.games.visualMath.promptSub;

    let visualHtml = '';
    if (mode === 'count') {
      visualHtml = `
        <div class="train-track" style="font-size: 2.5rem; gap: 14px; max-width: 440px;">
          ${Array.from({ length: problem.a })
            .map(() => `<span>${problem.icon}</span>`)
            .join('')}
        </div>
      `;
    } else if (problem.op === '+') {
      visualHtml = `
        <div class="train-track" style="font-size: ${mode === 'mixedHard' ? '1.7rem' : '2.2rem'}; gap: 10px; max-width: 520px;">
          <div style="display:flex; gap:4px; flex-wrap:wrap; justify-content:center;">
            ${Array.from({ length: problem.a }).map(() => `<span>${problem.icon}</span>`).join('')}
          </div>
          <strong style="font-size: 2rem; color: var(--accent-primary);">+</strong>
          <div style="display:flex; gap:4px; flex-wrap:wrap; justify-content:center;">
            ${Array.from({ length: problem.b }).map(() => `<span>${problem.icon}</span>`).join('')}
          </div>
          <strong style="font-size: 2rem; color: var(--accent-primary);">= ?</strong>
        </div>
        <div style="font-size: 1.65rem; font-weight: 800; margin-bottom: 8px;">${problem.a} + ${problem.b} = ?</div>
      `;
    } else {
      visualHtml = `
        <div class="train-track" style="font-size: ${mode === 'mixedHard' ? '1.75rem' : '2.3rem'}; gap: 8px; max-width: 520px;">
          ${Array.from({ length: problem.a })
            .map(
              (_, idx) =>
                `<span style="${idx >= problem.answer ? 'opacity: 0.25; text-decoration: line-through;' : ''}">${
                  problem.icon
                }</span>`
            )
            .join('')}
        </div>
        <div style="font-size: 1.65rem; font-weight: 800; margin-bottom: 8px;">${problem.a} - ${problem.b} = ?</div>
      `;
    }

    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${mode === 'count' ? 'active' : ''}" data-m="count">${t.levels.count}</button>
        <button class="level-btn ${mode === 'add' ? 'active' : ''}" data-m="add">${t.levels.add}</button>
        <button class="level-btn ${mode === 'sub' ? 'active' : ''}" data-m="sub">${t.levels.sub}</button>
        <button class="level-btn ${mode === 'mixedHard' ? 'active' : ''}" data-m="mixedHard">${t.levels.mixedHard}</button>
      </div>
      <div class="game-prompt">${promptText} (${round + 1}/${totalRounds})</div>
      ${visualHtml}
      <div class="choice-row">
        ${problem.options
          .map(
            (opt, idx) => `
          <button class="choice-card math-opt ${opt.status}" data-idx="${idx}">
            <span>${opt.val}</span>
            ${opt.val <= 10 ? `<span class="dots-helper">${'●'.repeat(opt.val)}</span>` : ''}
          </button>
        `
          )
          .join('')}
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        mode = btn.dataset.m;
        round = 0;
        makeProblem();
      };
    });

    stage.querySelectorAll('.math-opt').forEach((btn) => {
      btn.onclick = () => {
        if (problem.locked) return;
        const opt = problem.options[Number(btn.dataset.idx)];
        if (opt.val === problem.answer) {
          problem.locked = true;
          opt.status = 'correct';
          playSuccess();
          draw();
          setTimeout(() => {
            round++;
            if (round >= totalRounds) onWin();
            else makeProblem();
          }, 600);
        } else {
          opt.status = 'wrong';
          playGentleWrong();
          draw();
        }
      };
    });
  }

  makeProblem();
}

// ============================================================================
// 13. PATTERN TRAIN (Easy, Medium, Hard)
// ============================================================================
export function renderPatternTrain(stage, { t, onWin }) {
  const sets = [
    ['🔴', '🔵', '🟢', '⭐'],
    ['🍎', '🍌', '🍓', '🍊'],
    ['🐶', '🐱', '🐰', '🐸'],
    ['🌞', '🌙', '⭐', '☁️'],
  ];

  let level = 'easy'; // easy, medium, hard
  let round = 0;
  const totalRounds = 5;
  let current = null;

  function nextPattern() {
    const items = shuffle(sets[round % sets.length]);
    const [A, B, C, D] = items;

    const easyPatterns = [
      { seq: [A, B, A, B], ans: A },
      { seq: [A, B, A, B, A], ans: B },
      { seq: [A, A, B, A, A], ans: B },
    ];
    const mediumPatterns = [
      { seq: [A, B, C, A, B], ans: C },
      { seq: [A, B, B, A, B], ans: B },
      { seq: [A, A, B, B, A], ans: A },
    ];
    const hardPatterns = [
      { seq: [A, B, A, C, A, B, A], ans: C },
      { seq: [A, B, C, D, A, B, C], ans: D },
      { seq: [A, B, B, C, A, B, B], ans: C },
      { seq: [A, B, C, C, B, A, A, B], ans: C },
    ];

    const list = level === 'easy' ? easyPatterns : level === 'medium' ? mediumPatterns : hardPatterns;
    const picked = list[round % list.length];
    const optPool = level === 'hard' ? [A, B, C, D] : [A, B, C];
    const options = shuffle(optPool).map((icon) => ({ icon, status: '' }));
    current = { ...picked, options, locked: false };
    draw();
  }

  function draw() {
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${level === 'easy' ? 'active' : ''}" data-lvl="easy">${t.levels.easy}</button>
        <button class="level-btn ${level === 'medium' ? 'active' : ''}" data-lvl="medium">${t.levels.medium}</button>
        <button class="level-btn ${level === 'hard' ? 'active' : ''}" data-lvl="hard">${t.levels.hard}</button>
      </div>
      <div class="game-prompt">${t.games.patternTrain.prompt} (${round + 1}/${totalRounds})</div>
      <div class="train-track">
        <div class="train-car" style="background: var(--accent-amber-soft);">🚂</div>
        ${current.seq.map((ic) => `<div class="train-car">${ic}</div>`).join('')}
        <div class="train-car mystery">${current.locked ? current.ans : '?'}</div>
      </div>
      <div class="choice-row">
        ${current.options
          .map(
            (opt, idx) => `
          <button class="choice-card pat-opt ${opt.status}" data-idx="${idx}">
            ${opt.icon}
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
        nextPattern();
      };
    });

    stage.querySelectorAll('.pat-opt').forEach((btn) => {
      btn.onclick = () => {
        if (current.locked) return;
        const opt = current.options[Number(btn.dataset.idx)];
        if (opt.icon === current.ans) {
          current.locked = true;
          opt.status = 'correct';
          playSuccess();
          draw();
          setTimeout(() => {
            round++;
            if (round >= totalRounds) onWin();
            else nextPattern();
          }, 650);
        } else {
          opt.status = 'wrong';
          playGentleWrong();
          draw();
        }
      };
    });
  }

  nextPattern();
}

// ============================================================================
// 14. ODD ONE OUT (Easy 4, Medium 6, Hard 9)
// ============================================================================
export function renderOddOneOut(stage, { t, onWin }) {
  const puzzles = [
    { same: ['🐶', '🐱', '🐰', '🐼', '🦊', '🐨', '🐸', '🦁'], odd: '🚗' },
    { same: ['🍎', '🍓', '🍌', '🍊', '🍉', '🍇', '🍐', '🍒'], odd: '👟' },
    { same: ['✈️', '🚁', '🚀', '🛸', '🛩️', '🪂', '🎈', '🦅'], odd: '🐟' },
    { same: ['🌻', '🌷', '🌹', '🌺', '🌼', '🌸', '💐', '🪷'], odd: '🎸' },
    { same: ['🟢', '🟢', '🟢', '🟢', '🟢', '🟢', '🟢', '🟢'], odd: '🔵' },
    { same: ['⬆️', '⬆️', '⬆️', '⬆️', '⬆️', '⬆️', '⬆️', '⬆️'], odd: '↗️' },
  ];

  let level = 'easy'; // easy (4), medium (6), hard (9)
  let round = 0;
  const totalRounds = 5;
  let cards = [];
  let locked = false;

  function nextPuzzle() {
    locked = false;
    const p = puzzles[round % puzzles.length];
    const sameCount = level === 'easy' ? 3 : level === 'medium' ? 5 : 8;
    cards = shuffle([
      ...p.same.slice(0, sameCount).map((icon) => ({ icon, isOdd: false, status: '' })),
      { icon: p.odd, isOdd: true, status: '' },
    ]);
    draw();
  }

  function draw() {
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${level === 'easy' ? 'active' : ''}" data-lvl="easy">${t.levels.easy} (4)</button>
        <button class="level-btn ${level === 'medium' ? 'active' : ''}" data-lvl="medium">${t.levels.medium} (6)</button>
        <button class="level-btn ${level === 'hard' ? 'active' : ''}" data-lvl="hard">${t.levels.hard} (9)</button>
      </div>
      <div class="game-prompt">${t.games.oddOneOut.prompt} (${round + 1}/${totalRounds})</div>
      <div class="choice-row" style="max-width: 460px;">
        ${cards
          .map(
            (c, idx) => `
          <button class="choice-card odd-opt ${c.status}" data-idx="${idx}" style="font-size: 2.7rem;">
            ${c.icon}
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
        nextPuzzle();
      };
    });

    stage.querySelectorAll('.odd-opt').forEach((btn) => {
      btn.onclick = () => {
        if (locked) return;
        const c = cards[Number(btn.dataset.idx)];
        if (c.isOdd) {
          locked = true;
          c.status = 'correct';
          playSuccess();
          draw();
          setTimeout(() => {
            round++;
            if (round >= totalRounds) onWin();
            else nextPuzzle();
          }, 600);
        } else {
          c.status = 'wrong';
          playGentleWrong();
          draw();
        }
      };
    });
  }

  nextPuzzle();
}

// ============================================================================
// 15. TOWER OF HANOI (3, 4, or 5 Rainbow Rings)
// ============================================================================
export function renderTowerHanoi(stage, { t, onWin }) {
  const ringStyles = [
    { size: 1, width: '36%', color: '#E86F68' },
    { size: 2, width: '50%', color: '#F2A93B' },
    { size: 3, width: '64%', color: '#48B884' },
    { size: 4, width: '78%', color: '#5E7CE2' },
    { size: 5, width: '92%', color: '#9B72CF' },
  ];

  let diskCount = 3; // 3, 4, or 5
  let pegs = [[], [], []];
  let selectedPeg = null;

  function initTower() {
    pegs = [Array.from({ length: diskCount }, (_, i) => i + 1), [], []];
    selectedPeg = null;
    draw();
  }

  function handlePegTap(idx) {
    if (selectedPeg === null) {
      if (pegs[idx].length === 0) return;
      selectedPeg = idx;
      playTap();
      draw();
      return;
    }
    if (selectedPeg === idx) {
      selectedPeg = null;
      playTap();
      draw();
      return;
    }

    const fromPeg = pegs[selectedPeg];
    const toPeg = pegs[idx];
    const movingDisk = fromPeg[0];
    if (toPeg.length === 0 || toPeg[0] > movingDisk) {
      fromPeg.shift();
      toPeg.unshift(movingDisk);
      selectedPeg = null;
      playSuccess();
      draw();
      if (pegs[2].length === diskCount) {
        setTimeout(onWin, 400);
      }
    } else {
      selectedPeg = null;
      playGentleWrong();
      draw();
    }
  }

  function draw() {
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${diskCount === 3 ? 'active' : ''}" data-cnt="3">3 (${t.levels.easy})</button>
        <button class="level-btn ${diskCount === 4 ? 'active' : ''}" data-cnt="4">4 (${t.levels.medium})</button>
        <button class="level-btn ${diskCount === 5 ? 'active' : ''}" data-cnt="5">5 (${t.levels.hard})</button>
      </div>
      <div class="game-prompt">${t.games.towerHanoi.prompt}</div>
      <div class="hanoi-stage">
        ${pegs
          .map(
            (peg, idx) => `
          <button class="hanoi-peg ${selectedPeg === idx ? 'selected' : ''}" data-peg="${idx}">
            <div class="hanoi-rod"></div>
            ${peg
              .map((sz) => {
                const st = ringStyles[sz - 1];
                return `<div class="hanoi-disk" style="width:${st.width}; background:${st.color};"></div>`;
              })
              .join('')}
          </button>
        `
          )
          .join('')}
      </div>
      <div class="choice-row">
        <button class="pill-btn" id="hanoi-reset">${t.reset}</button>
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        diskCount = Number(btn.dataset.cnt);
        initTower();
      };
    });

    stage.querySelectorAll('.hanoi-peg').forEach((btn) => {
      btn.onclick = () => handlePegTap(Number(btn.dataset.peg));
    });

    stage.querySelector('#hanoi-reset').onclick = () => {
      playTap();
      initTower();
    };
  }

  initTower();
}

// ============================================================================
// 16. SHADOWS & SORTING (Easy 3, Hard 6 Shadows + Category Baskets)
// ============================================================================
export function renderShapeSorting(stage, { t, onWin }) {
  const shadowItems = ['🐘', '🦒', '🐢', '🦋', '🐙', '🦖', '🚁', '⛵', '🦉', '🦀'];
  const basketData = [
    { item: '🍎', group: 'fruit' },
    { item: '🍌', group: 'fruit' },
    { item: '🐶', group: 'animal' },
    { item: '🐱', group: 'animal' },
    { item: '🚗', group: 'vehicle' },
    { item: '🚌', group: 'vehicle' },
    { item: '🎸', group: 'music' },
    { item: '🎺', group: 'music' },
  ];

  let mode = 'shadows'; // 'shadows' | 'shadowsHard' | 'baskets'
  let round = 0;
  const totalRounds = 5;
  let state = null;

  function nextRound() {
    if (mode === 'shadows' || mode === 'shadowsHard') {
      const count = mode === 'shadowsHard' ? 6 : 3;
      const picked = shuffle(shadowItems).slice(0, count);
      const target = picked[Math.floor(Math.random() * picked.length)];
      state = {
        target,
        options: picked.map((icon) => ({ icon, status: '' })),
        locked: false,
      };
    } else {
      const target = basketData[round % basketData.length];
      const groups = [
        { group: 'fruit', label: '🧺 🍎🍌' },
        { group: 'animal', label: '🧺 🐶🐱' },
        { group: 'vehicle', label: '🧺 🚗🚌' },
        { group: 'music', label: '🧺 🎸🎺' },
      ];
      state = {
        target,
        options: groups.map((g) => ({ ...g, status: '' })),
        locked: false,
      };
    }
    draw();
  }

  function draw() {
    const isShadow = mode === 'shadows' || mode === 'shadowsHard';
    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${mode === 'shadows' ? 'active' : ''}" data-m="shadows">${t.levels.shadows} (3)</button>
        <button class="level-btn ${mode === 'shadowsHard' ? 'active' : ''}" data-m="shadowsHard">${t.levels.shadows} (6)</button>
        <button class="level-btn ${mode === 'baskets' ? 'active' : ''}" data-m="baskets">${t.levels.baskets}</button>
      </div>
      <div class="game-prompt">${
        isShadow ? t.games.shapeSorting.promptShadows : t.games.shapeSorting.promptBaskets
      } (${round + 1}/${totalRounds})</div>
      <div class="choice-card" style="font-size: 3.6rem; background: var(--bg-elevated);">
        ${isShadow ? state.target : state.target.item}
      </div>
      <div class="choice-row" style="max-width: 520px;">
        ${state.options
          .map(
            (opt, idx) => `
          <button class="choice-card sort-opt ${opt.status}" data-idx="${idx}" style="font-size: ${
              isShadow ? '3rem' : '1.75rem'
            };">
            ${
              isShadow
                ? `<span style="filter: brightness(0); opacity: 0.82;">${opt.icon}</span>`
                : opt.label
            }
          </button>
        `
          )
          .join('')}
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        mode = btn.dataset.m;
        round = 0;
        nextRound();
      };
    });

    stage.querySelectorAll('.sort-opt').forEach((btn) => {
      btn.onclick = () => {
        if (state.locked) return;
        const opt = state.options[Number(btn.dataset.idx)];
        const isCorrect = isShadow ? opt.icon === state.target : opt.group === state.target.group;
        if (isCorrect) {
          state.locked = true;
          opt.status = 'correct';
          playSuccess();
          draw();
          setTimeout(() => {
            round++;
            if (round >= totalRounds) onWin();
            else nextRound();
          }, 600);
        } else {
          opt.status = 'wrong';
          playGentleWrong();
          draw();
        }
      };
    });
  }

  nextRound();
}

// ============================================================================
// 17. COPY THE PATTERN (Easy 3x3, Medium 4x4, Hard 5x5)
// ============================================================================
export function renderPatternCopy(stage, { t, onWin }) {
  const presets = {
    easy: [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
      [
        [1, 0, 1],
        [0, 0, 0],
        [1, 1, 1],
      ],
    ],
    medium: [
      [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [0, 1, 1, 0],
      ],
      [
        [1, 0, 0, 1],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [1, 0, 0, 1],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 1, 1],
        [0, 0, 1, 0],
      ],
    ],
    hard: [
      [
        [0, 1, 1, 1, 0],
        [1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
      ],
      [
        [1, 1, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
      ],
    ],
  };

  let level = 'easy';
  let round = 0;
  let userGrid = [];

  function initPattern() {
    const list = presets[level];
    const sz = list[round].length;
    userGrid = Array.from({ length: sz }, () => Array.from({ length: sz }, () => 0));
    draw();
  }

  function isMatch() {
    const target = presets[level][round];
    const sz = target.length;
    for (let r = 0; r < sz; r++) {
      for (let c = 0; c < sz; c++) {
        if (target[r][c] !== userGrid[r][c]) return false;
      }
    }
    return true;
  }

  function draw() {
    const list = presets[level];
    const target = list[round];
    const sz = target.length;
    const cellPx = sz === 5 ? 40 : sz === 4 ? 46 : 52;

    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${level === 'easy' ? 'active' : ''}" data-lvl="easy">3×3 (${t.levels.easy})</button>
        <button class="level-btn ${level === 'medium' ? 'active' : ''}" data-lvl="medium">4×4 (${t.levels.medium})</button>
        <button class="level-btn ${level === 'hard' ? 'active' : ''}" data-lvl="hard">5×5 (${t.levels.hard})</button>
      </div>
      <div class="game-prompt">${t.games.patternCopy.prompt} (${round + 1}/${list.length})</div>
      <div class="copy-dual-wrap">
        <div class="pixel-grid" style="grid-template-columns: repeat(${sz}, 1fr);">
          ${target
            .map((row) =>
              row
                .map(
                  (cell) => `
              <div class="pixel-cell" style="width:${cellPx}px; height:${cellPx}px; ${
                    cell ? 'background: var(--accent-primary); border-color: var(--accent-primary-shadow);' : ''
                  }"></div>
            `
                )
                .join('')
            )
            .join('')}
        </div>
        <div style="font-size: 2rem; font-weight: 800; color: var(--text-muted);">➔</div>
        <div class="pixel-grid" style="grid-template-columns: repeat(${sz}, 1fr);">
          ${userGrid
            .map((row, r) =>
              row
                .map(
                  (cell, c) => `
              <button class="pixel-cell copy-cell" data-r="${r}" data-c="${c}"
                style="width:${cellPx}px; height:${cellPx}px; ${
                    cell ? 'background: var(--accent-green); border-color: var(--accent-green-shadow);' : ''
                  }"></button>
            `
                )
                .join('')
            )
            .join('')}
        </div>
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        level = btn.dataset.lvl;
        round = 0;
        initPattern();
      };
    });

    stage.querySelectorAll('.copy-cell').forEach((btn) => {
      btn.onclick = () => {
        const r = Number(btn.dataset.r);
        const c = Number(btn.dataset.c);
        userGrid[r][c] = userGrid[r][c] ? 0 : 1;
        playTap();
        draw();
        if (isMatch()) {
          playSuccess();
          setTimeout(() => {
            round++;
            if (round >= list.length) onWin();
            else initPattern();
          }, 500);
        }
      };
    });
  }

  initPattern();
}

// ============================================================================
// 18. MELODY MEMORY (Μουσική Ακολουθία — Build a Real Melody Note by Note!)
// ============================================================================
export function renderMelodyMemory(stage, { t, lang, onWin }) {
  // 6 diatonic notes (C4 to A4) with soft pastel xylophone colors
  const NOTES = [
    { id: 0, el: 'Ντο', en: 'Do', freq: 261.63, color: '#F9C6C9', height: 155 }, // C4
    { id: 1, el: 'Ρε', en: 'Re', freq: 293.66, color: '#FAD9B4', height: 146 }, // D4
    { id: 2, el: 'Μι', en: 'Mi', freq: 329.63, color: '#FAF0B8', height: 137 }, // E4
    { id: 3, el: 'Φα', en: 'Fa', freq: 349.23, color: '#C5EED6', height: 128 }, // F4
    { id: 4, el: 'Σολ', en: 'Sol', freq: 392.00, color: '#C4DCF7', height: 119 }, // G4
    { id: 5, el: 'Λα', en: 'La', freq: 440.00, color: '#DEC9F6', height: 110 }, // A4
  ];

  // Real, recognizable children's melodies built from note indices (0=Do, 1=Re, 2=Mi, 3=Fa, 4=Sol, 5=La)
  const MELODIES = [
    // 0: Φεγγαράκι μου λαμπρό / Twinkle Twinkle Little Star
    [0, 0, 4, 4, 5, 5, 4, 3, 3, 2, 2, 1, 1, 0],
    // 1: Χαρωπά τα δυο μου χέρια / Lightly Row
    [4, 2, 2, 3, 1, 1, 0, 1, 2, 3, 4, 4, 4],
    // 2: Ωδή στη Χαρά / Ode to Joy
    [2, 2, 3, 4, 4, 3, 2, 1, 0, 0, 1, 2, 2, 1, 1],
  ];

  let level = 'easy'; // easy (5 notes), medium (8 notes), hard (full melody 14 notes)
  let songIdx = 0;
  let currentLen = 2; // Starts with 2 notes and grows by 1 each step!
  let userStep = 0;
  let playingSeq = false;
  let activeKey = -1;
  let timeouts = [];

  function getTargetLen() {
    const full = MELODIES[songIdx].length;
    return level === 'easy' ? 5 : level === 'medium' ? 8 : full;
  }

  function clearTimers() {
    timeouts.forEach((id) => clearTimeout(id));
    timeouts = [];
  }

  function startMelody() {
    clearTimers();
    currentLen = 2;
    userStep = 0;
    playPhrase();
  }

  function playPhrase() {
    clearTimers();
    playingSeq = true;
    userStep = 0;
    activeKey = -1;
    draw();

    const phrase = MELODIES[songIdx].slice(0, currentLen);
    phrase.forEach((noteId, idx) => {
      const t1 = setTimeout(() => {
        activeKey = noteId;
        playMelodyNote(NOTES[noteId].freq, 0.44);
        draw();
      }, 450 + idx * 600);

      const t2 = setTimeout(() => {
        activeKey = -1;
        draw();
      }, 450 + idx * 600 + 380);

      timeouts.push(t1, t2);
    });

    const tEnd = setTimeout(() => {
      playingSeq = false;
      activeKey = -1;
      draw();
    }, 450 + phrase.length * 600 + 80);
    timeouts.push(tEnd);
  }

  function handleKeyTap(noteId) {
    if (playingSeq) return;
    activeKey = noteId;
    playMelodyNote(NOTES[noteId].freq, 0.42);
    draw();
    setTimeout(() => {
      activeKey = -1;
      draw();
    }, 220);

    const expected = MELODIES[songIdx][userStep];
    if (noteId === expected) {
      userStep++;
      if (userStep >= currentLen) {
        if (currentLen >= getTargetLen()) {
          setTimeout(onWin, 550);
        } else {
          currentLen++;
          const tNext = setTimeout(playPhrase, 750);
          timeouts.push(tNext);
        }
      }
    } else {
      playGentleWrong();
      // Gently replay current phrase so the child hears the melody again
      const tReplay = setTimeout(playPhrase, 850);
      timeouts.push(tReplay);
    }
  }

  function draw() {
    const targetLen = getTargetLen();
    const songTitle = t.games.melodyMemory.songNames[songIdx] || '';

    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${level === 'easy' ? 'active' : ''}" data-lvl="easy">${t.levels.easy} (5)</button>
        <button class="level-btn ${level === 'medium' ? 'active' : ''}" data-lvl="medium">${t.levels.medium} (8)</button>
        <button class="level-btn ${level === 'hard' ? 'active' : ''}" data-lvl="hard">${t.levels.hard} (${MELODIES[songIdx].length})</button>
      </div>
      <div class="level-selector" style="margin-top: -6px;">
        ${t.games.melodyMemory.songNames
          .map(
            (name, idx) => `
          <button class="level-btn ${songIdx === idx ? 'active' : ''}" data-song="${idx}">🎶 ${name}</button>
        `
          )
          .join('')}
      </div>
      <div class="game-prompt">
        <span>${playingSeq ? t.games.melodyMemory.watchPrompt : t.games.melodyMemory.tapPrompt}</span>
        <strong>(${currentLen}/${targetLen})</strong>
      </div>
      <div class="melody-keyboard">
        ${NOTES.map(
          (n) => `
          <button class="melody-key ${activeKey === n.id ? 'active-note' : ''}"
            data-note="${n.id}"
            style="background: ${n.color}; height: ${n.height}px;">
            <span class="note-dot"></span>
            <span class="note-name">${lang === 'el' ? n.el : n.en}</span>
          </button>
        `
        ).join('')}
      </div>
      <div class="choice-row">
        <button class="pill-btn" id="melody-replay" ${playingSeq ? 'disabled style="opacity:0.5"' : ''}>
          ${t.replayMelody}
        </button>
      </div>
    `;

    stage.querySelectorAll('[data-lvl]').forEach((btn) => {
      btn.onclick = () => {
        level = btn.dataset.lvl;
        startMelody();
      };
    });

    stage.querySelectorAll('[data-song]').forEach((btn) => {
      btn.onclick = () => {
        songIdx = Number(btn.dataset.song);
        startMelody();
      };
    });

    stage.querySelectorAll('.melody-key').forEach((btn) => {
      btn.onclick = () => handleKeyTap(Number(btn.dataset.note));
    });

    const replayBtn = stage.querySelector('#melody-replay');
    if (replayBtn) {
      replayBtn.onclick = () => {
        if (!playingSeq) playPhrase();
      };
    }
  }

  startMelody();
  return () => clearTimers();
}

// ============================================================================
// 19. MAZE EXPLORER (Ο Μικρός Λαβύρινθος — 4 Levels, Tap/Drag/DPad/Keyboard)
// ============================================================================
export function renderMazeExplorer(stage, { t, onWin }) {
  const THEMES = [
    { hero: '🐰', goal: '🥕' },
    { hero: '🐝', goal: '🌻' },
    { hero: '🐶', goal: '🦴' },
    { hero: '🐸', goal: '🪷' },
    { hero: '🚀', goal: '🪐' },
  ];

  let level = 'easy'; // easy (7x7), medium (9x9), hard (11x11), expert (13x13)
  let round = 0;
  const totalRounds = 3;
  let maze = []; // 0 = path, 1 = wall
  let visited = [];
  let gridSize = 7;
  let player = { r: 1, c: 1 };
  let goal = { r: 5, c: 5 };
  let theme = THEMES[0];
  let isDragging = false;
  let solved = false;

  function generateMaze(rooms) {
    const sz = rooms * 2 + 1;
    const grid = Array.from({ length: sz }, () => Array.from({ length: sz }, () => 1));

    function carve(r, c) {
      grid[r][c] = 0;
      const dirs = shuffle([
        [-2, 0],
        [2, 0],
        [0, -2],
        [0, 2],
      ]);
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr > 0 && nr < sz - 1 && nc > 0 && nc < sz - 1 && grid[nr][nc] === 1) {
          grid[r + dr / 2][c + dc / 2] = 0;
          carve(nr, nc);
        }
      }
    }

    carve(1, 1);
    return grid;
  }

  function initRound() {
    solved = false;
    const rooms = level === 'easy' ? 3 : level === 'medium' ? 4 : level === 'hard' ? 5 : 6;
    gridSize = rooms * 2 + 1;
    maze = generateMaze(rooms);
    visited = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => false));
    player = { r: 1, c: 1 };
    goal = { r: gridSize - 2, c: gridSize - 2 };
    visited[1][1] = true;
    theme = THEMES[(round + rooms) % THEMES.length];
    draw();
  }

  function tryStep(dr, dc) {
    if (solved) return false;
    const nr = player.r + dr;
    const nc = player.c + dc;
    if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && maze[nr][nc] === 0) {
      player = { r: nr, c: nc };
      visited[nr][nc] = true;
      playTap();
      draw();
      checkWin();
      return true;
    }
    return false;
  }

  function tryMoveToCell(tr, tc) {
    if (solved) return;
    if (maze[tr]?.[tc] !== 0) return;

    // Direct neighbor
    if (Math.abs(tr - player.r) + Math.abs(tc - player.c) === 1) {
      tryStep(tr - player.r, tc - player.c);
      return;
    }

    // Straight line corridor tap (same row or same column with no walls in between)
    if (tr === player.r && tc !== player.c) {
      const step = tc > player.c ? 1 : -1;
      for (let c = player.c + step; c !== tc + step; c += step) {
        if (maze[player.r][c] === 1) return;
      }
      for (let c = player.c + step; c !== tc + step; c += step) {
        visited[player.r][c] = true;
      }
      player = { r: tr, c: tc };
      playTap();
      draw();
      checkWin();
    } else if (tc === player.c && tr !== player.r) {
      const step = tr > player.r ? 1 : -1;
      for (let r = player.r + step; r !== tr + step; r += step) {
        if (maze[r][player.c] === 1) return;
      }
      for (let r = player.r + step; r !== tr + step; r += step) {
        visited[r][player.c] = true;
      }
      player = { r: tr, c: tc };
      playTap();
      draw();
      checkWin();
    }
  }

  function checkWin() {
    if (player.r === goal.r && player.c === goal.c) {
      solved = true;
      playSuccess();
      setTimeout(() => {
        round++;
        if (round >= totalRounds) onWin();
        else initRound();
      }, 500);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp' || e.key === 'w') {
      e.preventDefault();
      tryStep(-1, 0);
    } else if (e.key === 'ArrowDown' || e.key === 's') {
      e.preventDefault();
      tryStep(1, 0);
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
      e.preventDefault();
      tryStep(0, -1);
    } else if (e.key === 'ArrowRight' || e.key === 'd') {
      e.preventDefault();
      tryStep(0, 1);
    }
  }

  function draw() {
    const cellPx = gridSize <= 7 ? 42 : gridSize <= 9 ? 36 : gridSize <= 11 ? 30 : 25;
    const fontPx = gridSize <= 7 ? '1.45rem' : gridSize <= 9 ? '1.2rem' : gridSize <= 11 ? '1rem' : '0.85rem';

    stage.innerHTML = `
      <div class="level-selector">
        <button class="level-btn ${level === 'easy' ? 'active' : ''}" data-lvl="easy">${t.levels.easy}</button>
        <button class="level-btn ${level === 'medium' ? 'active' : ''}" data-lvl="medium">${t.levels.medium}</button>
        <button class="level-btn ${level === 'hard' ? 'active' : ''}" data-lvl="hard">${t.levels.hard}</button>
        <button class="level-btn ${level === 'expert' ? 'active' : ''}" data-lvl="expert">${t.levels.expert}</button>
      </div>
      <div class="game-prompt">
        <span>${t.games.mazeExplorer.prompt}</span>
        <strong>(${round + 1}/${totalRounds})</strong>
      </div>
      <div class="maze-board" id="maze-board" style="grid-template-columns: repeat(${gridSize}, ${cellPx}px);">
        ${maze
          .map((row, r) =>
            row
              .map((cell, c) => {
                const isPlayer = player.r === r && player.c === c;
                const isGoal = goal.r === r && goal.c === c;
                const isVis = visited[r][c];
                return `
                  <div class="maze-cell ${cell === 1 ? 'wall' : 'path'} ${isVis && cell === 0 ? 'visited' : ''} ${
                  isGoal ? 'goal-cell' : ''
                }"
                    data-r="${r}" data-c="${c}"
                    style="width:${cellPx}px; height:${cellPx}px; font-size:${fontPx};">
                    ${isPlayer ? theme.hero : isGoal ? theme.goal : isVis && cell === 0 ? '·' : ''}
                  </div>
                `;
              })
              .join('')
          )
          .join('')}
      </div>
      <div class="maze-dpad">
        <div></div>
        <button class="dpad-btn" data-dir="up">⬆️</button>
        <div></div>
        <button class="dpad-btn" data-dir="left">⬅️</button>
        <button class="dpad-btn" data-dir="down">⬇️</button>
        <button class="dpad-btn" data-dir="right">➡️</button>
      </div>
    `;

    stage.querySelectorAll('.level-btn').forEach((btn) => {
      btn.onclick = () => {
        level = btn.dataset.lvl;
        round = 0;
        initRound();
      };
    });

    stage.querySelectorAll('.maze-cell.path').forEach((el) => {
      el.onclick = () => {
        tryMoveToCell(Number(el.dataset.r), Number(el.dataset.c));
      };
    });

    const boardEl = stage.querySelector('#maze-board');
    if (boardEl) {
      boardEl.onpointerdown = (e) => {
        isDragging = true;
        const target = document.elementFromPoint(e.clientX, e.clientY)?.closest('.maze-cell.path');
        if (target) tryMoveToCell(Number(target.dataset.r), Number(target.dataset.c));
      };
      boardEl.onpointermove = (e) => {
        if (!isDragging) return;
        const target = document.elementFromPoint(e.clientX, e.clientY)?.closest('.maze-cell.path');
        if (target) {
          const r = Number(target.dataset.r);
          const c = Number(target.dataset.c);
          if (Math.abs(r - player.r) + Math.abs(c - player.c) === 1) {
            tryStep(r - player.r, c - player.c);
          }
        }
      };
      boardEl.onpointerup = () => {
        isDragging = false;
      };
      boardEl.onpointerleave = () => {
        isDragging = false;
      };
    }

    stage.querySelectorAll('.dpad-btn').forEach((btn) => {
      btn.onclick = () => {
        const dir = btn.dataset.dir;
        if (dir === 'up') tryStep(-1, 0);
        else if (dir === 'down') tryStep(1, 0);
        else if (dir === 'left') tryStep(0, -1);
        else if (dir === 'right') tryStep(0, 1);
      };
    });
  }

  window.addEventListener('keydown', handleKeyDown);
  initRound();
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}

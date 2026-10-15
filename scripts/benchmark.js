import {
  move,
  getAvailableMoves,
  boardLength,
  boardSize,
} from "../src/utils/minimax.js";

let naiveNodes = 0;
let abNodes = 0;

// 1. Наивный Minimax без отсечения
function naiveMinimax(position, burnedPositions, isBotTurn, depth = 0) {
  naiveNodes++;
  const availableMoves = getAvailableMoves(position, burnedPositions);
  if (availableMoves.length === 0) {
    const maxScore = boardSize + 1;
    return isBotTurn ? -maxScore + depth : maxScore - depth;
  }

  if (isBotTurn) {
    let maxScore = -Infinity;
    for (const m of availableMoves) {
      const nextBurned = new Set(burnedPositions);
      nextBurned.add(m.position);
      const score = naiveMinimax(m.position, nextBurned, false, depth + 1);
      maxScore = Math.max(maxScore, score);
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const m of availableMoves) {
      const nextBurned = new Set(burnedPositions);
      nextBurned.add(m.position);
      const score = naiveMinimax(m.position, nextBurned, true, depth + 1);
      minScore = Math.min(minScore, score);
    }
    return minScore;
  }
}

// 2. Оптимизированный Minimax с Alpha-Beta
function abMinimax(
  position,
  burnedPositions,
  isBotTurn,
  depth = 0,
  alpha = -Infinity,
  beta = Infinity,
) {
  abNodes++;
  const availableMoves = getAvailableMoves(position, burnedPositions);
  if (availableMoves.length === 0) {
    const maxScore = boardSize + 1;
    return isBotTurn ? -maxScore + depth : maxScore - depth;
  }

  if (isBotTurn) {
    let maxScore = -Infinity;
    for (const m of availableMoves) {
      const nextBurned = new Set(burnedPositions);
      nextBurned.add(m.position);
      const score = abMinimax(
        m.position,
        nextBurned,
        false,
        depth + 1,
        alpha,
        beta,
      );
      maxScore = Math.max(maxScore, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break;
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (const m of availableMoves) {
      const nextBurned = new Set(burnedPositions);
      nextBurned.add(m.position);
      const score = abMinimax(
        m.position,
        nextBurned,
        true,
        depth + 1,
        alpha,
        beta,
      );
      minScore = Math.min(minScore, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) break;
    }
    return minScore;
  }
}

const startPos = 0;
const startBurned = new Set([startPos]);

// naive minimax benchmark
const t0 = performance.now();
naiveMinimax(startPos, startBurned, true);
const t1 = performance.now();

// Alpha-Beta minimax benchmark
const t2 = performance.now();
abMinimax(startPos, startBurned, true);
const t3 = performance.now();

console.log(
  `Naive Minimax:      Nodes = ${naiveNodes}, Time = ${(t1 - t0).toFixed(2)} ms`,
);
console.log(
  `Alpha-Beta Minimax: Nodes = ${abNodes}, Time = ${(t3 - t2).toFixed(2)} ms`,
);
console.log(
  `Tree reduction:     ${(((naiveNodes - abNodes) / naiveNodes) * 100).toFixed(1)}%`,
);

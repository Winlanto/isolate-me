/**
 * Isolation Game — core logic matching kodu1.js
 * Single shared token, one burnedPositions Set.
 */

export const boardLength = 3;
export const boardSize   = boardLength * boardLength;

/**
 * Returns next position in given direction, or null if move is off-grid.
 */
export function move(position, direction) {
  let nextPosition = position;
  if (direction === 'right') {
    if (position % boardLength < boardLength - 1) nextPosition++;
  }
  if (direction === 'left') {
    if (position % boardLength > 0) nextPosition--;
  }
  if (direction === 'up') {
    if (position >= boardLength) nextPosition -= boardLength;
  }
  if (direction === 'down') {
    if (position < boardSize - boardLength) nextPosition += boardLength;
  }
  return nextPosition !== position ? nextPosition : null;
}

/**
 * Returns array of valid moves: [{ direction, position }]
 */
export function getAvailableMoves(position, burnedPositions) {
  const availableMoves = [];
  ['left', 'right', 'up', 'down'].forEach((direction) => {
    const nextPosition = move(position, direction);
    if (nextPosition !== null && !burnedPositions.has(nextPosition)) {
      availableMoves.push({ direction, position: nextPosition });
    }
  });
  return availableMoves;
}

/**
 * Minimax — terminal: isBotTurn ? 0 : 1
 * Bot maximizes, Human minimizes.
 */
export function minimax(position, burnedPositions, isBotTurn) {
  const availableMoves = getAvailableMoves(position, burnedPositions);
  if (availableMoves.length === 0) {
    return isBotTurn ? 0 : 1;
  }

  const scores = [];
  if (isBotTurn) {
    for (const m of availableMoves) {
      const nextBurned = new Set(burnedPositions);
      nextBurned.add(m.position);
      scores.push(minimax(m.position, nextBurned, false));
    }
    return Math.max(...scores);
  } else {
    for (const m of availableMoves) {
      const nextBurned = new Set(burnedPositions);
      nextBurned.add(m.position);
      scores.push(minimax(m.position, nextBurned, true));
    }
    return Math.min(...scores);
  }
}

/**
 * Returns best move for bot: { direction, position } or null.
 */
export function botBestMove(position, burnedPositions) {
  const availableMoves = getAvailableMoves(position, burnedPositions);
  if (availableMoves.length === 0) return null;

  let bestMove  = null;
  let bestScore = -1;
  for (const m of availableMoves) {
    const nextBurned = new Set(burnedPositions);
    nextBurned.add(m.position);
    const score = minimax(m.position, nextBurned, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove  = m;
    }
  }
  return bestMove;
}

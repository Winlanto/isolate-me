/**
 * Isolation Game core logic and Minimax algorithm.
 * Standalone ES6 module with zero external dependencies.
 */

/**
 * Creates initial game state.
 * @param {number} [boardLength=3]
 * @param {number} [startingPosition=4] - 0-indexed position (defaults to center of 3x3)
 * @returns {{ boardLength: number, position: number, burnedPositions: Set<number> }}
 */
export function createInitialBoard(boardLength = 3, startingPosition = 4) {
  const burnedPositions = new Set();
  if (startingPosition !== null && startingPosition !== undefined) {
    burnedPositions.add(startingPosition);
  }
  return {
    boardLength,
    position: startingPosition,
    burnedPositions,
  };
}

/**
 * Calculates adjacent position in a given direction on a grid.
 * @param {number} position - 0-indexed position
 * @param {'left'|'right'|'up'|'down'} direction
 * @param {number} [boardLength=3]
 * @returns {number|null}
 */
export function getAdjacentPosition(position, direction, boardLength = 3) {
  const boardSize = boardLength * boardLength;
  let nextPosition = position;

  if (direction === 'right') {
    if (position % boardLength < boardLength - 1) {
      nextPosition++;
    }
  } else if (direction === 'left') {
    if (position % boardLength > 0) {
      nextPosition--;
    }
  } else if (direction === 'up') {
    if (position >= boardLength) {
      nextPosition -= boardLength;
    }
  } else if (direction === 'down') {
    if (position < boardSize - boardLength) {
      nextPosition += boardLength;
    }
  }

  return nextPosition !== position ? nextPosition : null;
}

/**
 * Validates if candidate move is legal from current position.
 * @param {number} currentPosition
 * @param {number|string} targetOrDirection - Target index or direction string
 * @param {Set<number>|number[]} burnedPositions
 * @param {number} [boardLength=3]
 * @returns {boolean}
 */
export function isValidMove(currentPosition, targetOrDirection, burnedPositions, boardLength = 3) {
  const burned = burnedPositions instanceof Set ? burnedPositions : new Set(burnedPositions);

  if (typeof targetOrDirection === 'string') {
    const nextPos = getAdjacentPosition(currentPosition, targetOrDirection, boardLength);
    return nextPos !== null && !burned.has(nextPos);
  }

  const targetPosition = targetOrDirection;
  if (typeof targetPosition !== 'number' || burned.has(targetPosition)) {
    return false;
  }

  const directions = ['left', 'right', 'up', 'down'];
  return directions.some(
    (dir) => getAdjacentPosition(currentPosition, dir, boardLength) === targetPosition
  );
}

/**
 * Returns available moves from given position.
 * @param {number} position
 * @param {Set<number>|number[]} burnedPositions
 * @param {number} [boardLength=3]
 * @returns {Array<{ direction: string, position: number }>}
 */
export function getValidMoves(position, burnedPositions, boardLength = 3) {
  const burned = burnedPositions instanceof Set ? burnedPositions : new Set(burnedPositions);
  const availableMoves = [];
  const directions = ['left', 'right', 'up', 'down'];

  for (const direction of directions) {
    const nextPosition = getAdjacentPosition(position, direction, boardLength);
    if (nextPosition !== null && !burned.has(nextPosition)) {
      availableMoves.push({ direction, position: nextPosition });
    }
  }

  return availableMoves;
}

/**
 * Board evaluation function.
 * Returns terminal score (+1 bot win, -1 human win) or mobility heuristic.
 * @param {number} position
 * @param {Set<number>|number[]} burnedPositions
 * @param {boolean} isBotTurn - true if current turn belongs to bot
 * @param {number} [boardLength=3]
 * @returns {number}
 */
export function evaluateBoard(position, burnedPositions, isBotTurn, boardLength = 3) {
  const availableMoves = getValidMoves(position, burnedPositions, boardLength);

  if (availableMoves.length === 0) {
    // If player to move has no moves, current player loses.
    // Bot turn with no moves => human wins (-1).
    // Human turn with no moves => bot wins (+1).
    return isBotTurn ? -1 : 1;
  }

  // Non-terminal mobility score normalized between -0.5 and 0.5
  const mobility = availableMoves.length / 4;
  return isBotTurn ? mobility : -mobility;
}

/**
 * Minimax algorithm with Alpha-Beta pruning.
 * Maximizing player = bot (+1 win target), Minimizing player = human (-1 win target).
 * @param {number} position
 * @param {Set<number>|number[]} burnedPositions
 * @param {boolean} isMaximizing - true for bot turn, false for player turn
 * @param {number} [depth=Infinity]
 * @param {number} [alpha=-Infinity]
 * @param {number} [beta=Infinity]
 * @param {number} [boardLength=3]
 * @returns {number}
 */
export function minimax(
  position,
  burnedPositions,
  isMaximizing,
  depth = Infinity,
  alpha = -Infinity,
  beta = Infinity,
  boardLength = 3
) {
  const burned = burnedPositions instanceof Set ? burnedPositions : new Set(burnedPositions);
  const availableMoves = getValidMoves(position, burned, boardLength);

  if (availableMoves.length === 0 || depth <= 0) {
    return evaluateBoard(position, burned, isMaximizing, boardLength);
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of availableMoves) {
      const nextBurned = new Set(burned);
      nextBurned.add(move.position);
      const evaluation = minimax(
        move.position,
        nextBurned,
        false,
        depth - 1,
        alpha,
        beta,
        boardLength
      );
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) {
        break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of availableMoves) {
      const nextBurned = new Set(burned);
      nextBurned.add(move.position);
      const evaluation = minimax(
        move.position,
        nextBurned,
        true,
        depth - 1,
        alpha,
        beta,
        boardLength
      );
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) {
        break;
      }
    }
    return minEval;
  }
}

/**
 * Computes best move for bot using Minimax with Alpha-Beta pruning.
 * @param {number} position
 * @param {Set<number>|number[]} burnedPositions
 * @param {number} [boardLength=3]
 * @param {number} [maxDepth=Infinity]
 * @returns {{ position: number, direction: string, score: number } | null}
 */
export function getBestMove(position, burnedPositions, boardLength = 3, maxDepth = Infinity) {
  const burned = burnedPositions instanceof Set ? burnedPositions : new Set(burnedPositions);
  const availableMoves = getValidMoves(position, burned, boardLength);

  if (availableMoves.length === 0) {
    return null;
  }

  let bestMove = null;
  let bestScore = -Infinity;
  let alpha = -Infinity;
  const beta = Infinity;

  for (const move of availableMoves) {
    const nextBurned = new Set(burned);
    nextBurned.add(move.position);
    const score = minimax(
      move.position,
      nextBurned,
      false,
      maxDepth - 1,
      alpha,
      beta,
      boardLength
    );

    if (score > bestScore) {
      bestScore = score;
      bestMove = {
        position: move.position,
        direction: move.direction,
        score,
      };
    }

    alpha = Math.max(alpha, bestScore);
  }

  return bestMove;
}

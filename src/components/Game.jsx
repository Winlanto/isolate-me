import { useState, useEffect, useCallback } from 'react';
import Board from './Board.jsx';
import Rules from './Rules.jsx';
import { getAvailableMoves, botBestMove } from '../utils/minimax.js';

const STARTING_POSITION = 1;

function initState(isBotFirst) {
  return {
    currentPosition:  STARTING_POSITION,
    burnedPositions:  new Set([STARTING_POSITION]),
    isBotTurn:        isBotFirst,
    phase:            'playing',  // 'setup' | 'playing' | 'over'
    winner:           null,       // 'Human' | 'Bot' | null
  };
}

export default function Game() {
  const [firstMover, setFirstMover] = useState('human');
  const [state,      setState]      = useState({ phase: 'setup' });

  // ── Bot move ──────────────────────────────────────────────────────
  const runBotMove = useCallback((cur) => {
    const best = botBestMove(cur.currentPosition, cur.burnedPositions);
    if (!best) {
      // Bot has no moves → Human wins
      setState(s => ({ ...s, phase: 'over', winner: 'Human' }));
      return;
    }
    setState(s => {
      const newBurned = new Set(s.burnedPositions);
      newBurned.add(best.position);
      // After bot moves, check if human has moves
      const humanMoves = getAvailableMoves(best.position, newBurned);
      if (humanMoves.length === 0) {
        return { ...s, currentPosition: best.position, burnedPositions: newBurned, phase: 'over', winner: 'Bot' };
      }
      return { ...s, currentPosition: best.position, burnedPositions: newBurned, isBotTurn: false };
    });
  }, []);

  // ── Trigger bot turn automatically ───────────────────────────────
  useEffect(() => {
    if (state.phase === 'playing' && state.isBotTurn) {
      const id = setTimeout(() => runBotMove(state), 400);
      return () => clearTimeout(id);
    }
  }, [state.phase, state.isBotTurn, state.currentPosition]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Start / Reset ─────────────────────────────────────────────────
  function handleStart() {
    const isBotFirst = firstMover === 'bot';
    setState(initState(isBotFirst));
  }

  // ── Human cell click ──────────────────────────────────────────────
  function handleCellClick(i) {
    if (state.phase !== 'playing' || state.isBotTurn) return;

    setState(s => {
      const newBurned = new Set(s.burnedPositions);
      newBurned.add(i);
      // After human moves, check if bot has moves
      const botMoves = getAvailableMoves(i, newBurned);
      if (botMoves.length === 0) {
        return { ...s, currentPosition: i, burnedPositions: newBurned, phase: 'over', winner: 'Human' };
      }
      return { ...s, currentPosition: i, burnedPositions: newBurned, isBotTurn: true };
    });
  }

  // ── Derived valid moves (only on human turn) ──────────────────────
  const validMoves = (state.phase === 'playing' && !state.isBotTurn)
    ? getAvailableMoves(state.currentPosition, state.burnedPositions).map(m => m.position)
    : [];

  // ── Status text ───────────────────────────────────────────────────
  let statusText = '';
  if (state.phase === 'setup') {
    statusText = 'Choose who moves the token first.';
  } else if (state.phase === 'over') {
    statusText = state.winner === 'Human' ? '🎉 You win!' : '🤖 Bot wins!';
  } else {
    statusText = state.isBotTurn ? '🤖 Bot is thinking…' : 'Your turn — pick a green cell.';
  }

  return (
    <div className="game">
      {/* ── Rules dropdown ── */}
      <Rules isGameStarted={state.phase !== 'setup'} />

      {/* ── Controls ── */}
      <div className="game-controls">
        <div className="game-toggle">
          <button
            className={`toggle-btn${firstMover === 'human' ? ' toggle-btn--active' : ''}`}
            onClick={() => setFirstMover('human')}
          >
            Human First
          </button>
          <button
            className={`toggle-btn${firstMover === 'bot' ? ' toggle-btn--active' : ''}`}
            onClick={() => setFirstMover('bot')}
          >
            Bot First
          </button>
        </div>
        <button className="start-btn" onClick={handleStart}>
          {state.phase === 'setup' ? 'Start Game' : 'New Game'}
        </button>
      </div>

      {/* ── Status ── */}
      <p className="game-status">{statusText}</p>

      {/* ── Board (only when playing or over) ── */}
      {state.phase !== 'setup' && (
        <Board
          currentPosition={state.currentPosition}
          burnedPositions={state.burnedPositions}
          validMoves={validMoves}
          onCellClick={handleCellClick}
          isBotTurn={state.isBotTurn}
          phase={state.phase}
          winner={state.winner}
        />
      )}
    </div>
  );
}

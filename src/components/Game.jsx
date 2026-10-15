import { useState, useEffect, useCallback } from "react";
import Board from "./Board.jsx";
import Rules from "./Rules.jsx";
import { getAvailableMoves, botBestMove } from "../utils/minimax.js";

const STARTING_POSITION = 1;

function initState(isBotFirst) {
  return {
    currentPosition: STARTING_POSITION,
    burnedPositions: new Set([STARTING_POSITION]),
    isBotTurn: isBotFirst,
    phase: "playing",
    winner: null,
  };
}

export default function Game() {
  const [firstMover, setFirstMover] = useState("human");
  const [state, setState] = useState({ phase: "setup" });

  const runBotMove = useCallback(() => {
    setState((prevState) => {
      if (prevState.phase !== "playing" || !prevState.isBotTurn)
        return prevState;

      const best = botBestMove(
        prevState.currentPosition,
        prevState.burnedPositions,
      );
      if (!best) {
        return { ...prevState, phase: "over", winner: "Human" };
      }

      const newBurned = new Set(prevState.burnedPositions);
      newBurned.add(best.position);

      const humanMoves = getAvailableMoves(best.position, newBurned);
      if (humanMoves.length === 0) {
        return {
          ...prevState,
          currentPosition: best.position,
          burnedPositions: newBurned,
          phase: "over",
          winner: "Bot",
        };
      }

      return {
        ...prevState,
        currentPosition: best.position,
        burnedPositions: newBurned,
        isBotTurn: false,
      };
    });
  }, []);

  useEffect(() => {
    if (state.phase === "playing" && state.isBotTurn) {
      const timer = setTimeout(runBotMove, 400);
      return () => clearTimeout(timer);
    }
  }, [state.phase, state.isBotTurn, runBotMove]);

  function handleStart() {
    setState(initState(firstMover === "bot"));
  }

  function handleCellClick(position) {
    if (state.phase !== "playing" || state.isBotTurn) return;

    setState((prevState) => {
      const newBurned = new Set(prevState.burnedPositions);
      newBurned.add(position);

      const botMoves = getAvailableMoves(position, newBurned);
      if (botMoves.length === 0) {
        return {
          ...prevState,
          currentPosition: position,
          burnedPositions: newBurned,
          phase: "over",
          winner: "Human",
        };
      }

      return {
        ...prevState,
        currentPosition: position,
        burnedPositions: newBurned,
        isBotTurn: true,
      };
    });
  }

  const validMoves =
    state.phase === "playing" && !state.isBotTurn
      ? getAvailableMoves(state.currentPosition, state.burnedPositions).map(
          (m) => m.position,
        )
      : [];

  let statusText = "";
  if (state.phase === "setup") {
    statusText = "Choose who moves the token first.";
  } else if (state.phase === "over") {
    statusText = state.winner === "Human" ? "🎉 You win!" : "🤖 Bot wins!";
  } else {
    statusText = state.isBotTurn
      ? "🤖 Bot is thinking…"
      : "Your turn — pick a green cell.";
  }

  return (
    <div className="game">
      <Rules isGameStarted={state.phase !== "setup"} />

      <div className="game-controls">
        <div className="game-toggle">
          <button
            className={`toggle-btn${firstMover === "human" ? " toggle-btn--active" : ""}`}
            onClick={() => setFirstMover("human")}
          >
            Human First
          </button>
          <button
            className={`toggle-btn${firstMover === "bot" ? " toggle-btn--active" : ""}`}
            onClick={() => setFirstMover("bot")}
          >
            Bot First
          </button>
        </div>
        <button className="start-btn" onClick={handleStart}>
          {state.phase === "setup" ? "Start Game" : "New Game"}
        </button>
      </div>

      <p className="game-status">{statusText}</p>

      {state.phase !== "setup" && (
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

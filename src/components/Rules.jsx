import { useState, useEffect } from 'react';

export default function Rules({ isGameStarted }) {
  const [isOpen, setIsOpen] = useState(!isGameStarted);

  useEffect(() => {
    setIsOpen(!isGameStarted);
  }, [isGameStarted]);

  return (
    <section className="rules">
      <button
        className="rules-toggle"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        <span>How to Play</span>
        <span className={`rules-chevron${isOpen ? ' rules-chevron--open' : ''}`}>▾</span>
      </button>

      {isOpen && (
        <div className="rules-body">
          <h2>Isolation Game — Rules</h2>
          <p>
            Both players share a <strong>single token</strong> on a 3×3 grid.
            You and the Bot take turns moving it one step at a time.
            The player who gets <strong>trapped with no moves</strong> loses.
          </p>

          <h3>Setup</h3>
          <ul>
            <li>The token starts at cell <strong>2</strong> (top-row center, index&nbsp;1).</li>
            <li>That starting cell is immediately <strong>burned</strong> (marked visited).</li>
            <li>Choose whether <em>Human</em> or <em>Bot</em> moves the token first.</li>
          </ul>

          <h3>On Each Turn</h3>
          <ul>
            <li>Move the token <strong>one step</strong>: up, down, left, or right.</li>
            <li>You cannot move to a cell that is already burned or outside the grid.</li>
            <li>After moving, the <strong>new cell is burned</strong> — it can never be visited again.</li>
          </ul>

          <h3>Winning</h3>
          <ul>
            <li>If it is your turn and all adjacent cells are burned or off-grid, you <strong>lose</strong>.</li>
            <li>Trap the Bot with no moves → <strong>you win</strong>.</li>
          </ul>

          <h3>Cell Legend</h3>
          <ul>
            <li><strong>[P]</strong> — token on Human's turn.</li>
            <li><strong>[B]</strong> — token on Bot's turn.</li>
            <li>Green cells — valid moves you can click.</li>
            <li>Dark cells — burned (visited), cannot move there.</li>
          </ul>
        </div>
      )}
    </section>
  );
}

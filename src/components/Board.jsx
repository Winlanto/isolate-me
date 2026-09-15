export default function Board({ currentPosition, burnedPositions, validMoves, onCellClick, isBotTurn, phase, winner }) {
  return (
    <div className="board">
      {Array.from({ length: 9 }, (_, index) => {
        const isCurrent = index === currentPosition;
        let displayToken = '';
        let cellClass = 'cell ';

        if (burnedPositions?.has(index) && !isCurrent) {
          cellClass += 'cell--burned ';
        } else if (isCurrent) {
          if (phase === 'over') {
            displayToken = winner === 'Human' ? '🏆 P' : '🏆 B';
            cellClass += winner === 'Human' ? 'cell--player ' : 'cell--bot ';
          } else {
            displayToken = isBotTurn ? 'B' : 'P';
            cellClass += isBotTurn ? 'cell--bot ' : 'cell--player ';
          }
        } else if (validMoves?.includes(index) && phase === 'playing' && !isBotTurn) {
          cellClass += 'cell--valid ';
        }

        return (
          <div
            key={index}
            className={cellClass.trim()}
            onClick={validMoves?.includes(index) ? () => onCellClick(index) : undefined}
          >
            {isCurrent && (
              <span className="cell-token">{displayToken}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

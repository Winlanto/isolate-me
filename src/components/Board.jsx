export default function Board({ currentPosition, burnedPositions, validMoves, onCellClick, isBotTurn }) {
  return (
    <div className="board">
      {Array.from({ length: 9 }, (_, i) => {
        const isCurrent = i === currentPosition;
        const isBurned  = !isCurrent && burnedPositions?.has(i);
        const isValid   = validMoves?.includes(i);

        const className = [
          'cell',
          isCurrent ? 'cell--current' : '',
          isBurned  ? 'cell--burned'  : '',
          isValid   ? 'cell--valid'   : '',
        ].filter(Boolean).join(' ');

        return (
          <div
            key={i}
            className={className}
            onClick={isValid ? () => onCellClick(i) : undefined}
          >
            {isCurrent && (
              <span className="cell-token">{isBotTurn ? '[B]' : '[P]'}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

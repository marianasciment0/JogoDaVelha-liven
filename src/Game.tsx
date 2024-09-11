import useGameState from "./useGameState";
import { calculateWinner } from "./utils";

function Square({ id, value, onClick }: { id: number; value: string | null; onClick: () => void }) {
  return (
    <button data-testid={`square-${id}`} className="square" onClick={onClick}>
      {value}
    </button>
  );
}

const Board = ({ squares, onSquareClick }: { squares: (string | null)[]; onSquareClick: (squareId: number) => void }) => {
  const renderSquare = (squareId: number) => {
    return (
      <Square
        id={squareId}
        value={squares[squareId]}
        onClick={() => onSquareClick(squareId)}
      />
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game: React.FC = () => {
  const {
    currentBoard,
    stepNumber,
    nextPlayer,
    computeMove,
    restartGame
  } = useGameState();

  const handleSquareClick = (squareId: number) => {
    if (calculateWinner(currentBoard) || currentBoard[squareId]) {
      // Game over or square already handled
      return;
    }
    computeMove(squareId);
  };

  const renderStatusMessage = () => {
    const winner = calculateWinner(currentBoard);
    if (winner) {
      return (
        <>
          <div>Winner: {winner}</div>
          <button onClick={restartGame}>Play Again</button>
        </>
      );
    } else if (stepNumber === 9) {
      return (
        <>
          <div>Draw: Game over</div>
          <button onClick={restartGame}>Play Again</button>
        </>
      );
    } else {
      return "Next player: " + nextPlayer;
    }
  };

  return (
    <>
      <h1>
        TIC-TAC-LIVEN{" "}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h1>
      <div className="game">
        <div className="game-board">
          <Board squares={currentBoard} onSquareClick={handleSquareClick} />
        </div>
        <div className="game-info">
          <div>Current step: {stepNumber}</div>
          <div>{renderStatusMessage()}</div>
        </div>
      </div>
    </>
  );
};

export default Game;

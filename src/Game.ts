import React, {useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import './Game.css';


function Square ({value, onClick}: Square) {
  return(
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}


function Board ({state, onClick} : Board){
  const renderSquare = (i:number) => {
    return<Square value={state[i]} onClick={() => onClick(i)} />;
  };
    return (
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
          {renderSquare(3)}
        </div>
        <div className="board-row">
          {renderSquare(4)}
          {renderSquare(5)}
          {renderSquare(6)}
          {renderSquare(7)}
        </div>
        <div className="board-row">
          {renderSquare(8)}
          {renderSquare(9)}
          {renderSquare(10)}
          {renderSquare(11)}
        </div>
        <div className="board-row">
          {renderSquare(12)}
          {renderSquare(13)}
          {renderSquare(14)}
          {renderSquare(15)}
        </div>
      </div>
    );
}

function calculateWinner(squares: string []){
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];
  for (let i = 0; i < lines.length; i++){
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]){
      return squares[a];
    }
  }
  return null;
}

function Game() {
  const [state, setState] = useState ({
    history: [{squares: Array(16).fill(null)}],
    xIsNext: true,
    stepNumber:0
  });
  const current = state.history[state.stepNumber];
  const winner = calculateWinner(current.squares);
  const onClick = useCallback(
    i => {
      const history = state.history.slice(0, state.stepNumber + 1);
      const square = current.squares.slice();
      if(calculateWinner(square) || square[i]){
        return null;
      }
      square[i] = state.xIsNext ? "x" : "o";
      setState({
        ...state,
        history: history.concat([
          {
            squares:square
          }
        ]),
        xIsNext: !state.xIsNext,stepNumber:history.length
      });
    },
    [state, current]
  );
    const jumpTo = (step: number) => {
      setState({
        ...state,
        stepNumber: step,
        xIsNext: step % 2 === 0
      });
    };
    const moves = state.history.map((step: object, move: number) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (state.xIsNext ? "X" : "o");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board state={current.squares} onClick={(i: number) => onClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

ReactDOM.render(
  <Game />,document.getElementById('root')
);
export default Game;
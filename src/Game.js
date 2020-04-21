import React, {useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import './Game.css';

// class Square extends React.Component{
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

type Square = {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement,MouseEvent>) => void;
};

function Square ({value, onClick}: Square) {
  return(
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

type Board = {
  state: string[];
  onClick: (i: number) => void;
}

function Board ({state, onClick} : Board){
  const renderSquare = (i:number) => {
    return<Square value={state[i]} onClick={() => onClick(i)} />;
  };
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
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
  const [state, setState] = useState({
    history: [{squares: Array(16).fill(null)}],
    xIsNext: true,
    stepNumber: 0
  });
   const winner = calc(current.squares);
  const onClick = useCallback(
    i => {
      const history = state.history.slice(0, state.stepNumber + 1);
      const square = current.squares.slice();
      if (calc(square) || square[i]) {
        return null;
      }
      square[i] = state.xIsNext ? "x" : "o";
      setState({
        ...state,
        history: history.concat([
          {
            squares: square
          }
        ]),
        xIsNext: !state.xIsNext,
        stepNumber: history.length
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
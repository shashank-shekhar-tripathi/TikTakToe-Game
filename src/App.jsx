import "./App.css";
import { useState } from "react";

function App() {
  const [box, setBox] = useState(Array(9).fill(null));
  const [isXTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  function renderSquare(index) {
    return (
      <button className="box" onClick={() => handleClick(index)}>
        {box[index]}
      </button>
    );
  }

  function handleClick(index) {
    // Ignore clicks on squares that are already filled or if there's a winner
    if (box[index] || winner) return;

    const newBox = [...box];
    newBox[index] = isXTurn ? "X" : "O";
    setBox(newBox);
    setXTurn(!isXTurn);

    const winnerCombination = checkWinner(newBox);
    if (winnerCombination) {
      setWinner(newBox[winnerCombination[0]]);
    }
  }

  function checkWinner(newBox) {
    const combination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < combination.length; i++) {
      const [a, b, c] = combination[i];
      if (newBox[a] === newBox[b] && newBox[b] === newBox[c]) {
        return combination[i];
      }
    }
    return null;
  }

  return (
    <>
      <div className="board">
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
      {winner && <div className="botom-text">{winner} is Winner of this Game.</div>}
      
    {  winner && <button onClick={()=>{
        setBox([]);
        setXTurn(true)
        setWinner(null)
    }}>Reset</button>
  }
      </div>
    </>
  );
}

export default App;

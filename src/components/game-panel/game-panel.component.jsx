import React, { useState, useEffect }  from "react"
import {Square} from "../../components";
import { getGameSettings, getAdjacentSquares } from "../../helpers";


function GamePanel({numBombs, gameActive, startTimer, setStartTimer, handleGameEnd, handleGameScore, setGameWon}){
  
  const [boardSize, setBoardSize] = useState(getGameSettings(numBombs));
  const [revealed, setRevealed] = useState(Array(boardSize.rows).fill().map(() => Array(boardSize.cols).fill(false)));
  const [clickedBomb, setClickedBomb] = useState(false);
  const [flags, setFlags] = useState(new Set());

  useEffect(() => {
    setBoardSize(getGameSettings(numBombs));
  }, [numBombs]);
  // const boardSize = getGameSettings(numBombs);
 // console.log(`Bombs: ${numBombs} - Board Size: ${boardSize.rows}, ${boardSize.cols}`);

 const [bombs, setBombs] = useState(new Set());
 useEffect(() => {
    setBombs(generateBombs(boardSize, numBombs));
  }, [numBombs, gameActive, boardSize]);

  function generateBombs(boardSize, numBombs) {
    let bombs = new Set();
    while (bombs.size < numBombs) {
        let randomRow = Math.floor(Math.random() * boardSize.rows);
        let randomCol = Math.floor(Math.random() * boardSize.cols);
        bombs.add(`${randomRow}-${randomCol}`);
    }
    return bombs;
  }
  //console.log(`Bombs: ${Array.from(bombs)}`);
  
  let board = [];
  for (let i = 0; i < boardSize.rows; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize.cols; j++) {
      let isBomb = bombs.has(`${i}-${j}`);
      board[i][j] = (
        <Square 
        gameActive={gameActive} 
        key={`${i}-${j}`} 
        id={`${i}-${j}`} 
        isBomb={isBomb} 
        bombs={bombs}
        revealed={revealed[i][j]}
        handleGameScore={handleGameScore}
        revealSquare={revealSquare}
        setClickedBomb={setClickedBomb}
        flagSquare={flagSquare}
        />
      );
    }
  }
  
  
  
  function flagSquare(id) {
    // const id = square.target.id;
    if (flags.has(id)) {
      setFlags(prevState => {
        const newState = new Set(prevState);
        newState.delete(id);
        return newState;
      });
    } else {
      setFlags(prevState => {
        const newState = new Set(prevState);
        newState.add(id);
        return newState;
      });
    }
  }
    
  function revealSquare(row, col, nBombs) {
    if(!startTimer) setStartTimer(true);

    const adjacentSquares = getAdjacentSquares(row, col, boardSize.rows, boardSize.cols);
    //console.log(`Adjacent cells: ${adjacentSquares}`);
    setRevealed(prevState => {
        const newState = [...prevState];
        if(nBombs>0){
          newState[row][col] = true;
        }
        else{
        adjacentSquares.forEach((square) => {
          const [adjRow, adjCol] = square.split('-').map(Number);
          if(flags.has(`${adjRow}-${adjCol}`)) return;
          if (revealed[adjRow][adjCol] === false){
            newState[adjRow][adjCol] = true;
          }
        });
      }
        return newState;
      });
    //console.log(`Revealed Arr: ${revealed}`);
  }


                  //GAME END LOGIC   >>>>>>
  
  useEffect(() => {              
    if (clickedBomb && gameActive) {
      setGameWon(0);
      handleGameEnd(0);
    }  
  }, [clickedBomb, gameActive, handleGameEnd]);  
    


  useEffect(() => {
    const revealedCount = revealed.flat().filter(Boolean).length;
    console.log("Revealed: " + revealedCount);
    console.log("Revealed Array: ", revealed);
    console.log("Number of Bombs: ", numBombs);
    console.log("");
    if (revealedCount === boardSize.rows * boardSize.cols - numBombs) {
      handleGameEnd(1);
    }
  }, [revealed]);
  
                  // <<<<<< GAME END LOGIC


  return (
    <div className="game-panel">
    {/* {board.map((row, i) => (
      <div key={i}>
        {row}
      </div>
    ))} */}
    {board[0].map((col, i) => (
      <div key={i}>
        {board.map(row => row[i])}
      </div>
    ))}
  </div>
  
  );
}

export default GamePanel;
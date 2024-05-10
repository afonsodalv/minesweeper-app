import React, { useState, useEffect }  from "react"
import {Square} from "../../components";
import { getGameSettings, getAdjacentSquares } from "../../helpers";


function GamePanel({numBombs, gameActive, handleGameEnd, handleGameScore}){
  
  const [boardSize, setBoardSize] = useState(getGameSettings(numBombs));

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

  const [clickedBomb, setClickedBomb] = useState(false);

  useEffect(() => {
    if (clickedBomb && gameActive) {
      handleGameEnd(0);
    }
  }, [clickedBomb, gameActive, handleGameEnd]);
  

  const board = Array(boardSize.rows).fill().map(() => Array(boardSize.cols).fill(
    <Square 
      gameActive={gameActive} 
      key={`default-key`} 
      id={`default-id`} 
      isBomb={false} 
      bombs={new Set()}
      revealed={false}
      revealSquare={() => {}}
      setClickedBomb={setClickedBomb}
    />
  ));
  
  const [revealed, setRevealed] = useState(Array(boardSize.rows).fill().map(() => Array(boardSize.cols).fill(false)));
  
  function revealSquare(row, col, bombs) {

    const adjacentSquares = getAdjacentSquares(row, col, boardSize.rows, boardSize.cols);
    //console.log(`Adjacent cells: ${adjacentSquares}`);
  

    setRevealed(prevState => {
        const newState = [...prevState];
        
        if(bombs>0){
          newState[row][col] = true;
        }
        else{
        adjacentSquares.forEach((square) => {
          const [adjRow, adjCol] = square.split('-').map(Number);
          if (revealed[adjRow][adjCol] === false){
            newState[adjRow][adjCol] = true;
          }
        });
      }
        return newState;
      });
      
    //console.log(`Revealed Arr: ${revealed}`);
  }

 
  useEffect(() => {
    const revealedCount = revealed.flat().filter(Boolean).length;

    console.log( "Revel: " + revealedCount);
    
    if (revealedCount === boardSize.rows * boardSize.cols - numBombs) {
      handleGameEnd(1);
    }
  }, [revealed]);

  


  for (let i = 0; i < boardSize.rows; i++) {
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
          revealSquare={revealSquare}
          setClickedBomb={setClickedBomb}
          handleGameScore={handleGameScore}
        />
      );
    }
  }
    
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
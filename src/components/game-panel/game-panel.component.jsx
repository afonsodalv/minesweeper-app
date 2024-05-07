import React, {useState, useEffect} from "react"
import {Square} from "../../components";
import { getGameSettings } from "../../helpers";



function GamePanel({numBombs, gameActive, handleGameEnd}){
  // const boardSize = getBoardSize(numBombs);
  const boardSize = getGameSettings(numBombs);
  const bombs = generateBombs(boardSize, numBombs);
  const board = [];
  

  const [squares, setSquares] = useState(3);
  console.log(squares);
  const getSquare = (row, col) => squares[row][col];
  const setSquare = (row, col, newValue) => {
    setSquares(prevSquares => {
      const newSquares = [...prevSquares];
      newSquares[row][col] = newValue;
      return newSquares;
    });
  };

  function generateBombs(boardSize, numBombs) {
    let bombs = new Set();
    while (bombs.size < numBombs) {
        let randomRow = Math.floor(Math.random() * boardSize.rows);
        let randomCol = Math.floor(Math.random() * boardSize.cols);
        bombs.add(`${randomRow}-${randomCol}`);
    }
    return bombs;
  }

  function endGameBoard(){
   // handleGameEnd();
    for(let i=0; i<boardSize.cols; i++){
      for (let j = 0; j < boardSize.rows; j++){
        if(bombs.has(`${i}-${j}`))
            console.log('k');
      }
    }
  }


  for (let i = 0; i < boardSize.cols; i++) {
    const row = [];
    for (let j = 0; j < boardSize.rows; j++) {
      let isBomb = bombs.has(`${i}-${j}`);
      row.push(<Square gameActive={gameActive} key={`${i}-${j}`} id={`${i}-${j}`} isBomb={isBomb} cellType={'init'} bombs={bombs} getSquare={getSquare} setSquare={setSquare} endGameBoard={endGameBoard}/>);
        }
        board.push(<div key={i}>{row}</div>);
      }
    
      return (
        <div className="game-panel" >
          {board}
        </div>
      );
    }

export default GamePanel;
import React from "react"
import {Square} from "../../components";
import { getGameSettings } from "../../helpers";


function GamePanel({numBombs, gameActive}){
  // const boardSize = getBoardSize(numBombs);
  const boardSize = getGameSettings(numBombs);
  const bombs = generateBombs(boardSize, numBombs);
  const board = [];

  function generateBombs(boardSize, numBombs) {
    let bombs = new Set();
    while (bombs.size < numBombs) {
        let randomRow = Math.floor(Math.random() * boardSize.rows);
        let randomCol = Math.floor(Math.random() * boardSize.cols);
        bombs.add(`${randomRow}-${randomCol}`);
    }
    return bombs;
  }

  for (let i = 0; i < boardSize.cols; i++) {
    const row = [];
    for (let j = 0; j < boardSize.rows; j++) {
      let isBomb = bombs.has(`${i}-${j}`);
      row.push(<Square gameActive={gameActive} key={`${i}-${j}`} id={`${i}-${j}`} isBomb={isBomb} cellType={'init'} bombs={bombs}  />); // 1 is a placeholder for the cell number
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
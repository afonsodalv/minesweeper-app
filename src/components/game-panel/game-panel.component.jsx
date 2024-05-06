import React from "react"
import {Square} from "../../components";


function GamePanel({numBombs}){


    const boardSize = getBoardSize(numBombs);
    const board = [];

    function getBoardSize(numBombs) {

        
        switch (numBombs) {
          case 10:
            return { rows: 9, cols: 9 };
          case 40:
            return { rows: 16, cols: 16 };
        default:   
            return { rows: 16, cols: 30 };
          
        }
      }

    for (let i = 0; i < boardSize.cols; i++) {
        const row = [];
        for (let j = 0; j < boardSize.rows; j++) {
          row.push(<Square key={`${i}-${j}`} />);
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
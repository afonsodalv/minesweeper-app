import React, { useState, useEffect } from "react";
import "./square.css";
import {Sprite} from '../../assets';
import { countAdjacentBombs } from "../../helpers";

function Square({gameActive, gameWon, id, isBomb, bombs, revealed, revealSquare, setClickedBomb, handleGameScore, flagSquare, revealBBPressed}){

    // Initialize the cell type state with the default value '-init' and the setCellType function to update it accordingly
    const [cellType, setCellType] = useState('-init');
    const getCellBackground = (cellType) => {
        let background;
        if (typeof cellType === 'number') {
            background = `url(${Sprite}) -${(cellType-1) * 17}px 16px`;
        } 
        else if (cellType === '-init') {
            background = `url(${Sprite}) 0px -51px`;
        } 
        else if (cellType === '-flag') {
            background = `url(${Sprite}) -34px -51px`;
        } 
        else if(cellType === '-wrongFlag'){
            background = `url(${Sprite}) -119px -51px`;
        }
        else if (cellType === '-question') {
            background = `url(${Sprite}) -51px -51px`;
        } 
        else if (cellType === '-bomb') {
            background = `url(${Sprite}) -102px -51px`;
        } 
        else if (cellType === '-bombEnd'){
            background = `url(${Sprite}) -85px -51px`;
        }
        else if (cellType === '-clicked') {
            background = `url(${Sprite}) -17px -51px`;
        }

        return {
            width: '16px',
            height: '16px',
            zoom: '1.2',
            background,
        };
    };

    // Initialization of the clicked and x states. 
    // Clicked will tracked whether the square has been clicked, and x will track the state of the square (0: clicked, 1: flag, 2: question mark 3: initial state)   
    const [clicked, setClicked] = useState(false);
    const [x, setX] = useState(3);
    const [bothButtonsPressed, setBothButtonsPressed] = useState(false);
    

    // This condition is required for the recursive reveal of squares
    if (revealed && !clicked) {
        handleLeftClick();
    }

    // This effect will update the board when the game is over, efectively revealing all the bombs (game lost) or flags (game won)
    useEffect(() => {
        if (!gameActive && isBomb && !clicked) {
            if(gameWon){
                setCellType('-flag');
                handleGameScore(0);
            } 
            else {
                setCellType('-bombEnd');
            }
        }
        if(!gameActive && !isBomb && cellType === '-flag'){
            setCellType('-wrongFlag');
        }
        if(!gameActive && isBomb && cellType === '-flag'){
            setCellType('-flag');
        }
        //eslint-disable-next-line
    }, [gameActive]);

    
    function handleLeftClick() {
        if (bothButtonsPressed || !gameActive || (gameActive && clicked)) return;
        
        if(x!==1){
            setX(0);
            revealed = true;
            const [row, col] = id.split('-').map(Number);
            const nBombs = countAdjacentBombs(row, col, bombs);

            if(isBomb) {
                setCellType('-bomb');
                setClickedBomb(true);
            } else if(nBombs === 0) {
                setCellType('-clicked');
                revealSquare(row, col, nBombs);
            } else {
                setCellType(nBombs);
                revealSquare(row, col, nBombs);
            }
            setClicked(true);
        }
    }

    function handleRightClick(event){
        event.preventDefault();
        if (bothButtonsPressed || !gameActive || (gameActive && clicked)) return;

        if(x!==3) {
            setX(x+1);
            if((x+1) === 2) {
                setCellType('-question');
                flagSquare(id);
            } else {
                setCellType('-init');
            }
        } else if(x===3) {
            setX(1);
            setCellType('-flag');
            flagSquare(id);
        }
        handleGameScore(x);
    }


    function handleBothButtonsClick(event) {
        if (event.buttons === 3 && clicked) {
            setBothButtonsPressed(true);
        }
    }

    function handleMouseUp(event) {
        if (event.buttons === 0 && bothButtonsPressed) {
            setBothButtonsPressed(false);
            const [row, col] = id.split('-').map(Number);
            const nBombs = countAdjacentBombs(row, col, bombs);
            revealBBPressed(row, col, nBombs);
        }
    }


    return (
        <div 
            className='square-blank' 
            style={getCellBackground(cellType)} 
            onClick={handleLeftClick} 
            onContextMenu={handleRightClick}
            onMouseDown={handleBothButtonsClick}
            onMouseUp={handleMouseUp}
        ></div>
    );
}

export default Square;
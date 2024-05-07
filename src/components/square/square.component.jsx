import React, { useState } from "react";
import "./square.css";
// import {SadFace, Flag, Reset} from "../../assets";
import {Sprite} from '../../assets';
import { countAdjacentBombs, getAdjacentSquares } from "../../helpers";



function Square({gameActive, id, isBomb, bombs}){

    const [cellType, setCellType] = useState('-init');

    const getCellBackground = (cellType) => {
        let background, zoom;

        if (typeof cellType === 'number') {
            background = `url(${Sprite}) -${(cellType-1) * 17}px 16px`;
        } 
        else if (cellType === '-init') {
            background = `url(${Sprite}) 0px -51px`;
            zoom = '1.5';
        } 
        else if (cellType === '-flag') {
            background = `url(${Sprite}) -34px -51px`;
        } 
        else if (cellType === '-question') {
            background = `url(${Sprite}) -51px -51px`;
        else if (cellType === '-bomb') {
            background = `url(${Sprite}) -102px -51px`;
        } 
        else if (cellType === '-clicked') {
            background = `url(${Sprite}) -17px -51px`;
        }

        return {
            width: '16px',
            height: '16px',
            zoom,
            background,
        };
    };

    const [clicked, setClicked] = useState(false);
    const [x, setX] = useState(3);


    function handleLeftClick() {
        if (!gameActive) return;
        setClicked(true);
        if(x!==1){
            setX(0);
        
            const [row, col] = id.split('-').map(Number);
            const nBombs = countAdjacentBombs(row, col, bombs);
            if(isBomb) {
                setCellType('-bomb');
            } else if(nBombs === 0) {
                setCellType('-clicked');
                // Add your logic for clicking adjacent squares here
                // clickAdjacentCells(row, col, bombs);
                
            } else {
                setCellType(nBombs);
            }
        }   
    }

    function handleRightClick(event){
        if (!gameActive) return;
        event.preventDefault();
        setClicked(true);

        if(x && x!==3) {
            setX(x+1);
            (x+1) === 2 ? setCellType('-question') : setCellType('-init');
        } else if(x===3) {
            setX(1);
            setCellType('-flag');
        }
    }

    return (
        <div className='square-blank' style={getCellBackground('-init')} onClick={handleLeftClick} onContextMenu={handleRightClick}>
            {clicked && x!==3 && (
            <div style={getCellBackground(cellType)}></div>
            )}
        </div>
    );
}

export default Square;
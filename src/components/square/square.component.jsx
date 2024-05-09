import React, { useState } from "react";
import "./square.css";
import {Sprite} from '../../assets';
import { countAdjacentBombs } from "../../helpers";


function Square({gameActive, id, isBomb, bombs, revealed, revealSquare, setClickedBomb }){

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
        else if (cellType === '-question') {
            background = `url(${Sprite}) -51px -51px`;
        } 
        else if (cellType === '-bomb') {
            background = `url(${Sprite}) -102px -51px`;
        } 
        else if (cellType === '-clicked') {
            background = `url(${Sprite}) -17px -51px`;
        }

        return {
            width: '16px',
            height: '16px',
            zoom: '1.5',
            background,
        };
    };


    const [clicked, setClicked] = useState(false);
    const [x, setX] = useState(3);


    if (revealed && !clicked) {
        handleLeftClick();
    }

    function handleLeftClick() {
        if (!gameActive) return;
        
        if(x!==1){
            setX(0);
            revealed = true;
            const [row, col] = id.split('-').map(Number);
            const nBombs = countAdjacentBombs(row, col, bombs);
            console.log(`Square component about to call countAdjacentBombs: ${row}, ${col} - ${nBombs} bombs nearby`);
            if(isBomb) {
                setCellType('-bomb');
                setClickedBomb(true);
            } else if(nBombs === 0) {
                setCellType('-clicked');
                if(!clicked) {
                    console.log(`Square component about to call reveal square: ${row}, ${col}`);
                    setClicked(true);
                    revealSquare(row, col);
                } 

            } else {
                setCellType(nBombs);
            }
            setClicked(true);
            
        }
    }

    function handleRightClick(event){
        if (!gameActive) return;
        event.preventDefault();

        if(!clicked && x!==3) {
            setX(x+1);
            (x+1) === 2 ? setCellType('-question') : setCellType('-init');
        } else if(x===3) {
            setX(1);
            setCellType('-flag');
        }
    }

    return (
        <div className='square-blank' style={getCellBackground(cellType)} onClick={handleLeftClick} onContextMenu={handleRightClick}></div>
    );
}

export default Square;
import React, { useState } from "react";
import "./square.css";
// import {SadFace, Flag, Reset} from "../../assets";
import {Sprite} from '../../assets';
import { countAdjacentBombs } from "../../helpers";


function Square({gameActive, id, cellType, isBomb, bombs}){

    const getCellBackground = (cellType) => {
        let background, zoom;
        if (typeof cellType === 'number') {
            background = `url(${Sprite}) -${(cellType-1) * 17}px 16px`;
        } else if (cellType === 'init') {
            background = `url(${Sprite}) 0px -51px`;
            zoom = '1.5';
        } else if (cellType === '-flag') {
            background = `url(${Sprite}) -34px -51px`;
        } else if (cellType === '-question') {
            background = `url(${Sprite}) -51px -51px`;
        } else if (cellType === '-clicked') {
            const [row, col] = id.split('-').map(Number);
            const nBombs = countAdjacentBombs(row, col, bombs);
            if(isBomb) {
                background = `url(${Sprite}) -119px -51px`;
            } else if(nBombs === 0) {
                background = `url(${Sprite}) -17px -51px`;
            } else background = `url(${Sprite}) -${(nBombs-1) * 17}px 16px`;
        // } else if (cellType === 'bomb') {
        //     background = `url(${Sprite}) -119px -51px`;
        // } else if (cellType === 'empty') {
        //     background = `url(${Sprite}) -17px -51px`;
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

    function handleLeftClick(){
        if (!gameActive) return;
        setClicked(true);

        if(x!==1)
            setX(0);
    }

    function handleRightClick(event){
        if (!gameActive) return;
        event.preventDefault();
        setClicked(true);

        // switch(x){
        //     case 0:
        //         return;
        //     case 1:
        //         setX(2);break;
        //     case 2:
        //         setX(3);break;
        //     default:
        //         setX(1);break;            
        // }
        if(x && x!==3) setX(x+1);
        else if(x===3) setX(1);
    }

    function getClass(x){
        switch(x){
            case 0:
                return '-clicked';
            case 1:
                return '-flag';
            case 2:
                return '-question';
            default:
                return '-blank';
        }
    }

    return (
        // <div className='square-blank' data-logo="test" onClick={handleLeftClick} onContextMenu={handleRightClick}>
        //     {clicked && x!==3 && (
        //     <img 
        //     src={x === 1 ? Flag : x === 2 ? Reset : SadFace}
        //         className={`square${getClass(x)}`}
        //         alt='square placeholder test'
        //     />
        //     )}
        // </div>
        <div className='square-blank' style={getCellBackground(cellType)} onClick={handleLeftClick} onContextMenu={handleRightClick}>
            {clicked && x!==3 && (
            <div style={getCellBackground(getClass(x))}></div>
            )}
        </div>
    );
}

export default Square;
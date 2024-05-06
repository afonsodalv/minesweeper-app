import React, { useState } from "react";
import "./square.css";
import {SadFace, Flag, Reset} from "../../assets";

function Square({gameActive}){

    const [clicked, setClicked] = useState(false);
    const [x, setX] = useState(3);

    function handleLeftClick(){
        if (!gameActive) return;
        setClicked(true);

        if(x===3)
            setX(0);
    }

    function handleRightClick(event){
        if (!gameActive) return;
        event.preventDefault();
        setClicked(true);

        switch(x){
            case 0:
                return;
            case 1:
                setX(2);break;
            case 2:
                setX(3);break;
            default:
                setX(1);break;            
        }
    }

    function getClass(x){
        switch(x){
            case 1:
                return '-flag';
            case 2:
                return '-question';
            default:
                return '-blank';
        }
    }

    return (
        <div className='square-blank' data-logo="test" onClick={handleLeftClick} onContextMenu={handleRightClick}>
            {clicked && x!==3 && (
            <img 
            src={x === 1 ? Flag : x === 2 ? Reset : SadFace}
                className={`square${getClass(x)}`}
                alt='square placeholder test'
            />
            )}
        </div>
    );
}

export default Square;
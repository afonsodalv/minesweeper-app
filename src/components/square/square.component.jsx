import React, { useState } from "react";
import "./square.css";
import {SadFace, Flag, Reset} from "../../assets";

function Square(){

    const [clicked, setClicked] = useState(false);
    const [x, setX] = useState(null);

    function handleLeftClick(){
        console.log('Esq');
        setClicked(true);
        setX(0);
    }

    function handleRightClick(event){
        event.preventDefault();
        console.log('dir');
        setClicked(true);

        if(x===1)
            setX(2);
        else
            setX(1);
    }

    function getClass(x){
        if(x === 0)
            return '-btInit'
        if(x === 1)
            return '-flag'
        if(x===2)
            return '-question'
    }

    return (
        <div className='square-blank' data-logo="test" onClick={handleLeftClick} onContextMenu={handleRightClick}>
            {clicked && (
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
import React from "react";
import "./square.css";
import {SadFace, Reset} from "../../assets";

function Square(){

    return (
        // <div className="square-blank"></div>

        //estava só a experimentar uma cena ;) não ligues a isto
        <div className='square-blank' data-logo="test">
            <img 
                src= {SadFace}
                className='btInit'
                alt='square placeholder test'
            />
        </div>
    );
}

export default Square;
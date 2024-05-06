import React, { useState } from "react";
import "./square.css";
import {SadFace, Reset} from "../../assets";

function Square(){

    const [clicked, setClicked] = useState(false);
    
    return (
        // <div className="square-blank"></div>

        //estava só a experimentar uma cena ;) não ligues a isto
        <div className='square-blank' data-logo="test" onClick={()=>setClicked(true)}>
            <img 
                src= { SadFace}
                className={clicked ? 'btInit':'hidden'}
                alt='square placeholder test'
            />
        </div>
    );
}

export default Square;
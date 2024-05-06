import React from "react";
import "./square.css";
import {Sprite} from '../../assets';

const getCellNumber = (cellNumber) => {
    let background;
    if (typeof cellNumber === 'number') {
        background = `url(${Sprite}) -${(cellNumber-1) * 17}px 16px`;
    } else if (cellNumber === 'flag') {
        // Set background for flag
    } else if (cellNumber === 'question') {
        // Set background for question
    } else if (cellNumber === 'bomb') {
        // Set background for bomb
    }

    return {
        width: '16px',
        height: '16px',
        background,
    };
};

function Square({ cellNumber }) {
    return (
        <div style={getCellNumber(cellNumber)}></div>
    );
}

export default Square;
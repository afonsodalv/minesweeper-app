function getGameSettings(numBombs){
    let difficulty, rows, cols;
  
    switch (numBombs) {
        case 10:
            difficulty = '-easy';
            rows = 9;
            cols = 9;
            break;
        case 40:
            difficulty = '-medium';
            rows = 16;
            cols = 16;
            break;
        default:
            difficulty = '-hard';
            rows = 16;
            cols = 30;
    }
  
    return { difficulty, rows, cols };
};

export default getGameSettings;
  


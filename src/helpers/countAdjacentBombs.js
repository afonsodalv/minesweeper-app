function countAdjacentBombs(row, col, bombs) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            if (bombs.has(`${row + i}-${col + j}`)) {
                count++;
            }
        }
    }
    return count;
}

export default countAdjacentBombs;
function getAdjacentSquares(row, col) {
    const adjacentSquares = [];

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the current square
            adjacentSquares.push(`${row + i}-${col + j}`);
        }
    }

    return adjacentSquares;
}

export default getAdjacentSquares;
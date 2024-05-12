import React, { useState, useEffect }  from "react"
import {Square} from "../../components";
import { getGameSettings, getAdjacentSquares } from "../../helpers";


function GamePanel({numBombs, gameActive, startTimer, setStartTimer, handleGameEnd, handleGameScore, gameWon, setGameWon}){
  
	const [boardSize, setBoardSize] = useState(getGameSettings(numBombs));
	const [revealed, setRevealed] = useState(Array(boardSize.rows).fill().map(() => Array(boardSize.cols).fill(false)));
	const [clickedBomb, setClickedBomb] = useState(false);
	const [flags, setFlags] = useState(new Set());
	const [bombs, setBombs] = useState(new Set());

	// This effect will update the board size when the number of bombs changes
	useEffect(() => {
		setBoardSize(getGameSettings(numBombs));
	}, [numBombs]);
	// const boardSize = getGameSettings(numBombs);
	// console.log(`Bombs: ${numBombs} - Board Size: ${boardSize.rows}, ${boardSize.cols}`);

	// This effect will generate the bombs when the game starts
	useEffect(() => {
		setBombs(generateBombs(boardSize, numBombs));
  	}, [numBombs, gameActive, boardSize]);

	function generateBombs(boardSize, numBombs) {
		let bombs = new Set();
		while (bombs.size < numBombs) {
			let randomRow = Math.floor(Math.random() * boardSize.rows);
			let randomCol = Math.floor(Math.random() * boardSize.cols);
			bombs.add(`${randomRow}-${randomCol}`);
		}
		return bombs;
	}
	//console.log(`Bombs: ${Array.from(bombs)}`);
  
	// This function will create a 2D array of Square components
	let board = [];
	for (let i = 0; i < boardSize.rows; i++) {
		board[i] = [];
		for (let j = 0; j < boardSize.cols; j++) {
		let isBomb = bombs.has(`${i}-${j}`);
		board[i][j] = (
			<Square 
			key={`${i}-${j}`} 
			gameActive={gameActive} 
			gameWon={gameWon}
			id={`${i}-${j}`} 
			isBomb={isBomb} 
			bombs={bombs}
			revealed={revealed[i][j]}
			revealSquare={revealSquare}
			setClickedBomb={setClickedBomb}
			handleGameScore={handleGameScore}
			flagSquare={flagSquare}
			/>
		);
		}
	}
  
	// This function will flag or unflag a square. It is passed as a prop to the Square component and is called when the right mouse button is clicked.
	function flagSquare(id) {
		if (flags.has(id)) {
		setFlags(prevState => {
			const newState = new Set(prevState);
			newState.delete(id);
			return newState;
		});
		} else {
		setFlags(prevState => {
			const newState = new Set(prevState);
			newState.add(id);
			return newState;
		});
		}
	}
    
	// This function will reveal the square and adjacent squares if there are no bombs nearby
	// it will be recursively called for each adjacent square that has no bombs nearby
	function revealSquare(row, col, nBombs) {
		if(!startTimer) setStartTimer(true);

		const adjacentSquares = getAdjacentSquares(row, col, boardSize.rows, boardSize.cols);
		//console.log(`Adjacent cells: ${adjacentSquares}`);
		setRevealed(prevState => {
		const newState = [...prevState];
		newState[row][col] = true;
		if(nBombs===0){
			adjacentSquares.forEach((square) => {
			const [adjRow, adjCol] = square.split('-').map(Number);
			if(flags.has(`${adjRow}-${adjCol}`)) return;
			if (revealed[adjRow][adjCol] === false){
				newState[adjRow][adjCol] = true;
			}
			});
		}
		return newState;
		});
		//console.log(`Revealed Arr: ${revealed}`);
	}


					//GAME END LOGIC   >>>>>>
	
	useEffect(() => {
		if (!gameActive) return;

		// Logic for when a bomb is clicked
		if (clickedBomb) {
		setGameWon(false);
		handleGameEnd(false);
		return;
		}  

		// Logic for when all non-bomb squares are revealed
		const revealedCount = revealed.flat().filter(Boolean).length;
		if (revealedCount === boardSize.rows * boardSize.cols - numBombs) {
		setGameWon(true);
		handleGameEnd(true);
		}
		
	}, [revealed, boardSize, clickedBomb, gameActive, numBombs, setGameWon, handleGameEnd]);

					// <<<<<< GAME END LOGIC


  return (
    <div className="game-panel">
    {/* {board.map((row, i) => (
      <div key={i}>
        {row}
      </div>
    ))} */}
    {board[0].map((col, i) => (
      <div key={i}>
        {board.map(row => row[i])}
      </div>
    ))}
  </div>
  
  );
}

export default GamePanel;
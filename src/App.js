import { useState, useEffect, useRef } from 'react';
import './assets/styles/App.css';
import {Header, Footer, ControlPanel, GamePanel, WelcomePanel} from "./components";

function App() {
	const [gameActive, setGameActive]=useState(true);
	const [gameStarted, setGameStarted]=useState(false);
	const [startTimer, setStartTimer]=useState(false);
	const [gameWon, setGameWon]=useState(false);
	const [numBombs, setNumBombs] = useState(0);
	const [gameKey, setGameKey] = useState(0);
	const [score, setScore] = useState(0);
	
	function handleGameEnd(gameWon){
		if(gameWon)
			console.log("Ganhou (App)");
		else
			console.log("Perdeu (App)");
		setGameActive(false);
		setStartTimer(false);
	}

	// useRef Hook to keep track of the previous gameActive value
	const prevGameActiveRef = useRef(gameActive);
	useEffect(() => {
		if (!prevGameActiveRef.current && gameActive) {
			setScore(numBombs);
		}
		prevGameActiveRef.current = gameActive;
	}, [gameActive, numBombs]);

	function handleGameStarted(){
		setGameStarted(!gameStarted);
		setGameActive(true);
		setGameWon(false);
	}
	
	function resetGameKey() {
		setGameKey(prevKey => prevKey + 1);
		setGameActive(true);
		setGameWon(false);
	}

	function handleLevelChange(level){
		switch(level){
		case 1:
			setNumBombs(10);
			setScore(10);
			break;
		case 2:
			setNumBombs(40);
			setScore(40);
			break;
		default:
			setNumBombs(99);
			setScore(99);
			break;
		}
		handleGameStarted();
	}

	function handleGameScore(x){
		if(x===3)  
		setScore(score-1);
		if(x===1)
		setScore(score+1);
		if(x===0)
		setScore(0);
	}

	return (
		<div className="container">
		<Header />
		{gameStarted ? (
		<>
			<ControlPanel 
				score={score} 
				numBombs={numBombs}
				startTimer={startTimer} 
				gameWon={gameWon}
				handleGameStarted={handleGameStarted} 
				onResetGameKey={resetGameKey} 
				handleGameEnd={handleGameEnd} 
				gameActive={gameActive}
			/>
			<GamePanel 
				key={gameKey} 
				numBombs={numBombs} 
				gameActive={gameActive} 
				startTimer={startTimer}
				setStartTimer={setStartTimer}
				handleGameEnd={handleGameEnd} 
				handleGameScore={handleGameScore}
				gameWon={gameWon}
				setGameWon={setGameWon}
			/>
		</>) : (
			<WelcomePanel 
				onGameStart={handleLevelChange} 
			/>)}
			<Footer />
		</div>
	);
}

export default App;
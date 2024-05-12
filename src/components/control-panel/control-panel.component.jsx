import React, { useState, useEffect } from "react";
import "./control-panel.css";
import Timer from "../timer/timer.component";
import {Sprite} from '../../assets';
import { getGameSettings } from "../../helpers";


function ControlPanel({ numBombs, score, gameWon, gameActive, startTimer, handleGameStarted, onResetGameKey, handleGameEnd}) {
	const [resetTimer, setResetTimer] = useState(false);
	const [smile, setSmile] = useState('happy');

	const getSmile = (smile) => {
		let backgroundPosition;
		if (smile === 'happy') {
		backgroundPosition = `0px -24px`;
		} 
		else if (smile === 'pressed') {
		backgroundPosition = `-27px -24px`;
		} 
		else if (smile === 'sad') {
		backgroundPosition = `-108px -24px`;
		} 
		else if (smile === 'sunglasses') {
		backgroundPosition = `-81px -24px`;
		} 
		return {
		width: '25px',
		height: '25px',
		zoom: '1.5',
		backgroundImage: `url(${Sprite})`,
		backgroundPosition,
		};
	}

	function handleClick() {
		if (gameActive) {
			handleGameEnd();
		}
		else {
			setResetTimer(true);
			onResetGameKey();
		}
	}

	// Change level onclick function
	function handleGoBack() {
		handleGameStarted();
	}

	useEffect(() => {
		if (resetTimer) {
		setResetTimer(false);
		}
	}, [resetTimer]);
	
	useEffect(()=>{
		if(!gameActive) {
			if (gameWon) {
				setSmile('sunglasses');
			}
			else {
				setSmile('sad');
			}
		}
		else if(gameActive) {
			setSmile('happy');
		}
	}, [gameActive]);

	return (
		<div id="game-controls">
			
			{/* {resetGame && ( */}
			<>
				{/* <button onClick={handleReset} className="control-button-reset">
					<img src={Reset} alt="Reset game" />
				</button> */}
				<button onClick={handleGoBack} className="control-button-level">
					Mudar de nível
				</button>
			</>
			{/* )} */}
			<div id="back-control-panel">

				<div className={`control-panel${getGameSettings(numBombs).difficulty}`}>
					<div id="control-panel-row">
						
						<dl className="control-panel-counters">
							<dd id="points">{score}</dd>
						</dl>

						<div>
							<div 
							onClick={handleClick} 
							className="smile-button"
							style={getSmile(smile)}
							alt="Be Happy!"
							></div>
						</div>

						<dl className="control-panel-counters">
							<dd id="gameTime" ><Timer startTimer={startTimer} reset={resetTimer}/></dd>
						</dl>

					</div>
				</div>
			</div>
		</div>
	);
}
export default ControlPanel;
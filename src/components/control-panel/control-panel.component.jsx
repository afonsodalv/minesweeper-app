import React, { useState, useEffect } from "react";
import "./control-panel.css";
import Timer from "../timer/timer.component";
import {HappyFace, SadFace, Reset} from "../../assets";
import {Sprite} from '../../assets';
import { getGameSettings } from "../../helpers";


function ControlPanel({ score, startTimer, handleGameStarted, gameWon, numBombs, onResetGameKey, handleGameEnd, gameActive}) {
	const [currentImage, setCurrentImage] = useState(SadFace);
	const [resetGame, setResetGame] = useState(false);
	const [isTimerActive, setIsTimerActive] = useState(true);
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
		// if (smile !== 'happy') {
		//   setSmile('happy');
		// }

		setCurrentImage(currentImage === HappyFace ? SadFace : HappyFace);
		if (currentImage === HappyFace) {
		setResetGame(true);
		setIsTimerActive(false);
		handleGameEnd();
		}
		if (currentImage === SadFace) {
		setResetGame(false);
		setIsTimerActive(true);
		setResetTimer(true);
		onResetGameKey();
		}
	}

	function handleReset() {
		// so trabalha com img reset (painel que aparece quando se clica na cara)
		setResetGame(false);
		setCurrentImage(HappyFace);
		setIsTimerActive(true);
		setResetTimer(true);
		onResetGameKey();
	}

	function handleGoBack() {
		// so trabalha com botao mudar de nivel (painel que aparece quando se clica na cara)
		handleGameStarted();
		setResetGame(false);
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
			{resetGame && (
			<div id="control-reset">
				<button onClick={handleReset} className="control-button-reset">
				<img src={Reset} alt="Reset game" />
				</button>
				<button onClick={handleGoBack} className="control-button-level">
					Mudar de nível
				</button>
			</div>
			)}
		</div>
		</div>
	);
}
export default ControlPanel;
import React, { useState, useEffect } from "react";
import "./control-panel.css";
import Timer from "../timer/timer.component";
import {HappyFace, SadFace, Reset} from "../../assets";
//import {Sprite} from '../../assets';
import { getGameSettings } from "../../helpers";


function ControlPanel({ score, handleGameStarted, numBombs, onResetGameKey, handleGameEnd, gameActive}) {
  const [currentImage, setCurrentImage] = useState(SadFace);
  const [resetGame, setResetGame] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [resetTimer, setResetTimer] = useState(false);

  function handleClick() {
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
    if(currentImage === HappyFace && !gameActive)
        setCurrentImage(SadFace);
    else if(currentImage === SadFace && gameActive)
      setCurrentImage(HappyFace);
  }, [gameActive]);

  return (
    <div id="back-control-panel">
      <div className={`control-panel${getGameSettings(numBombs).difficulty}`}>
        <div id="control-panel-row">
          <dl className="control-panel-counters">
            <dd id="points">{score}</dd>
          </dl>
          <div>
            <button onClick={handleClick} className={`img-button${getGameSettings(numBombs).difficulty}`}>
              <img src={currentImage} alt="Current state of the game" />
            </button>
          </div>

          <dl className="control-panel-counters">
            <dd id="gameTime" ><Timer isTimerActive={gameActive} reset={resetTimer}/></dd>
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
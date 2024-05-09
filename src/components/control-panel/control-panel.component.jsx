import React, { useState, useEffect } from "react";
import "./control-panel.css";
import Timer from "../timer/timer.component";
import {HappyFace, SadFace, Reset} from "../../assets";
import { getGameSettings } from "../../helpers";


function ControlPanel({ onGameStart, gameStarted, numBombs, onResetGameKey, gameActive ,handleGameEnd, score}) {
  const [currentImage, setCurrentImage] = useState(HappyFace);
  const [resetGame, setResetGame] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
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

  useEffect(()=>{
    if(gameActive){
        setCurrentImage(HappyFace);
        setIsTimerActive(true);
    }
    else{
      setCurrentImage(SadFace);
      setIsTimerActive(false);
    }
}, [gameActive]);


  useEffect(() => {
    if (resetTimer) {
      setResetTimer(false);
    }
  }, [resetTimer]);
  
  return (
    <div id="back-control-panel">
      <section id="level-panel">
        <form className="form">
            <select>
                <option type="button" className="welcome-button" onClick={() => onGameStart(1)}>Básico (9x9)</option>
                <option type="button" className="welcome-button" onClick={() => onGameStart(2)}>Intermédio (16x16)</option>
                <option type="button" className="welcome-button" onClick={() => onGameStart(3)}>Avançado (30x16)</option>
             </select>
        </form>
        </section>
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
            <dd id="gameTime" ><Timer isTimerActive={gameStarted} reset={resetTimer}/></dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
export default ControlPanel;

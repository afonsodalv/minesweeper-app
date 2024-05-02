import React, { useState, useEffect } from "react";
import "./control-panel.css";
import HappyFace from "../../img/happy.png";
import SadFace from "../../img/sad.png";
import Reset from "../../img/reset.png";
import Timer from "../timer/timer.component"

function ControlPanel({ handleGameStarted, numBombs }) {
  const [currentImage, setCurrentImage] = useState(HappyFace);
  const [resetGame, setResetGame] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [resetTimer, setResetTimer] = useState(false);

  function handleClick() {
    setCurrentImage(currentImage === HappyFace ? SadFace : HappyFace);
    if (currentImage === HappyFace) {
      setResetGame(true);
      setIsTimerActive(false);
    }
    if (currentImage === SadFace) {
      setResetGame(false);
      setIsTimerActive(true);
      setResetTimer(true);
    }
  }

  function handleReset() {
    setResetGame(false);
    setCurrentImage(HappyFace);
    setIsTimerActive(true);
    setResetTimer(true);
  }

  function handleGoBack() {
    handleGameStarted();
    setResetGame(false);
  }

  useEffect(() => {
    if (resetTimer) {
      setResetTimer(false);
    }
  }, [resetTimer]);


  return (
    <div id="back-control-panel">
      <div id="control-panel">
        <div id="control-panel-row">
          <dl className="control-panel-counters">
            <dd id="points">{numBombs}</dd>
          </dl>
          <div>
            <button onClick={handleClick} className="img-button">
              <img src={currentImage} alt="Current state of the game" />
            </button>
          </div>

          <dl className="control-panel-counters">
            <dd id="gameTime" ><Timer isTimerActive={isTimerActive} reset={resetTimer}/></dd>
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

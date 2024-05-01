import React, { useState } from "react";
import "./control-panel.css";
import HappyFace from "../../img/happy.png";
import SadFace from "../../img/sad.png";
import Reset from "../../img/reset.png";

function ControlPanel({ handleGameStarted }) {
  const [currentImage, setCurrentImage] = useState(HappyFace);
  const [resetGame, setResetGame] = useState(false);

  function handleClick() {
    setCurrentImage(currentImage === HappyFace ? SadFace : HappyFace);
    if (currentImage === HappyFace) {
      setResetGame(true);
    }
    if (currentImage === SadFace) {
      setResetGame(false);
    }
  }

  function handleReset() {
    setResetGame(false);
    setCurrentImage(HappyFace);
  }

  function handleGoBack() {
    handleGameStarted();
    setResetGame(false);
  }

  return (
    <div id="back-control-panel">
      <div id="control-panel">
        <div id="control-panel-row">
          <dl className="control-panel-counters">
            <dd id="points">100</dd>
          </dl>
          <div>
            <button onClick={handleClick} className="img-button">
              <img src={currentImage} alt="Current state of the game" />
            </button>
          </div>

          <dl className="control-panel-counters">
            <dd id="gameTime">0</dd>
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

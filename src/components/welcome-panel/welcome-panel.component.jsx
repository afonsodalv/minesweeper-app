import React from "react";
import "./welcome-panel.css";

function WelcomePanel({ onGameStart }) {
  return (
    // <div id="back-welcome-panel" className="window">
    //     <div id="level-panel" className="title-bar">
    //     <div className="title-bar-text">
    //         <h3>Escolha o Nível</h3>
    //         <div className="button-box">
    //             <button type="button" className="welcome-button" onClick={() => onGameStart(1)}>Básico (9x9)</button>
    //             <button type="button" className="welcome-button" onClick={() => onGameStart(2)}>Intermédio (16x16)</button>
    //             <button type="button" className="welcome-button" onClick={() => onGameStart(3)}>Avançado (30x16)</button>
    //         </div>
    //     </div>
    //     </div>
    // </div>
    <div className="window">
		<div className="title-bar">
		<div className="title-bar-text">MineSweeper</div>
		<div className="title-bar-controls">
			<button aria-label="Minimize"></button>
			<button aria-label="Maximize"></button>
			<button aria-label="Close"></button>
		</div>
		</div>
		<div class="window-body">
			<p>Escolha o Nível</p>
			<button type="button" className="welcome-button" onClick={() => onGameStart(1)}>Básico (9x9)</button>
			<button type="button" className="welcome-button" onClick={() => onGameStart(2)}>Intermédio (16x16)</button>
			<button type="button" className="welcome-button" onClick={() => onGameStart(3)}>Avançado (30x16)</button>
      <p>LS© D E I S @ I S E C</p>
		</div>
  	</div>
  );
}

export default WelcomePanel;
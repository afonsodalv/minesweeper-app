import React from "react";
import "./welcome-panel.css";

function WelcomePanel({ onGameStart }) {
  return (
    <div id="back-welcome-panel">
        <section id="welcome-panel">
        <form className="form">
            <h3>Escolha o Nível</h3>
            <div>
                <button type="button" className="welcome-button" onClick={() => onGameStart(1)}>Básico (9x9)</button>
                <button type="button" className="welcome-button" onClick={() => onGameStart(2)}>Intermédio (16x16)</button>
                <button type="button" className="welcome-button" onClick={() => onGameStart(3)}>Avançado (30x16)</button>
            </div>
        </form>
        </section>
    </div>
  );
}

export default WelcomePanel;
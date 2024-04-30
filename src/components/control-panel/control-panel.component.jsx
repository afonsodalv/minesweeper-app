import React from "react";
import "./control-panel.css"

function GameStartPanel(){
    return(
        <section id="control-panel">
            <form className="form">
                <h3>Escolha o Nível</h3>
                <fieldset>
                    <label>Nível:</label>
                    <select id="btLevel">
                        <option seleceted value="0">Selecione...</option>
                        <option value="1">Básico (9x9)</option>
                        <option value="2">Intermédio (16x16)</option>
                        <option value="3">Avançado (30x16)</option>
                    </select>
                </fieldset>
                <button type="button" id="btPlay" onClick={onGameStart}>Iniciar Jogo</button>
            </form>
        </section>
    );
}

function GamePlayPanel(){
    return (
        <dl>
            <dt>Tempo de Jogo: </dt>
            <dd id="gameTime">0</dd>
        </dl>
    );
}

function ControlPanel({gameStarted, onGameStart}){
    return(
        <div>
            {gameStarted ?(GamePlayPanel):(GameStartPanel)}
        </div>
    );
}
export default ControlPanel;
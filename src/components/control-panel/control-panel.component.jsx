import React from "react";

function ControlPanel(){
    return(
        <section id="panel-control">
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
                <button type="button" id="btPlay">Iniciar Jogo</button>
            </form>

        </section>
    );
}

export default ControlPanel;
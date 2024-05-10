import { useState, useEffect, useRef } from 'react';
import './assets/styles/App.css';
import {Header, Footer, ControlPanel, GamePanel, WelcomePanel} from "./components";

function App() {
  const [gameActive, setGameActive]=useState(true);
  const [gameStarted, setGameStarted]=useState(false);
  const [numBombs, setNumBombs] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [score, setScore] = useState(0);

  function handleGameEnd(x){
      setGameActive(false);
  
      if(x===1)
        console.log("Ganhou");
      else
        console.log("Perdeu");
  }

  const prevGameActiveRef = useRef(gameActive);
  //foi a forma que consegui para que o Score
  //fizessse reset quando o jogo recomeçava

useEffect(() => {
    if (!prevGameActiveRef.current && gameActive) {
        setScore(numBombs);
    }

    prevGameActiveRef.current = gameActive;
}, [gameActive]);

  function handleGameStarted(){
    setGameStarted(!gameStarted);
    setGameActive(true);
  }
  
  function resetGameKey() {
    setGameKey(prevKey => prevKey + 1);
    setGameActive(true);
  }

  function handleLevelChange(level){

    switch(level){
      case 1:
        setNumBombs(10);
        setScore(10);
        break;
      case 2:
        setNumBombs(40);
        setScore(40);
        break;
      default:
        setNumBombs(99);
        setScore(99);
        break;

    }
    handleGameStarted();
  }

  function handleGameScore(x){
    if(x===3)  
      setScore(score-1);
    if(x===1)
      setScore(score+1);
  }

  return (
    <div className="container">
      <Header />
      {gameStarted ? (
      <>
        <ControlPanel score={score} handleGameStarted={handleGameStarted} numBombs={numBombs} onResetGameKey={resetGameKey} handleGameEnd={handleGameEnd} gameActive={gameActive}/>
        <GamePanel numBombs={numBombs} gameActive={gameActive} handleGameEnd={handleGameEnd} key={gameKey} handleGameScore={handleGameScore}/>
      </>) : (
      <WelcomePanel onGameStart={handleLevelChange} />)}
      <Footer />
    </div>
  );
}

export default App;
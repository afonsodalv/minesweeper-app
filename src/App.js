import { useState } from 'react';
import './assets/styles/App.css';
import {Header, Footer, ControlPanel, GamePanel, WelcomePanel} from "./components";

function App() {
  const [gameActive, setGameActive]=useState(true);
  const [gameStarted, setGameStarted]=useState(false);
  const [numBombs, setNumBombs] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const [score, setScore] = useState(19);

  function handleGameScore(x){
    if(x===3)  
      setScore(score-1);
    if(x===1)
      setScore(score+1);
  } 

  function handleGameEnd(){
      setGameActive(false);
      setGameStarted(false);
  }

  function handleGameStart(){
    setGameActive(true);
    setGameStarted(true);
  }
  
  function resetGameKey() {
    setGameKey(prevKey => prevKey + 1);
    setGameActive(true);
  }

  function handleLevelChange(level){

    let bombs = 0;
    switch(level){
      case 1:
        bombs = 10; 
        break;
      case 2:
        bombs = 40; 
        break;
      default:
        bombs = 99; 
        break;
    }
    
    setNumBombs(bombs);
    setScore(bombs);
  }


  return (
    <div className="container">
      <Header />
      <ControlPanel onGameStart={handleLevelChange} gameStarted={gameStarted} numBombs={numBombs} onResetGameKey={resetGameKey} handleGameEnd={handleGameEnd} gameActive={gameActive} score={score}/>
      <GamePanel numBombs={numBombs} gameActive={gameActive} key={gameKey} handleGameEnd={handleGameEnd} handleGameScore={handleGameScore} handleGameStart={handleGameStart}/>
    
      <Footer />
    </div>
  );
}

export default App;

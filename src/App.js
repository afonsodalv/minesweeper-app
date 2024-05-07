import { useState } from 'react';
import './assets/styles/App.css';
import {Header, Footer, ControlPanel, GamePanel, WelcomePanel} from "./components";

function App() {
  const [gameActive, setGameActive]=useState(true);
  const [gameStarted, setGameStarted]=useState(false);
  const [numBombs, setNumBombs] = useState(0);
  const [gameKey, setGameKey] = useState(0);

  function handleGameEnd(){
      setGameActive(false);
  }

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
        setNumBombs(10); break;
      case 2:
        setNumBombs(40); break;
      default:
        setNumBombs(99); break;
    }


    handleGameStarted();
  }


  return (
    <div className="container">
      <Header />
      {gameStarted ? (
      <>
        <ControlPanel handleGameStarted={handleGameStarted} numBombs={numBombs} onResetGameKey={resetGameKey} handleGameEnd={handleGameEnd}/>
        <GamePanel numBombs={numBombs} gameActive={gameActive} key={gameKey}/>
      </>) : (
      <WelcomePanel onGameStart={handleLevelChange} />)}
      <Footer />
    </div>
  );
}

export default App;

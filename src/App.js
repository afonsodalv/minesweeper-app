import { useState } from 'react';
import './assets/styles/App.css';
import {Header, Footer, ControlPanel, GamePanel, WelcomePanel} from "./components";

function App() {

  const  [gameStarted, setGameStarted]=useState(false);
  const [numBombs, setNumBombs] = useState(0);
  const [gameKey, setGameKey] = useState(0);


  function handleGameStared(){
    setGameStarted(!gameStarted);
  }
  
  function resetGameKey() {
    setGameKey(prevKey => prevKey + 1);
  }

  function handleLevelChange(level){

    let numBombs;

    switch(level){
      case 1:
        numBombs=10; break;
      case 2:
        numBombs=40; break;
        case 3:
          numBombs=99; break;
      default:
        numBombs=0; break;
    }

    handleGameStared();
    setNumBombs(numBombs);
  }


  return (
    <div className="container">
      <Header />
      {gameStarted ? (
      <>
        <ControlPanel handleGameStarted={handleGameStared} numBombs={numBombs} onResetGameKey={resetGameKey}/>
        <GamePanel numBombs={numBombs} key={gameKey}/>
      </>) : (
      <WelcomePanel onGameStart={handleLevelChange} />)}
      <Footer />
    </div>
  );
}

export default App;

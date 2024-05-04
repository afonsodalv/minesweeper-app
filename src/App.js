import { useState } from 'react';
import './App.css';
import {Header, Footer, ControlPanel, GamePanel, WelcomePanel} from "./components";

function App() {

  const  [gameStarted, setGameStarted]=useState(false);
  const [numBombs, setNumBombs] = useState(0);


  function handleGameStared(){
    setGameStarted(!gameStarted);
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
        <ControlPanel handleGameStarted={handleGameStared} numBombs={numBombs} />
        <GamePanel numBombs={numBombs}/>
      </>) : (
      <WelcomePanel onGameStart={handleLevelChange} />)}
      <Footer />
    </div>
  );
}

export default App;

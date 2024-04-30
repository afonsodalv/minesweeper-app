import { useState } from 'react';
import './App.css';
import {Header, Footer, ControlPanel, GamePanel} from "./components";

function App() {

  const  [gameStarted, setGameStarted]=useState(false);

  function handleGameStared(){
    setGameStarted(!gameStarted);
  }
  return (
    <div className="container">
      <Header />
      <ControlPanel
        gameStarted={gameStarted}
        onGameStart={handleGameStared}
      />
      <GamePanel/>
      <Footer />
    </div>
  );
}

export default App;

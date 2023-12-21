import { useState } from "react";
import WinPage from "./subpages/WinPage";
import GameState from "../objects/enum/GameState";
import PlayingPage from "./subpages/PlayingPage";

/**
 * Select window to be displayed based on the gameState
 * @returns {div}
 */
function GamePage() {
  const [gameState, setGameState] = useState(GameState.GAME);

  switch (gameState) {
    case GameState.GAME:
      return (
        <PlayingPage
          gameState={gameState}
          setGameState={setGameState}
        />
      );
    case GameState.WIN:
      return <WinPage />;
    default:
      throw new Error("game state invalid");
  }
}

export default GamePage;

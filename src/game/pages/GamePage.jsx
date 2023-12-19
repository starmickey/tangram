import { useState } from "react";
// import Game from "../components/Game";
import WinPage from "./subpages/WinPage";
import GameState from "../objects/enum/GameState";
import PlayingPage from "./subpages/PlayingPage";

export default function GamePage() {
  const [state, setState] = useState(GameState.GAME);

  switch (state) {
    case GameState.GAME:
      // return <Game state={state} setState={setState} />;
      return <PlayingPage state={state} setState={setState} />;
    case GameState.WIN:
      return <WinPage />;
    default:
      throw new Error("game state invalid");
  }
}

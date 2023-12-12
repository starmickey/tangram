import PropTypes from "prop-types";
import Piece from "./Piece";
import GameHandler from "../controllers/GameHandler";

function Game({ state, setState }) {
  const gameHandler = new GameHandler(state);

  const handleGameChange = () => {
    // here'll go all functions common to all piece action

    // it lets GamePage to know if the puzzle was solved
    setState(gameHandler.getState());
  };

  const piecesIds = gameHandler.getPiecesIds();

  return (
    <div>
      {piecesIds.map((pieceId) => (
        <Piece
          key={pieceId}
          pieceId={pieceId}
          gameHandler={gameHandler}
          handleGameChange={handleGameChange}
        />
      ))}
    </div>
  );
}

Game.propTypes = {
  state: PropTypes.number.isRequired,
  setState: PropTypes.func.isRequired,
};

export default Game;

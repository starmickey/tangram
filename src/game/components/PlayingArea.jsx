import { Stage, Layer } from "react-konva";
import PropTypes from "prop-types";
import Piece from "./Piece";
import GameHandler from "../controllers/GameHandler";
import getPiecesSet from "./utils/getPiecesSet";
import { getRandomPosition } from "./utils/piecePosition";
import "../styles/game.css";

function PlayingArea({
  pwidth,
  pheight,
  state,
  setState,
}) {
  // Calculate stage dimensions in pixels
  const stageWidth = window.innerWidth * pwidth;
  const stageHeight = window.innerHeight * pheight;
  // Get playing area styles package
  const playingAreaStyle = {
    width: `${stageWidth}px`,
    height: `${stageHeight}px`,
  };

  // Get pieces
  const pieces = getPiecesSet();
  pieces.forEach((piece) => {
    const { x, y } = getRandomPosition(
      piece.width,
      piece.height,
      stageWidth,
      stageHeight,
    );
    piece.setPosition(x, y);
  });

  const gameHandler = new GameHandler(pieces, state);

  // If a child changes game state, update the parent component
  const handleGameChange = () => {
    // here'll go all functions common to all piece action

    // it lets GamePage to know if the puzzle was solved
    setState(gameHandler.getState());
  };

  // Get piece unique keys
  const piecesIds = gameHandler.getPiecesIds();

  return (
    <div className="playing-area" style={playingAreaStyle}>
      <Stage width={stageWidth} height={stageHeight} id="stage">
        <Layer>
          {piecesIds.map((pieceId) => (
            <Piece
              key={pieceId}
              pieceId={pieceId}
              gameHandler={gameHandler}
              handleGameChange={handleGameChange}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

PlayingArea.propTypes = {
  pwidth: PropTypes.number.isRequired,
  pheight: PropTypes.number.isRequired,
  state: PropTypes.number.isRequired,
  setState: PropTypes.func.isRequired,
};

export default PlayingArea;

import { Stage, Layer } from "react-konva";
import PropTypes from "prop-types";
import Piece from "./Piece";
import GameHandler from "../controllers/GameHandler";
import getPiecesSet from "./utils/getPiecesSet";
import { getRandomPosition } from "./utils/piecePosition";
import "../styles/game.css";

/**
 * Creates and styles the "playing area".
 * Creates the seven default pieces.
 * Creates the gameHandler to enable puzzle solution checking.
 * Updates the game state if the puzzle was solved.
 * @param {number} pwidth - Porcentual-width of the playing area
 * respect the window width.
 * @param {number} pheight - Porcentual height of the playing area.
 * @param {GameState} gameState - Hook State of the parent component.
 * This will rerender the page if the puzzle state changes. This will
 * happen when the puzzle is solved.
 * @param {function} setGameState - sets the gameState
 */
function PlayingArea({
  pwidth,
  pheight,
  gameState,
  setGameState,
}) {
  // Validate inputs
  if (
    pwidth < 0
    || pheight < 0
    || pwidth >= 1
    || pheight >= 1
  ) {
    throw new Error("Invalid parameters. Pwidth and pheight must be greater than zero and less than one");
  }

  // Calculate stage dimensions in pixels
  const stageWidth = window.innerWidth * pwidth;
  const stageHeight = window.innerHeight * pheight;
  // Get playing area styles package
  const playingAreaStyle = {
    width: `${stageWidth}px`,
    height: `${stageHeight}px`,
  };

  // Get default pieces
  const pieces = getPiecesSet();
  // Set random positions for the pieces
  pieces.forEach((piece) => {
    const { x, y } = getRandomPosition(
      piece.width,
      piece.height,
      stageWidth,
      stageHeight,
    );
    piece.setPosition(x, y);
  });

  // Initialize game handler
  const gameHandler = new GameHandler(pieces, gameState);

  // If a child changes game state, update the parent component
  const handleGameChange = () => {
    // here'll go all functions common to all piece action

    // it lets GamePage to know if the puzzle was solved
    setGameState(gameHandler.getState());
  };

  // Get piece unique keys
  const piecesIds = gameHandler.getPiecesIds();

  // Create piece components
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
  gameState: PropTypes.number.isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default PlayingArea;

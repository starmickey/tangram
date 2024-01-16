import PropTypes from "prop-types";
import { Stage, Layer } from "react-konva";
import Piece from "./Piece";
import Solution from "./Solution";
import GameHandler from "../controllers/GameHandler";
import getPiecesSet from "../models/getPiecesSet";
import { getRandomPosition } from "./utils/pieceMovement";
import "../styles/game.css";
import GameState from "../objects/enum/GameState";

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
  percentageWidth,
  percentageHeight,
  gameState,
  setGameState,
}) {
  // Validate inputs
  const MIN_PERCENTAGE = 0;
  const MAX_PERCENTAGE = 1;
  if (
    percentageWidth < MIN_PERCENTAGE
    || percentageHeight < MIN_PERCENTAGE
    || percentageWidth >= MAX_PERCENTAGE
    || percentageHeight >= MAX_PERCENTAGE
  ) {
    throw new Error(`Invalid parameters. Percentage width and height must be between ${MIN_PERCENTAGE} and ${MAX_PERCENTAGE}`);
  }

  // Calculate stage dimensions in pixels
  const stageWidth = window.innerWidth * percentageWidth;
  const stageHeight = window.innerHeight * percentageHeight;
  // Get playing area styles
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
        {/* Render the solution shadow */}
        <Layer>
          <Solution />
        </Layer>
        <Layer>
          {/* Render interactiv pieces */}
          {piecesIds.map((pieceId) => (
            <Piece
              key={pieceId}
              pieceId={pieceId}
              gameHandler={gameHandler}
              handleGameChange={handleGameChange}
              stageWidth={stageWidth}
              stageHeight={stageHeight}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

PlayingArea.propTypes = {
  percentageWidth: PropTypes.number.isRequired,
  percentageHeight: PropTypes.number.isRequired,
  gameState: PropTypes.instanceOf(GameState).isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default PlayingArea;

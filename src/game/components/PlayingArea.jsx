import { useMemo } from "react";
import PropTypes from "prop-types";
import { Stage, Layer } from "react-konva";
import Piece from "./Piece";
import Solution from "./Solution";
import GameHandler from "../controllers/GameHandler";
import { StageDimensionsCtx } from "../contexts/StageContext";
import { getRandomPosition } from "./utils/pieceMovement";
import "../styles/game.css";

/**
 * Creates and styles the "playing area" which contains the solution hole
 * and interactive pieces.
 * @param {number} percentageWidth - Porcentual-width of the playing area
 * respect the window width.
 * @param {number} percentageHeight - Porcentual height of the playing area
 * respect the window width.
 * @param {GameHandler} gameHandler - Controller that enables solution checking.
 * @param {function} handleGameSolved - Function to rerender the page if puzzle.
 * is solved.
 */

function PlayingArea({
  percentageWidth,
  percentageHeight,
  gameHandler,
  handleGameSolved,
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
  const stageWidth = useMemo(() => (window.innerWidth * percentageWidth), []);
  const stageHeight = useMemo(() => (window.innerHeight * percentageHeight), []);
  // Create StageDimensions' context value
  const stageDimensions = useMemo(() => ({
    width: stageWidth,
    height: stageHeight,
  }), []);
  // Get playing area styles
  const playingAreaStyle = {
    width: `${stageWidth}px`,
    height: `${stageHeight}px`,
  };

  // Set random positions for the pieces
  const pieces = gameHandler.getPiecesDTOs();
  pieces.forEach((piece) => {
    const { x, y } = getRandomPosition(
      piece.width,
      piece.height,
      stageWidth,
      stageHeight,
    );
    gameHandler.setPiecePosition(piece.id, x, y);
  });

  // Get piece unique keys
  const piecesIds = gameHandler.getPiecesIds();
  // Get the solution DTO
  const solutionDTO = gameHandler.getSolutionDTO();

  // Create piece components
  return (
    <div className="playing-area" style={playingAreaStyle}>
      <StageDimensionsCtx.Provider value={stageDimensions}>
        <Stage width={stageWidth} height={stageHeight} id="stage">
          <Layer>
            {/* Render the solution shadow */}
            <Solution solutionDTO={solutionDTO} />
          </Layer>
          <Layer>
            {/* Render interactive pieces */}
            {piecesIds.map((pieceId) => (
              <Piece
                key={pieceId}
                pieceId={pieceId}
                gameHandler={gameHandler}
                handleGameSolved={handleGameSolved}
              />
            ))}
          </Layer>
        </Stage>
      </StageDimensionsCtx.Provider>
    </div>
  );
}

PlayingArea.propTypes = {
  percentageWidth: PropTypes.number.isRequired,
  percentageHeight: PropTypes.number.isRequired,
  gameHandler: PropTypes.instanceOf(GameHandler).isRequired,
  handleGameSolved: PropTypes.func.isRequired,
};

export default PlayingArea;

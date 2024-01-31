import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { Shape } from "react-konva";
import GameHandler from "../controllers/GameHandler";
import { useScaleState } from "../contexts/StageContext";
import useDragAndClick from "./utils/useDragAndClick";
import getCorners from "./utils/getCornersStrategy";
import PieceSnapper from "./utils/PieceSnapper";

/**
 * Renders an interactive piece component.
 * @param {number} pieceId - The unique identifier of the piece.
 * @param {number} gameHandler - Controller used to update the game state.
 * @param {func} handleGameChange - Function to change the game state if necessary.
 */

function Piece({
  pieceId,
  gameHandler,
  handleGameSolved,
}) {
  // Validate inputs
  if (pieceId < 0) {
    throw new Error(`PieceId ${pieceId} is invalid. It must be a non-negative number`);
  }

  // Get actual piece state from Game Handler
  const pieceDTO = gameHandler.getPieceDTO(pieceId);
  // Create a status hook for the GameHandler piece state
  const [piece, setPiece] = useState({
    typeId: pieceDTO.getTypeId(),
    x: pieceDTO.getX(),
    y: pieceDTO.getY(),
    a: pieceDTO.getA(),
    width: pieceDTO.getWidth(),
    height: pieceDTO.getHeight(),
  });
  // Create a piece reference for the react konva piece shape component
  const pieceRef = useRef();

  // Piece management functions
  const getPieceRect = () => pieceRef.current.getClientRect();

  const getPiecePosition = () => ({
    x: pieceRef.current.x(),
    y: pieceRef.current.y(),
    a: pieceRef.current.rotation(),
  });

  const getPieceTypeId = () => (piece.typeId);

  const setPiecePosition = (x, y, a) => {
    // Update piece position
    setPiece({
      ...piece, x, y, a,
    });
    // Update controller
    gameHandler.setPiecePosition(pieceId, x, y);
    gameHandler.setPieceRotation(pieceId, a);
    // Check if game was solved
    if (gameHandler.isGameSolved()) {
      // If so, rerender the page
      handleGameSolved();
    }
  };

  const getPieceSnapper = () => (PieceSnapper.getFromPieceAndSolutionDTO(
    gameHandler.getPiecesDTOs(),
    gameHandler.getSolutionDTO(),
  ));

  const markPieceAsSolved = () => (gameHandler.markPieceAsSolved(pieceId));

  // Get context for piece styling
  const scale = useScaleState();

  // Get events handlers
  const {
    isDragging,
    handleDragStart,
    handleDragBound,
    handleDragEnd,
    handleClick,
  } = useDragAndClick(
    getPieceRect,
    getPiecePosition,
    setPiecePosition,
    getPieceSnapper,
    getPieceTypeId,
    markPieceAsSolved,
  );

  // Create custom styles
  const styles = {
    fill: "#00D2FF",
    stroke: "#000000",
    strokeWidth: 0.1,
    shadowOffset: 0.5,
    shadowBlur: 3,
    shadowOffsetOnDrag: 1,
    shadowBlurOnDrag: 5,
    scaleOnDrag: 1.05,
  };

  return (
    <Shape
      // Draw the piece
      sceneFunc={(context, shape) => {
        const corners = getCorners(
          piece.typeId,
          piece.width,
          piece.height,
        );
        const lastCorner = corners[corners.length - 1];
        context.beginPath();
        context.moveTo(lastCorner.x, lastCorner.y);
        corners.forEach((c) => {
          const { x, y } = c.getPosition();
          context.lineTo(x, y);
        });
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      // position
      x={piece.x}
      y={piece.y}
      rotation={piece.a}
      // dimensions
      width={piece.width}
      height={piece.height}
      // events handling
      draggable
      onDragStart={handleDragStart}
      dragBoundFunc={handleDragBound}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      // format
      fill={styles.fill}
      stroke={styles.stroke}
      strokeWidth={styles.strokeWidth}
      // ensure it rotates around its center
      offsetX={piece.width / 2}
      offsetY={piece.height / 2}
      // shadow
      shadowOffsetX={
        isDragging
          ? styles.shadowOffsetOnDrag
          : styles.shadowOffset
      }
      shadowOffsetY={
        isDragging
          ? styles.shadowOffsetOnDrag
          : styles.shadowOffset
      }
      shadowBlur={
        isDragging
          ? styles.shadowBlurOnDrag
          : styles.shadowBlur
      }
      // scale on drag
      scaleX={
        isDragging
          ? scale * styles.scaleOnDrag
          : scale * 1
      }
      scaleY={
        isDragging
          ? scale * styles.scaleOnDrag
          : scale * 1
      }
      ref={pieceRef}
    />
  );
}

Piece.defaultProps = {
  handleGameSolved: () => {},
};

Piece.propTypes = {
  pieceId: PropTypes.number.isRequired,
  gameHandler: PropTypes.instanceOf(GameHandler).isRequired,
  handleGameSolved: PropTypes.func,
};

export default Piece;

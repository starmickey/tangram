import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { Shape } from "react-konva";
import GameHandler from "../controllers/GameHandler";
import { useScaleState } from "../contexts/StageContext";
import useDragAndClick from "./utils/useDragAndClick";
import getCorners from "./utils/getCornersStrategy";

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
  const [piece, setPiece] = useState(pieceDTO);
  // Create a piece reference for the react konva piece shape component
  const pieceRef = useRef();

  // Get scale from context
  const scale = useScaleState();

  // Get events handlers
  const {
    isDragging,
    handleDragStart,
    handleDragBound,
    handleDragEnd,
    handleClick,
  } = useDragAndClick(
    pieceId,
    pieceRef,
    setPiece,
    gameHandler,
    handleGameSolved,
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
          piece.getTypeId(),
          piece.getWidth(),
          piece.getHeight(),
        );
        const lastCorner = corners[corners.length - 1];
        context.beginPath();
        context.moveTo(lastCorner.getX(), lastCorner.getY());
        corners.forEach((c) => {
          const { x, y } = c.getPosition();
          context.lineTo(x, y);
        });
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      // position
      x={piece.getX()}
      y={piece.getY()}
      rotation={piece.getA()}
      // dimensions
      width={piece.getWidth()}
      height={piece.getHeight()}
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
      offsetX={piece.getWidth() / 2}
      offsetY={piece.getHeight() / 2}
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

Piece.propTypes = {
  pieceId: PropTypes.number.isRequired,
  gameHandler: PropTypes.instanceOf(GameHandler).isRequired,
  handleGameSolved: PropTypes.func.isRequired,
};

export default Piece;

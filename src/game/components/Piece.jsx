import PropTypes from "prop-types";
import { useState } from "react";
import { Shape } from "react-konva";
import GameHandler from "../controllers/GameHandler";
import useDragAndClick from "./utils/useDragAndClick";
import getCorners from "./utils/getCornersStrategy";
import { scale } from "./utils/constants";

/**
 * Renders a dynamic piece component
 * @param {number} pieceId - unique piece id
 * @param {number} gameHandler - its passed because if the
 * piece state changes, it must be updated on the gameHandler
 * @param {func} handleGameChange - changes the parent compoment state
 */

function Piece({
  pieceId,
  gameHandler,
  handleGameChange,
}) {
  // Validate inputs
  if (pieceId < 0) {
    throw new Error("Invalid input parameters");
  }

  // Get actual piece state from Game Handler
  const pieceDTO = gameHandler.getPieceDTO(pieceId);
  // Create piece status hook
  const [piece, setPiece] = useState(pieceDTO);

  // Get events handlers
  const {
    isDragging,
    handleDragStart,
    handleDragEnd,
    handleClick,
  } = useDragAndClick(pieceId, setPiece, gameHandler, handleGameChange);

  // Custom pieces styles
  const styles = {
    fill: "#00D2FF",
    stroke: ":#000000",
    strokeWidth: 0.1,
    shadowOffset: 0.5,
    shadowOffsetOnDrag: 1,
    shadowBlur: 3,
    shadowBlurOnDrag: 5,
    scaleOnDrag: 1.05,
  };

  return (
    <Shape
      // Draw the piece
      sceneFunc={(context, shape) => {
        const corners = getCorners(piece);
        const lastCorner = corners[corners.length - 1];
        context.beginPath();
        context.moveTo(lastCorner.x, lastCorner.y);
        corners.forEach((c) => {
          const { x, y } = c;
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
          ? styles.shadowOffset
          : styles.shadowOffsetOnDrag
      }
      shadowOffsetY={
        isDragging
          ? styles.shadowOffset
          : styles.shadowOffsetOnDrag
      }
      shadowBlur={
        isDragging
          ? styles.shadowBlur
          : styles.shadowBlurOnDrag
      }
      // scale on drag
      scaleX={
        scale * (isDragging
          ? styles.scaleOnDrag
          : 1)
      }
      scaleY={
        scale * (isDragging
          ? styles.scaleOnDrag
          : 1)
      }
    />
  );
}

Piece.propTypes = {
  pieceId: PropTypes.number.isRequired,
  gameHandler: PropTypes.instanceOf(GameHandler).isRequired,
  handleGameChange: PropTypes.func.isRequired,
};

export default Piece;

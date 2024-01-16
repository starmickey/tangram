import PropTypes from "prop-types";
import { useState, useRef, useContext } from "react";
import { Shape } from "react-konva";
import GameHandler from "../controllers/GameHandler";
import { ScaleContext } from "../contexts/ScaleContext";
import useDragAndClick from "./utils/useDragAndClick";
import getCorners from "./utils/getCornersStrategy";

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
  stageWidth,
  stageHeight,
}) {
  // Validate inputs
  if (
    typeof pieceId !== "number"
    || pieceId < 0
  ) {
    throw new Error("Invalid input parameters");
  }

  // Get actual piece state from Game Handler
  const pieceDTO = gameHandler.getPieceDTO(pieceId);
  // Create a status hook for the GameHandler piece state
  const [piece, setPiece] = useState(pieceDTO);
  // Create a piece reference for the react konva piece shape component
  const pieceRef = useRef();

  // Get scale from context
  const scale = useContext(ScaleContext);

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
    handleGameChange,
    stageWidth,
    stageHeight,
  );

  // Custom pieces styles
  const styles = {
    fill: "#00D2FF",
    stroke: "#000000",
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
        scale * (isDragging
          ? styles.scaleOnDrag
          : 1)
      }
      scaleY={
        scale * (isDragging
          ? styles.scaleOnDrag
          : 1)
      }
      ref={pieceRef}
    />
  );
}

Piece.propTypes = {
  pieceId: PropTypes.number.isRequired,
  gameHandler: PropTypes.instanceOf(GameHandler).isRequired,
  handleGameChange: PropTypes.func.isRequired,
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
};

export default Piece;

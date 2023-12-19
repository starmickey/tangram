import PropTypes from "prop-types";
import { useState } from "react";
import GameHandler from "../controllers/GameHandler";
import useDragAndClick from "./utils/useDragAndClick";
import PieceComponent from "./utils/PieceComponent";

/**
 * Renders a dynamic piece component
 * @param {number} pieceId - unique piece id
 * @param {number} gameHandler - its passed because if the
 * piece state changes, it must be updated on the gameHandler
 * @param {func} handleGameChange - changes the parent compoment state
 */

function Piece({ pieceId, gameHandler, handleGameChange }) {
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

  // Create handlers package for creating piececomponent
  const handlers = {
    handleDragStart,
    handleDragEnd,
    handleClick,
  };

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

  // Render piece component
  return (
    <PieceComponent
      piece={piece}
      isDragging={isDragging}
      handlers={handlers}
      styles={styles}
    />
  );
}

Piece.propTypes = {
  pieceId: PropTypes.number.isRequired,
  gameHandler: PropTypes.instanceOf(GameHandler).isRequired,
  handleGameChange: PropTypes.func.isRequired,
};

export default Piece;

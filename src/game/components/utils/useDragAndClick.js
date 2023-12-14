import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GameHandler from "../../controllers/GameHandler";

function useDragAndClick(pieceId, setPiece, gameHandler, handleGameChange) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    if (isDragging) {
      // update controllers to check if puzzle is solved
      gameHandler.movePiece(pieceId, e.target.x(), e.target.y());
      // if puzzle is solved, refresh parent window
      handleGameChange();
    }
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging) {
      // update controllers to check if puzzle is solved
      gameHandler.rotatePiece(pieceId, 45);
      // rerender piece
      const pieceDTO = gameHandler.getPieceDTO(pieceId);
      setPiece(pieceDTO);
      // if puzzle is solved, refresh parent window
      handleGameChange();
    }
  };

  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
    };

    document.addEventListener("dragover", handleDragOver, false);

    return () => {
      document.removeEventListener("dragover", handleDragOver, false);
    };
  }, []); // Cleanup on unmount

  return {
    isDragging,
    handleDragStart,
    handleDragEnd,
    handleClick,
  };
}

useDragAndClick.propTypes = {
  pieceId: PropTypes.number.isRequired,
  setPiece: PropTypes.func.isRequired,
  gameHandler: PropTypes.instanceOf(GameHandler).isRequired,
  handleGameChange: PropTypes.func.isRequired,
};

export default useDragAndClick;

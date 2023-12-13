import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GameHandler from "../../controllers/GameHandler";

function useDragAndClick(pieceId, setPiece, gameHandler, handleGameChange) {
  // const [isDragging, setIsDragging] = useState(false);
  const [state, setState] = useState({
    isDragging: false,
    x: 0,
    y: 0,
  });

  const handleDragStart = (e) => {
    // setIsDragging(true);
    setState({
      isDragging: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleDragEnd = (event) => {
    if (state.isDragging) {
      const diffX = event.clientX - state.x;
      const diffY = event.clientY - state.y;
      gameHandler.movePiece(pieceId, diffX, diffY);

      // gameHandler.movePiece(pieceId, event.clientX, event.clientY);
      // rerender piece
      setPiece(gameHandler.getPieceDTO(pieceId));
      // check if game is done from parent component
      handleGameChange();
    }
    setState({
      ...state,
      isDragging: false,
    });
  };

  const handleClick = () => {
    if (!state.isDragging) {
      gameHandler.rotatePiece(pieceId, 45);
      // rerender piece
      setPiece(gameHandler.getPieceDTO(pieceId));
      // check if game is done from parent component
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

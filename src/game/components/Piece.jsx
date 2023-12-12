import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import GameHandler from "../controllers/GameHandler";
import "../styles/pieceType.css";

function useDragAndDrop(pieceId, setPiece, gameHandler, handleGameChange) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    if (isDragging) {
      gameHandler.movePiece(pieceId, event.clientX, event.clientY);
      // rerender piece
      setPiece(gameHandler.getPieceDTO(pieceId));
      // check if game is done from parent component
      handleGameChange();
    }
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging) {
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

function Piece({ pieceId, gameHandler, handleGameChange }) {
  const [piece, setPiece] = useState(gameHandler.getPieceDTO(pieceId));

  const {
    handleDragStart,
    handleDragEnd,
    handleClick,
  } = useDragAndDrop(pieceId, setPiece, gameHandler, handleGameChange);

  const style = {
    cursor: "grab",
    rotate: `${piece.a}deg`,
    height: `${piece.height}px`,
    width: `${piece.width}px`,
    left: `${piece.x - piece.width / 2}px`,
    top: `${piece.y - piece.height / 2}px`,
  };

  return (
    <img
      draggable
      role="none"
      src={piece.src}
      className="piece"
      style={style}
      alt=""
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    />
  );
}

Piece.propTypes = {
  pieceId: PropTypes.number.isRequired,
  gameHandler: PropTypes.instanceOf(GameHandler).isRequired,
  handleGameChange: PropTypes.func.isRequired,
};

export default Piece;

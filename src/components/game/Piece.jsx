import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import PieceHandler from "../../controllers/PieceHandler";
import "../../styles/pieceType.css";

function useDragAndDrop(pieceId, setPiece, pieceHandler) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    if (isDragging) {
      pieceHandler.movePiece(pieceId, event.clientX, event.clientY);
      // rerender piece
      setPiece(pieceHandler.getPieceDTO(pieceId));
    }
    setIsDragging(false);
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
  };
}

function Piece({ pieceId, pieceHandler }) {
  const [piece, setPiece] = useState(pieceHandler.getPieceDTO(pieceId));

  const {
    isDragging,
    handleDragStart,
    handleDragEnd,
  } = useDragAndDrop(pieceId, setPiece, pieceHandler);

  const handleClick = () => {
    if (!isDragging) {
      pieceHandler.rotatePiece(pieceId, 45);
      // rerender piece
      setPiece(pieceHandler.getPieceDTO(pieceId));
    }
  };

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
  pieceHandler: PropTypes.instanceOf(PieceHandler).isRequired,
};

export default Piece;

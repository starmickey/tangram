import { useState, useEffect } from "react";
import Piece from "./Piece";
import piecesSet from "../../controllers/PiecesSet";
import PieceHandler from "../../controllers/PieceHandler";

function useDragAndDrop(pieceHandler, setPieces) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (pieceId, event) => {
    if (isDragging) {
      pieceHandler.movePiece(pieceId, event.clientX, event.clientY);
      // rerender pieces
      setPieces(pieceHandler.getPiecesDTOs());
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

export default function Game() {
  const pieceHandler = new PieceHandler(piecesSet);
  const [pieces, setPieces] = useState(pieceHandler.getPiecesDTOs());
  const { isDragging, handleDragStart, handleDragEnd } = useDragAndDrop(pieceHandler, setPieces);

  const handleClick = (pieceId) => {
    if (!isDragging) {
      pieceHandler.rotatePiece(pieceId, 45);
      // rerender pieces
      setPieces(pieceHandler.getPiecesDTOs());
    }
  };
  return (
    <div>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          role="none"
          onDragStart={handleDragStart}
          onClick={() => handleClick(piece.id)}
          onDragEnd={(event) => handleDragEnd(piece.id, event)}
        >
          <Piece draggable piece={piece} />
        </div>
      ))}
    </div>
  );
}

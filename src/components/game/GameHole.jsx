import { useState } from "react";
import Piece from "./Piece";
import piecesSet from "./PiecesSet";

export default function GameHole() {
  const [pieces, setPieces] = useState(piecesSet);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = (pieceId) => {
    if (!isDragging) {
      const updatedPieces = pieces.map((piece) => (piece.id === pieceId
        ? piece.setA(piece.a + 45)
        : piece));
      setPieces(updatedPieces);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (pieceId, e) => {
    if (isDragging) {
      const updatedPieces = pieces.map((piece) => (piece.id === pieceId
        ? piece.setPosition(e.clientX, e.clientY)
        : piece));
      setPieces(updatedPieces);
    }
    setIsDragging(false);
  };

  document.addEventListener("dragover", (event) => {
    // prevent default to allow drop
    event.preventDefault();
  }, false);

  return (
    <div
      onDragStart={handleDragStart}
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          role="none"
          onClick={(e) => handleClick(piece.id, e)}
          onDragEnd={(e) => handleDragEnd(piece.id, e)}
        >
          <Piece
            draggable
            piece={piece}
          />
        </div>
      ))}
    </div>
  );
}

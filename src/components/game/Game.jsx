import { useState } from "react";
import Piece from "./Piece";
import piecesSet from "../../controllers/PiecesSet";
import PieceHandler from "../../controllers/PieceHandler";

export default function Game() {
  const pieceHandler = new PieceHandler(piecesSet);
  const [pieces, setPieces] = useState(pieceHandler.getPiecesDTOs());
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = (pieceId) => {
    if (!isDragging) {
      pieceHandler.rotatePiece(pieceId, 45);
      // rerender pieces
      setPieces(pieceHandler.getPiecesDTOs());
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (pieceId, e) => {
    if (isDragging) {
      pieceHandler.movePiece(pieceId, e.clientX, e.clientY);
      // rerender pieces
      setPieces(pieceHandler.getPiecesDTOs());
    }
    setIsDragging(false);
  };

  document.addEventListener("dragover", (event) => {
    // allow drop
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

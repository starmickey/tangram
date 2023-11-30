import { useState } from "react";
import Piece from "./Piece";
import PieceType from "./PieceType";

export default function GameHole() {
  const [pieces, setPieces] = useState([
    {
      id: 0, type: PieceType.STRIANGLE, x: 100, y: 100,
    },
    {
      id: 1, type: PieceType.STRIANGLE, x: 200, y: 100,
    },
    {
      id: 2, type: PieceType.MTRIANGLE, x: 100, y: 200,
    },
    {
      id: 3, type: PieceType.LTRIANGLE, x: 300, y: 300,
    },
    {
      id: 4, type: PieceType.LTRIANGLE, x: 100, y: 600,
    },
    {
      id: 5, type: PieceType.PARALLELOGRAM, x: 300, y: 600,
    },
    {
      id: 6, type: PieceType.SQUARE, x: 450, y: 600,
    },
  ]);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (pieceId, e) => {
    if (isDragging) {
      const updatedPieces = pieces.map((piece) => (piece.id === pieceId
        ? { ...piece, x: e.clientX, y: e.clientY }
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
          onDragEnd={(e) => handleDragEnd(piece.id, e)}
        >
          <Piece
            draggable
            type={piece.type}
            x={piece.x}
            y={piece.y}
          />
        </div>
      ))}
    </div>
  );
}

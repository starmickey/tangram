import Piece from "./Piece";
import piecesSet from "../../controllers/PiecesSet";
import PieceHandler from "../../controllers/PieceHandler";

export default function Game() {
  const pieceHandler = new PieceHandler(piecesSet);

  return (
    <div>
      {pieceHandler.pieces.map((piece) => (
        <Piece
          key={piece.id}
          pieceId={piece.id}
          pieceHandler={pieceHandler}
        />
      ))}
    </div>
  );
}

import PieceType from "./PieceType";
import Piece from "./Piece";

const PiecesSet = [
  new Piece(0, PieceType.STRIANGLE.id, 200, 200, 0),
  new Piece(1, PieceType.STRIANGLE.id, 200, 400, 0),
  new Piece(2, PieceType.SQUARE.id, 200, 600, 0),
  new Piece(3, PieceType.PARALLELOGRAM.id, 400, 200, 0),
  new Piece(4, PieceType.MTRIANGLE.id, 400, 400, 0),
  new Piece(5, PieceType.LTRIANGLE.id, 400, 700, 0),
  new Piece(6, PieceType.LTRIANGLE.id, 700, 700, 0),
];

export default PiecesSet;

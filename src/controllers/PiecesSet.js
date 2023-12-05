import PieceType from "./PieceType";
import Piece from "./Piece";

const PiecesSet = [
  new Piece(0, PieceType.STRIANGLE, 200, 200, 0),
  new Piece(1, PieceType.STRIANGLE, 200, 400, 0),
  new Piece(2, PieceType.SQUARE, 200, 600, 0),
  new Piece(3, PieceType.PARALLELOGRAM, 400, 200, 0),
  new Piece(4, PieceType.MTRIANGLE, 400, 400, 0),
  new Piece(5, PieceType.LTRIANGLE, 400, 700, 0),
  new Piece(6, PieceType.LTRIANGLE, 700, 700, 0),
];

export default PiecesSet;

import PieceType from "../objects/enum/PieceType";
import Piece from "./Piece";

const PiecesSet = [
  new Piece(0, PieceType.LTRIANGLE, 500, 600, 0),
  new Piece(1, PieceType.LTRIANGLE, 800, 200, 0),
  new Piece(2, PieceType.MTRIANGLE, 500, 400, 0),
  new Piece(3, PieceType.PARALLELOGRAM, 500, 200, 0),
  new Piece(4, PieceType.SQUARE, 200, 600, 0),
  new Piece(5, PieceType.STRIANGLE, 200, 400, 0),
  new Piece(6, PieceType.STRIANGLE, 200, 200, 0),
];

export default PiecesSet;

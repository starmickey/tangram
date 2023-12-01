import PieceType from "./PieceType";
import PieceDTO from "./PieceDTO";

const PiecesSet = [
  new PieceDTO(0, PieceType.STRIANGLE, 200, 200, 0),
  new PieceDTO(1, PieceType.STRIANGLE, 200, 400, 0),
  new PieceDTO(2, PieceType.SQUARE, 200, 600, 0),
  new PieceDTO(3, PieceType.PARALLELOGRAM, 400, 200, 0),
  new PieceDTO(4, PieceType.MTRIANGLE, 400, 400, 0),
  new PieceDTO(5, PieceType.LTRIANGLE, 400, 700, 0),
  new PieceDTO(6, PieceType.LTRIANGLE, 700, 700, 0),
];

export default PiecesSet;

import PieceDTO from "../objects/dto/PieceDTO";
import PieceType from "../objects/enum/PieceType";

/**
 * It creates the tangram default pieces
 * @returns {Array}
 */
export default function getPiecesSet() {
  const types = [
    PieceType.LTRIANGLE,
    PieceType.LTRIANGLE,
    PieceType.MTRIANGLE,
    PieceType.PARALLELOGRAM,
    PieceType.SQUARE,
    PieceType.STRIANGLE,
    PieceType.STRIANGLE,
  ];

  // Create pieceDTO with type default values
  const piecesSet = types.map((type) => {
    const { id, width, height } = type;
    return new PieceDTO(-1, id, width, height);
  });

  return piecesSet;
}

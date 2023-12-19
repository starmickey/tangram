import PieceDTO from "../../objects/dto/PieceDTO";
import PieceType from "../../objects/enum/PieceType";

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

  let nextId = 0;

  const piecesSet = [];
  types.forEach((type) => {
    piecesSet.push(new PieceDTO(
      nextId,
      type.id,
      type.width,
      type.height,
    ));
    nextId += 1;
  });

  return piecesSet;
}

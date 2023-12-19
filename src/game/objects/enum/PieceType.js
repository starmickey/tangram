const PieceType = {
  STRIANGLE: {
    id: 0,
    width: 141.42,
    height: 70.71,
  },
  MTRIANGLE: {
    id: 1,
    width: 200,
    height: 100,
  },
  LTRIANGLE: {
    id: 2,
    width: 282.84,
    height: 141.42,
  },
  PARALLELOGRAM: {
    id: 3,
    width: 212.13,
    height: 70.71,
  },
  SQUARE: {
    id: 4,
    width: 100,
    height: 100,
  },
};

export function getPieceType(id) {
  switch (id) {
    case PieceType.STRIANGLE.id:
      return PieceType.STRIANGLE;
    case PieceType.MTRIANGLE.id:
      return PieceType.MTRIANGLE;
    case PieceType.LTRIANGLE.id:
      return PieceType.LTRIANGLE;
    case PieceType.PARALLELOGRAM.id:
      return PieceType.PARALLELOGRAM;
    case PieceType.SQUARE.id:
      return PieceType.SQUARE;
    default:
      throw new Error(`cannot get a piece type for id ${id}`);
  }
}

export default PieceType;

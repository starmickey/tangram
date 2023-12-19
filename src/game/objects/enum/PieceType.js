const PieceType = {
  STRIANGLE: {
    id: 0,
    height: 70.71,
    width: 141.42,
  },
  MTRIANGLE: {
    id: 1,
    height: 100,
    width: 200,
  },
  LTRIANGLE: {
    id: 2,
    height: 141.42,
    width: 282.84,
  },
  PARALLELOGRAM: {
    id: 3,
    height: 70.71,
    width: 212.13,
  },
  SQUARE: {
    id: 4,
    height: 100,
    width: 100,
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

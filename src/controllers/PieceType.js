const PieceType = {
  STRIANGLE: {
    id: 0,
    src: "./triangle.png",
    height: 70.71,
    width: 141.42,
  },
  MTRIANGLE: {
    id: 1,
    src: "./triangle.png",
    height: 100,
    width: 200,
  },
  LTRIANGLE: {
    id: 2,
    src: "./triangle.png",
    height: 141.42,
    width: 282.84,
  },
  PARALLELOGRAM: {
    id: 3,
    src: "./parallelogram.png",
    height: 100,
    width: 200,
  },
  SQUARE: {
    id: 4,
    src: "./square.png",
    height: 100,
    width: 100,
  },
};

export const getTypeById = (id) => {
  switch (id) {
    case 0:
      return PieceType.STRIANGLE;
    case 1:
      return PieceType.MTRIANGLE;
    case 2:
      return PieceType.LTRIANGLE;
    case 3:
      return PieceType.PARALLELOGRAM;
    case 4:
      return PieceType.SQUARE;
    default:
      return -1;
  }
};

export default PieceType;

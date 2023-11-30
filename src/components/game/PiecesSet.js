import PieceType from "./PieceType";

const PiecesSet = [
  {
    id: 0,
    type: PieceType.STRIANGLE,
    x: 100,
    y: 100,
    angle: 0,
  },
  {
    id: 1, type: PieceType.STRIANGLE, x: 200, y: 100, angle: 0,
  },
  {
    id: 2, type: PieceType.MTRIANGLE, x: 100, y: 200, angle: 0,
  },
  {
    id: 3, type: PieceType.LTRIANGLE, x: 300, y: 300, angle: 0,
  },
  {
    id: 4, type: PieceType.LTRIANGLE, x: 100, y: 600, angle: 0,
  },
  {
    id: 5, type: PieceType.PARALLELOGRAM, x: 300, y: 600, angle: 0,
  },
  {
    id: 6, type: PieceType.SQUARE, x: 450, y: 600, angle: 0,
  },
];

export default PiecesSet;

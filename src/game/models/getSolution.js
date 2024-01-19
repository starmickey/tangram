import SolutionPiece from "../objects/data/SolutionPiece";
import PieceType from "../objects/enum/PieceType";
import Solution from "../objects/data/Solution";

export default function getSolution() {
  const solutionPieces = [
    new SolutionPiece(PieceType.SQUARE, 100, 100, 0),
    new SolutionPiece(PieceType.PARALLELOGRAM, 167, 382, 90),
    new SolutionPiece(PieceType.STRIANGLE, 220, 315, 315),
    new SolutionPiece(PieceType.LTRIANGLE, 370, 270, 0),
    new SolutionPiece(PieceType.LTRIANGLE, 500, 255, 0),
    new SolutionPiece(PieceType.MTRIANGLE, 575, 235, 0),
    new SolutionPiece(PieceType.STRIANGLE, 330, 350, 0),
  ];

  return new Solution(solutionPieces);
}

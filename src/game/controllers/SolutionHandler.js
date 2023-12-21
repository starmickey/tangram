import PieceType from "../objects/enum/PieceType";
import SolutionPiece from "../objects/data/SolutionPiece";
import Solution from "../objects/data/Solution";
import SolutionDTO from "../objects/dto/SolutionDTO";
import SolutionPieceDTO from "../objects/dto/SolutionPieceDTO";

export default class SolutionHandler {
  /**
   * Create a new Solution Handler
   * @param {SolutionDTO} solution - the solution to be achieved
   */
  constructor(solution) {
    if (!(solution instanceof Solution)) {
      throw new Error("Invalid input parameters");
    }
    this.solution = solution;
  }

  static getDefaultSolution() {
    const solutionPieces = [
      new SolutionPiece(PieceType.SQUARE, 25, 25, 0),
      new SolutionPiece(PieceType.STRIANGLE, 25, 100, 0),
      new SolutionPiece(PieceType.MTRIANGLE, 100, 25, 0),
      new SolutionPiece(PieceType.LTRIANGLE, 145, 25, 0),
      new SolutionPiece(PieceType.PARALLELOGRAM, 300, 25, 0),
    ];

    const solution = new Solution(solutionPieces);
    return new SolutionHandler(solution);
  }

  getSolutionDTO() {
    const { id, pieces } = this.solution;
    const solutionPiecesDTO = pieces.map((p) => new SolutionPieceDTO(
      p.id,
      p.type.id,
      p.x,
      p.y,
      p.a,
    ));

    return new SolutionDTO(id, solutionPiecesDTO);
  }
}

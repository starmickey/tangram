import SolutionDTO from "../objects/dto/SolutionDTO";
import SolutionPieceDTO from "../objects/dto/SolutionPieceDTO";
import getSolution from "../models/getSolution";
import Solution from "../objects/data/Solution";

export default class SolutionHandler {
  /**
   * Create a new Solution Handler
   * @param {SolutionDTO} solution - the solution to be achieved
   */
  constructor(solution = getSolution()) {
    if (!(solution instanceof Solution)) {
      throw new Error("Invalid input parameters: solution must be an instance of Solution");
    }
    this.solution = solution;
  }

  getSolutionDTO() {
    const { id, pieces } = this.solution;
    const solutionPiecesDTO = pieces.map((p) => new SolutionPieceDTO(
      p.id,
      p.type.id,
      p.type.width,
      p.type.height,
      p.x,
      p.y,
      p.a,
    ));

    return new SolutionDTO(id, solutionPiecesDTO);
  }
}

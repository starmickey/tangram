import SolutionHandler from "../controllers/SolutionHandler";
import Solution from "../objects/data/Solution";
import SolutionPiece from "../objects/data/SolutionPiece";
import SolutionDTO from "../objects/dto/SolutionDTO";
import PieceType from "../objects/enum/PieceType";

describe('Solution Handler', () => {
  it('Creates a solution with default parameters', () => {
    const solutionHandler = SolutionHandler.getDefaultSolution();

    expect(solutionHandler.solution).toBeDefined();
  });

  it('gets a solution DTO', () => {
    const solutionPiece = new SolutionPiece(PieceType.SQUARE, 0, 0, 0);
    const solutionPieces = [solutionPiece];
    const solution = new Solution(solutionPieces);
    const solutionHandler = new SolutionHandler(solution);
    const solutionDTO = solutionHandler.getSolutionDTO();

    expect(solutionDTO).toBeInstanceOf(SolutionDTO);
  });
})
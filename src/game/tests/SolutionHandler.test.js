import SolutionHandler from "../controllers/SolutionHandler";
import Solution from "../objects/data/Solution";
import SolutionPiece from "../objects/data/SolutionPiece";
import SolutionDTO from "../objects/dto/SolutionDTO";
import PieceType from "../objects/enum/PieceType";

describe('Solution Handler', () => {
  it('Creates a solution with default parameters', () => {
    const solutionHandler = new SolutionHandler();

    expect(solutionHandler.getSolution()).toBeDefined();
    expect(solutionHandler.getSolution()).toBeInstanceOf(Solution);
  });

  it('gets a solution DTO', () => {
    const solutionPiece = new SolutionPiece(PieceType.SQUARE, 0, 0, 0);
    const solutionPieces = [solutionPiece];
    const solution = new Solution(solutionPieces);
    const solutionHandler = new SolutionHandler(solution);
    const solutionDTO = solutionHandler.getSolutionDTO();

    expect(solutionDTO).toBeInstanceOf(SolutionDTO);
  });

  it('marks solved pieces', () => {
    const sp1 = new SolutionPiece(PieceType.LTRIANGLE, 10, 10, 0);
    const sp2 = new SolutionPiece(PieceType.SQUARE, 20, 20, 45);
    const pieces = [sp1, sp2];
    const solution = new Solution(pieces);
    const solutionStatus = new SolutionHandler(solution);

    solutionStatus.setPieceIsSolved(sp1.getId(), true);
    expect(solutionStatus.getSolvedIds()).toContain(sp1.getId());
  });

  it('doesnt mark solved pieces twice', () => {
    const sp1 = new SolutionPiece(PieceType.LTRIANGLE, 10, 10, 0);
    const pieces = [sp1];
    const solution = new Solution(pieces);
    const solutionStatus = new SolutionHandler(solution);

    solutionStatus.setPieceIsSolved(sp1.getId(), true);
    solutionStatus.setPieceIsSolved(sp1.getId(), true);
    expect(solutionStatus.getSolvedIds().length).toBe(1);
  });

  it('marks a piece as unsolved', () => {
    const sp1 = new SolutionPiece(PieceType.LTRIANGLE, 10, 10, 0);
    const pieces = [sp1];
    const solution = new Solution(pieces);
    const solutionStatus = new SolutionHandler(solution);

    const id = sp1.getId();
    solutionStatus.setPieceIsSolved(id, true);
    solutionStatus.setPieceIsSolved(id, false);
    expect(solutionStatus.getSolvedIds()).not.toContain(id);
  })

  it('throws error if trying to mark a piece as solved that isnt in the solution', () => {
    const sp1 = new SolutionPiece(PieceType.LTRIANGLE, 10, 10, 0);
    const pieces = [sp1];
    const solution = new Solution(pieces);
    const solutionStatus = new SolutionHandler(solution);

    expect(() => {
      solutionStatus.markPieceAsSolved(sp1.getId() + 10);
    }).toThrow(Error);
  });

  it('checks if game is solved', () => {
    const sp1 = new SolutionPiece(PieceType.LTRIANGLE, 10, 10, 0);
    const pieces = [sp1];
    const solution = new Solution(pieces);
    const sh = new SolutionHandler(solution);
    sh.addSolvedId(sp1.getId());
    
    expect(sh.isGameSolved()).toBe(true);
  });
})
import PieceDTO from "../objects/dto/PieceDTO";
import SolutionDTO from "../objects/dto/SolutionDTO";
import SolutionPieceDTO from "../objects/dto/SolutionPieceDTO";
import PieceSnapper from "../components/utils/PieceSnapper";
import PieceSP from "../objects/ui/pieceSP";

describe('piece snapping together', () => { 
  it('creates a piece snapper for piece and solution DTOs', () => {
    const piecesDTOs = [
      new PieceDTO(1, 1, 10, 10),
      new PieceDTO(2, 1, 10, 10),
      new PieceDTO(3, 1, 10, 10),
    ];

    const solutionDTOs = new SolutionDTO(12, [
      new SolutionPieceDTO(4, 1, 1320, 10, 0, 0, 0),
      new SolutionPieceDTO(5, 1, 10, 10, 0, 0, 0),
      new SolutionPieceDTO(6, 1, 10, 10, 0, 0, 0),
    ]);

    const pieceSnapper = PieceSnapper.getFromPieceAndSolutionDTO(piecesDTOs, solutionDTOs);
    expect(pieceSnapper).toBeDefined();
    expect(pieceSnapper.getPieces().length).toBe(piecesDTOs.length);
  });

  it('gets the solution piece id for a solved piece', () => {
    const typeId = 1;
    // Set piece position
    const pp = { x: 10, y: 10, a: 45 };
    // Create piece
    const pieceSP = new PieceSP(1, typeId, pp.x, pp.y, pp.a);
    // Set solution piece position
    const sp = { x: pp.x, y: pp.y + 10, a: pp.a };
    // Create solution piece
    const solutionPieceSP = new PieceSP(1, typeId, sp.x, sp.y, sp.a);
    // Create solution snapper
    const pieceSnapper = new PieceSnapper([pieceSP], [solutionPieceSP]);
    // Get snapped position
    const spp = pieceSnapper.getSnappedToSolutionPosition(typeId, pp.x, pp.y, pp.a);
    expect(spp.x).toBe(sp.x);
    expect(spp.y).toBe(sp.y);
    expect(spp.snapped).toBe(true);
  });

  it('returns snapped as false if piece isnt solved', () => {
    const typeId = 1;
    const [x, y, a] = [10, 20, 0];

    const piecesSPs = [new PieceSP(1, typeId, x, y, a)];
    const solutionPiecesSPs = [new PieceSP(1, typeId, x, y, a + 100)];

    const pieceSnapper = new PieceSnapper(piecesSPs, solutionPiecesSPs);
    const sp = pieceSnapper.getSnappedToSolutionPosition(typeId, x, y, a);
    expect(sp.x).toBe(x);
    expect(sp.y).toBe(y);
    expect(sp.snapped).toBe(false);
  });
 })
import { getClampedPosition, getRandomPosition, getSolutionPieceToSnap, isClose } from "../components/utils/pieceMovement";
import PieceDTO from "../objects/dto/PieceDTO";
import SolutionDTO from "../objects/dto/SolutionDTO";
import SolutionPieceDTO from "../objects/dto/SolutionPieceDTO";

describe('piece poisition tests', () => { 
  it('clamps positions', () => {
    const [startX, startY] = [-10, 40];
    const targetWidth = 10;
    const targetHeight = 10;
    const containerWidth = 20;
    const containerHeight = 20;

    const { x, y } = getClampedPosition(
      startX,
      startY,
      targetWidth,
      targetHeight,
      containerWidth,
      containerHeight,
    );

    expect(x).toBeDefined();
    expect(y).toBeDefined();
    expect(x).toBe(5);
    expect(y).toBe(15);
  });  

  it('gets valid random positions', () => {
    const targetWidth = 7;
    const targetHeight = 11;
    const containerWidth = 22;
    const containerHeight = 42;

    const { x, y } = getRandomPosition(
      targetWidth,
      targetHeight,
      containerWidth,
      containerHeight,
    );

    expect(x).toBeDefined();
    expect(y).toBeDefined();
    expect(x).toBeGreaterThanOrEqual(targetWidth / 2);
    expect(y).toBeGreaterThanOrEqual(targetHeight / 2);
    expect(x).toBeLessThanOrEqual(containerWidth - targetWidth / 2);
    expect(y).toBeLessThanOrEqual(containerHeight - targetHeight / 2);
  });
  it('gets the solution piece id for a solved piece', () => {
    const typeId = 1;
    const [width, height] = [10, 20];
    const [x, y, a] = [10, 20, 0];

    const pieceDTO = new PieceDTO(1, typeId, width, height, x, y, a);

    // Solution piece that corresponds to the solved piece
    const solutionPieceDTO =  new SolutionPieceDTO(4, typeId, width, height, x + 5, y, a);
    
    const solutionPiecesDTOs = [
      // A solution piece from anorher type
      new SolutionPieceDTO(10, 10, width, height, x, y, a),
      // A solution pieces in a far positions
      new SolutionPieceDTO(11, 10, width, height, x + 100, y, a),
      new SolutionPieceDTO(12, 10, width, height, x, y + 100, a),
      new SolutionPieceDTO(13, 10, width, height, x, y, a + 100),
      solutionPieceDTO,
    ];
    const solutionDTO = new SolutionDTO(2, solutionPiecesDTOs);

    const sp = getSolutionPieceToSnap(pieceDTO, solutionDTO);
    expect(sp).toBe(solutionPieceDTO);
  });

  it('returns null if piece isnt solved', () => {
    const typeId = 1;
    const [width, height] = [10, 20];
    const [x, y, a] = [10, 20, 0];

    const pieceDTO = new PieceDTO(1, typeId, width, height, x, y, a);
    const solutionPieceDTO = new SolutionPieceDTO(13, 10, width, height, x, y, a + 100);
    const solutionDTO = new SolutionDTO(1, [solutionPieceDTO]);

    const sp = getSolutionPieceToSnap(pieceDTO, solutionDTO);
    expect(sp).toBe(null);
  });
})
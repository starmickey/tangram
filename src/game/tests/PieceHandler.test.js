import PieceHandler from "../components/utils/PieceHandler";
import GameHandler from "../controllers/GameHandler";

describe('piece movement handling', () => { 
  it('clamps positions', () => {
    const [startX, startY] = [-10, 40];
    const targetWidth = 10;
    const targetHeight = 10;
    const containerWidth = 20;
    const containerHeight = 20;
    const gameHandler = new GameHandler();

    const ph = new PieceHandler(gameHandler, containerWidth, containerHeight);

    const { x, y } = ph.getClampedPosition(
      startX,
      startY,
      targetWidth,
      targetHeight,
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
    const gameHandler = new GameHandler();

    const ph = new PieceHandler(gameHandler, containerWidth, containerHeight);

    const { x, y } = ph.getRandomPosition(
      targetWidth,
      targetHeight,
    );

    expect(x).toBeDefined();
    expect(y).toBeDefined();
    expect(x).toBeGreaterThanOrEqual(targetWidth / 2);
    expect(y).toBeGreaterThanOrEqual(targetHeight / 2);
    expect(x).toBeLessThanOrEqual(containerWidth - targetWidth / 2);
    expect(y).toBeLessThanOrEqual(containerHeight - targetHeight / 2);
  });

  it('sets piece position in a wide stage', () => {
    // Create controllers
    const gameHandler = new GameHandler();
    const pieceHandler = new PieceHandler(
      gameHandler,
      100000,
      100000,
    );
    // Get piece
    const piece = gameHandler.getPiecesDTOs()[0];
    // Update its position to a new one
    const newX = 500;
    const newY = 500;
    const newA = piece.getA() + 45;

    pieceHandler.setPiecePosition(piece.getId(), newX, newY, newA);
    // Get the saved piece
    const newPiece = gameHandler.getPieceDTO(piece.getId());
    expect(newPiece.getX()).toBe(newX);
    expect(newPiece.getY()).toBe(newY);
    expect(newPiece.getA()).toBe(newA);
  });

  it('gets the solution piece id for a solved piece', () => {
    // Create controllers
    const gameHandler = new GameHandler();
    const pieceHandler = new PieceHandler(gameHandler);
    // Get controllers data
    const solution = gameHandler.getSolutionDTO();
    const solutionPiece = solution.getPieces()[0];
    const piece = gameHandler.getPiecesDTOs()[0];

    // Snap piece to solution
    const spp = pieceHandler.getSnappedToSolutionPosition(
      piece.getTypeId(),
      solutionPiece.getX() + 5,
      solutionPiece.getY() - 5,
      solutionPiece.getA(),
    );
    
    expect(spp.x).toBe(solutionPiece.getX());
    expect(spp.y).toBe(solutionPiece.getY());
    expect(spp.snapped).toBe(true);
  });

 })
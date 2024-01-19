import PieceDTO from "../objects/dto/PieceDTO";
import GameState from "../objects/enum/GameState";
import GameHandler from "../controllers/GameHandler";
import Piece from "../objects/data/Piece";

describe('Game Handler tests', () => { 
  it('creates a game handler with valid pieces', () => {
    const gameHandler = new GameHandler();

    expect(gameHandler).toBeDefined();
    expect(gameHandler.pieces.length).toBeGreaterThanOrEqual(0);
    expect(gameHandler.pieces[0]).toBeInstanceOf(Piece);
  });

  it('gets a piece DTO', () => {
    const gameHandler = new GameHandler();
    const pieceId = gameHandler.pieces[0].id;
    const pieceReturned = gameHandler.getPieceDTO(pieceId);
    expect(pieceReturned).toBeDefined();
    expect(pieceReturned).toBeInstanceOf(PieceDTO);
  });

  it('throws error when trying to get a pieceDTO for a no existent piece', () => {
    const gameHandler = new GameHandler();
    expect(() => {gameHandler.getPieceDTO(10000)}).toThrow(Error);
  });

  it('gets all the pieces DTOs', () => {
    const gameHandler = new GameHandler();

    const piecesReturned = gameHandler.getPiecesDTOs();
    expect(piecesReturned.length).toBeGreaterThanOrEqual(0);
    expect(piecesReturned[0]).toBeInstanceOf(PieceDTO);
  });

  it('moves a piece', () => {
    const pieceDTO = new PieceDTO(1,2,3,4);
    const gameState = GameState.GAME;
    const gameHandler = new GameHandler([pieceDTO], gameState);
    const pieceId = gameHandler.pieces[0].id;
    const startX = gameHandler.pieces[0].x;
    const startY = gameHandler.pieces[0].y;
    const finalX = 10;
    const finalY = 20;

    gameHandler.setPiecePosition(pieceId, finalX, finalY);

    expect(gameHandler.pieces[0].x).toBe(startX + finalX);
    expect(gameHandler.pieces[0].y).toBe(startY + finalY);
  });

  it('throws an error when trying to move a no existent piece', () => {
    const gameHandler = new GameHandler();
    const pieceId = 39022;
    const newX = 10;
    const newY = 20;

    expect(() => {gameHandler.movePiece(pieceId, newX, newY)}).toThrow(Error);
  });

  it('rotates pieces', () => {
    const gameHandler = new GameHandler();
    const pieceId = gameHandler.pieces[0].id;
    const newA = 45;
    gameHandler.setPieceRotation(pieceId, newA);
    expect(gameHandler.pieces[0].a).toBe(newA);
  });

  it('throws an error when trying to move a no existent piece', () => {
    const gameState = GameState.GAME;
    const gameHandler = new GameHandler([], gameState);
    const pieceId = 2;
    const diffA = 10;

    expect(() => {gameHandler.rotatePiece(pieceId, diffA)}).toThrow(Error);
  });

  it('gets pieces ids', () => {
    const gameHandler = new GameHandler();
    const ids = gameHandler.getPiecesIds();

    expect(ids).toBeDefined();
    expect(ids.length).toBeGreaterThanOrEqual(0);
    expect(ids[2]).toBeGreaterThanOrEqual(0);
  });
})
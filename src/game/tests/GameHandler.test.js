import PieceDTO from "../objects/dto/PieceDTO";
import GameState from "../objects/enum/GameState";
import GameHandler from "../controllers/GameHandler";
import Piece from "../objects/data/Piece";

describe('Game Handler tests', () => { 
  it('creates a game handler with valid pieces', () => {
    const gameHandler = new GameHandler();

    expect(gameHandler).toBeDefined();
    expect(gameHandler.getPieces().length).toBeGreaterThanOrEqual(0);
    expect(gameHandler.getPieces()[0]).toBeInstanceOf(Piece);
  });

  it('gets a piece DTO', () => {
    const gameHandler = new GameHandler();
    const pieceId = gameHandler.getPieces()[0].getId();
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

  it('gets a piece by id', () => {
    const gameHandler = new GameHandler();
    const piece = gameHandler.getPieces()[0];
    const pieceId = piece.getId();
    
    expect(piece).toBeInstanceOf(Piece);
    expect(pieceId).toBeDefined();

    const searchedPiece = gameHandler.getPiece(pieceId);
    expect(searchedPiece).toBeInstanceOf(Piece);
    expect(searchedPiece.getId()).toBe(pieceId);
  });

  it('moves a piece', () => {
    const gameHandler = new GameHandler();
    const piece = gameHandler.getPieces()[0];
    const pieceId = piece.getId();
    const finalX = 10;
    const finalY = 20;

    expect(gameHandler.getPiece(pieceId)).toBeDefined();

    gameHandler.setPiecePosition(pieceId, finalX, finalY);
    expect(gameHandler.getPiece(pieceId).getId()).toBe(pieceId);
    expect(gameHandler.getPiece(pieceId).getX()).toBe(finalX);

    const { x: resultX, y: resultY } = gameHandler.getPiece(pieceId).getPosition();

    expect(resultX).toBe(finalX);
    expect(resultY).toBe(finalY);
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
    const piece = gameHandler.getPieces()[0]
    const pieceId = piece.getId();
    const newA = 45;
    gameHandler.setPieceRotation(pieceId, newA);
    expect(piece.getA()).toBe(newA);
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
import PieceDTO from "../objects/dto/PieceDTO";
import GameState from "../objects/enum/GameState";
import GameHandler from "../controllers/GameHandler";
import Piece from "../objects/data/Piece";

describe('Game Handler tests', () => { 
  it('creates a game handler with valid pieces', () => {
    const pieceDTO = new PieceDTO(1,2,3,4);
    const gameState = GameState.GAME;
    const gameHandler = new GameHandler([pieceDTO], gameState);

    expect(gameHandler).toBeDefined();
    expect(gameHandler.pieces.length).toBeGreaterThanOrEqual(0);
    expect(gameHandler.pieces[0]).toBeInstanceOf(Piece);
    expect(gameHandler.state).toBeInstanceOf(GameState);
  });

  it('gets a piece DTO', () => {
    const pieceDTO = new PieceDTO(1,2,3,4);
    const gameState = GameState.GAME;
    const gameHandler = new GameHandler([pieceDTO], gameState);
    
    const pieceId = gameHandler.pieces[0].id;
    expect(pieceId).toBeGreaterThanOrEqual(0);

    const pieceReturned = gameHandler.getPieceDTO(pieceId);
    expect(pieceReturned).toBeDefined();
    expect(pieceReturned).toBeInstanceOf(PieceDTO);
  });

  it('throws error when trying to get a pieceDTO for a no existent piece', () => {
    const gameState = GameState.GAME;
    const gameHandler = new GameHandler([], gameState);
     
    const pieceId = 2;
    expect(() => {gameHandler.getPieceDTO(pieceId)}).toThrow(Error);
  });

  it('gets all the pieces DTOs', () => {
    const pieces = [
      new PieceDTO(1,2,3,4),
      new PieceDTO(1,2,3,4),
      new PieceDTO(1,2,3,4),
    ];
    const gameState = GameState.GAME;
    const gameHandler = new GameHandler(pieces, gameState);

    const piecesReturned = gameHandler.getPiecesDTOs();
    expect(piecesReturned.length).toBe(pieces.length);
    expect(piecesReturned[0]).toBeInstanceOf(PieceDTO);
    expect(piecesReturned[0].x).toBe(pieces[0].x);
    expect(piecesReturned[0].typeId).toBe(pieces[0].typeId);
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

  it.only('throws an error when trying to move a no existent piece', () => {
    const gameState = GameState.GAME;
    const gameHandler = new GameHandler([], gameState);
    const pieceId = 2;
    const diffX = 10;
    const diffY = 20;

    expect(() => {gameHandler.movePiece(pieceId, diffX, diffY)}).toThrow(Error);
  });

  it('rotates pieces', () => {
    const pieceDTO = new PieceDTO(1,2,3,4);
    const gameState = GameState.GAME;
    const gameHandler = new GameHandler([pieceDTO], gameState);
    const pieceId = gameHandler.pieces[0].id;
    const startA = gameHandler.pieces[0].a;
    const diffA = 15;

    gameHandler.setPieceRotation(pieceId, diffA);
    
    expect(gameHandler.pieces[0].a).toBe(startA + diffA);
  });

  it('throws an error when trying to move a no existent piece', () => {
    const gameState = GameState.GAME;
    const gameHandler = new GameHandler([], gameState);
    const pieceId = 2;
    const diffA = 10;

    expect(() => {gameHandler.rotatePiece(pieceId, diffA)}).toThrow(Error);
  });

  it('gets pieces ids', () => {
    const pieces = [
      new PieceDTO(1,2,3,4),
      new PieceDTO(1,2,3,4),
      new PieceDTO(1,2,3,4),
    ];
    const gameState = GameState.GAME;
    const gameHandler = new GameHandler(pieces, gameState);

    const ids = gameHandler.getPiecesIds();

    expect(ids).toBeDefined();
    expect(ids.length).toBe(pieces.length);
    expect(ids[2]).toBeGreaterThanOrEqual(0);
  });
})
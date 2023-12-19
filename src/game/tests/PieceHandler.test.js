import PieceHandler from "../controllers/PieceHandler";
import PieceDTO from "../objects/dto/PieceDTO";

describe("Piece Handler", () => {
  it('creates a piece handler', () => {
    const piece = new PieceDTO(1, 2, 3, 4);
    const handler = new PieceHandler([piece]);
    expect(handler).toBeDefined();
  });
  
  it("gets a piece DTO", () => {
    const piece = new PieceDTO(1, 2, 3, 4);
    const handler = new PieceHandler([piece]);

    expect(handler).toBeDefined();
    expect(handler.pieces).toBeDefined();
    expect(handler.pieces.length).toBe(1);

    const pieceCreated = handler.pieces[0];
    expect(pieceCreated).toBeDefined();
    expect(pieceCreated.id).toBeGreaterThanOrEqual(0);
    expect(pieceCreated.type.id).toBeDefined();

    const pieceRetrieved = handler.getPieceDTO(pieceCreated.id);
    expect(pieceRetrieved).toBeDefined();
    expect(pieceRetrieved.typeId).toBeDefined();

    expect(pieceCreated.type.id).toBe(pieceRetrieved.typeId);
  });

  it('moves piece', () => {
    const [startX, startY] = [100, 200]
    const piece = new PieceDTO(1, 2, 3, 4, startX, startY);
    const handler = new PieceHandler([piece]);
    const diff = 12;
    handler.movePiece(1, diff, diff);

    expect(handler.pieces[0]).toBeDefined();

    const { x, y } = handler.pieces[0];
    expect(x).toBeGreaterThanOrEqual(startX);
    expect(y).toBeGreaterThanOrEqual(startY);
  });
});

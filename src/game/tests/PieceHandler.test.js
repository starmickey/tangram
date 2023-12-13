import PieceHandler from "../controllers/PieceHandler";
import Piece from "../controllers/Piece";
import PieceType from "../objects/enum/PieceType"

describe("Piece Handler", () => {
  it("gets a piece DTO", () => {
    const piece = new Piece(1, PieceType.STRIANGLE);
    const handler = new PieceHandler([piece]);
    const pieceDTO = handler.getPieceDTO(1);

    expect(pieceDTO.id).toBe(1);
    expect(pieceDTO.typeId).toBe(PieceType.STRIANGLE.id);
  });

  it('moves piece', () => {
    const piece = new Piece(1, PieceType.STRIANGLE);
    const handler = new PieceHandler([piece]);
    const [x, y] = [100, 200];
    const diffCoef = 12;
    handler.movePiece(1, x, y);

    expect(handler.pieces[0]).toBeDefined();
    expect(handler.pieces[0].x).toBeGreaterThanOrEqual(x-diffCoef);
    expect(handler.pieces[0].y).toBeGreaterThanOrEqual(y-diffCoef);
  });
});

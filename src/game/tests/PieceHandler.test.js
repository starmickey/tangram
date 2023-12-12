import PieceHandler from "../controllers/PieceHandler";
import Piece from "../controllers/Piece";
import PieceType from "../controllers/PieceType";

describe("Piece Handler", () => {
  it("gets a piece DTO", () => {
    const piece = new Piece(1, PieceType.STRIANGLE);
    const handler = new PieceHandler([piece]);
    const pieceDTO = handler.getPieceDTO(1);

    expect(pieceDTO.id).toBe(1);
    expect(pieceDTO.typeId).toBe(PieceType.STRIANGLE.id);
  });
});

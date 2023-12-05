import PieceHandler from "../controllers/PieceHandler";
import Piece from "../controllers/Piece"
import PieceType from "../controllers/PieceType"

describe('Piece Handler', () => { 
  it('gets pieces DTOs', () => {
    const piece = new Piece(1, PieceType.STRIANGLE);
    const pieces = [piece];
    const handler = new PieceHandler(pieces)
    const piecesDTO = handler.getPiecesDTOs();

    expect(piecesDTO[0].id).toBe(1);
  });
  it('throws error if parameters are invalid', () => {
    const pieces = [{id: 0, type: 0, x: 0, y: 0, a: 0}]
    expect(() => new PieceHandler(pieces))
      .toThrow(new Error("Invalid Parameters"));
  });
 })
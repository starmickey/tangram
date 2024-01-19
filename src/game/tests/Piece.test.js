import Piece from "../objects/data/Piece";
import PieceType from "../objects/enum/PieceType";

describe('piece', () => { 
  it('cant rotate to an angle bigger than its maximum', () => {
    const type = PieceType.SQUARE;
    const maxAngle = type.getMaxAngle();
    const piece = new Piece(type);
    piece.setA(375);
    expect(piece.a).toBeLessThan(maxAngle);
  });
 })
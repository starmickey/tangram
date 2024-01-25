import Piece from "../objects/data/Piece";
import PieceType from "../objects/enum/PieceType";

describe('piece', () => { 
  it('cant rotate to an angle bigger than its maximum', () => {
    const type = PieceType.SQUARE;
    const maxAngle = type.getMaxAngle();
    const piece = new Piece(type);
    piece.setA(375);
    expect(piece.getA()).toBeLessThan(maxAngle);
  });

  it('creates pieces with unique ids', () => {
    const type = PieceType.STRIANGLE;
    const piece = new Piece(type);
    expect(piece.getId()).toBeDefined();
  });
 });
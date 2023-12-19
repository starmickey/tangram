import PieceType, { getPieceType } from "../objects/enum/PieceType"

describe('Piece Type', () => { 
  it('gets piece type ids', () => {
    const type = PieceType.STRIANGLE;
    const type2 = getPieceType(type.id);
    expect(type2.id).toBe(type.id);
  });
})
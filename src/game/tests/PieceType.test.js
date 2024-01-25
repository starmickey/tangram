import PieceType from "../objects/enum/PieceType"

describe('Piece Type', () => { 
  it('gets piece type ids', () => {
    const type = PieceType.STRIANGLE;
    const type2 = PieceType.getPieceType(type.getId());
    expect(type2).toBeInstanceOf(PieceType);
    expect(type2.getId()).toBe(type.getId());
  });
})
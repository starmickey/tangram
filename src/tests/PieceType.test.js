import { getTypeById } from "../controllers/PieceType";

describe('PieceType', () => { 
  it('finds types', () => {
    const pieceType = getTypeById(0)
    expect(pieceType.src).toMatch("./triangle.png")
  });
 })
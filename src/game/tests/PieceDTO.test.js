import PieceDTO from "../objects/dto/PieceDTO";

describe("PieceDTO", () => {
  it("creates pieces even without positions", () => {
    const piece = new PieceDTO(0, 0, 10, 10);
    expect(piece).toBeDefined();
  });

  it("rotates piece", () => {
    const piece = new PieceDTO(0, 0, 10, 10);
    piece.setA(12);
    expect(piece.getA()).toBe(12);
  });

  it("moves the piece", () => {
    const piece = new PieceDTO(0, 0, 10, 10);
    piece.setPosition(1,2)
    expect(piece.getX()).toBe(1);
    expect(piece.getY()).toBe(2);
  })
});
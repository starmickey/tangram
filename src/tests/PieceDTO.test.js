import PieceDTO from "../controllers/PieceDTO";

describe("PieceDTO", () => {
  it("creates pieces even without positions", () => {
    const type = { src: "", height: 10, width: 10 };
    const piece = new PieceDTO(0, type);
    expect(piece).toBeDefined();
  });

  it("rotates piece", () => {
    const type = { src: "", height: 10, width: 10 };
    const piece = new PieceDTO(0, type);
    piece.setA(12);
    expect(piece.a).toBe(12);
  });

  it("moves the piece", () => {
    const type = { src: "", height: 10, width: 10 };
    const piece = new PieceDTO(0, type);
    piece.setPosition(1,2)
    expect(piece.x).toBe(1);
    expect(piece.y).toBe(2);
  })
});
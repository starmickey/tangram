import { render, screen } from "@testing-library/react";
import Piece from "../components/game/Piece";

describe("Piece", () => {
  it("renders Piece and creates and image", () => {
    const type = { src: "", height: 10, width: 10 };
    const pieceDTO = { id: 0, type: type, x: 0, y: 0, a: 0 }
    render(<Piece piece={pieceDTO} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("doesn't render Piece without type", () => {
    expect(() => render(<Piece />)).toThrow();
  });
});

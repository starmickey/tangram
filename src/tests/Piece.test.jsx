import { render, screen } from "@testing-library/react";
import Piece from "../components/game/Piece";
import PieceDTO from "../controllers/PieceDTO";

describe("Piece", () => {
  it("renders Piece and creates and image", () => {
    const pieceDTO = new PieceDTO(1, 1, "", 100, 100, 1, 2, 1)
    render(<Piece piece={pieceDTO} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});

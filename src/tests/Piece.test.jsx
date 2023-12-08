import { render, screen } from "@testing-library/react";
import Piece from "../components/game/Piece";
import PieceDTO from "../controllers/PieceDTO";
import PieceHandler from "../controllers/PieceHandler";
import PieceC from "../controllers/Piece"
import PieceType from "../controllers/PieceType"

describe("Piece", () => {
  it("renders Piece and creates and image", () => {
    const piece = new PieceC(1, PieceType.STRIANGLE);
    const pieces = [piece];
    const handler = new PieceHandler(pieces);

    render(<Piece pieceId={1} pieceHandler={handler} />);
  });
});

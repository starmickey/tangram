import { render } from "@testing-library/react";
import Piece from "../components/Piece";
import GameHandler from "../controllers/GameHandler";
import PieceHandler from "../controllers/PieceHandler";
import PieceC from "../controllers/Piece"
import PieceType from "../objects/enum/PieceType";

describe("Piece", () => {
  it("renders Piece", () => {
    const piece = new PieceC(1, PieceType.STRIANGLE);
    const pieces = [piece];
    const pieceHandler = new PieceHandler(pieces);
    const gameHandler = new GameHandler(pieceHandler)
    const handleGameChange = () => {
      console.log("Handle Game Change Function");
    }

    render(<Piece pieceId={1} gameHandler={gameHandler} handleGameChange={handleGameChange}/>);
  });
});

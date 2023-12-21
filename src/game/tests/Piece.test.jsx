import { render } from "@testing-library/react";
import Piece from "../components/Piece";
import GameHandler from "../controllers/GameHandler";
import PieceDTO from "../objects/dto/PieceDTO";
import PieceType from "../objects/enum/PieceType";
import GameState from "../objects/enum/GameState";

describe("Piece", () => {
  it("renders Piece", () => {
    const { id, height, width } = PieceType.STRIANGLE; 
    const piece = new PieceDTO(1, id, height, width);
    const gameHandler = new GameHandler([piece], GameState.GAME)
    const handleGameChange = () => {
      console.log("Handle Game Change Function");
    }

    expect(piece).toBeDefined();
    expect(piece.typeId).toBe(id);
    expect(gameHandler).toBeDefined();
    expect(gameHandler.getPiecesDTOs().length).toBe(1);
    expect(handleGameChange).toBeDefined();

    render(<Piece pieceId={1} gameHandler={gameHandler} handleGameChange={handleGameChange}/>);
  });
});

import PieceHandler from "./PieceHandler";
import PieceDTO from "../objects/dto/PieceDTO";

class GameHandler {
  constructor(pieces, state) {
    // Validate inputs
    if (pieces.filter((piece) => !(piece instanceof PieceDTO)).length > 0) {
      throw new Error("piece inputs have invalid types");
    }
    if (typeof state !== "number") {
      throw new Error("game state has an invalid type");
    }

    // Assign non-static variables
    this.pieceHandler = new PieceHandler(pieces);
    this.state = state;
  }

  getPieceDTO(pieceId) {
    return this.pieceHandler.getPieceDTO(pieceId);
  }

  getPiecesDTOs() {
    return this.pieceHandler.getPiecesDTOs();
  }

  movePiece(pieceId, x, y) {
    return this.pieceHandler.movePiece(pieceId, x, y);
  }

  rotatePiece(pieceId, a) {
    return this.pieceHandler.rotatePiece(pieceId, a);
  }

  getState() {
    return this.state;
  }

  getPiecesIds() {
    return this.pieceHandler.pieces.map((piece) => piece.id);
  }
}

export default GameHandler;

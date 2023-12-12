import PieceHandler from "./PieceHandler";
import piecesSet from "./PiecesSet";
// import GameState from "./GameState";

export default class GameHandler {
  constructor(state) {
    this.state = state;
    this.pieceHandler = new PieceHandler(piecesSet);
  }

  getPieceDTO(pieceId) {
    return this.pieceHandler.getPieceDTO(pieceId);
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

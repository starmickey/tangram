import PieceDTO from "./PieceDTO";
import { getTypeById } from "./PieceType";

export default class GameController {
  constructor(pieces) {
    this.pieces = pieces;
  }

  getPiecesDTOs() {
    return this.pieces.map((piece) => new PieceDTO(
      piece.id,
      getTypeById(piece.typeId),
      piece.x,
      piece.y,
      piece.a,
    ));
  }

  movePiece(pieceId, x, y) {
    this.pieces = this.pieces.map((piece) => (piece.id === pieceId
      ? piece.setPosition(x, y)
      : piece));
  }

  rotatePiece(pieceId, a) {
    this.pieces = this.pieces.map((piece) => (piece.id === pieceId
      ? piece.setA(piece.a + a)
      : piece));
  }
}

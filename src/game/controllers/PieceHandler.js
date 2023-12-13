import PieceDTO from "../objects/dto/PieceDTO";
import Piece from "./Piece";

export default class PieceHandler {
  constructor(pieces) {
    this.pieces = [];
    // Type validation
    pieces.forEach((piece) => {
      if (piece instanceof Piece) {
        this.pieces.push(piece);
      } else {
        throw new Error("Invalid Parameters");
      }
    });
  }

  getPieceDTO(pieceId) {
    let pieceDTO;

    this.pieces.forEach((piece) => {
      if (piece.id === pieceId) {
        pieceDTO = new PieceDTO(
          piece.id,
          piece.type.id,
          piece.type.src,
          piece.type.height,
          piece.type.width,
          piece.x,
          piece.y,
          piece.a,
        );
      }
    });

    return pieceDTO;
  }

  movePiece(pieceId, diffX, diffY) {
    this.pieces.forEach((piece) => {
      if (piece.id === pieceId) {
        piece.setPosition(
          piece.x + diffX,
          piece.y + diffY,
        );
      }
    });
  }

  rotatePiece(pieceId, diffA) {
    this.pieces.forEach((piece) => {
      if (piece.id === pieceId) {
        piece.setA(piece.a + diffA);
      }
    });
  }
}

import PieceDTO from "../objects/dto/PieceDTO";
import Piece from "./Piece";
import { getPieceType } from "../objects/enum/PieceType";

export default class PieceHandler {
  constructor(pieces) {
    this.pieces = [];
    // Type validation
    pieces.forEach((piece) => {
      if (piece instanceof PieceDTO) {
        this.pieces.push(PieceHandler.#pieceDTOtoPiece(piece));
      } else {
        throw new Error("Invalid Parameters");
      }
    });
  }

  static #pieceDTOtoPiece(pieceDTO) {
    return new Piece(
      pieceDTO.id,
      getPieceType(pieceDTO.typeId),
      pieceDTO.x,
      pieceDTO.y,
      pieceDTO.a,
    );
  }

  static #pieceToPieceDTO(piece) {
    return new PieceDTO(
      piece.id,
      piece.type.id,
      piece.type.width,
      piece.type.height,
      piece.x,
      piece.y,
      piece.a,
    );
  }

  getPieceDTO(pieceId) {
    const filteredPieces = this.pieces.filter((p) => (pieceId === p.id));
    const piece = filteredPieces[0];
    return PieceHandler.#pieceToPieceDTO(piece);
    // return pieceDTO;
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

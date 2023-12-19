import PieceDTO from "../objects/dto/PieceDTO";
import Piece from "./Piece";
import { getPieceType } from "../objects/enum/PieceType";

class PieceHandler {
  constructor(pieces) {
    // Validate inputs
    if (pieces.filter((piece) => !(piece instanceof PieceDTO)).length > 0) {
      throw new Error("piece inputs have invalid types");
    }
    this.pieces = pieces.map((piece) => PieceHandler.#pieceDTOtoPiece(piece));
  }

  static #pieceDTOtoPiece(pieceDTO) {
    return new Piece(
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
  }

  getPiecesDTOs() {
    return this.pieces.map((piece) => PieceHandler.#pieceToPieceDTO(piece));
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

export default PieceHandler;

import Piece from "../objects/data/Piece";
import PieceDTO from "../objects/dto/PieceDTO";
import GameState from "../objects/enum/GameState";
import PieceType from "../objects/enum/PieceType";

class GameHandler {
  /**
   * Create a new GameHandler
   * @param {PieceDTO} pieces - interactive pieces
   * @param {GameState} state - start game state
   */
  constructor(pieces, state) {
    // Validate inputs
    if (pieces.filter((piece) => !(piece instanceof PieceDTO)).length > 0) {
      throw new Error("piece inputs have invalid types");
    }
    if (!(state instanceof GameState)) {
      throw new Error("game state has an invalid type");
    }
    // Assign attributes
    this.pieces = pieces.map((piece) => GameHandler.#pieceDTOtoPiece(piece));
    this.state = state;
  }

  static #pieceDTOtoPiece(pieceDTO) {
    return new Piece(
      PieceType.getPieceType(pieceDTO.typeId),
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

  /**
   * Get the piece DTO of one of the pices of the gameHandler
   * @param {number} pieceId - the unique id of the piece
   * @returns {PieceDTO}
   */
  getPieceDTO(pieceId) {
    const filteredPieces = this.pieces.filter((p) => (pieceId === p.id));

    // Error handling
    if (filteredPieces.length === 0) {
      throw new Error(`piece with id "${pieceId}" wasn't found.`);
    }
    if (filteredPieces.length > 1) {
      throw new Error(`more than one piece was found with id ${pieceId}`);
    }

    // Create pieceDTO
    const piece = filteredPieces[0];
    return GameHandler.#pieceToPieceDTO(piece);
  }

  getPiecesDTOs() {
    return this.pieces.map((piece) => GameHandler.#pieceToPieceDTO(piece));
  }

  movePiece(pieceId, diffX, diffY) {
    // Get piece by its id
    const filteredPieces = this.pieces.filter((p) => p.id === pieceId);

    // Error handling
    if (filteredPieces.length === 0) {
      throw new Error(`piece with id "${pieceId}" wasn't found.`);
    }
    if (filteredPieces.length > 1) {
      throw new Error(`more than one piece was found with id ${pieceId}`);
    }

    // Move piece
    const piece = filteredPieces[0];
    piece.setPosition(
      piece.x + diffX,
      piece.y + diffY,
    );
  }

  /**
   * Rotate a gameHandler piece
   * @param {number} pieceId - the piece unique identifier
   * @param {number} diffA - the difference between the last angle and the new one
   */
  rotatePiece(pieceId, diffA) {
    // Get piece by its id
    const filteredPieces = this.pieces.filter((p) => p.id === pieceId);

    // Error handling
    if (filteredPieces.length === 0) {
      throw new Error(`piece with id "${pieceId}" wasn't found.`);
    }
    if (filteredPieces.length > 1) {
      throw new Error(`more than one piece was found with id ${pieceId}`);
    }

    // Rotate piece
    const piece = filteredPieces[0];
    const newA = (piece.a + diffA) % 360;
    piece.setA(newA);
  }

  getState() {
    return this.state;
  }

  getPiecesIds() {
    return this.pieces.map((piece) => piece.id);
  }
}

export default GameHandler;

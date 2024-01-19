import Piece from "../objects/data/Piece";
import SolutionPiece from "../objects/data/SolutionPiece";
import PieceDTO from "../objects/dto/PieceDTO";
// import GameState from "../objects/enum/GameState";
import PieceType from "../objects/enum/PieceType";
import SolutionHandler from "./SolutionHandler";

class GameHandler {
  /**
   * Create a new GameHandler
   * @param {PieceDTO} pieces - interactive pieces
   * @param {GameState} state - start game state
   */
  constructor() {
    // Validate inputs
    // if (pieces.filter((piece) => !(piece instanceof PieceDTO)).length > 0) {
    //   throw new Error("piece inputs have invalid types");
    // }
    // if (!(state instanceof GameState)) {
    //   throw new Error("game state has an invalid type");
    // }
    // Assign attributes
    // this.pieces = pieces.map((piece) => GameHandler.#pieceDTOtoPiece(piece));
    this.solutionHandler = new SolutionHandler();
    // Create a default pieces set from solution
    const solutionPieces = this.solutionHandler.solution.pieces;
    this.pieces = solutionPieces.map((sp) => GameHandler.#solutionPieceToPiece(sp));
  }

  static #solutionPieceToPiece(solutionPiece) {
    if (!(solutionPiece instanceof SolutionPiece)) {
      throw new Error("argument must be a Solution Piece instance");
    }

    return new Piece(solutionPiece.type);
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

  setPiecePosition(pieceId, x, y) {
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
    piece.setPosition(x, y);
  }

  /**
   * Rotate a gameHandler piece
   * @param {number} pieceId - the piece unique identifier
   * @param {number} diffA - the difference between the last angle and the new one
   */
  setPieceRotation(pieceId, a) {
    // Get piece by its id
    const filteredPieces = this.pieces.filter((p) => p.id === pieceId);

    // Error handling
    if (filteredPieces.length === 0) {
      throw new Error(`piece with id "${pieceId}" wasn't found.`);
    }
    if (filteredPieces.length > 1) {
      throw new Error(`more than one piece was found with id ${pieceId}`);
    }

    const piece = filteredPieces[0];

    // Rotate piece
    if (piece.type.id === PieceType.PARALLELOGRAM.id) {
      // A parallelogram looks the same at 0 and at 180 degrees
      // So we reduce the range of its angles to make solution checking
      // easier
      piece.setA(a % 180);
    } else {
      piece.setA(a % 360);
    }
  }

  getPiecesIds() {
    return this.pieces.map((piece) => piece.id);
  }

  getSolutionDTO() {
    return this.solutionHandler.getSolutionDTO();
  }

  markPieceAsSolved(pieceId) {
    this.solutionHandler.markPieceAsSolved(pieceId);
  }

  isGameSolved() {
    return this.solutionHandler.isGameSolved();
  }
}

export default GameHandler;

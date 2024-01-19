import Piece from "../objects/data/Piece";
import SolutionPiece from "../objects/data/SolutionPiece";
import PieceDTO from "../objects/dto/PieceDTO";
import SolutionHandler from "./SolutionHandler";

class GameHandler {
  /**
   * Controller that keeps the state of the puzzle
   * and determines when its solved
   */
  constructor() {
    this.solutionHandler = new SolutionHandler();
    // Get the pieces of the solution generated
    const solutionPieces = this.solutionHandler.solution.pieces;
    // This attribute will keep the pieces state
    this.pieces = solutionPieces.map((sp) => GameHandler.#solutionPieceToPiece(sp));
  }

  /**
   * Helps to get a Piece instance from a Solution Piece instance.
   * @param {SolutionPiece} solutionPiece - A piece of the Solution
   * @returns {Piece}
   */
  static #solutionPieceToPiece(solutionPiece) {
    if (!(solutionPiece instanceof SolutionPiece)) {
      throw new Error("argument must be a Solution Piece instance");
    }

    return new Piece(solutionPiece.type);
  }

  /**
   * Conversor that creates a piece from a pieceDTO
   * @param {Piece} piece
   * @returns {PieceDTO}
   */
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

  /**
   * Get the PieceDTO of each piece
   * @returns {Array}
   */
  getPiecesDTOs() {
    return this.pieces.map((piece) => GameHandler.#pieceToPieceDTO(piece));
  }

  /**
   * Updates the piece with a new position
   * @param {number} pieceId - Unique identifier of the piece.
   * @param {number} x - X-coordinate of the new position.
   * @param {number} y - Y-coordinate of the new position.
   */
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
   * @param {number} a - its new angle
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
    // Update the piece with the new angle.
    piece.setA(a);
  }

  /**
   * Get all the pieces ids
   * @returns {Array}
   */
  getPiecesIds() {
    return this.pieces.map((piece) => piece.id);
  }

  /**
   * Get a DTO of the solution
   * @returns {SolutionDTO}
   */
  getSolutionDTO() {
    return this.solutionHandler.getSolutionDTO();
  }

  /**
   * Tell gameHandler that a piece is been placed in the position
   * of the solution.
   * @param {number} pieceId - Unique identifier of the piece
   */
  markPieceAsSolved(pieceId) {
    this.solutionHandler.markPieceAsSolved(pieceId);
  }

  /**
   * Checks if the puzzle has been solved.
   * @returns {boolean}
   */
  isGameSolved() {
    return this.solutionHandler.isGameSolved();
  }
}

export default GameHandler;

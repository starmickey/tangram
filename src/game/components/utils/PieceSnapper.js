import PieceDTO from "../../objects/dto/PieceDTO";
import SolutionDTO from "../../objects/dto/SolutionDTO";
import PieceSP from "../../objects/ui/pieceSP";

/**
 * ui controllers that helps snapping two pieces together
 * when they are close to each other
 */
export default class PieceSnapper {
  #pieces;
  #solutionPieces;

  /**
   * Create a PieceSnapper instance
   * @param {PieceSP} pieces - array with data and the last
   * position of the pieces
   * @param {PieceSP} solutionPieces - array with the position
   * and other data of the solution holes for each piece
   */
  constructor(pieces, solutionPieces) {
    // Validate inputs
    if (pieces.find((p) => !(p instanceof PieceSP))) {
      throw new Error("all pieces must be instances of PieceSP");
    }
    if (solutionPieces.find((p) => !(p instanceof PieceSP))) {
      throw new Error("all solutionPieces must be instances of PieceSP");
    }

    // Initialize attributes
    this.#pieces = pieces;
    this.#solutionPieces = solutionPieces;
  }

  /**
   * Get the current positions of the pieces.
   * @returns {Array} - array of piecesSP
   */
  getPieces() {
    return this.#pieces;
  }

  /**
   * Creates an instance of PieceSnapper using piecesDTOs
   * and a solutionDTO
   * @param {Array(PieceDTO)} pieces - array with data and the last
   * position of the pieces
   * @param {SolutionDTO} solution - array with the position
   * and other data of the solution holes for each piece
   * @returns {PieceSnapper} - new PieceSnapper instance
   */
  static getFromPieceAndSolutionDTO(pieces, solution) {
    // Validate inputs
    if (pieces.find((p) => !(p instanceof PieceDTO))) {
      throw new Error("all pieces must be instances of PieceDTO");
    }
    if (!(solution instanceof SolutionDTO)) {
      throw new Error("an instance of SolutionDTO must be provided.");
    }
    if (solution.getPieces().length !== pieces.length) {
      throw new Error("pieces and solutionPieces arrays should have the same length");
    }

    // Create piecesSPs intances for each piece
    const piecesSPs = pieces.map((p) => new PieceSP(
      p.getId(),
      p.getTypeId(),
      p.getX(),
      p.getY(),
      p.getA(),
    ));

    // Create piecesSPs intances for each solution piece of the solution
    const solutionPieces = solution.getPieces();
    const solutionPiecesSPs = solutionPieces.map((p) => new PieceSP(
      p.getId(),
      p.getTypeId(),
      p.getX(),
      p.getY(),
      p.getA(),
    ));

    // Create PieceSnapper instance
    return new PieceSnapper(piecesSPs, solutionPiecesSPs);
  }

  /**
   * Determines if two points are close enough to snap
   * them together.
   * @param {number} x1 - X coordinate of the first point.
   * @param {number} y1 - Y coordinate of the first point.
   * @param {number} x2 - X coordinate of the second point.
   * @param {number} y2 - Y coordinate of the second point.
   * @returns {boolean} - True if the points are close enough to snap, false otherwise.
   */
  static #arePointsCloseToSnap(x1, y1, x2, y2) {
    // Validate inputs
    if (
      typeof x1 !== "number"
      || typeof x2 !== "number"
      || typeof y1 !== "number"
      || typeof y2 !== "number"
    ) {
      throw new Error("all the arguments must be numbers.");
    }

    // Get distance between points
    const dx = x1 - x2;
    const dy = y1 - y2;
    const sqrdist = dx ** 2 + dy ** 2;

    // Determine if they are close to each other
    const MAX_DISTANCE = 500;
    return sqrdist < MAX_DISTANCE;
  }

  /**
   * Determines if a piece is snappable to a solution piece hole.
   * @param {number} typeId - id of the piece to snap.
   * @param {number} x - X-coordinate of the position of the piece.
   * @param {number} y - Y-coordinate of the position of the piece.
   * @param {number} a - angle of rotation of the piece.
   * @returns {Object} - resulting position of the piece after snapping.
   * If the piece wasn't snappable, returns the original position.
   */
  getSnappedToSolutionPosition(typeId, x, y, a) {
    // Validate inputs
    if (
      typeof typeId !== "number"
      || typeof x !== "number"
      || typeof y !== "number"
      || typeof a !== "number"
    ) {
      throw new Error("arguments must be numbers");
    }

    // Find the snappable piece
    const snappablePiece = this.#solutionPieces.find((sp) => (
      sp.getTypeId() === typeId
      && sp.getA() === a
      && PieceSnapper.#arePointsCloseToSnap(
        sp.getX(),
        sp.getY(),
        x,
        y,
      )
    ));

    // If it was found, return the position of the snappable piece.
    if (snappablePiece instanceof PieceSP) {
      return {
        x: snappablePiece.getX(),
        y: snappablePiece.getY(),
        snapped: true,
      };
    }

    // Otherwise, return the original position
    return {
      x,
      y,
      snapped: false,
    };
  }
}

/**
 * SolutionHandler class manages the solution state and provides functionality
 * to check and mark pieces as solved in a puzzle game.
 */
import SolutionDTO from "../objects/dto/SolutionDTO";
import SolutionPieceDTO from "../objects/dto/SolutionPieceDTO";
import getSolution from "../models/getSolution";
import Solution from "../objects/data/Solution";
import SolutionPiece from "../objects/data/SolutionPiece";

export default class SolutionHandler {
  #solution;
  // Keeps the ids of the pieces that are in the right place
  #solvedIds = [];

  /**
   * Creates a new Solution Handler.
   * @param {Solution} solution - The solution to be achieved.
   *                                Defaults to the default solution obtained from getSolution().
   * @throws {Error} If the provided solution is not an instance of Solution.
   */
  constructor(solution = getSolution()) {
    if (!(solution instanceof Solution)) {
      throw new Error("Invalid input parameters: solution must be an instance of Solution");
    }
    this.#solution = solution;
  }

  getSolution() {
    return this.#solution;
  }

  /**
   * Adds an id to the solvedIds array
   * This must only be used for testing
   * @param {number} id - solutionPiece unique identifier
   */
  addSolvedId(id) {
    this.#solvedIds.push(id);
  }

  getSolvedIds() {
    return this.#solvedIds;
  }

  /**
   * Converts a SolutionPiece to SolutionPieceDTO.
   * @param {SolutionPiece} solutionPiece - The solution piece to be converted.
   * @returns {SolutionPieceDTO} - The converted SolutionPieceDTO.
   * @throws {Error} If the provided argument is not an instance of SolutionPiece.
   * @private
   */
  static #solutionPieceToSolutionPieceDTO(solutionPiece) {
    if (!(solutionPiece instanceof SolutionPiece)) {
      throw new Error("argument must be an instance of Solution Piece");
    }

    return new SolutionPieceDTO(
      solutionPiece.getId(),
      solutionPiece.getType().getId(),
      solutionPiece.getType().getWidth(),
      solutionPiece.getType().getHeight(),
      solutionPiece.getX(),
      solutionPiece.getY(),
      solutionPiece.getA(),
    );
  }

  /**
   * Gets the SolutionDTO representing the current solution state.
   * @returns {SolutionDTO} - The SolutionDTO representing the current solution state.
   */
  getSolutionDTO() {
    const id = this.#solution.getId();
    const pieces = this.#solution.getPieces();
    // Convert each SolutionPiece to SolutionPieceDTO
    const solutionPiecesDTO = pieces.map((p) => (
      SolutionHandler.#solutionPieceToSolutionPieceDTO(p)
    ));

    return new SolutionDTO(id, solutionPiecesDTO);
  }

  /**
   * Marks a solution piece as solved by adding its id to the solvedIds array.
   * @param {number} id - SolutionPiece id.
   * @throws {Error} If the solution piece with the provided id is not found or
   * if multiple pieces are found.
   */
  markPieceAsSolved(id) {
    // Check if id is already in solvedIds array
    const filteredSolvedIds = this.#solvedIds.filter((si) => si === id);

    // If it wasn't found save it
    if (filteredSolvedIds.length === 0) {
      // Check that there's a solution piece whose id is the one given
      const filteredPieces = this.#solution.getPieces().filter((sp) => sp.getId() === id);

      // Error handling
      if (filteredPieces.length === 0) {
        throw new Error(`solution piece with id "${id}" wasn't found.`);
      }
      if (filteredPieces.length > 1) {
        throw new Error(`more than one solution piece was found with id ${id}`);
      }

      // Mark piece as solved
      this.#solvedIds.push(id);
    }
  }

  /**
   * Checks if all the pieces have been colocated in their proper positions.
   * @returns {boolean} - True if all pieces are solved, false otherwise.
   */
  isGameSolved() {
    return this.#solution.getPieces().length === this.#solvedIds.length;
  }
}

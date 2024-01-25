import SolutionPieceDTO from "./SolutionPieceDTO";

export default class SolutionDTO {
  #id;
  #pieces;

  /**
   * Data Tranfer Object which UI uses to read the solution and display it
   * @param {number} id - unique identifier of the Solution
   * @param {ArrayOf(SolutionPieceDTO)} solutionPieces - right position of pieces
   */
  constructor(id, solutionPieces) {
    // Validate inputs
    if (
      solutionPieces.filter((s) => !(s instanceof SolutionPieceDTO)).length > 0
      || solutionPieces.length === 0
    ) {
      throw new Error("solution piece array elements have invalid types or array is empty");
    }
    // Assign attributes
    this.#id = id;
    this.#pieces = solutionPieces;
  }

  getId() {
    return this.#id;
  }

  getPieces() {
    return this.#pieces;
  }
}

import SolutionPiece from "./SolutionPiece";

export default class Solution {
  static nextId = 0;

  /**
   * Create a new Solution object
   * @param {ArrayOf(SolutionPiece)} pieces - data of the solved puzzle pieces positions
   */
  constructor(pieces) {
    // Validate inputs
    if (
      pieces.filter((s) => !(s instanceof SolutionPiece)).length > 0
      || pieces.length === 0
    ) {
      throw new Error("solution pieces inputs have invalid types");
    }
    // Assign attributes
    this.id = Solution.#getNextId();
    this.pieces = pieces;
  }

  // Generate unique ids
  static #getNextId() {
    this.nextId += 1;
    return this.nextId;
  }
}

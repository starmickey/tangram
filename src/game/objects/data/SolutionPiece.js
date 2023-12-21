import PieceType from "../enum/PieceType";

export default class SolutionPiece {
  static nextId = 0;

  /**
   * Position of the piece when the puzzle is solved
   * @param {PieceType} type - The type of the piece object
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   * @param {number} a - rotation
   */
  constructor(type, x, y, a) {
    if (
      !(type instanceof PieceType)
      || typeof x !== "number"
      || typeof y !== "number"
      || typeof a !== "number"
      || a < 0
      || a > 360
    ) {
      throw new Error("Invalid input parameters");
    }

    // Assign attributes
    this.id = SolutionPiece.#getNextId();
    this.type = type;
    this.x = x;
    this.y = y;
    this.a = a;
  }

  // Generate unique ids
  static #getNextId() {
    this.nextId += 1;
    return this.nextId;
  }
}

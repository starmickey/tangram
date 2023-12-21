import PieceType from "../enum/PieceType";

export default class Piece {
  static nextId = 0;

  /**
   * Create a new Piece object
   * @param {PieceType} type - the piece type
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   * @param {number} a - rotation
   */
  constructor(type, x = 0, y = 0, a = 0) {
    // Validate inputs
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
    this.id = Piece.#getNextId();
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

  /**
   * Update piece position
   * @param {number} x - new X-coordinate
   * @param {number} y - new Y-coordinate
   */
  setPosition(x, y) {
    // Validate inputs
    if (
      typeof x !== "number"
      || typeof y !== "number"
    ) {
      throw new Error("Invalid inputs");
    }

    // Assign attributes
    this.x = x;
    this.y = y;
  }

  /**
   * Rotate piece
   * @param {number} a - new angle
   */
  setA(a) {
    // Validate inputs
    if (
      typeof a !== "number"
      || a < 0
      || a > 360
    ) {
      throw new Error(`Invalid angle ${a}`);
    }

    // Assign attributes
    this.a = a;
  }
}

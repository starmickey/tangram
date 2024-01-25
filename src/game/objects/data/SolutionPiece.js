import PieceType from "../enum/PieceType";

export default class SolutionPiece {
  // Unique identifier of the solution piece
  #id;
  // SolutionPiece type. Can be striangle, parallelogram, etc.
  #type;
  // X-coordinate of the solutionPiece
  #x;
  // Y-coordinate of the solutionPiece
  #y;
  // solutionPiece rotation angle
  #a;

  // Used for generating unique ids for each solutionPiece
  static #nextId = 1;

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
    this.#id = SolutionPiece.#getNextId();
    this.#type = type;
    this.#x = x;
    this.#y = y;
    this.#a = a;
  }

  // Generate unique ids
  static #getNextId() {
    this.#nextId += 1;
    return this.#nextId;
  }

  getId() {
    return this.#id;
  }

  getType() {
    return this.#type;
  }

  getX() {
    return this.#x;
  }
  getY() {
    return this.#y;
  }

  getPosition() {
    return { x: this.#x, y: this.#y };
  }

  getA() {
    return this.#a;
  }
}

import PieceType from "../enum/PieceType";

export default class Piece {
  // Unique identifier of the piece
  #id;
  // Piece type. Can be striangle, parallelogram, etc.
  #type;
  // X-coordinate of the piece
  #x;
  // Y-coordinate of the piece
  #y;
  // Piece rotation angle
  #a;

  // Used for generating unique ids for each piece
  static #nextId = 1;

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
    this.#id = Piece.#getNextId();
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
    this.#x = x;
    this.#y = y;
  }

  getA() {
    return this.#a;
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
    ) {
      throw new Error(`Invalid angle ${a}. It must be a non-negative number.`);
    }

    // Assign attributes
    this.#a = a % this.#type.getMaxAngle();
  }
}

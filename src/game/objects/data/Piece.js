import PieceType from "../enum/PieceType";

export default class Piece {
  static nextId = 0;

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
      throw new Error("Invalid inputs");
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

  setA(a) {
    // Validate inputs
    if (
      typeof a !== "number"
      || a < 0
      || a > 360
    ) {
      throw new Error("Invalid inputs");
    }

    // Assign attributes
    this.a = a;
  }
}

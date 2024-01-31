export default class PieceSP {
  #id;
  #typeId;
  #x;
  #y;
  #a;

  /**
   * Data Transfer Object for PieceSnapper status
   * @param {number} id - unique identifier of the associated interactive piece
   * @param {number} typeId - unique id of the piece type
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   * @param {number} a - rotation
   */
  constructor(id, typeId, x, y, a) {
    if (
      typeof id !== "number"
      || typeof typeId !== "number"
      || typeof x !== "number"
      || typeof y !== "number"
      || typeof a !== "number"
    ) {
      throw new Error("Invalid input parameters");
    }

    this.#id = id;
    this.#typeId = typeId;
    this.#x = x;
    this.#y = y;
    this.#a = a;
  }

  getId() {
    return this.#id;
  }

  getTypeId() {
    return this.#typeId;
  }

  getX() {
    return this.#x;
  }

  getY() {
    return this.#y;
  }

  getA() {
    return this.#a;
  }
}

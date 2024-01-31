/**
 * Class used for handling the corners of a piece
 */
export default class CornerDTO {
  #id;
  // Corner coordinates
  #x;
  #y;

  // Used for generating unique ids
  static #nextId = 0;

  /**
   * Figure corner position
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   */
  constructor(x, y) {
    // Validate inputs
    if (
      typeof x !== "number"
      || typeof y !== "number"
    ) {
      throw new Error("Invalid input parameters types");
    }

    // Assign parameters
    this.#id = CornerDTO.#getNextId();
    this.#x = Math.round(x);
    this.#y = Math.round(y);
  }

  // Generate unique ids
  static #getNextId() {
    this.#nextId += 1;
    return this.#nextId;
  }

  getId() {
    return this.#id;
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
}

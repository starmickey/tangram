export default class CornerDTO {
  static nextId = 0;

  /**
   * Corner position
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   */
  constructor(x, y) {
    if (
      typeof x !== "number"
      || typeof y !== "number"
    ) {
      throw new Error("Invalid input parameters");
    }

    // Assign parameteres
    this.id = CornerDTO.#getNextId();
    this.x = Math.round(x);
    this.y = Math.round(y);
  }

  // Generate unique ids
  static #getNextId() {
    this.nextId += 1;
    return this.nextId;
  }
}

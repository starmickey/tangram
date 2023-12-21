export default class SolutionPieceDTO {
  /**
   * Data Transfer Object which UI uses to display the shadow of each piece
   * of the solution.
   * @param {number} id - unique identifier of the associated solution piece
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
      || a < 0
      || a > 360
    ) {
      throw new Error("Invalid input parameters");
    }

    // Assign attributes
    this.id = id;
    this.typeId = typeId;
    this.x = x;
    this.y = y;
    this.a = a;
  }
}

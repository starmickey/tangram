export default class SolutionPieceDTO {
  #id;
  #typeId;
  #width;
  #height;
  #x;
  #y;
  #a;

  /**
   * Data Transfer Object which UI uses to display the shadow of each piece
   * of the solution.
   * @param {number} id - unique identifier of the associated solution piece
   * @param {number} typeId - unique id of the piece type
   * @param {number} width - width of the geometric figure
   * @param {number} height - height of the geometric figure
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   * @param {number} a - rotation
   */
  constructor(id, typeId, width, height, x, y, a) {
    if (
      typeof id !== "number"
      || typeof typeId !== "number"
      || typeof x !== "number"
      || typeof y !== "number"
      || typeof a !== "number"
      || typeof width !== "number"
      || typeof height !== "number"
      || a < 0
      || a > 360
      || width < 0
      || height < 0
    ) {
      throw new Error("Invalid input parameters");
    }

    // Assign attributes
    this.#id = id;
    this.#typeId = typeId;
    this.#width = width;
    this.#height = height;
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

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
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

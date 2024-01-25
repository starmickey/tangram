export default class PieceDTO {
  #id;
  #typeId;
  #width;
  #height;
  #x;
  #y;
  #a;

  /**
   * Data Transfer Object for UI exchange with gameHandler
   * @param {number} id - unique identifier of the associated interactive piece
   * @param {number} typeId - unique id of the piece type
   * @param {number} width - width of the geometric figure
   * @param {number} height - height of the geometric figure
   * @param {number} x - X-coordinate
   * @param {number} y - Y-coordinate
   * @param {number} a - rotation
   */
  constructor(id, typeId, width, height, x = 0, y = 0, a = 0) {
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

  /**
   * Update piece DTO position
   * @param {number} x - new X-coordinate
   * @param {number} y - new Y-coordinate
   */
  setPosition(x, y) {
    this.#x = x;
    this.#y = y;
  }

  getA() {
    return this.#a;
  }

  /**
   * Rotate piece DTO
   * @param {number} a - new angle
   */
  setA(a) {
    this.#a = a;
  }
}

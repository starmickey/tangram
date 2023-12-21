export default class PieceDTO {
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
    this.id = id;
    this.typeId = typeId;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.a = a;
  }

  /**
   * Update piece DTO position
   * @param {number} x - new X-coordinate
   * @param {number} y - new Y-coordinate
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Rotate piece DTO
   * @param {number} a - new angle
   */
  setA(a) {
    this.a = a;
  }
}

export default class PieceDTO {
  constructor(id, typeId, width, height, x = 0, y = 0, a = 0) {
    this.id = id;
    this.typeId = typeId;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.a = a % 360;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setA(a) {
    this.a = a % 360;
  }
}

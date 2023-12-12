export default class PieceDTO {
  constructor(id, typeId, src, height, width, x, y, a) {
    this.id = id;
    this.typeId = typeId;
    this.src = src;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.a = a;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setA(a) {
    this.a = a;
  }
}

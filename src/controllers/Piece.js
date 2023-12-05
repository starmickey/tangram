export default class Piece {
  constructor(id, type, x = 0, y = 0, a = 0) {
    this.id = id;
    this.type = type;
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

export default class Piece {
  constructor(id, type, x = 0, y = 0, a = 0) {
    this.id = id;
    this.type = type;

    this.x = Math.round(x / 12) * 12;
    this.y = Math.round(y / 12) * 12;
    this.a = a % 360;
  }

  setPosition(x, y) {
    this.x = Math.round(x / 12) * 12;
    this.y = Math.round(y / 12) * 12;
  }

  setA(a) {
    this.a = a % 360;
  }
}

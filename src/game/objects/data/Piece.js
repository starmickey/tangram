export default class Piece {
  static nextId = 0;

  constructor(type, x = 0, y = 0, a = 0) {
    this.id = Piece.#getNextId();
    this.type = type;
    this.x = x;
    this.y = y;
    this.a = a;
  }

  // Generate unique ids
  static #getNextId() {
    this.nextId += 1;
    return this.nextId;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setA(a) {
    this.a = a;
  }
}

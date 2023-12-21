export default class GameState {
  static nextId = 0;

  static GAME = new GameState("game");

  static WIN = new GameState("win");

  constructor(name) {
    this.id = GameState.#getNextId();
    this.name = name;
  }

  // Generate unique ids
  static #getNextId() {
    this.nextId += 1;
    return this.nextId;
  }
}

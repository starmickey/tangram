export default class PieceType {
  #id;
  #name;
  #width;
  #height;
  /* Used for rounding angle values
   * It can be less than 360 if the figure can get to two positions
   * with different rotations and that look like the same.
   */
  #maxAngle;

  // Used for generating unique ids
  static #nextId = 1;

  // Default types
  static STRIANGLE = new PieceType("striangle", 100, 100, 360);

  static MTRIANGLE = new PieceType("mtriangle", 141, 141, 360);

  static LTRIANGLE = new PieceType("ltriangle", 200, 200, 360);

  static PARALLELOGRAM = new PieceType("parallelogram", 212, 71, 180);

  static SQUARE = new PieceType("square", 100, 100, 90);

  static #defaultTypes = [
    this.STRIANGLE,
    this.MTRIANGLE,
    this.LTRIANGLE,
    this.PARALLELOGRAM,
    this.SQUARE,
  ];

  constructor(name, width = 0, height = 0, maxAngle = 0) {
    this.#id = PieceType.#getNextId();
    this.#name = name;
    this.#width = width;
    this.#height = height;
    // Angles range is restricted to avoid figures that look
    // the same and have different angles.
    this.#maxAngle = maxAngle;
  }

  // Generate unique ids
  static #getNextId() {
    this.#nextId += 1;
    return this.#nextId;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  getMaxAngle() {
    return this.#maxAngle;
  }

  static getPieceType(id) {
    const filterPieceTypes = PieceType.#defaultTypes.filter((type) => type.getId() === id);

    // Error handling
    if (filterPieceTypes.length === 0) {
      throw new Error(`cannot get a piece type for id ${id}`);
    }
    if (filterPieceTypes.length > 1) {
      throw new Error(`more than one pieceType ece was found with id ${id}`);
    }

    const pieceType = filterPieceTypes[0];
    return pieceType;
  }

  static getMinSnappingDistance() {
    return Math.max(
      PieceType.LTRIANGLE.getWidth(),
      PieceType.LTRIANGLE.getHeight(),
    );
  }
}

export const { getMinSnappingDistance } = PieceType;

export default class PieceType {
  static nextId = 0;

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
    this.id = PieceType.#getNextId();
    this.name = name;
    this.width = width;
    this.height = height;
    // Angles range is restricted to avoid figures that look
    // the same and have different angles.
    this.maxAngle = maxAngle;
  }

  // Generate unique ids
  static #getNextId() {
    this.nextId += 1;
    return this.nextId;
  }

  static getPieceType(id) {
    const filterPieceTypes = PieceType.#defaultTypes.filter((type) => type.id === id);

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

  getMaxAngle() {
    return this.maxAngle;
  }
}

// export function getPieceType(id) {
//   switch (id) {
//     case PieceType.STRIANGLE.id:
//       return PieceType.STRIANGLE;
//     case PieceType.MTRIANGLE.id:
//       return PieceType.MTRIANGLE;
//     case PieceType.LTRIANGLE.id:
//       return PieceType.LTRIANGLE;
//     case PieceType.PARALLELOGRAM.id:
//       return PieceType.PARALLELOGRAM;
//     case PieceType.SQUARE.id:
//       return PieceType.SQUARE;
//     default:
//       throw new Error(`cannot get a piece type for id ${id}`);
//   }
// }

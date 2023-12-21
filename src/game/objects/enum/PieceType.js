export default class PieceType {
  static nextId = 0;

  static STRIANGLE = new PieceType("striangle", 141.42, 70.71);

  static MTRIANGLE = new PieceType("mtriangle", 200, 100);

  static LTRIANGLE = new PieceType("ltriangle", 282.84, 141.42);

  static PARALLELOGRAM = new PieceType("parallelogram", 212.13, 70.71);

  static SQUARE = new PieceType("square", 100, 100);

  static #defaultTypes = [
    this.STRIANGLE,
    this.MTRIANGLE,
    this.LTRIANGLE,
    this.PARALLELOGRAM,
    this.SQUARE,
  ];

  constructor(name, width, height) {
    this.id = PieceType.#getNextId();
    this.name = name;
    this.width = width;
    this.height = height;
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

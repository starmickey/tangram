import PieceDTO from "../../objects/dto/PieceDTO";
import SolutionPieceDTO from "../../objects/dto/SolutionPieceDTO";
import PieceType from "../../objects/enum/PieceType";
import CornerDTO from "./CornerDTO";

function getSquareCorners(piece) {
  // Get piece sizes
  const { width, height } = PieceType.getPieceType(piece.typeId);
  // Validate inputs
  if (
    typeof width !== "number"
    || typeof height !== "number"
    || width <= 0
    || height <= 0
  ) {
    throw new Error("Invalid inputs");
  }
  // Get corners
  const corners = [
    new CornerDTO(0, 0),
    new CornerDTO(width, 0),
    new CornerDTO(width, height),
    new CornerDTO(0, height),
  ];
  return corners;
}

function getTriangleCorners(piece) {
  // Get piece sizes
  const { width, height } = PieceType.getPieceType(piece.typeId);
  // Validate inputs
  if (
    typeof width !== "number"
    || typeof height !== "number"
    || width <= 0
    || height <= 0
  ) {
    throw new Error("Invalid inputs");
  }
  // Get corners
  const corners = [
    new CornerDTO(width / 2, 0),
    new CornerDTO(width, height),
    new CornerDTO(0, height),
  ];
  return corners;
}

function getParallelogramCorners(piece) {
  // Get piece sizes
  const { width, height } = PieceType.getPieceType(piece.typeId);
  // Validate inputs
  if (
    typeof width !== "number"
    || typeof height !== "number"
    || width <= 0
    || height <= 0
  ) {
    throw new Error("Invalid inputs");
  }
  // Get corners
  const corners = [
    new CornerDTO(0, 0),
    new CornerDTO((2 / 3) * width, 0),
    new CornerDTO(width, height),
    new CornerDTO((1 / 3) * width, height),
  ];
  return corners;
}

/**
 * Get the corners of a not rotated piece
 * @param {PieceDTO or SolutionPieceDTO} piece - a piece
 * @returns {ArrayOf(CornerDTO)} - the corners of this piece
 */
export default function getCorners(piece) {
  if (
    !(piece instanceof SolutionPieceDTO)
    && !(piece instanceof PieceDTO)
  ) {
    throw new Error("Invalid input parameters");
  }

  switch (piece.typeId) {
    case PieceType.SQUARE.id:
      return getSquareCorners(piece);
    case PieceType.STRIANGLE.id:
    case PieceType.MTRIANGLE.id:
    case PieceType.LTRIANGLE.id:
      return getTriangleCorners(piece);
    case PieceType.PARALLELOGRAM.id:
      return getParallelogramCorners(piece);
    default:
      throw new Error(`not implemented for type ${piece.typeId} yet`);
  }
}

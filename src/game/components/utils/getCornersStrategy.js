import PieceType from "../../objects/enum/PieceType";
import CornerDTO from "./CornerDTO";

function getSquareCorners(width, height, x, y) {
  // Get corners
  const corners = [
    new CornerDTO(x, y),
    new CornerDTO(x + width, y),
    new CornerDTO(x + width, y + height),
    new CornerDTO(x, y + height),
  ];
  return corners;
}

function getTriangleCorners(width, height, x, y) {
  // Get corners
  const corners = [
    new CornerDTO(x, y),
    new CornerDTO(x, y + height),
    new CornerDTO(x + width, y + height),
  ];
  return corners;
}

function getParallelogramCorners(width, height, x, y) {
  // Get corners
  const corners = [
    new CornerDTO(x, y),
    new CornerDTO(x + (2 / 3) * width, y),
    new CornerDTO(x + width, y + height),
    new CornerDTO(x + (1 / 3) * width, y + height),
  ];
  return corners;
}

/**
 * Gets a piece corners' coordinates
 * @param {number} typeId - id of the PieceType of the piece
 * @param {number} width - width of the piece
 * @param {number} height - height of the piece
 * @param {number} x - X-coordinate of the piece
 * @param {number} y - Y-coordinate of the piece
 * @param {number} a - angle of the piece
 * @returns {Array} - array of CornerDTO with corners
 */
export default function getCorners(typeId, width, height, x = 0, y = 0, a = 0) {
  if (
    typeof typeId !== "number"
    || typeof width !== "number"
    || typeof height !== "number"
    || typeof x !== "number"
    || typeof y !== "number"
    || typeId < 0
    || width <= 0
    || height <= 0
    || x < 0
    || y < 0
  ) {
    throw new Error(`Input parameters must be non-negative numbers Inputs: typeId: ${typeId} width: ${width} height: ${height} x: ${x} y: ${y}`);
  }

  switch (typeId) {
    case PieceType.SQUARE.id:
      return getSquareCorners(width, height, x, y, a);
    case PieceType.STRIANGLE.id:
    case PieceType.MTRIANGLE.id:
    case PieceType.LTRIANGLE.id:
      return getTriangleCorners(width, height, x, y, a);
    case PieceType.PARALLELOGRAM.id:
      return getParallelogramCorners(width, height, x, y, a);
    default:
      throw new Error(`not implemented for type ${typeId} yet`);
  }
}

import PieceType from "../../objects/enum/PieceType";
import CornerDTO from "../../objects/ui/CornerDTO";

/**
 * If the piece is rotated, modifies the coordinates
 * of the corners obtained for un unrotated piece
 * to their real positions
 * @param {number} width - Width of the piece
 * @param {number} height - Height of the piece
 * @param {number} x - X-coordinate of the piece
 * @param {number} y - Y-coordinate of the piece
 * @param {number} a - Angle of rotation of the piece
 * @param {number} corners - Piece corners coordinates
 * @returns {Array} - cornersDTOs
 */
function rotateCorners(width, height, x, y, a, corners) {
  // Get middle point coordinates
  const xm = x + width / 2;
  const ym = y + height / 2;
  // Get angle in radians
  const rad = a * (Math.PI / 180);
  // Get coordinates for each rotated corner
  const rotatedCorners = corners.map((corner) => {
    // Get coordinates of unrotated corner
    const { x: xc, y: yc } = corner.getPosition();
    // Get angle of unrotated corner
    let ac = Math.atan((yc - ym) / (xc - xm));
    ac = yc - ym > 0 ? ac + Math.PI : ac;
    // Get distance between the corner and the center
    const p = Math.sqrt((xc - xm) ** 2 + (yc - ym) ** 2);
    // Get coordinates of rotated corner
    return new CornerDTO(
      Math.round(xm + p * Math.cos(ac + rad)),
      Math.round(ym + p * Math.sin(ac + rad)),
    );
  });

  return rotatedCorners;
}

/**
 * Get corners coordinates for a square
 * @param {number} width - Width of the piece
 * @param {number} height - Height of the piece
 * @param {number} x - X-coordinate of the piece
 * @param {number} y - Y-coordinate of the piece
 * @param {number} a - Angle of rotation of the piece
 * @returns {Array} - corners DTOs
 */
function getSquareCorners(width, height, x, y, a) {
  let corners = [
    new CornerDTO(x, y),
    new CornerDTO(x + width, y),
    new CornerDTO(x + width, y + height),
    new CornerDTO(x, y + height),
  ];

  if (a !== 0) {
    corners = rotateCorners(width, height, x, y, a, corners);
  }

  return corners;
}

/**
 * Get corners coordinates for a triangle
 * @param {number} width - Width of the piece
 * @param {number} height - Height of the piece
 * @param {number} x - X-coordinate of the piece
 * @param {number} y - Y-coordinate of the piece
 * @param {number} a - Angle of rotation of the piece
 * @returns {Array} - corners DTOs
 */
function getTriangleCorners(width, height, x, y, a) {
  let corners = [
    new CornerDTO(x, y),
    new CornerDTO(x, y + height),
    new CornerDTO(x + width, y + height),
  ];

  if (a !== 0) {
    corners = rotateCorners(width, height, x, y, a, corners);
  }

  return corners;
}

/**
 * Get corners coordinates for a parallelogram
 * @param {number} width - Width of the piece
 * @param {number} height - Height of the piece
 * @param {number} x - X-coordinate of the piece
 * @param {number} y - Y-coordinate of the piece
 * @param {number} a - Angle of rotation of the piece
 * @returns {Array} - corners DTOs
 */
function getParallelogramCorners(width, height, x, y, a) {
  let corners = [
    new CornerDTO(x, y),
    new CornerDTO(x + (2 / 3) * width, y),
    new CornerDTO(x + width, y + height),
    new CornerDTO(x + (1 / 3) * width, y + height),
  ];

  if (a !== 0) {
    corners = rotateCorners(width, height, x, y, a, corners);
  }

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
    case PieceType.SQUARE.getId():
      return getSquareCorners(width, height, x, y, a);
    case PieceType.STRIANGLE.getId():
    case PieceType.MTRIANGLE.getId():
    case PieceType.LTRIANGLE.getId():
      return getTriangleCorners(width, height, x, y, a);
    case PieceType.PARALLELOGRAM.getId():
      return getParallelogramCorners(width, height, x, y, a);
    default:
      throw new Error(`not implemented for type ${typeId} yet`);
  }
}

import PieceDTO from "../../objects/dto/PieceDTO";
import SolutionDTO from "../../objects/dto/SolutionDTO";

/**
 * Clamps the position within the specified container boundaries.
 * @param {number} x - X-coordinate of the position.
 * @param {number} y - Y-coordinate of the position.
 * @param {number} targetWidth - Width of the target object.
 * @param {number} targetHeight - Height of the target object.
 * @param {number} containerWidth - Width of the container.
 * @param {number} containerHeight - Height of the container.
 * @returns {Object} - Clamped position {x, y}.
 * @throws {Error} If input parameters are invalid.
 */
export function getClampedPosition(
  x,
  y,
  targetWidth,
  targetHeight,
  containerWidth,
  containerHeight,
) {
  // Validate input parameters
  if (
    typeof x !== "number"
    || typeof y !== "number"
    || typeof targetWidth !== "number"
    || typeof targetHeight !== "number"
    || typeof containerWidth !== "number"
    || typeof containerHeight !== "number"
    || targetWidth < 0
    || targetHeight < 0
    || containerWidth < 0
    || containerHeight < 0
  ) {
    throw new Error("Invalid input parameters.");
  }
  // Calculate the allowed position range
  const minX = targetWidth / 2;
  const minY = targetHeight / 2;
  const maxX = containerWidth - targetWidth / 2;
  const maxY = containerHeight - targetHeight / 2;
  // Clamp the position within the stage boundaries
  const clampedX = Math.max(minX, Math.min(x, maxX));
  const clampedY = Math.max(minY, Math.min(y, maxY));
  return { x: clampedX, y: clampedY };
}

/**
 * Generates a random position within the container boundaries.
 * @param {number} targetWidth - Width of the target object.
 * @param {number} targetHeight - Height of the target object.
 * @param {number} containerWidth - Width of the container.
 * @param {number} containerHeight - Height of the container.
 * @returns {Object} - Random position {x, y}.
 * @throws {Error} If input parameters are invalid.
 */
export function getRandomPosition(
  targetWidth,
  targetHeight,
  containerWidth,
  containerHeight,
) {
  // Validate input parameters
  if (
    typeof targetWidth !== "number"
    || typeof targetHeight !== "number"
    || typeof containerWidth !== "number"
    || typeof containerHeight !== "number"
    || targetWidth < 0
    || targetHeight < 0
    || containerWidth < 0
    || containerHeight < 0
  ) {
    throw new Error("Invalid input parameters");
  }
  // Get random positions within container limits
  const newX = Math.round(Math.random() * containerWidth);
  const newY = Math.round(Math.random() * containerHeight);
  // Clamp position to the container bounds
  const clampedPosition = getClampedPosition(
    newX,
    newY,
    targetWidth,
    targetHeight,
    containerWidth,
    containerHeight,
  );

  const { x, y } = clampedPosition;
  return { x, y };
}

/**
 * Determines if two points are close enough to snap
 * them together.
 * @param {number} x1 - X coordinate of the first point.
 * @param {number} y1 - Y coordinate of the first point.
 * @param {number} x2 - X coordinate of the second point.
 * @param {number} y2 - Y coordinate of the second point.
 * @returns {boolean} - True if the points are close enough to snap, false otherwise.
 */
function areSnappable(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const sqrdist = dx ** 2 + dy ** 2;

  const MAX_DISTANCE = 500;
  return sqrdist < MAX_DISTANCE;
}

/**
 * Determines if a piece is snappable to a solution piece hole.
 * @param {PieceDTO} pieceDTO - Data of the piece to snap.
 * @param {SolutionDTO} solutionDTO - keeps all the solution pieces
 * to compare the pieceDTO to their positions.
 * @returns {SolutionPieceDTO | null} - Returns the SolutionPieceDTO if snappable,
 * otherwise returns null.
 * @throws {Error} If input parameters are not instances of PieceDTO and SolutionDTO.
 */
export function getSolutionPieceToSnap(pieceDTO, solutionDTO) {
  // Input validation
  if (!(pieceDTO instanceof PieceDTO)) {
    throw new Error("piece must be an instance of PieceDTO");
  }
  if (!(solutionDTO instanceof SolutionDTO)) {
    throw new Error("solution must be an instance of SolutionDTO");
  }

  // Find the snappable piece
  const snappablePiece = solutionDTO.pieces.find((sp) => (
    sp.typeId === pieceDTO.typeId
    && sp.a === pieceDTO.a
    && areSnappable(sp.x, sp.y, pieceDTO.x, pieceDTO.y)
  ));

  return snappablePiece || null;
}

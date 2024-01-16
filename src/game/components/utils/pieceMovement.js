/**
 * Clamps the position within the specified container boundaries.
 * @param {number} x - X-coordinate of the position.
 * @param {number} y - Y-coordinate of the position.
 * @param {number} targetWidth - Width of the target object.
 * @param {number} targetHeight - Height of the target object.
 * @param {number} containerWidth - Width of the container.
 * @param {number} containerHeight - Height of the container.
 * @returns {Object} - Clamped position {x, y}.
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

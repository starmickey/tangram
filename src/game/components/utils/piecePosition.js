export function getClampedPosition(
  x,
  y,
  targetWidth,
  targetHeight,
  containerWidth,
  containerHeight,
) {
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

export function getGriddedPosition(x, y) {
  const gridUnit = 5;

  return {
    x: Math.round(x / gridUnit) * gridUnit,
    y: Math.round(y / gridUnit) * gridUnit,
  };
}

export function getRandomPosition(
  targetWidth,
  targetHeight,
  containerWidth,
  containerHeight,
) {
  const newX = Math.round(Math.random() * containerWidth);
  const newY = Math.round(Math.random() * containerHeight);
  const clampedPosition = getClampedPosition(
    newX,
    newY,
    targetWidth,
    targetHeight,
    containerWidth,
    containerHeight,
  );
  const griddedPosition = getGriddedPosition(
    clampedPosition.x,
    clampedPosition.y,
  );
  const { x, y } = griddedPosition;
  return { x, y };
}

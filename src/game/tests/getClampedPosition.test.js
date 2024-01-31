import getClampedPosition, { getRandomPosition } from "../components/utils/getClampedPosition";

describe('piece poisition tests', () => { 
  it('clamps positions', () => {
    const [startX, startY] = [-10, 40];
    const targetWidth = 10;
    const targetHeight = 10;
    const containerWidth = 20;
    const containerHeight = 20;

    const { x, y } = getClampedPosition(
      startX,
      startY,
      targetWidth,
      targetHeight,
      containerWidth,
      containerHeight,
    );

    expect(x).toBeDefined();
    expect(y).toBeDefined();
    expect(x).toBe(5);
    expect(y).toBe(15);
  });  

  it('gets valid random positions', () => {
    const targetWidth = 7;
    const targetHeight = 11;
    const containerWidth = 22;
    const containerHeight = 42;

    const { x, y } = getRandomPosition(
      targetWidth,
      targetHeight,
      containerWidth,
      containerHeight,
    );

    expect(x).toBeDefined();
    expect(y).toBeDefined();
    expect(x).toBeGreaterThanOrEqual(targetWidth / 2);
    expect(y).toBeGreaterThanOrEqual(targetHeight / 2);
    expect(x).toBeLessThanOrEqual(containerWidth - targetWidth / 2);
    expect(y).toBeLessThanOrEqual(containerHeight - targetHeight / 2);
  });
})

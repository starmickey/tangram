import getCorners from "../components/utils/getCornersStrategy";
import PieceType from "../objects/enum/PieceType";

describe('get corners strategy tests', () => { 
  it('gets the corners of an centered unrotated triangle', () => {
    const width = 100;
    const height = 100;
    const x = 50;
    const y = 25;
    const typeId = PieceType.MTRIANGLE.getId();
    
    const corners = getCorners(typeId, width, height, x, y);

    expect(corners.length).toBe(3);

    expect(corners[0].getX()).toBe(x);
    expect(corners[0].getY()).toBe(y);
    expect(corners[1].getX()).toBe(x);
    expect(corners[1].getY()).toBe(y + height);
    expect(corners[2].getX()).toBe(x + width);
    expect(corners[2].getY()).toBe(y + height);
  });

  it('gets coordinates of a rotated square', () => {
    const width = 160;
    const height = 160;
    const x = 60;
    const y = 30
    const a = 90;
    const typeId = PieceType.SQUARE.getId();

    const corners = getCorners(typeId, width, height, x, y, a);
    
    expect(corners.length).toBe(4);
    expect(corners[0].getX()).toBe(x);
    expect(corners[0].getY()).toBe(y + height);
    expect(corners[1].getX()).toBe(x + width);
    expect(corners[1].getY()).toBe(y + height);
    expect(corners[2].getX()).toBe(x + width);
    expect(corners[2].getY()).toBe(y);
    expect(corners[3].getX()).toBe(x);
    expect(corners[3].getY()).toBe(y);
  });
 })
import getPiecesSet from "../components/utils/getPiecesSet";

describe('generate pieces', () => {
  it('generates pieces', () => {
    const piecesSet = getPiecesSet();
    expect(piecesSet).toBeDefined();
    expect(piecesSet.length).toBe(7);
    expect(piecesSet[1].typeId).toBeGreaterThanOrEqual(0);
  });
})
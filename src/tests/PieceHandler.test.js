import PieceHandler from "../controllers/PieceHandler";

describe('Piece Handler', () => { 
  it('gets pieces DTOs', () => {
    const piece = [{id: 0, type: 0, x: 0, y: 0, a: 0}]
    const g = new PieceHandler(piece)
    const piecesDTO = g.getPiecesDTOs()[0];

    expect(piecesDTO.id).toBe(0);
  });
 })
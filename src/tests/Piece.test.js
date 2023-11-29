import renderer from 'react-test-renderer';
import Piece from '../components/game/Piece';
import PieceType from '../components/game/PieceType';


it('renders Piece', () => {
    const piece = renderer.create(
        <Piece
            type={PieceType.STRIANGLE}
            left="20rem"
            right="32rem"
         />
    );
    let tree = piece.toJSON();
    expect(tree).toMatchSnapshot();
})

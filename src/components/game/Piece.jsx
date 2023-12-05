import PropTypes from "prop-types";
import PieceDTO from "../../controllers/PieceDTO";
import "../../styles/pieceType.css";

function Piece({ piece }) {
  const style = {
    cursor: "grab",
    rotate: `${piece.a}deg`,
    height: `${piece.height}px`,
    width: `${piece.width}px`,
    left: `${piece.x - piece.width / 2}px`,
    top: `${piece.y - piece.height / 2}px`,
  };

  return (
    <div>
      <img
        src={piece.src}
        className="piece"
        style={style}
        alt=""
      />
    </div>
  );
}

Piece.propTypes = {
  piece: PropTypes.instanceOf(PieceDTO).isRequired,
};

export default Piece;

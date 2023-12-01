import PropTypes from "prop-types";
import "../../styles/pieceType.css";

function Piece({ piece }) {
  const [x, y, a] = [piece.x, piece.y, piece.a];
  const { src, height, width } = piece.type;
  const style = {
    cursor: "grab",
    rotate: `${a}deg`,
    height: `${height}px`,
    width: `${width}px`,
    left: `${x - width / 2}px`,
    top: `${y - height / 2}px`,
  };

  return (
    <div>
      <img
        src={src}
        className="piece"
        style={style}
        alt=""
      />
    </div>
  );
}

Piece.propTypes = {
  piece: PropTypes.shape({
    type: PropTypes.shape({
      src: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
    }).isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    a: PropTypes.number,
  }).isRequired,
};

export default Piece;

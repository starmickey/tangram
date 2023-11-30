import PropTypes from "prop-types";
import "../../styles/pieceType.css";

function Piece({ type, x, y }) {
  const { src, height, width } = type;

  const style = {
    cursor: "grab",
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
  type: PropTypes.shape({
    src: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

Piece.defaultProps = {
  x: 500,
  y: 500,
};

export default Piece;

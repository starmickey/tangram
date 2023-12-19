import PropTypes from "prop-types";
import PieceType from "../../objects/enum/PieceType";
import Rectangle from "../pieces/Rectangle";
import Triangle from "../pieces/Triangle";
import Parallelogram from "../pieces/Parallelogram";
import PieceDTO from "../../objects/dto/PieceDTO";

/* eslint-disable react/jsx-props-no-spreading */

/**
 * Render a component according to piece type attribute
 * and pass its parameters to it
 * @param {PieceDTO} piece - React Hook for updating the piece
 * if it changes
 * @param {bool} isDragging - React Hook that children will
 * to enable onDrag styles when it is being dragged
 * @param {Object} handlers - package of event handlers to
 * overrite default ones
 * @param {Object} styles - package of styles, such as colors
 * to customize the figure format
 */

function PieceComponent({
  piece,
  isDragging,
  handlers,
  styles,
}) {
  const { typeId } = piece;

  const props = {
    piece,
    isDragging,
    handlers,
    styles,
  };

  switch (typeId) {
    case PieceType.SQUARE.id:
      return <Rectangle {...props} />;
    case PieceType.STRIANGLE.id:
    case PieceType.MTRIANGLE.id:
    case PieceType.LTRIANGLE.id:
      return <Triangle {...props} />;
    case PieceType.PARALLELOGRAM.id:
      return <Parallelogram {...props} />;
    default:
      throw new Error(`piece type ${typeId} unknown`);
  }
}

PieceComponent.defaultProps = {
  isDragging: false,
  handlers: PropTypes.shape({
    handleDragStart: () => {},
    handleDragEnd: () => {},
    handleClick: () => {},
  }),
  styles: PropTypes.shape({
    fill: "#00D2FF",
    stroke: ":#000000",
    strokeWidth: 0.1,
    shadowOffset: 0.5,
    shadowOffsetOnDrag: 1,
    shadowBlur: 3,
    shadowBlurOnDrag: 5,
    scaleOnDrag: 1.05,
  }),
};

PieceComponent.propTypes = {
  piece: PropTypes.instanceOf(PieceDTO).isRequired,
  isDragging: PropTypes.bool,
  handlers: PropTypes.shape({
    handleDragStart: PropTypes.func,
    handleDragEnd: PropTypes.func,
    handleClick: PropTypes.func,
  }),
  styles: PropTypes.shape({
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
    shadowOffset: PropTypes.number,
    shadowOffsetOnDrag: PropTypes.number,
    shadowBlur: PropTypes.number,
    shadowBlurOnDrag: PropTypes.number,
    scaleOnDrag: PropTypes.number,
  }),
};

export default PieceComponent;

import { Rect } from "react-konva";
import PropTypes from "prop-types";
import PieceDTO from "../../objects/dto/PieceDTO";

/**
 * Renders a interactiv rectangle
 * @param {PieceDTO} piece - actual piece status
 * @param {bool} isDragging - react hook which keeps if the
 * piece is being dragged
 * @param {Object} handlers - package with event handlers
 * @param {Object} styles - customizable shape styles
 */

function Rectangle({
  piece,
  isDragging,
  handlers,
  styles,
}) {
  return (
    <Rect
      // position
      x={piece.x}
      y={piece.y}
      rotation={piece.a}
      // dimensions
      width={piece.width}
      height={piece.height}
      // events handling
      draggable
      onDragStart={handlers.handleDragStart}
      onDragEnd={handlers.handleDragEnd}
      onClick={handlers.handleClick}
      // format
      fill={styles.fill}
      stroke={styles.stroke}
      strokeWidth={styles.strokeWidth}
      // ensure it rotates around its center
      offsetX={piece.width / 2}
      offsetY={piece.height / 2}
      // shadow
      shadowOffsetX={
        isDragging
          ? styles.shadowOffset
          : styles.shadowOffsetOnDrag
      }
      shadowOffsetY={
        isDragging
          ? styles.shadowOffset
          : styles.shadowOffsetOnDrag
      }
      shadowBlur={
        isDragging
          ? styles.shadowBlur
          : styles.shadowBlurOnDrag
      }
      // scale on drag
      scaleX={
        isDragging
          ? styles.scaleOnDrag
          : 1
      }
      scaleY={
        isDragging
          ? styles.scaleOnDrag
          : 1
      }
    />
  );
}

Rectangle.propTypes = {
  piece: PropTypes.instanceOf(PieceDTO).isRequired,
  isDragging: PropTypes.bool.isRequired,
  handlers: PropTypes.shape({
    handleDragStart: PropTypes.func.isRequired,
    handleDragEnd: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
  }).isRequired,
  styles: PropTypes.shape({
    fill: PropTypes.string,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
    shadowOffset: PropTypes.number,
    shadowOffsetOnDrag: PropTypes.number,
    shadowBlur: PropTypes.number,
    shadowBlurOnDrag: PropTypes.number,
    scaleOnDrag: PropTypes.number,
  }).isRequired,
};

export default Rectangle;

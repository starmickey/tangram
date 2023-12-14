import { Shape } from "react-konva";
import PropTypes from "prop-types";
import PieceDTO from "../../objects/dto/PieceDTO";

function Parallelogram({
  piece,
  isDragging,
  handleDragStart,
  handleDragEnd,
  handleClick,
}) {
  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(piece.width * (2 / 3), 0);
        context.lineTo(piece.width, piece.height);
        context.lineTo(piece.width * (1 / 3), piece.height);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      // position
      x={piece.x}
      y={piece.y}
      rotation={piece.a}
      // dimensions
      width={piece.width}
      height={piece.height}
      // events handling
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      // format
      fill="#00D2FF"
      stroke="#000000"
      strokeWidth={0.1}
      // ensure it rotates around its center
      offsetX={piece.width / 2}
      offsetY={piece.height / 2}
      // it moves to front on drag
      zIndex={isDragging ? 6 : 0}
      // shadow
      shadowOffsetX={isDragging ? 1 : 0.5}
      shadowOffsetY={isDragging ? 1 : 0.5}
      shadowBlur={isDragging ? 5 : 3}
      // scale on drag
      scaleX={isDragging ? 1.05 : 1}
      scaleY={isDragging ? 1.05 : 1}
    />
  );
}

Parallelogram.propTypes = {
  piece: PropTypes.instanceOf(PieceDTO).isRequired,
  isDragging: PropTypes.bool.isRequired,
  handleDragStart: PropTypes.func.isRequired,
  handleDragEnd: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Parallelogram;

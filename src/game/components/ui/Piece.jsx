import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { Shape } from "react-konva";
import getCorners from "../utils/getCornersStrategy";
import { useScaleState } from "../../contexts/StageContext";

/**
 * React component that displace a "piece",
 * which is a geometric figure
 */
function Piece({
  typeId,
  width,
  height,
  x,
  y,
  a,
  fill,
  stroke,
  strokeWidth,
  shadowOffset,
  shadowBlur,
  scale,
  draggable = false,
  handleDragStart,
  handleDragEnd,
  handleDragBound,
  handleClick,
}) {
  // Position hook. We need it because the piece may be draggable
  // Also, events may update the position.
  const [position, setPosition] = useState({ x, y, a });
  // Piece reference for accesing attributes after dragging
  const pieceRef = useRef();

  // Get context for piece styling
  const contextScale = useScaleState();

  // Auxiliary functions for piece handling
  const getPosition = () => ({
    x: pieceRef.current.x(),
    y: pieceRef.current.y(),
    a: pieceRef.current.rotation(),
  });

  return (
    <Shape
      // Draw the piece
      sceneFunc={(context, shape) => {
        const corners = getCorners(
          typeId,
          width,
          height,
        );
        const lastCorner = corners[corners.length - 1];
        context.beginPath();
        context.moveTo(lastCorner.x, lastCorner.y);
        corners.forEach((c) => {
          const { x: cx, y: cy } = c.getPosition();
          context.lineTo(cx, cy);
        });
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      // Position
      x={position.x}
      y={position.y}
      rotation={position.a}
      // Dimensions
      width={width}
      height={height}
      // Format
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      // Ensure it rotates around its center
      offsetX={width / 2}
      offsetY={height / 2}
      // Shadow
      shadowOffsetX={shadowOffset}
      shadowOffsetY={shadowOffset}
      shadowBlur={shadowBlur}
      // Scale
      scaleX={contextScale * scale}
      scaleY={contextScale * scale}
      // Set if its draggable
      draggable={draggable}
      // Event handlers
      onClick={
        draggable
          ? () => {
            const newPos = getPosition();
            setPosition(newPos);
            handleClick(newPos, setPosition);
          }
          : null
      }
      dragBoundFunc={
        draggable
          ? (pos) => {
            // Get the piece dimensions
            const { width: pieceWidth, height: pieceHeight } = pieceRef.current.getClientRect();
            // Get position after handling dragging bounds
            const dim = { width: pieceWidth, height: pieceHeight };
            const newPos = handleDragBound(pos, dim);
            return newPos;
          }
          : null
      }
      onDragStart={
        draggable
          ? () => handleDragStart(position, setPosition)
          : null
      }
      onDragEnd={
        draggable
          ? () => {
            const newPos = getPosition();
            setPosition(newPos);
            handleDragEnd(newPos, setPosition);
          }
          : null
      }
      ref={pieceRef}
    />
  );
}

Piece.defaultProps = {
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  a: 0,
  fill: "#000000",
  stroke: "#000000",
  strokeWidth: 0.1,
  shadowOffset: 0,
  shadowBlur: 0,
  scale: 1,
  draggable: false,
  handleDragStart: () => { },
  handleDragEnd: () => { },
  handleDragBound: () => { },
  handleClick: () => { },
};

Piece.propTypes = {
  typeId: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  a: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  shadowOffset: PropTypes.number,
  shadowBlur: PropTypes.number,
  scale: PropTypes.number,
  draggable: PropTypes.bool,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleDragBound: PropTypes.func,
  handleClick: PropTypes.func,
};

export default Piece;

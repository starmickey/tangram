import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Piece from "./Piece";

/**
 * Piece that enables dragging functionality and styles
 */
function DraggablePiece({
  typeId,
  width,
  height,
  x,
  y,
  a,
  fill,
  handleDragStart,
  handleDragEnd,
  handleDragBound,
  handleClick,
}) {
  // Hook for checking if its dragging
  const [isDragging, setIsDragging] = useState(false);

  // Create custom styles
  const styles = {
    fill,
    shadowOffset: 0.5,
    shadowBlur: 3,
    shadowOffsetOnDrag: 1,
    shadowBlurOnDrag: 5,
    scaleOnDrag: 1.05,
  };

  // Effect hook to prevent the default dragover behavior.
  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
    };
    document.addEventListener("dragover", handleDragOver, false);
    return () => {
      document.removeEventListener("dragover", handleDragOver, false);
    };
  }, []); // Cleanup on unmount

  return (
    <Piece
      // PieceType
      typeId={typeId}
      // Dimensions
      width={width}
      height={height}
      // Position
      x={x}
      y={y}
      a={a}
      // Event handling
      draggable
      handleDragBound={(pos, dim) => handleDragBound(pos, dim)}
      handleDragStart={(pos, setPos) => {
        setIsDragging(true);
        handleDragStart(pos, setPos);
      }}
      handleDragEnd={(pos, setPos) => {
        if (isDragging) {
          handleDragEnd(pos, setPos);
        }
        setIsDragging(false);
      }}
      handleClick={(pos, setPos) => {
        if (!isDragging) {
          handleClick(pos, setPos);
          setIsDragging(false);
        }
      }}
      // Styles
      fill={styles.fill}
      shadowOffset={
        isDragging
          ? styles.shadowOffsetOnDrag
          : styles.shadowOffset
      }
      shadowBlur={
        isDragging
          ? styles.shadowBlurOnDrag
          : styles.shadowBlur
      }
      // Scale on drag
      scale={
        isDragging
          ? styles.scaleOnDrag
          : 1
      }
    />
  );
}

DraggablePiece.defaultProps = {
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  a: 0,
  fill: "#000000",
  handleDragStart: () => { },
  handleDragEnd: () => { },
  handleDragBound: () => { },
  handleClick: () => { },
};

DraggablePiece.propTypes = {
  typeId: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  a: PropTypes.number,
  fill: PropTypes.string,
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleDragBound: PropTypes.func,
  handleClick: PropTypes.func,
};

export default DraggablePiece;

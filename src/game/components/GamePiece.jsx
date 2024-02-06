import PropTypes from "prop-types";
import DraggablePiece from "./ui/DraggablePiece";
import PieceDTO from "../objects/dto/PieceDTO";
import PieceHandler from "./utils/PieceHandler";

/**
 * Interactive piece used in a tangram game.
 * It interacts with pieceHandler controller
 */
function GamePiece({
  pieceDTO,
  pieceHandler,
  handlePieceSolved,
}) {
  // Get piece data
  // Piece identifier
  const pieceId = pieceDTO.getId();
  // Coordinates and angle of the piece
  const startPosition = {
    x: pieceDTO.getX(),
    y: pieceDTO.getY(),
    a: pieceDTO.getA(),
  };
  // Dimension attributes
  const width = pieceDTO.getWidth();
  const height = pieceDTO.getHeight();
  // Piece type
  const typeId = pieceDTO.getTypeId();

  // Piece manipulation functions
  const setPosition = (position, setPositionHook) => {
    // Validate inputs
    if (
      typeof position.x !== "number"
      || typeof position.y !== "number"
      || typeof position.a !== "number"
    ) {
      throw new Error("arguments must be numbers");
    }

    // Update controllers and get valid position
    const { x: nx, y: ny, a: na } = position;
    const {
      x: px,
      y: py,
      a: pa,
      solved,
    } = pieceHandler.setPiecePosition(pieceId, nx, ny, na);
    // If piece was snapped to a solution hole, execute parent actions.
    if (solved) {
      handlePieceSolved();
    }

    // Rerender piece position
    setPositionHook({
      ...position, x: px, y: py, a: pa,
    });
  };

  // Event handling
  const handleDragBound = (pos, dim) => {
    // Validate inputs
    if (
      typeof pos.x !== "number"
      || typeof pos.y !== "number"
      || typeof dim.width !== "number"
      || typeof dim.height !== "number"
    ) {
      throw new Error("Invalid input parameters");
    }
    // Get position after appling bounds clamping
    return pieceHandler.getClampedPosition(
      pos.x,
      pos.y,
      dim.width,
      dim.height,
    );
  };

  const handleClick = (pos, setPos) => {
    // Validate inputs
    if (
      typeof pos.x !== "number"
      || typeof pos.y !== "number"
      || typeof pos.a !== "number"
    ) {
      throw new Error("position must be an object of numbers");
    }
    // Set new angle
    const newPos = { ...pos, a: pos.a + 45 };
    // Update hook for rerendering
    setPosition(newPos, setPos);
  };

  const handleDragEnd = (pos, setPos) => {
    // Validate inputs
    if (
      typeof pos.x !== "number"
      || typeof pos.y !== "number"
      || typeof pos.a !== "number"
    ) {
      throw new Error("position must be an object of numbers");
    }
    // Update hook for rerendering
    setPosition(pos, setPos);
  };

  return (
    <DraggablePiece
      // PieceType
      typeId={typeId}
      // Dimensions
      width={width}
      height={height}
      // Position at start
      x={startPosition.x}
      y={startPosition.y}
      a={startPosition.a}
      // Styles
      fill="#00D2FF"
      // Event handling
      handleClick={handleClick}
      handleDragEnd={handleDragEnd}
      handleDragBound={handleDragBound}
    />
  );
}

GamePiece.defaultProps = {
  handlePieceSolved: () => { },
};

GamePiece.propTypes = {
  pieceDTO: PropTypes.instanceOf(PieceDTO).isRequired,
  pieceHandler: PropTypes.instanceOf(PieceHandler).isRequired,
  handlePieceSolved: PropTypes.func,
};

export default GamePiece;

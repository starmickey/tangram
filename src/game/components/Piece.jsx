import PropTypes from "prop-types";
import { useState } from "react";
import GameHandler from "../controllers/GameHandler";
import useDragAndClick from "./utils/useDragAndClick";
import PieceComponent from "./utils/PieceComponent";
import "../styles/pieceType.css";

function Piece({ pieceId, gameHandler, handleGameChange }) {
  const [piece, setPiece] = useState(gameHandler.getPieceDTO(pieceId));

  const {
    isDragging,
    handleDragStart,
    handleDragEnd,
    handleClick,
  } = useDragAndClick(pieceId, setPiece, gameHandler, handleGameChange);

  return (
    <PieceComponent
      id={piece.id}
      type={piece.typeId}
      piece={piece}
      isDragging={isDragging}
      handleDragStart={handleDragStart}
      handleDragEnd={handleDragEnd}
      handleClick={handleClick}
    />
  );
}

Piece.propTypes = {
  pieceId: PropTypes.number.isRequired,
  gameHandler: PropTypes.instanceOf(GameHandler).isRequired,
  handleGameChange: PropTypes.func.isRequired,
};

export default Piece;

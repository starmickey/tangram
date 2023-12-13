import PropTypes from "prop-types";
import { useState } from "react";
import GameHandler from "../controllers/GameHandler";
import useDragAndClick from "./utils/useDragAndClick";
import "../styles/pieceType.css";

function Piece({ pieceId, gameHandler, handleGameChange }) {
  const [piece, setPiece] = useState(gameHandler.getPieceDTO(pieceId));

  const {
    handleDragStart,
    handleDragEnd,
    handleClick,
  } = useDragAndClick(pieceId, setPiece, gameHandler, handleGameChange);

  const style = {
    cursor: "grab",
    rotate: `${piece.a}deg`,
    height: `${piece.height}px`,
    width: `${piece.width}px`,
    left: `${piece.x - piece.width / 2}px`,
    top: `${piece.y - piece.height / 2}px`,
  };

  return (
    <img
      draggable
      role="none"
      src={piece.src}
      className="piece"
      style={style}
      alt=""
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    />
  );
}

Piece.propTypes = {
  pieceId: PropTypes.number.isRequired,
  gameHandler: PropTypes.instanceOf(GameHandler).isRequired,
  handleGameChange: PropTypes.func.isRequired,
};

export default Piece;

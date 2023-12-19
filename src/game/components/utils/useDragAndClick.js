import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GameHandler from "../../controllers/GameHandler";
import { getClampedPosition, getGriddedPosition } from "./piecePosition";

function useDragAndClick(pieceId, setPiece, gameHandler, handleGameChange) {
  const [dragState, setDragState] = useState({
    isDragging: false,
    // Mouse position; used to measure displacement
    x: 0,
    y: 0,
  });

  const getPositionFromEvent = (e) => {
    // Get mouse position
    const { x, y } = e.target.position();
    // Get the stage dimensions
    const stageWidth = e.target.getStage().width();
    const stageHeight = e.target.getStage().height();
    // Get the target dimensions
    const targetWidth = e.target.width();
    const targetHeight = e.target.height();
    // Clamp position to keep it inside the stage
    const clampedPosition = getClampedPosition(
      x,
      y,
      targetWidth,
      targetHeight,
      stageWidth,
      stageHeight,
    );
    // Round position values to grid unit
    return getGriddedPosition(
      clampedPosition.x,
      clampedPosition.y,
    );
  };

  const handleDragStart = (e) => {
    const { x, y } = getPositionFromEvent(e);
    setDragState({ isDragging: true, x, y });
  };

  const handleDragEnd = (e) => {
    if (dragState.isDragging) {
      // Clamp position to keep it inside the stage
      const { x, y } = getPositionFromEvent(e);
      // Get mouse displacement since drag start
      const diffX = x - dragState.x;
      const diffY = y - dragState.y;
      // Update controller state
      gameHandler.movePiece(pieceId, diffX, diffY);
      // Rerender piece
      const pieceDTO = gameHandler.getPieceDTO(pieceId);
      e.target.position({ x: pieceDTO.x, y: pieceDTO.y });
      e.target.getLayer().batchDraw();
      // parent component actions
      handleGameChange();
    }
    setDragState({
      ...dragState,
      isDragging: false,
    });
  };

  const handleClick = () => {
    if (!dragState.isDragging) {
      // update controller state
      gameHandler.rotatePiece(pieceId, 45);
      // rerender piece
      const pieceDTO = gameHandler.getPieceDTO(pieceId);
      setPiece(pieceDTO);
      // parent component actions
      handleGameChange();
    }
  };

  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
    };

    document.addEventListener("dragover", handleDragOver, false);

    return () => {
      document.removeEventListener("dragover", handleDragOver, false);
    };
  }, []); // Cleanup on unmount

  return {
    isDragging: dragState.isDragging,
    handleDragStart,
    handleDragEnd,
    handleClick,
  };
}

useDragAndClick.propTypes = {
  pieceId: PropTypes.number.isRequired,
  setPiece: PropTypes.func.isRequired,
  gameHandler: PropTypes.instanceOf(GameHandler).isRequired,
  handleGameChange: PropTypes.func.isRequired,
};

export default useDragAndClick;

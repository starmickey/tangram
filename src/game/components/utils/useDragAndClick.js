import { useState, useEffect } from "react";
import GameHandler from "../../controllers/GameHandler";
import { getClampedPosition, getSolutionPieceToSnap } from "./pieceMovement";
import { useStageDimensions } from "../../contexts/StageContext";

/**
 * Create all the necesary functions to enable
 * piece interactivity to mouse events
 * @param {number} pieceId - the piece unique identifier
 * @param {func} setPiece - React Hook updater of the piece state.
 * It is used to enfore piece rerendering.
 * @param {GameHandler} gameHandler - used to update the gameHandler
 * state if the piece state changes
 * @param {func} handleGameChange - lets to change the game state
 * if necessary. For example, it would be used if the last piece
 * was dragged to the right position, solving the whole puzzle.
 * @returns {Object}
 */
function useDragAndClick(
  pieceId,
  pieceRef,
  setPiece,
  gameHandler,
  handleGameChange,
) {
  // Validate inputs
  if (!(gameHandler instanceof GameHandler)) {
    throw new Error("gameHandler must be an instance of GameHandler");
  }

  // Hook for checking if the mouse is dragging
  const [isDragging, setIsDragging] = useState(false);
  // Get the stage dimensions for clamping movements to keep the
  // pieces within it
  const stageDimensions = useStageDimensions();

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragBound = (position) => {
    // Calculate the boundaries based on the rotated figure's
    // position and dimensions
    const pieceClientRect = pieceRef.current.getClientRect();
    const pieceWidth = pieceClientRect.width;
    const pieceHeight = pieceClientRect.height;
    // Clamp the position within the stage boundaries
    const { x, y } = getClampedPosition(
      position.x,
      position.y,
      pieceWidth,
      pieceHeight,
      stageDimensions.width,
      stageDimensions.height,
    );
    return { x, y };
  };

  const handleDragEnd = () => {
    if (isDragging) {
      // Get the target position
      const x = pieceRef.current.x();
      const y = pieceRef.current.y();
      // If it's close to a position of the solution
      // snap the piece to it
      const pieceDTO = gameHandler.getPieceDTO(pieceId);
      pieceDTO.setPosition(x, y);
      const solutionDTO = gameHandler.getSolutionDTO();
      const spDTO = getSolutionPieceToSnap(pieceDTO, solutionDTO);

      if (spDTO !== null) {
        // snap piece to solution hole
        pieceRef.current.x(spDTO.x);
        pieceRef.current.y(spDTO.y);
        // Update controller state
        gameHandler.setPiecePosition(pieceId, spDTO.x, spDTO.y);
        gameHandler.markPieceAsSolved(pieceId);
      } else {
        // Update controller state
        gameHandler.setPiecePosition(pieceId, x, y);
      }

      // parent component actions
      handleGameChange();
    }
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging) {
      // Get the target rotation
      const a = pieceRef.current.rotation();
      // Get the new angle
      const newA = a + 45;
      // update controller state
      gameHandler.setPieceRotation(pieceId, newA);
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
  }, [handleGameChange]); // Cleanup on unmount

  return {
    isDragging,
    handleDragStart,
    handleDragBound,
    handleDragEnd,
    handleClick,
  };
}

export default useDragAndClick;

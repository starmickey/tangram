import { useState, useEffect } from "react";
// import GameHandler from "../../controllers/GameHandler";
import getClampedPosition from "./getClampedPosition";
// import { getSnappedToSolutionPosition, getSnappedToPiecesPosition } from "./snapPieces";
import { useStageDimensions } from "../../contexts/StageContext";

/**
 * Custom React Hook for enabling piece interactivity to mouse events.
 * @param {number} pieceId - The unique identifier of the piece.
 * @param {function} pieceRef - React Hook ref for the piece shape.
 * @param {function} setPiece - React Hook updater for the piece state,
 * used to enforce piece re-rendering.
 * @param {GameHandler} gameHandler - Instance of the GameHandler used to update the game state.
 * @param {function} handleGameSolved - Function to change the game state if necessary.
 * @returns {Object} - Event handling functions and dragging state.
 * @throws {Error} If gameHandler is not an instance of GameHandler.
 */
function useDragAndClick(
  getPieceRect,
  getPiecePosition,
  setPiecePosition,
  getPieceSnapper,
  getPieceTypeId,
  markPieceAsSolved,
) {
  // Hook for checking if the mouse is dragging
  const [isDragging, setIsDragging] = useState(false);
  // Get the stage dimensions for clamping movements to keep the pieces within it
  const stageDimensions = useStageDimensions();
  /**
   * Event handler for drag start.
   */
  const handleDragStart = () => {
    setIsDragging(true);
  };

  /**
   * Event handler for drag bound, clamps the position within the stage boundaries.
   * @param {Object} position - Current position of the piece during dragging.
   * @returns {Object} - Clamped position {x, y}.
   */
  const handleDragBound = (position) => {
    // Calculate the boundaries based on the rotated figure's
    // position and dimensions
    const {
      width: pieceWidth,
      height: pieceHeight,
    } = getPieceRect();
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

  /**
   * Event handler for drag end, checks if the piece is close
   * to a solution hole and snaps it if so.
   */
  const handleDragEnd = () => {
    if (isDragging) {
      // Get the target position
      const { x, y, a } = getPiecePosition();
      // Get functions for piece snapping
      const pieceSnapper = getPieceSnapper();
      // Determine if its close to a position hole
      // And the position of it
      const typeId = getPieceTypeId();
      const ssp = pieceSnapper.getSnappedToSolutionPosition(typeId, x, y, a);
      // If piece was dragged, mark it as done
      if (ssp.snapped) {
        markPieceAsSolved();
      }
      // Update piece position
      setPiecePosition(ssp.x, ssp.y, a);
    }
    setIsDragging(false);
  };

  /**
   * Event handler for click, rotates the piece and checks
   * if it's close to a solution hole to snap it.
   */
  const handleClick = () => {
    if (!isDragging) {
      // Get the target position
      const { x, y, a } = getPiecePosition();
      // Update controller and rerender
      setPiecePosition(x, y, a + 45);
    }
  };

  /**
   * Effect hook to prevent the default dragover behavior.
   */
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
    isDragging,
    handleDragStart,
    handleDragBound,
    handleDragEnd,
    handleClick,
  };
}

export default useDragAndClick;

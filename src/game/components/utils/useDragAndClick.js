import { useState, useEffect } from "react";
import GameHandler from "../../controllers/GameHandler";
import { getClampedPosition, getSolutionPieceToSnap } from "./pieceMovement";
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
  pieceId,
  pieceRef,
  setPiece,
  gameHandler,
  handleGameSolved,
) {
  // Validate inputs
  if (!(gameHandler instanceof GameHandler)) {
    throw new Error("gameHandler must be an instance of GameHandler");
  }

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

  /**
   * Event handler for drag end, checks if the piece is close
   * to a solution hole and snaps it if so.
   */
  const handleDragEnd = () => {
    if (isDragging) {
      // Get the target position
      const x = pieceRef.current.x();
      const y = pieceRef.current.y();
      // Determine if it's close to a position hole and, if so, which one
      const pieceDTO = gameHandler.getPieceDTO(pieceId);
      pieceDTO.setPosition(x, y);
      const solutionDTO = gameHandler.getSolutionDTO();
      const spDTO = getSolutionPieceToSnap(pieceDTO, solutionDTO);
      // If is close to a position hole, snap it to it
      if (spDTO !== null) {
        // snap piece to solution hole
        pieceRef.current.x(spDTO.x);
        pieceRef.current.y(spDTO.y);
        // Update controller with new position
        gameHandler.setPiecePosition(pieceId, spDTO.x, spDTO.y);
        // Tell controller that piece has been solved
        gameHandler.markPieceAsSolved(pieceId);
        // Check if game's been solved
        if (gameHandler.isGameSolved()) {
          // Rerender page
          handleGameSolved();
        }
      } else {
        // Update controller state
        gameHandler.setPiecePosition(pieceId, x, y);
      }
    }
    setIsDragging(false);
  };

  /**
   * Event handler for click, rotates the piece and checks
   * if it's close to a solution hole to snap it.
   */
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

      // Determine if it's close to a position hole and, if so, which one
      const solutionDTO = gameHandler.getSolutionDTO();
      const spDTO = getSolutionPieceToSnap(pieceDTO, solutionDTO);
      // If is close to a position hole, snap it to it
      if (spDTO !== null) {
        // snap piece to solution hole
        pieceRef.current.x(spDTO.x);
        pieceRef.current.y(spDTO.y);
        // Update controller with new position
        gameHandler.setPiecePosition(pieceId, spDTO.x, spDTO.y);
        // Tell controller that piece has been solved
        gameHandler.markPieceAsSolved(pieceId);
        // Check if game's been solved
        if (gameHandler.isGameSolved()) {
          // Rerender page
          handleGameSolved();
        }
      }
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
  }, [handleGameSolved]); // Cleanup on unmount

  return {
    isDragging,
    handleDragStart,
    handleDragBound,
    handleDragEnd,
    handleClick,
  };
}

export default useDragAndClick;

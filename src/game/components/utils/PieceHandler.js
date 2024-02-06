import GameHandler from "../../controllers/GameHandler";
import SolutionPieceDTO from "../../objects/dto/SolutionPieceDTO";

/**
 * Class meant to manage piece movement along the ui
 * and controller updating
 */
export default class PieceHandler {
  #gameHandler;
  #stageWidth;
  #stageHeight;

  /**
   * Handles piece movements.
   * @param {GameHandler} gameHandler - game controller. Its used to get
   * and update the status of the game.
   * @param {number} stageWidth - width of the area that will contain
   * the game. Used for clamping positions into it.
   * @param {number} stageHeight - height of the area that will contain
   * the game.
   * @throws {Error} If inputs are invalid.
   */
  constructor(gameHandler, stageWidth = 100, stageHeight = 100) {
    // Validate inputs
    if (!(gameHandler instanceof GameHandler)) {
      throw new Error("an instance of GameHandler must be provided");
    }
    if (
      typeof stageWidth !== "number"
      || typeof stageHeight !== "number"
      || stageWidth <= 0
      || stageHeight <= 0
    ) {
      throw new Error("stage dimensions must be numbers greater than zero");
    }

    // Assign attributes
    this.#stageWidth = stageWidth;
    this.#stageHeight = stageHeight;
    this.#gameHandler = gameHandler;
  }

  /**
   * Clamps the position within the specified container boundaries.
   * @param {number} x - X-coordinate of the position.
   * @param {number} y - Y-coordinate of the position.
   * @param {number} targetWidth - Width of the target object.
   * @param {number} targetHeight - Height of the target object.
   * @returns {Object} - Clamped position {x, y}.
   * @throws {Error} If input parameters are invalid.
   */
  getClampedPosition(
    x,
    y,
    targetWidth,
    targetHeight,
  ) {
    // Validate input parameters
    if (
      typeof x !== "number"
      || typeof y !== "number"
      || typeof targetWidth !== "number"
      || typeof targetHeight !== "number"
      || targetWidth < 0
      || targetHeight < 0
    ) {
      throw new Error("Invalid input parameters.");
    }
    // Calculate the allowed position range
    const minX = targetWidth / 2;
    const minY = targetHeight / 2;
    const maxX = this.#stageWidth - targetWidth / 2;
    const maxY = this.#stageHeight - targetHeight / 2;
    // Clamp the position within the stage boundaries
    const clampedX = Math.max(minX, Math.min(x, maxX));
    const clampedY = Math.max(minY, Math.min(y, maxY));
    return { x: clampedX, y: clampedY };
  }

  /**
   * Generates a random position within the container boundaries.
   * @param {number} targetWidth - Width of the target object.
   * @param {number} targetHeight - Height of the target object.
   * @returns {Object} - Random position {x, y}.
   * @throws {Error} If input parameters are invalid.
   */
  getRandomPosition(
    targetWidth,
    targetHeight,
  ) {
    // Validate input parameters
    if (
      typeof targetWidth !== "number"
      || typeof targetHeight !== "number"
      || targetWidth < 0
      || targetHeight < 0
    ) {
      throw new Error("Invalid input parameters");
    }
    // Get random positions within container limits
    const newX = Math.round(Math.random() * this.#stageWidth);
    const newY = Math.round(Math.random() * this.#stageHeight);
    const newA = Math.round(Math.round(Math.random() * (360 / 45)) * 45);
    // Clamp position to the container bounds
    const clampedPosition = this.getClampedPosition(
      newX,
      newY,
      targetWidth,
      targetHeight,
    );

    const { x, y } = clampedPosition;
    return { x, y, a: newA };
  }

  /**
   * Places the game pieces in random positions and
   * returns them.
   * @returns {ArrayOf(PieceDTO)}
   */
  getRandomPlacedPieces() {
    // Get controller's pieces
    const pieces = this.#gameHandler.getPiecesDTOs();

    pieces.forEach((piece) => {
      // Get random position
      const { x, y, a } = this.getRandomPosition(
        piece.getWidth(),
        piece.getHeight(),
      );
      // Update controllers
      this.#gameHandler.setPiecePosition(piece.getId(), x, y);
      this.#gameHandler.setPieceRotation(piece.getId(), a);
    });

    // Return controller state
    return this.#gameHandler.getPiecesDTOs();
  }

  /**
   * Determines if two points are close enough to snap
   * them together.
   * @param {number} x1 - X coordinate of the first point.
   * @param {number} y1 - Y coordinate of the first point.
   * @param {number} x2 - X coordinate of the second point.
   * @param {number} y2 - Y coordinate of the second point.
   * @returns {boolean} - True if the points are close enough to snap, false otherwise.
   */
  static #arePointsCloseToSnap(x1, y1, x2, y2) {
    // Validate inputs
    if (
      typeof x1 !== "number"
      || typeof x2 !== "number"
      || typeof y1 !== "number"
      || typeof y2 !== "number"
    ) {
      throw new Error("all the arguments must be numbers.");
    }

    // Get distance between points
    const dx = x1 - x2;
    const dy = y1 - y2;
    const sqrdist = dx ** 2 + dy ** 2;

    // Determine if they are close to each other
    const MAX_DISTANCE = 500;
    return sqrdist < MAX_DISTANCE;
  }

  /**
   * Determines if a piece is snappable to a solution piece hole.
   * @param {number} typeId - id of the piece to snap.
   * @param {number} x - X-coordinate of the position of the piece.
   * @param {number} y - Y-coordinate of the position of the piece.
   * @param {number} a - angle of rotation of the piece.
   * @returns {Object} - resulting position of the piece after snapping.
   * If the piece wasn't snappable, returns the original position.
   */
  getSnappedToSolutionPosition(typeId, x, y, a) {
    // Validate inputs
    if (
      typeof typeId !== "number"
      || typeof x !== "number"
      || typeof y !== "number"
      || typeof a !== "number"
    ) {
      throw new Error("arguments must be numbers");
    }

    // Get solution pieces to compare width
    const solution = this.#gameHandler.getSolutionDTO();
    const solutionPieces = solution.getPieces();

    // Find the snappable piece
    const snappablePiece = solutionPieces.find((sp) => (
      sp.getTypeId() === typeId
      && sp.getA() === a
      && PieceHandler.#arePointsCloseToSnap(
        sp.getX(),
        sp.getY(),
        x,
        y,
      )
    ));

    // If it was found, return the position of the snappable piece.
    if (snappablePiece instanceof SolutionPieceDTO) {
      return {
        x: snappablePiece.getX(),
        y: snappablePiece.getY(),
        snapped: true,
      };
    }

    // Otherwise, return the original position
    return {
      x,
      y,
      snapped: false,
    };
  }

  /**
   * Gets a valid position for the piece, updates controllers with it,
   * and so, updates game status, and returns this valid position.
   * @param {number} pieceId - Piece unique id.
   * @param {number} x - X-coordinate of the piece new position.
   * @param {number} y - Y-coordinate of the piece new position.
   * @param {number} a - Angle of rotation of the piece new position.
   * @returns {Object} - new position and if its snapped.
   */
  setPiecePosition(pieceId, x, y, a) {
    // Validate inputs
    if (
      typeof pieceId !== "number"
      || typeof x !== "number"
      || typeof y !== "number"
      || typeof a !== "number"
    ) {
      throw new Error("arguments must be numbers");
    }

    // Get piece data
    const piece = this.#gameHandler.getPieceDTO(pieceId);
    const pieceWidth = piece.getWidth();
    const pieceHeight = piece.getHeight();
    const typeId = piece.getTypeId();

    // Clamp position
    const clampedPosition = this.getClampedPosition(x, y, pieceWidth, pieceHeight);

    // Check if its close to a solution hole and if so, snap it to it
    const {
      x: newX,
      y: newY,
      snapped,
    } = this.getSnappedToSolutionPosition(typeId, clampedPosition.x, clampedPosition.y, a);
    // Update in controller status whether if piece was solved or not.
    this.#gameHandler.setPieceIsSolved(pieceId, snapped);

    // Update controller
    this.#gameHandler.setPiecePosition(
      pieceId,
      newX,
      newY,
    );
    this.#gameHandler.setPieceRotation(pieceId, a);
    // Get controller current position
    const newPiece = this.#gameHandler.getPieceDTO(pieceId);
    return {
      x: newPiece.getX(),
      y: newPiece.getY(),
      a: newPiece.getA(),
      solved: snapped,
    };
  }
}

import PropTypes from "prop-types";
import PlayingArea, { getStageDimensions } from "../../components/ui/PlayingArea";
import GameHandler from "../../controllers/GameHandler";
import GamePiece from "../../components/GamePiece";
import "../../styles/game.css";
import SolutionPiece from "../../components/SolutionPiece";
import PieceHandler from "../../components/utils/PieceHandler";

/**
 * Set the window displayed when we are playing
 * @param {func} setGameState - set parent state
 * @returns {div}
 */
function PlayingPage({ handleGameSolved }) {
  // Set PlayingArea dimensions
  const playingAreaDimensions = {
    percentageWidth: 0.8,
    percentageHeight: 0.8,
  };

  // Get stage dimensions
  const {
    width: stageWidth,
    height: stageHeight,
  } = getStageDimensions(
    playingAreaDimensions.percentageWidth,
    playingAreaDimensions.percentageHeight,
  );
  // Create game controller
  const gameHandler = new GameHandler();
  // Create controller for piece movement
  const pieceHandler = new PieceHandler(
    gameHandler,
    stageWidth,
    stageHeight,
  );

  // Get pieces set
  const pieces = pieceHandler.getRandomPlacedPieces();
  // Get the solution DTO
  const solutionDTO = gameHandler.getSolutionDTO();
  // Get solution pieces
  const solutionPiecesDTOs = solutionDTO.getPieces();

  // Actions that children will execute when a piece is
  // placed on its corresponding solution hole
  const handlePieceSolved = () => {
    if (gameHandler.isGameSolved()) {
      handleGameSolved();
    }
  };

  return (
    <div className="playing-area-container">
      <PlayingArea
        percentageWidth={playingAreaDimensions.percentageWidth}
        percentageHeight={playingAreaDimensions.percentageHeight}
      >
        {solutionPiecesDTOs.map((solutionPiece) => (
          <SolutionPiece
            key={solutionPiece.getId()}
            solutionPieceDTO={solutionPiece}
          />
        ))}
        {pieces.map((piece) => (
          <GamePiece
            key={piece.getId()}
            pieceDTO={piece}
            pieceHandler={pieceHandler}
            handlePieceSolved={handlePieceSolved}
          />
        ))}
      </PlayingArea>
    </div>
  );
}

PlayingPage.defaultProps = {
  handleGameSolved: () => { },
};

PlayingPage.propTypes = {
  handleGameSolved: PropTypes.func,
};

export default PlayingPage;

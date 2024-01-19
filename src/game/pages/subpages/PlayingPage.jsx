import PropTypes from "prop-types";
import PlayingArea from "../../components/PlayingArea";
import GameState from "../../objects/enum/GameState";
import GameHandler from "../../controllers/GameHandler";

/**
 * Set the window displayed when we are playing
 * @param {func} setGameState - set parent state
 * @returns {div}
 */
function PlayingPage({ setGameState }) {
  // Create game controller
  const gameHandler = new GameHandler();

  // Function for rerendering the page when puzzle is solved
  const handleGameSolved = () => {
    setGameState(GameState.WIN);
  };

  return (
    <div className="playing-area-container">
      <PlayingArea
        percentageWidth={0.8}
        percentageHeight={0.8}
        gameHandler={gameHandler}
        handleGameSolved={handleGameSolved}
      />
    </div>
  );
}

PlayingPage.propTypes = {
  setGameState: PropTypes.func.isRequired,
};

export default PlayingPage;

import PropTypes from "prop-types";
import PlayingArea from "../../components/PlayingArea";
import GameState from "../../objects/enum/GameState";

/**
 * Set the window displayed when we are playing
 * @param {GameState} gameState - get parent state
 * @param {func} setGameState - set parent state
 * @returns {div}
 */
function PlayingPage({ gameState, setGameState }) {
  return (
    <div className="playing-area-container">
      <PlayingArea
        percentageWidth={0.8}
        percentageHeight={0.8}
        gameState={gameState}
        setGameState={setGameState}
      />
    </div>
  );
}

PlayingPage.propTypes = {
  gameState: PropTypes.instanceOf(GameState).isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default PlayingPage;

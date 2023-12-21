import PropTypes from "prop-types";
import PlayingArea from "../../components/PlayingArea";
import GameState from "../../objects/enum/GameState";

function PlayingPage({ gameState, setGameState }) {
  return (
    <div className="playing-area-container">
      <PlayingArea
        pwidth={0.8}
        pheight={0.8}
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

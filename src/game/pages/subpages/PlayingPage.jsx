import PropTypes from "prop-types";
import PlayingArea from "../../components/PlayingArea";

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
  gameState: PropTypes.number.isRequired,
  setGameState: PropTypes.func.isRequired,
};

export default PlayingPage;

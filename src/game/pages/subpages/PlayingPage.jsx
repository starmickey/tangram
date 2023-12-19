import PropTypes from "prop-types";
import PlayingArea from "../../components/PlayingArea";

function PlayingPage({ state, setState }) {
  return (
    <div className="playing-area-container">
      <PlayingArea
        pwidth={0.8}
        pheight={0.8}
        state={state}
        setState={setState}
      />
    </div>
  );
}

PlayingPage.propTypes = {
  state: PropTypes.number.isRequired,
  setState: PropTypes.func.isRequired,
};

export default PlayingPage;

import PropTypes from "prop-types";
import { useMemo } from "react";
import { Stage, Layer } from "react-konva";
import { StageDimensionsCtx } from "../../contexts/StageContext";

/**
 * Gets the dimensions of the stage to be constructed in pixels.
 * @param {number} percentageWidth - percentual value of the stage
 * width respecting to the window width.
 * @param {number} percentageHeight - percentual value of the stage
 * height respecting to the window width.
 * @throws {Error} If inputs are invalid.
 * @returns {Object} - width and height of the stage.
 */
export function getStageDimensions(percentageWidth, percentageHeight) {
  // Validate inputs
  if (
    typeof percentageWidth !== "number"
    || percentageWidth < 0
    || percentageWidth > 1
    || typeof percentageHeight !== "number"
    || percentageHeight < 0
    || percentageHeight > 1
  ) {
    throw new Error("arguments must be numbers between 0 and 1.");
  }

  return ({
    width: window.innerWidth * percentageWidth,
    height: window.innerHeight * percentageHeight,
  });
}

/**
 * React component of area that can contain game pieces.
 */
function PlayingArea({
  percentageWidth,
  percentageHeight,
  children,
}) {
  // Validate inputs
  if (
    percentageWidth < 0
    || percentageWidth > 1
    || percentageHeight < 0
    || percentageHeight > 1
  ) {
    throw new Error("arguments must be numbers between 0 and 1.");
  }
  // Calculate stage dimensions in pixels
  const {
    width: swidth,
    height: sheight,
  } = getStageDimensions(percentageWidth, percentageHeight);
  // Create context values
  const stageWidth = useMemo(() => (swidth), []);
  const stageHeight = useMemo(() => (sheight), []);
  // Create context object
  const stageDimensions = useMemo(() => ({
    width: swidth,
    height: sheight,
  }), []);

  // Get playing area styles
  const playingAreaStyle = {
    width: `${stageDimensions.width}px`,
    height: `${stageDimensions.height}px`,
  };

  // Create piece components
  return (
    <div className="playing-area" style={playingAreaStyle}>
      <StageDimensionsCtx.Provider value={stageDimensions}>
        <Stage width={stageWidth} height={stageHeight} id="stage">
          <Layer>
            {children}
          </Layer>
        </Stage>
      </StageDimensionsCtx.Provider>
    </div>
  );
}

PlayingArea.defaultProps = {
  percentageWidth: 1,
  percentageHeight: 1,
  children: null,
};

PlayingArea.propTypes = {
  percentageWidth: PropTypes.number,
  percentageHeight: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PlayingArea;

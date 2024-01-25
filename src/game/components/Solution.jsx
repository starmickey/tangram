import { Group, Shape } from "react-konva";
import PropTypes from "prop-types";
import SolutionDTO from "../objects/dto/SolutionDTO";
import getCorners from "./utils/getCornersStrategy";
import { useScaleState } from "../contexts/StageContext";

/**
 * Renders the solution shadow
 * @returns {Group} - a group of shapes
 */

function Solution({ solutionDTO }) {
  // Get scale from context
  const scale = useScaleState();

  const spDTOs = solutionDTO.getPieces();

  return (
    <Group>
      {spDTOs.map((sp) => (
        <Shape
          key={sp.getId()}
          sceneFunc={(context, shape) => {
            // Get points DTOs
            const corners = getCorners(
              sp.getTypeId(),
              sp.getWidth(),
              sp.getHeight(),
            );
            const lastCorner = corners[corners.length - 1];
            // Draw figure
            context.beginPath();
            context.moveTo(lastCorner.getX(), lastCorner.getY());
            corners.forEach((c) => {
              const { x, y } = c.getPosition();
              context.lineTo(x, y);
            });
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          // position
          x={sp.getX()}
          y={sp.getY()}
          rotation={sp.getA()}
          // dimensions
          width={sp.getWidth()}
          height={sp.getHeight()}
          // ensure it rotates around its center
          offsetX={sp.getWidth() / 2}
          offsetY={sp.getHeight() / 2}
          fill="grey"
          scale={{ x: scale, y: scale }}
        />
      ))}
    </Group>
  );
}

Solution.propTypes = {
  solutionDTO: PropTypes.instanceOf(SolutionDTO).isRequired,
};

export default Solution;

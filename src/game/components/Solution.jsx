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

  const spDTOs = solutionDTO.pieces;

  return (
    <Group>
      {spDTOs.map((sp) => (
        <Shape
          key={sp.id}
          sceneFunc={(context, shape) => {
            // Get points DTOs
            const corners = getCorners(
              sp.typeId,
              sp.width,
              sp.height,
            );
            const lastCorner = corners[corners.length - 1];
            // Draw figure
            context.beginPath();
            context.moveTo(lastCorner.x, lastCorner.y);
            corners.forEach((c) => {
              const { x, y } = c;
              context.lineTo(x, y);
            });
            context.closePath();
            context.fillStrokeShape(shape);
          }}
          // position
          x={sp.x}
          y={sp.y}
          rotation={sp.a}
          // dimensions
          width={sp.width}
          height={sp.height}
          // ensure it rotates around its center
          offsetX={sp.width / 2}
          offsetY={sp.height / 2}
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

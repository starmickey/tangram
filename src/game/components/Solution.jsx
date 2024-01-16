import { useContext } from "react";
import { Group, Shape } from "react-konva";
import SolutionHandler from "../controllers/SolutionHandler";
import getCorners from "./utils/getCornersStrategy";
// import { scale } from "./utils/constants";
import { ScaleContext } from "../contexts/ScaleContext";

/**
 * Renders the solution shadow
 * @returns {Group} - a group of shapes
 */

function Solution() {
  // Get scale from context
  const scale = useContext(ScaleContext);

  const solutionHandler = new SolutionHandler();
  const solutionDTO = solutionHandler.getSolutionDTO();
  const spDTOs = solutionDTO.pieces;

  return (
    <Group>
      {spDTOs.map((sp) => (
        <Shape
          key={sp.id}
          sceneFunc={(context, shape) => {
            // Get points DTOs
            const corners = getCorners(sp);
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

export default Solution;

import { Group, Shape } from "react-konva";
import SolutionHandler from "../controllers/SolutionHandler";
import getCorners from "./utils/getCornersStrategy";

/**
 * Renders the solution shadow
 * @returns {Group} - a group of shapes
 */

export default function Solution() {
  const solutionHandler = SolutionHandler.getDefaultSolution();
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
          x={sp.x}
          y={sp.y}
          a={sp.a}
          fill="grey"
        />
      ))}
    </Group>
  );
}

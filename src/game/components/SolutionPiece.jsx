import PropTypes from "prop-types";
import SolutionPieceDTO from "../objects/dto/SolutionPieceDTO";
import Piece from "./ui/Piece";

/**
 * Creates the shadow of a piece for creating the solution
 * silhouette.
 */
function SolutionPiece({ solutionPieceDTO }) {
  return (
    <Piece
      typeId={solutionPieceDTO.getTypeId()}
      width={solutionPieceDTO.getWidth()}
      height={solutionPieceDTO.getHeight()}
      x={solutionPieceDTO.getX()}
      y={solutionPieceDTO.getY()}
      a={solutionPieceDTO.getA()}
      fill="grey"
      strokeWidth={0}
    />
  );
}

SolutionPiece.propTypes = {
  solutionPieceDTO: PropTypes.instanceOf(SolutionPieceDTO).isRequired,
};

export default SolutionPiece;

import PropTypes from "prop-types";
import PieceType from "../../objects/enum/PieceType";
import Rectangle from "../pieces/Rectangle";
import Triangle from "../pieces/Triangle";
import Parallelogram from "../pieces/Parallelogram";

/* eslint-disable react/jsx-props-no-spreading */

function PieceComponent({ type, ...props }) {
  switch (type) {
    case PieceType.SQUARE.id:
      return <Rectangle {...props} />;
    case PieceType.STRIANGLE.id:
    case PieceType.MTRIANGLE.id:
    case PieceType.LTRIANGLE.id:
      return <Triangle {...props} />;
    case PieceType.PARALLELOGRAM.id:
      return <Parallelogram {...props} />;
    default:
      throw new Error(`piece type ${type} unknown`);
  }
}

PieceComponent.propTypes = {
  type: PropTypes.number.isRequired,
};

export default PieceComponent;

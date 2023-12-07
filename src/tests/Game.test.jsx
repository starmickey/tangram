import { render } from "@testing-library/react";
import Game from "../components/game/Game";

describe('Game component', () => { 
  it('renders', () => {
    render(<Game />);
  });
 })
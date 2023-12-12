import { render } from "@testing-library/react";
import Game from "../components/game/Game";

describe('Game component', () => { 
  it('renders', () => {
    function setState () {}

    render(<Game setState={setState}/>);
  });
 })
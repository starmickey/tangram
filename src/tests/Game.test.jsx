import { render } from "@testing-library/react";
import Game from "../components/game/Game";

describe("Game", () => {
  it("renders Game component", () => {
    render(<Game />);
  });
});

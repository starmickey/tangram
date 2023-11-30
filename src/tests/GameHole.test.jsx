import { render, screen } from "@testing-library/react";
import GameHole from "../components/game/GameHole";

describe("GameHole", () => {
  it("renders GameHole component", () => {
    render(<GameHole />);
  });

  it("creates images", () => {
    render(<GameHole />);
    expect(screen.getAllByRole("img")[0]).toBeInTheDocument();
  });
});

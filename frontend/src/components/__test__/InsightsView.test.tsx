import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import InsightsView from "../insights/InsightsView";

describe("InsightsView component", () => {
  it("filtering the goals when user types something in search", async () => {
    const user = userEvent.setup();
    const goals = [
      { text: "Learn React", createdAt: "2026-01-31T10:00:00Z" },
      { text: "Buy milk", createdAt: "2026-01-30T10:00:00Z" },
    ];
    render(<InsightsView goals={goals} />);
    //search input
    const input = screen.getByLabelText("Search"); // this was the reason for adding aria label but it is also good for accesability
    await user.clear(input);
    await user.type(input, "react");

    const totalGoalsTitle = screen.getByText("Total Goals");
    const totalCard = totalGoalsTitle.closest("div");

    expect(totalCard).toBeTruthy();
    expect(within(totalCard as HTMLElement).getByText("1")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatsCard from "../insights/StatsCard";

describe("statsCard", () => {
  it("render title and value", () => {
    render(<StatsCard title="Total Goals" value={12} />);
    expect(screen.getByText("Total Goals")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });
  it("renders hint when provide", () => {
    render(<StatsCard title="Avg" value={3} hint="Last 7 days" />);
    expect(screen.getByText("Last 7 days")).toBeInTheDocument();
  });
  it("does not render hint when not provide", () => {
    render(<StatsCard title="Avg" value={3} />);
    expect(screen.queryByText("Last 7 days")).not.toBeInTheDocument();
  });
});

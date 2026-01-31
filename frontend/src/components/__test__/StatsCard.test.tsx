import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatsCard from "../insights/StatsCard";

describe("statsCard", () => {
  it("render title and value", () => {
    render(<StatsCard title="Total Goals" value={12} />);
    expect(screen.getByText("Total Goals")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });
});

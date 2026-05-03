import { KpiTile } from "@/components/kpi-tile";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("KpiTile", () => {
  it("renders prefix, suffix, and label", () => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        disconnect() {}
        unobserve() {}
      },
    );
    render(<KpiTile value={200} prefix="$" suffix="K" label="Annual savings" />);
    expect(screen.getByText("Annual savings")).toBeInTheDocument();
  });
});

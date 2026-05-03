import { LiveLocalTime } from "@/components/hero/live-local-time";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("LiveLocalTime", () => {
  it("renders the SSR initial value before hydration update", () => {
    render(<LiveLocalTime initial="14:32" />);
    expect(screen.getByText(/\d{2}:\d{2}/)).toBeInTheDocument();
  });
});

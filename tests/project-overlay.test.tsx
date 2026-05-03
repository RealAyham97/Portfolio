import { ProjectOverlay } from "@/components/work/project-overlay";
import type { Project } from "@/content/projects";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const project: Project = {
  slug: "x",
  title: "Test Project",
  status: "shipped",
  summary: "s",
  description: "d",
  stack: ["SQL"],
};

describe("ProjectOverlay", () => {
  it("renders title and calls onClose on close button click", () => {
    const onClose = vi.fn();
    render(<ProjectOverlay project={project} onClose={onClose} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Close"));
    expect(onClose).toHaveBeenCalled();
  });
});

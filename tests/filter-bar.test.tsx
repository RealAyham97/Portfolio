import { describe, expect, it } from "vitest";
import { matchesFilter } from "@/components/work/filter-bar";

describe("matchesFilter", () => {
  it("All passes everything", () => {
    expect(matchesFilter(["SQL"], "All")).toBe(true);
    expect(matchesFilter([], "All")).toBe(true);
  });
  it("matches case-insensitively on substring", () => {
    expect(matchesFilter(["Python", "Scikit-learn"], "Python")).toBe(true);
    expect(matchesFilter(["Palantir Foundry"], "Foundry")).toBe(true);
    expect(matchesFilter(["Power BI"], "Power BI")).toBe(true);
  });
  it("returns false when nothing matches", () => {
    expect(matchesFilter(["Figma"], "Python")).toBe(false);
  });
});

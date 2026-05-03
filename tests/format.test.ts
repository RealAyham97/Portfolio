import { describe, expect, it } from "vitest";
import { formatAmmanTime } from "@/lib/format";

describe("formatAmmanTime", () => {
  it("returns HH:MM in 24h Amman time", () => {
    const out = formatAmmanTime(new Date("2026-05-02T10:00:00Z"));
    expect(out).toBe("13:00");
  });
  it("zero-pads hours and minutes", () => {
    const out = formatAmmanTime(new Date("2026-05-02T00:05:00Z"));
    expect(out).toBe("03:05");
  });
});

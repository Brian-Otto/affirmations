import { describe, it, expect, beforeEach } from "vitest";
import { getIconTodayIndex } from "../components/AffirmationIcon.tsx";

const TODAY = new Date().toDateString();
const TOMORROW = new Date(Date.now() + 86400000).toDateString();

beforeEach(() => {
  localStorage.clear();
});

describe("getIconTodayIndex", () => {
  it("returns an index within bounds", () => {
    const index = getIconTodayIndex(5);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(5);
  });

  it("returns the same index when called twice on the same day", () => {
    const first = getIconTodayIndex(5);
    const second = getIconTodayIndex(5);
    expect(first).toBe(second);
  });

  it("stores today's date in localStorage", () => {
    getIconTodayIndex(5);
    expect(localStorage.getItem("affirmationDate")).toBe(TODAY);
  });

  it("reuses stored index if date matches today", () => {
    localStorage.setItem("affirmationDate", TODAY);
    localStorage.setItem("iconToday", "3");
    const index = getIconTodayIndex(5);
    expect(index).toBe(3);
  });

  it("resets index when date has changed", () => {
    localStorage.setItem("affirmationDate", TOMORROW);
    localStorage.setItem("iconToday", "3");
    getIconTodayIndex(5);
    expect(localStorage.getItem("affirmationDate")).toBe(TODAY);
    expect(localStorage.getItem("iconToday")).not.toBe("3");
  });
});

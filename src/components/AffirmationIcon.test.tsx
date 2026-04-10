import { describe, it, expect, beforeEach, vi } from "vitest";
import AffirmationIcon, { getIconTodayIndex, LOCAL_STORAGE_ICON_DATE_KEY, LOCAL_STORAGE_ICON_TODAY_KEY } from "./AffirmationIcon.tsx";
import { render, screen } from "@testing-library/react";

const TODAY = new Date().toDateString();
const TOMORROW = new Date(Date.now() + 86400000).toDateString();

vi.mock("../utils/affirmationIcon", () => ({
  default: [() => <svg />],
}));

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
    expect(localStorage.getItem(LOCAL_STORAGE_ICON_DATE_KEY)).toBe(TODAY);
  });

  it("reuses stored index if date matches today", () => {
    localStorage.setItem(LOCAL_STORAGE_ICON_DATE_KEY, TODAY);
    localStorage.setItem(LOCAL_STORAGE_ICON_TODAY_KEY, "3");
    const index = getIconTodayIndex(5);
    expect(index).toBe(3);
  });

  it("resets index when date has changed", () => {
    localStorage.setItem(LOCAL_STORAGE_ICON_DATE_KEY, TOMORROW);
    localStorage.setItem("iconToday", "3");
    getIconTodayIndex(5);
    expect(localStorage.getItem(LOCAL_STORAGE_ICON_DATE_KEY)).toBe(TODAY);
    expect(localStorage.getItem(LOCAL_STORAGE_ICON_TODAY_KEY)).not.toBe("3");
  });
});

describe("AffirmationIcon", () => {
  it("displays the icon-container", () => {
    render(<AffirmationIcon />)

    expect(screen.getByTestId("affirmation-icon")).toBeInTheDocument()
  })
})
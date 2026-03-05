import { describe, it, expect, beforeEach, vi } from "vitest";
import { getAffirmationTodayId } from "../components/AffirmationText";

const TODAY = new Date().toDateString();
const YESTERDAY = new Date(Date.now() - 86400000).toDateString();

vi.mock("../data/affirmations", () => ({
  default: [
    { id: 1, text: "You are great" },
    { id: 2, text: "You are kind" },
    { id: 3, text: "You are enough" },
  ],
}));

beforeEach(() => {
  localStorage.clear();
});

describe("getAffirmationTodayId", () => {
  it("returns a valid affirmation id", () => {
    const id = getAffirmationTodayId();
    expect([1, 2, 3]).toContain(id);
  });

  it("returns the same id when called twice on the same day", () => {
    const first = getAffirmationTodayId();
    const second = getAffirmationTodayId();
    expect(first).toBe(second);
  });

  it("stores today's date in localStorage", () => {
    getAffirmationTodayId();
    expect(localStorage.getItem("affirmationDate")).toBe(TODAY);
  });

  it("reuses stored id if date matches today", () => {
    localStorage.setItem("affirmationDate", TODAY);
    localStorage.setItem("affirmationToday", "2");
    localStorage.setItem("affirmationsList", JSON.stringify([2]));
    const id = getAffirmationTodayId();
    expect(id).toBe(2);
  });

  it("resets and picks a new affirmation when the date has changed", () => {
    localStorage.setItem("affirmationDate", YESTERDAY);
    localStorage.setItem("affirmationToday", "2");
    localStorage.setItem("affirmationsList", JSON.stringify([2]));
    getAffirmationTodayId();
    expect(localStorage.getItem("affirmationDate")).toBe(TODAY);
    const raw = localStorage.getItem("affirmationsList");
    const list = JSON.parse(raw ?? "[]");
    expect(list.length).toBe(2);
  });

  it("adds the selected id to the shown list", () => {
    const id = getAffirmationTodayId();
    const list = JSON.parse(localStorage.getItem("affirmationsList")!);
    expect(list).toContain(id);
  });

  it("cycles through all affirmations before repeating", () => {
    // Show 2 out of 3, the next pick must be the remaining one
    localStorage.setItem("affirmationDate", TODAY);
    localStorage.setItem("affirmationsList", JSON.stringify([1, 2]));
    localStorage.setItem("affirmationToday", "");
    const id = getAffirmationTodayId();
    expect(id).toBe(3);
  });

  it("resets the shown list when all affirmations have been shown", () => {
    localStorage.setItem("affirmationDate", TODAY);
    localStorage.setItem("affirmationsList", JSON.stringify([1, 2, 3]));
    localStorage.setItem("affirmationToday", "");
    getAffirmationTodayId();
    // After reset it picks from the full list again
    const list = JSON.parse(localStorage.getItem("affirmationsList")!);
    expect(list.length).toBe(1);
  });
});

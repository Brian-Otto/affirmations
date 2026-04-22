import { describe, it, expect, beforeEach, vi } from "vitest";
import { applyTheme } from "./theme";

beforeEach(() => {
  document.documentElement.classList.remove("latte", "mocha", "dark");
  localStorage.clear();
  window.matchMedia = vi.fn().mockReturnValue({ matches: false });
});

describe("applyTheme", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("latte", "mocha", "dark");
    localStorage.clear();
  });

  it("adds latte and saves light to localStorage when theme is light", () => {
    applyTheme("light");

    expect(document.documentElement.classList.contains("latte")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("adds mocha and saves dark to localStorage when theme is dark", () => {
    applyTheme("dark");

    expect(document.documentElement.classList.contains("mocha")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("removes latte and mocha when switching themes", () => {
    applyTheme("light");
    applyTheme("dark");

    expect(document.documentElement.classList.contains("latte")).toBe(false);
    expect(document.documentElement.classList.contains("mocha")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes theme from localStorage when system is selected", () => {
    localStorage.setItem("theme", "dark");
    applyTheme("system");

    expect(localStorage.getItem("theme")).toBeNull();
  });

  it("adds mocha when system prefers dark", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    applyTheme("system");

    expect(document.documentElement.classList.contains("mocha")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("adds latte when system prefers light", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    applyTheme("system");

    expect(document.documentElement.classList.contains("latte")).toBe(true);
  });
});
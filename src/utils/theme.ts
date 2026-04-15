export type Theme = "light" | "dark" | "system";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove("latte", "mocha");

  if (theme === "light") {
    root.classList.add("latte");
    localStorage.setItem("theme", "light");
  } else if (theme === "dark") {
    root.classList.add("mocha");
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.removeItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.add(prefersDark ? "mocha" : "latte");
  }
}
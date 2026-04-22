export type Theme = "light" | "dark" | "system";

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove("latte", "mocha", "dark");

  if (theme === "light") {
    root.classList.add("latte");
    localStorage.setItem("theme", "light");
  } else if (theme === "dark") {
    root.classList.add("mocha", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.removeItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      root.classList.add("mocha", "dark");
    } else {
      root.classList.add("latte");
    }
  }
}
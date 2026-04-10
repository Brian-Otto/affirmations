import { useEffect, useState } from "react";
import icons from "../utils/affirmationIcon";

export const LOCAL_STORAGE_ICON_DATE_KEY = "affirmationIconDate";
export const LOCAL_STORAGE_ICON_TODAY_KEY = "iconToday";

/**
 * Returns the icon index for today from localStorage.
 * New random index is stored in localStorage, when the day changes.
 *
 * @param iconCount amount of icons
 * @returns selected index for today
 */
export function getIconTodayIndex(iconCount: number): number {
  const todayString = new Date().toDateString();
  const storedDate = localStorage.getItem(LOCAL_STORAGE_ICON_DATE_KEY);
  const storedIndex = localStorage.getItem(LOCAL_STORAGE_ICON_TODAY_KEY);

  if (storedDate === todayString && storedIndex !== null) {
    return Number(storedIndex);
  }

  localStorage.setItem(LOCAL_STORAGE_ICON_DATE_KEY, todayString);

  let index;
  do {
    index = Math.floor(Math.random() * iconCount);
  } while (iconCount > 1 && String(index) === storedIndex);

  localStorage.setItem(LOCAL_STORAGE_ICON_TODAY_KEY, String(index));
  return index;
}

function AffirmationIcon({ className = "" }) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    setIndex(getIconTodayIndex(icons.length));
  }, []);

  if (index === null) return null;

  const Svg = icons[index];
  return <div data-testid="affirmation-icon"><Svg className={className} /></div>;
}

export default AffirmationIcon;

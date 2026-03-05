import { useEffect, useState } from "react";
import Cat from "../assets/images/cat.svg?react";
import CatCurled from "../assets/images/cat-curled.svg?react";

const LOCAL_STORAGE_DATE_KEY = "affirmationDate";
const LOCAL_STORAGE_TODAY_KEY = "iconToday";

/**
 * Returns the icon index for today from localStorage. 
 * New random index is stored in localStorage, when the day changes.
 * 
 * @param iconCount amount of icons
 * @returns selected index for today
 */
export function getIconTodayIndex(iconCount: number): number {
  const todayString = new Date().toDateString();
  const storedDate = localStorage.getItem(LOCAL_STORAGE_DATE_KEY);

  if (storedDate !== todayString) {
    localStorage.setItem(LOCAL_STORAGE_DATE_KEY, todayString);
    localStorage.removeItem(LOCAL_STORAGE_TODAY_KEY);
  }

  const stored = localStorage.getItem(LOCAL_STORAGE_TODAY_KEY);
  if (stored !== null) return Number(stored);

  const index = Math.floor(Math.random() * iconCount);
  localStorage.setItem(LOCAL_STORAGE_TODAY_KEY, String(index));
  return index;
}

const icons = [Cat, CatCurled];

function AffirmationIcon({ className = "" }) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    setIndex(getIconTodayIndex(icons.length));
  }, []);

  if (index === null) return null;

  const Svg = icons[index];
  return <Svg className={className} />;
}

export default AffirmationIcon;

import { useEffect, useState } from "react";
import Cat from "../assets/images/cat.svg?react";
import CatCurled from "../assets/images/cat-curled.svg?react";

const icons = [Cat, CatCurled];
const LOCAL_STORAGE_DATE_KEY = "affirmationDate";
const LOCAL_STORAGE_TODAY_KEY = "iconToday";

function AffirmationIcon({ className = "" }) {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const todayString = new Date().toDateString();
    const storedDate = localStorage.getItem(LOCAL_STORAGE_DATE_KEY);

    if (storedDate !== todayString) {
      localStorage.setItem(LOCAL_STORAGE_TODAY_KEY, "");
      localStorage.setItem(LOCAL_STORAGE_DATE_KEY, todayString);
    }

    const storedIndexString = localStorage.getItem(LOCAL_STORAGE_TODAY_KEY);
    let storedIndex = storedIndexString ? Number(storedIndexString) : null;

    if (storedIndex === null) {
      storedIndex = Math.floor(Math.random() * icons.length);
      localStorage.setItem(
        LOCAL_STORAGE_TODAY_KEY,
        String(storedIndex),
      );
    }

    setIndex(storedIndex);
  }, []);

  if (index === null) return null;

  const Svg = icons[index];
  return <Svg className={className} />;
}

export default AffirmationIcon;

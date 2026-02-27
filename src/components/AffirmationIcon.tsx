import { useEffect, useState } from "react";
import Cat from "../assets/images/cat.svg?react";
import CatCurled from "../assets/images/cat-curled.svg?react";

const icons = [Cat, CatCurled];
const LOCAL_STORAGE_KEY = "todaysIcon";

function AffirmationIcon({ className = "" }) {
  const [index, setIndex] = useState<number|null>(null);

  useEffect(() => {
    const storedIndexString = localStorage.getItem(LOCAL_STORAGE_KEY);
    let storedIndex = storedIndexString ? Number(storedIndexString) : null;

    if (storedIndex === null) {
      storedIndex = Math.floor(Math.random() * icons.length);
      localStorage.setItem(LOCAL_STORAGE_KEY, storedIndex.toString());
    } else {
      storedIndex = Number(storedIndex);
    }

    setIndex(storedIndex)
  }, []);

  if (index === null) return null;

  const Svg = icons[index];
  return <Svg className={className} />;
}

export default AffirmationIcon;

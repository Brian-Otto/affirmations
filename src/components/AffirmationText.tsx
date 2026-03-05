import { useEffect, useState } from "react";
import affirmations from "../data/affirmations";

const LOCAL_STORAGE_DATE_KEY = "affirmationDate";
const LOCAL_STORAGE_TODAY_KEY = "affirmationToday";
const LOCAL_STORAGE_LIST_KEY = "affirmationsList";

export function getAffirmationTodayId() {
  const todayString = new Date().toDateString();
  const storedDate = localStorage.getItem(LOCAL_STORAGE_DATE_KEY);

  if (storedDate !== todayString) {
    localStorage.setItem(LOCAL_STORAGE_TODAY_KEY, "");
    localStorage.setItem(LOCAL_STORAGE_DATE_KEY, todayString);
  }

  const storedList = localStorage.getItem(LOCAL_STORAGE_LIST_KEY);

  let shownAffirmationsArray: number[] = storedList
    ? JSON.parse(storedList)
    : [];

  let unshownAffirmations = affirmations.filter(
    (aff) => !shownAffirmationsArray.includes(aff.id),
  );

  if (unshownAffirmations.length === 0) {
    shownAffirmationsArray = [];
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify([]));
    unshownAffirmations = [...affirmations];
  }

  const storedIdString = localStorage.getItem(LOCAL_STORAGE_TODAY_KEY);
  let storedId = storedIdString ? Number(storedIdString) : null;

  if (storedId === null || !affirmations.some((aff) => aff.id === storedId)) {
    const randomAffirmation =
      unshownAffirmations[
        Math.floor(Math.random() * unshownAffirmations.length)
      ];
    storedId = randomAffirmation.id;
    localStorage.setItem(LOCAL_STORAGE_TODAY_KEY, String(storedId));
  }

  if (!shownAffirmationsArray.includes(storedId))
    shownAffirmationsArray.push(storedId);

  localStorage.setItem(
    LOCAL_STORAGE_LIST_KEY,
    JSON.stringify(shownAffirmationsArray),
  );

  return storedId;
}

function AffirmationText({ className = "" }) {
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    setId(getAffirmationTodayId());
  }, []);

  const affirmation = affirmations.find((aff) => aff.id === id);

  if (!affirmation) return null;

  return <span className={className}>{affirmation.text}</span>;
}

export default AffirmationText;

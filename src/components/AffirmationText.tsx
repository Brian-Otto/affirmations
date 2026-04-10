import { useEffect, useState } from "react";
import affirmations from "../data/affirmations";

export const LOCAL_STORAGE_TEXT_DATE_KEY = "affirmationTextDate";
export const LOCAL_STORAGE_TEXT_TODAY_KEY = "affirmationToday";
export const LOCAL_STORAGE_TEXT_LIST_KEY = "affirmationsList";

/**
 * returns the affirmation id for today from localStorage
 * picks a new random affirmation when the day changes, avoiding already shown ones
 * resets the shown list when all affirmations have been shown
 *
 * @returns id of today's affirmation
 */
export function getAffirmationTodayId() {
  const todayString = new Date().toDateString();
  const storedDate = localStorage.getItem(LOCAL_STORAGE_TEXT_DATE_KEY);

  if (storedDate !== todayString) {
    localStorage.setItem(LOCAL_STORAGE_TEXT_TODAY_KEY, "");
    localStorage.setItem(LOCAL_STORAGE_TEXT_DATE_KEY, todayString);
  }

  const storedList = localStorage.getItem(LOCAL_STORAGE_TEXT_LIST_KEY);

  let shownAffirmationsArray: number[] = storedList
    ? JSON.parse(storedList)
    : [];

  let unshownAffirmations = affirmations.filter(
    (aff) => !shownAffirmationsArray.includes(aff.id),
  );

  if (unshownAffirmations.length === 0) {
    shownAffirmationsArray = [];
    localStorage.setItem(LOCAL_STORAGE_TEXT_LIST_KEY, JSON.stringify([]));
    unshownAffirmations = [...affirmations];
  }

  const storedIdString = localStorage.getItem(LOCAL_STORAGE_TEXT_TODAY_KEY);
  let storedId = storedIdString ? Number(storedIdString) : null;

  if (storedId === null || !affirmations.some((aff) => aff.id === storedId)) {
    const randomAffirmation =
      unshownAffirmations[
      Math.floor(Math.random() * unshownAffirmations.length)
      ];
    storedId = randomAffirmation.id;
    localStorage.setItem(LOCAL_STORAGE_TEXT_TODAY_KEY, String(storedId));
  }

  if (!shownAffirmationsArray.includes(storedId))
    shownAffirmationsArray.push(storedId);

  localStorage.setItem(
    LOCAL_STORAGE_TEXT_LIST_KEY,
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

  return <span className={className} data-testid="affirmation-text">{affirmation.text}</span>;
}

export default AffirmationText;

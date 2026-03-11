import InfoIcon from "../assets/icons/info-svgrepo-com.svg?react";
import SettingsIcon from "../assets/icons/cog-svgrepo-com.svg?react";
import QRCodeIcon from "../assets/icons/qrcode-svgrepo-com.svg?react";
import QRCode from "../assets/images/qrcode.svg?react";
import { useState } from "react";
import Modal from "./Modal";
function Footer() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const infoText1 =
    "Affirmationen sind positive Selbstaussagen, die als psychologisches Werkzeug dienen, um das Unterbewusstsein umzuprogrammieren, Selbstvertrauen zu stärken und negative Gedankenmuster zu durchbrechen. \nSie werden meist als bejahende „Ich bin“-Sätze formuliert (z.B. „Ich bin mutig“), die täglich laut oder in Gedanken wiederholt werden, um Wohlbefinden und Lebensfreude zu steigern. ";
  const infoText2 =
    "Diese Website bietet die Möglichkeit täglich eine neue Affirmation zu sehen. (Solange der Vorrat reicht!) \nDiese werden nicht jeden Tag perfekt auf dich zugeschnitten sein und das ist okay. \nWenn du auch nur eine Affirmation findest, die dir gut tut, ist mein Ziel erfüllt. \nViel Spaß beim Entdecken!";

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const theme = e.target.value;
    const root = document.documentElement;

    root.classList.remove("latte", "mocha");

    if (theme === "light") {
      root.classList.add("latte");
      localStorage.setItem("theme", "light");
    } else if (theme === "dark") {
      root.classList.add("mocha");
      localStorage.setItem("theme", "dark");
    } else {
      // system theme
      localStorage.removeItem("theme");

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      root.classList.add(prefersDark ? "mocha" : "latte");
    }
  };

  return (
    <div className="w-full text-ctp-text bg-ctp-mantle py-8 px-8 sm:px-14 flex gap-4 items-center justify-center inset-shadow-xs">
      <button
        type="button"
        onClick={() => setIsInfoOpen(true)}
        className="ml-auto bg-ctp-crust h-10 w-10 flex justify-center items-center rounded-full p-1 cursor-pointer text-ctp-subtext0 hover:text-ctp-text"
      >
        <InfoIcon className="w-full h-full " />
      </button>
      {isInfoOpen && (
        <Modal onClose={() => setIsInfoOpen(false)}>
          <p className="whitespace-pre-wrap">{infoText1}</p>
          <p className="my-2 text-center">·</p>
          <p className="whitespace-pre-wrap">{infoText2}</p>
        </Modal>
      )}
      <button
        type="button"
        onClick={() => setIsQROpen(true)}
        className="bg-ctp-crust h-10 w-10 flex justify-center items-center rounded-full p-1 cursor-pointer text-ctp-subtext0 hover:text-ctp-text"
      >
        <QRCodeIcon className="w-full h-full" />
      </button>
      {isQROpen && <Modal onClose={() => setIsQROpen(false)}>
        <div className="flex flex-col gap-4">
        <p className="text-center">Teile die Seite mit deinen Freunden!</p>
        <QRCode className="w-full h-full" />
        </div>
      </Modal>}
      <button
        type="button"
        onClick={() => setIsSettingsOpen(true)}
        className="bg-ctp-crust h-10 w-10 flex justify-center items-center rounded-full p-1 cursor-pointer text-ctp-subtext0 hover:text-ctp-text"
      >
        <SettingsIcon className="w-full h-full" />
      </button>
      {isSettingsOpen && (
        <Modal onClose={() => setIsSettingsOpen(false)}>
          <div className="w-full flex justify-between items-center">
            <label htmlFor="theme">Theme</label>

            <select
              onChange={handleThemeChange}
              className="bg-ctp-base border border-ctp-lavender focus:outline-ctp-lavender focus:outline-1 px-2 py-1 rounded"
              name="theme"
              id="theme"
              defaultValue={localStorage.getItem("theme") || "system"}
            >
              <option value="system">System</option>
              <option value="light">Hell</option>
              <option value="dark">Dunkel</option>
            </select>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Footer;

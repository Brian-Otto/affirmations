import InfoIcon from "../assets/icons/info-svgrepo-com.svg?react";
import SettingsIcon from "../assets/icons/cog-svgrepo-com.svg?react";
import { useState } from "react";
import Modal from "./Modal";
function Footer() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const infoText1 =
    "Affirmationen sind positive Selbstaussagen, die als psychologisches Werkzeug dienen, um das Unterbewusstsein umzuprogrammieren, Selbstvertrauen zu stärken und negative Gedankenmuster zu durchbrechen. \nSie werden meist als bejahende „Ich bin“-Sätze formuliert (z.B. „Ich bin mutig“), die täglich laut oder in Gedanken wiederholt werden, um Wohlbefinden und Lebensfreude zu steigern. ";
  const infoText2 =
    "Diese Website bietet die Möglichkeit täglich eine neue Affirmation zu sehen. (Solange der Vorrat reicht!) \nDiese werden nicht jeden Tag perfekt auf dich zugeschnitten sein und das ist okay. \nWenn du auch nur eine Affirmation findest, die dir gut tut, ist mein Ziel erfüllt. \nViel Spaß beim Entdecken!";

  return (
    <div className="w-full text-ctp-text bg-ctp-mantle py-8 px-14 flex gap-4 items-center justify-center inset-shadow-xs">
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
        onClick={() => setIsSettingsOpen(true)}
        className="bg-ctp-crust h-10 w-10 flex justify-center items-center rounded-full p-1 cursor-pointer text-ctp-subtext0 hover:text-ctp-text"
      >
        <SettingsIcon className="w-full h-full" />
      </button>
      {isSettingsOpen && (
        <Modal onClose={() => setIsSettingsOpen(false)}>
          <span>Dieser Teil ist noch in Arbeit.</span>
        </Modal>
      )}
    </div>
  );
}

export default Footer;

import InfoIcon from "../assets/icons/info-svgrepo-com.svg?react";
import SettingsIcon from "../assets/icons/cog-svgrepo-com.svg?react";
import { useState } from "react";
import Modal from "./Modal";
function Footer() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
          <span>Dieser Teil ist noch in Arbeit.</span>
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

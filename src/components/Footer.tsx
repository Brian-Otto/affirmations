import InfoIcon from "../assets/icons/info-svgrepo-com.svg?react";
import SettingsIcon from "../assets/icons/cog-svgrepo-com.svg?react";
import QRCodeIcon from "../assets/icons/qrcode-svgrepo-com.svg?react";
import DownloadIcon from "../assets/icons/download-svgrepo-com.svg?react";
import QRCode from "../assets/images/qrcode.svg?react";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import FooterIconButton from "./FooterIconButton";
import { applyTheme, type Theme } from "../utils/theme";
function Footer() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const infoText1 =
    "Affirmationen sind positive Selbstaussagen, die als psychologisches Werkzeug dienen, um das Unterbewusstsein umzuprogrammieren, Selbstvertrauen zu stärken und negative Gedankenmuster zu durchbrechen. \nSie werden meist als bejahende „Ich bin“-Sätze formuliert (z.B. „Ich bin mutig“), die täglich laut oder in Gedanken wiederholt werden, um Wohlbefinden und Lebensfreude zu steigern. ";
  const infoText2 =
    "Diese Website bietet die Möglichkeit täglich eine neue Affirmation zu sehen. (Solange der Vorrat reicht!) \nDiese werden nicht jeden Tag perfekt auf dich zugeschnitten sein und das ist okay. \nWenn du auch nur eine Affirmation findest, die dir gut tut, ist mein Ziel erfüllt. \nViel Spaß beim Entdecken!";

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    applyTheme(e.target.value as Theme)
  };

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleDownload = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    /*
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    */

    setDeferredPrompt(null);
  };

  return (
    <footer className="w-full text-ctp-text bg-ctp-mantle py-8 px-8 sm:px-14 flex gap-4 items-center justify-center inset-shadow-xs">
      <FooterIconButton
        onClick={() => setIsInfoOpen(true)}
        className="ml-auto"
        ariaLabel="Informationen anzeigen"
        icon={<InfoIcon className="w-full h-full" />}
      />
      {isInfoOpen && (
        <Modal onClose={() => setIsInfoOpen(false)}>
          <p className="whitespace-pre-wrap">{infoText1}</p>
          <p className="my-2 text-center">·</p>
          <p className="whitespace-pre-wrap">{infoText2}</p>
        </Modal>
      )}
      <FooterIconButton
        onClick={() => setIsQROpen(true)}
        ariaLabel="QR-Code anzeigen"
        icon={<QRCodeIcon className="w-full h-full" />}
      />
      {isQROpen && (
        <Modal onClose={() => setIsQROpen(false)}>
          <div className="flex flex-col gap-4">
            <p className="text-center">Teile die Seite mit deinen Freunden!</p>
            <QRCode className="w-full h-full" />
          </div>
        </Modal>
      )}
      {deferredPrompt && (
        <FooterIconButton
          onClick={handleDownload}
          ariaLabel="App downloaden"
          icon={<DownloadIcon className="w-full h-full" />}
        />
      )}
      <FooterIconButton
        onClick={() => setIsSettingsOpen(true)}
        ariaLabel="Einstellungen anzeigen"
        icon={<SettingsIcon className="w-full h-full" />}
      />
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
    </footer>
  );
}

export default Footer;

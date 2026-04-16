import InfoIcon from "../assets/icons/info-svgrepo-com.svg?react";
import SettingsIcon from "../assets/icons/cog-svgrepo-com.svg?react";
import QRCodeIcon from "../assets/icons/qrcode-svgrepo-com.svg?react";
import DownloadIcon from "../assets/icons/download-svgrepo-com.svg?react";
import FooterIconButton from "./FooterIconButton";
import useFooter from "../hooks/useFooter";
import InfoModal from "./InfoModal";
import QRModal from "./QRModal";
import SettingsModal from "./SettingsModal";

function Footer() {
  const { activeModal, setActiveModal, deferredPrompt, handleInstall } = useFooter();

  return (
    <footer className="w-full text-ctp-text bg-ctp-mantle py-8 px-8 sm:px-14 flex gap-4 items-center justify-center inset-shadow-xs">
      <FooterIconButton
        onClick={() => setActiveModal("info")}
        className="ml-auto"
        ariaLabel="Informationen anzeigen"
        icon={<InfoIcon className="w-full h-full" />}
      />
      <FooterIconButton
        onClick={() => setActiveModal("qr")}
        ariaLabel="QR-Code anzeigen"
        icon={<QRCodeIcon className="w-full h-full" />}
      />
      {deferredPrompt && (
        <FooterIconButton
          onClick={handleInstall}
          ariaLabel="App downloaden"
          icon={<DownloadIcon className="w-full h-full" />}
        />
      )}
      <FooterIconButton
        onClick={() => setActiveModal("settings")}
        ariaLabel="Einstellungen anzeigen"
        icon={<SettingsIcon className="w-full h-full" />}
      />

      {activeModal === "info" && <InfoModal onClose={() => setActiveModal(null)} />}
      {activeModal === "qr" && <QRModal onClose={() => setActiveModal(null)} />}
      {activeModal === "settings" && <SettingsModal onClose={() => setActiveModal(null)} />}
    </footer>
  );
}

export default Footer;

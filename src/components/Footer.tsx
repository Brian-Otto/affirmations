import { Button } from "./ui/button";
import { Download } from "lucide-react";
import InfoDialog from "./InfoDialog";
import QrDialog from "./QrDialog";
import SettingsDialog from "./SettingsDialog";
import usePwaInstall from "@/hooks/usePwaInstall";

function Footer() {
  const { deferredPrompt, handleInstall } = usePwaInstall();

  return (
    <footer className="w-full bg-ctp-mantle py-8 px-8 sm:px-14 flex gap-4 items-center justify-end">
      <InfoDialog />
      <QrDialog />
      {deferredPrompt && (
        <Button onClick={handleInstall} size={"icon-lg"} variant={"secondary"} aria-label="App downloaden"><Download /></Button>
      )}
      <SettingsDialog />
    </footer>
  );
}

export default Footer;

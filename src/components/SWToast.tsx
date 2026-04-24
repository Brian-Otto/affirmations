import { toast } from "sonner";
import { updateSW } from "../pwa";
import { useEffect } from "react";

function SWToast() {
  useEffect(() => {
    const onUpdate = () => {
      toast.info(
        "Neue Version verfügbar.", {
        description: "Zum Aktualisieren der App bitte neu laden.",
        duration: Infinity,
        action: {
          label: "Neu laden",
          onClick: () => updateSW?.()
        },
        cancel: {
          label: "Abbrechen",
          onClick: () => { }
        }
      },
      );
    };

    const onOffline = () => {
      toast.info(
        "App ist bereit für die Offline-Nutzung.",
      );
    };

    window.addEventListener("pwa-update", onUpdate);
    window.addEventListener("pwa-offline-ready", onOffline);

    return () => {
      window.removeEventListener("pwa-update", onUpdate);
      window.removeEventListener("pwa-offline-ready", onOffline);
    };
  }, []);

  return <></>;
}

export default SWToast;

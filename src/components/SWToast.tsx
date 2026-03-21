import toast from "react-hot-toast";
import { updateSW } from "../pwa";
import { useEffect } from "react";

function SWToast() {
  useEffect(() => {
    const onUpdate = () => {
      toast.custom(
        (t) => (
          <div
            className={`w-full max-w-md bg-ctp-mantle text-ctp-text rounded-xl border-ctp-lavender border-2 p-4 ${
              t.visible
                ? "animate-[toast-enter_0.3s_ease-out]"
                : "animate-[toast-leave_0.3s_ease-in_forwards]"
            }`}
          >
            <p>Neue Version verfügbar. Jetzt neu laden?</p>
            <div className="flex justify-end gap-2 mt-2 flex-wrap">
              <button
                className="text-ctp-subtext0 px-3 py-1 border-ctp-lavender border rounded transition hover:bg-ctp-surface0 active:scale-95"
                onClick={() => toast.dismiss(t.id)}
              >
                Abbrechen
              </button>
              <button
                className="bg-ctp-lavender text-black rounded px-3 py-1 transition hover:brightness-110 active:scale-95"
                onClick={() => {
                  updateSW?.();
                  toast.dismiss(t.id);
                }}
              >
                Neu laden
              </button>
            </div>
          </div>
        ),
        { duration: Infinity },
      );
    };

    const onOffline = () => {
      toast.custom(
        (t) => (
          <div
            className={`w-full max-w-md bg-ctp-mantle text-ctp-text rounded-xl border-ctp-lavender border-2 p-4 ${
              t.visible
                ? "animate-[toast-enter_0.3s_ease-out]"
                : "animate-[toast-leave_0.3s_ease-in_forwards]"
            }`}
          >
            <p>App ist bereit für die Offline-Nutzung.</p>
            <div className="flex justify-end mt-2">
              <button
                className="bg-ctp-lavender text-black rounded px-3 py-1 transition hover:brightness-110 active:scale-95"
                onClick={() => toast.dismiss(t.id)}
              >
                OK
              </button>
            </div>
          </div>
        ),
        { duration: Infinity },
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

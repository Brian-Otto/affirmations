import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function useFooter() {
    const [activeModal, setActiveModal] = useState<"info" | "qr" | "settings" | null>(null);
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e as BeforeInstallPromptEvent)
        }
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, [])

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt()
        setDeferredPrompt(null)
    }

    return { activeModal, setActiveModal, deferredPrompt, handleInstall }
}

export default useFooter
import { QrCode } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import QRCode from "../assets/images/qrcode.svg?react";

function QrDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"icon-lg"} variant={"secondary"} aria-label="QR-Code anzeigen">
                    <QrCode />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Teile die Seite mit deinen Freunden!
                    </DialogTitle>
                </DialogHeader>
                <QRCode className="mx-auto w-full h-full max-w-md" />
            </DialogContent>
        </Dialog>
    )
}

export default QrDialog;
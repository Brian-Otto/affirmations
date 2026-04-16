import Modal from "./Modal"
import QRCode from "../assets/images/qrcode.svg?react";

function QRModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-4">
        <p className="text-center">Teile die Seite mit deinen Freunden!</p>
        <QRCode className="w-full h-full" />
      </div>
    </Modal>
  )
}

export default QRModal
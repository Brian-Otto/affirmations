import { useEffect } from "react";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-ctp-base text-ctp-text rounded-xl p-8 border-ctp-lavender border-2 min-w-xs max-w-lg">
        {children}
      </div>
    </div>
  );
}

export default Modal;

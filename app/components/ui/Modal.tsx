import React from "react";
import { ArrowLeft, X as Close } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backButton?: {
    onClick: () => void;
    show: boolean;
  };
}

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  backButton,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed h-screen w-full flex items-center justify-center bg-accent/10 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-[500px] h-fit rounded-2xl bg-white shadow p-5"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                {backButton?.show && (
                  <button onClick={backButton.onClick}>
                    <ArrowLeft />
                  </button>
                )}
                <p className="font-semibold">{title}</p>
              </div>
              <button onClick={onClose}>
                <Close />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

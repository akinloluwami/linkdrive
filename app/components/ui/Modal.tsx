import React from "react";
import { ArrowLeft, X as Close } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { isMobile } from "react-device-detect";

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
          className="fixed h-screen w-full flex items-center justify-center bg-accent/20 backdrop-blur-md z-20 top-0 right-0 inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={isMobile ? {} : { opacity: 0 }}
        >
          <motion.div
            className="lg:w-[500px] w-full h-fit rounded-2xl bg-white shadow p-5 bottom-0 lg:bottom-auto right-0 lg:right-auto fixed lg:static"
            initial={
              isMobile
                ? {
                    bottom: -150,
                  }
                : { scale: 0.9, opacity: 0 }
            }
            layout
            animate={
              isMobile
                ? {
                    bottom: 0,
                  }
                : { scale: 0.9, opacity: 1 }
            }
            exit={
              isMobile
                ? {
                    bottom: -300,
                  }
                : { scale: 0.9, opacity: 0 }
            }
            transition={{ layout: { duration: 0.3 } }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                {backButton?.show && (
                  <button
                    onClick={backButton.onClick}
                    className="hover:bg-accent/10 transition-colors rounded-2xl"
                  >
                    <ArrowLeft />
                  </button>
                )}
                <p className="font-semibold">{title}</p>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-accent/10 transition-colors rounded-2xl"
              >
                <Close />
              </button>
            </div>
            <div className="my-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

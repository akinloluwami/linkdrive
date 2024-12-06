import Modal from "./ui/Modal";
import useGlobalModalStore from "~/stores/globalModalStore";
import AddNew from "./modals/AddNew";
import React from "react";
import AddNewLink from "./modals/AddNewLink";
import { AnimatePresence, motion } from "motion/react";

const GlobalModal = () => {
  const { isOpen, setOpen } = useGlobalModalStore();
  const [activeModal, setActiveModal] = React.useState("add-new");

  const modals = [
    {
      key: "add-new",
      component: <AddNew setModal={(key) => setActiveModal(key)} />,
      title: "Add New",
    },
    {
      key: "add-new-link",
      component: <AddNewLink />,
      title: "Add New Link",
    },
  ];

  const modal = modals.find((m) => m.key === activeModal);

  return (
    <Modal
      title={modal?.title!}
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      backButton={{
        onClick: () => setActiveModal("add-new"),
        show: activeModal !== "add-new",
      }}
    >
      <div className="my-5">
        <AnimatePresence>
          <motion.div
            key={activeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {modal?.component}
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default GlobalModal;

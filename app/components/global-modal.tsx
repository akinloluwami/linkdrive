import Modal from "./ui/modal";
import useGlobalModalStore from "@/stores/globalModalStore";
import AddNew from "./modals/add-new";
import React from "react";
import AddNewLink from "./modals/add-new-link";
import { AnimatePresence, motion } from "motion/react";
import CreateCollection from "./modals/create-collection";

const GlobalModal = () => {
  const { activeModal, setActiveModal } = useGlobalModalStore();

  const modals = [
    {
      key: "add-new",
      component: <AddNew />,
      title: "Add New",
    },
    {
      key: "add-new-link",
      component: <AddNewLink />,
      title: "Add New Link",
    },
    {
      key: "create-collection",
      component: <CreateCollection />,
      title: "Create Collection",
    },
  ];

  const modal = modals.find((m) => m.key === activeModal);

  return (
    <Modal
      title={modal?.title!}
      isOpen={!!activeModal}
      onClose={() => setActiveModal(null)}
    >
      <AnimatePresence>
        <div className="my-5">
          <motion.div
            key={activeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {modal?.component}
          </motion.div>
        </div>
      </AnimatePresence>
    </Modal>
  );
};

export default GlobalModal;

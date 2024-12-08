import { FolderOpen } from "solar-icon-set";
import Button from "../ui/button";
import React from "react";
import Modal from "../ui/Modal";
import AddNewLink from "../modals/add-new-link";

const EmptyCollection = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Add New Link">
        <AddNewLink />
      </Modal>

      <div className="w-full h-[calc(90vh-60px)] flex items-center justify-center flex-col space-y-2">
        <FolderOpen iconStyle="BoldDuotone" size={100} />
        <p className="font-medium text-2xl">This Collection is Empty</p>
        <p>Add links to start building your collection.</p>
        <Button className="!w-fit px-10" onClick={() => setOpen(true)}>
          Add new link
        </Button>
      </div>
    </>
  );
};

export default EmptyCollection;

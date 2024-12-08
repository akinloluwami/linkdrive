import { FolderFavouriteStar, LinkCircle } from "solar-icon-set";
import Button from "../ui/button";
import Modal from "../ui/Modal";
import CreateCollection from "../modals/create-collection";
import React from "react";

const NoCollections = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create Collection"
      >
        <CreateCollection />
      </Modal>
      <div className="w-full h-[calc(90vh-60px)] flex items-center justify-center flex-col space-y-2">
        <FolderFavouriteStar iconStyle="BoldDuotone" size={100} />
        <p className="font-medium text-2xl">Create Your First Collection</p>
        <p>
          Collections help you organize and manage your favorite links in one
          place.
        </p>
        <Button className="!w-fit px-10" onClick={() => setOpen(true)}>
          Create collection
        </Button>
      </div>
    </>
  );
};

export default NoCollections;

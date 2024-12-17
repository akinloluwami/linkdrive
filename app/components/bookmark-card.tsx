import { BookmarkProps } from "@/types";
import Options from "./ui/options";
import { PenNewSquare, TrashBinMinimalistic } from "solar-icon-set";
import React from "react";
import Modal from "./ui/modal";
import EditLink from "./modals/edit-link";
import DeleteLink from "./modals/delete-link";
import { toast } from "sonner";

const BookmarkCard: React.FC<BookmarkProps> = ({
  url,
  title,
  favicon,
  ogImage,
  createdAt,
  id,
}) => {
  const [modal, setModal] = React.useState("");

  const modals = {
    edit: {
      component: (
        <EditLink
          currentUrl={url}
          id={id}
          onEditSuccess={() => {
            setModal("");
            toast.success("Bookmark updated");
          }}
        />
      ),
      title: "Edit link",
    },
    delete: {
      component: (
        <DeleteLink
          currentUrl={url}
          id={id}
          onDeleteSuccess={() => setModal("")}
        />
      ),
      title: "Delete link",
    },
  };

  return (
    <>
      <Modal
        title={modals[modal]?.title}
        isOpen={!!modal}
        onClose={() => setModal("")}
      >
        {modals[modal]?.component}
      </Modal>
      <div className="lg:h-[300px] h-[250px] w-full bg-white shadow rounded-2xl p-3 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <img src={favicon} alt="Favicon" className="w-6" />
            <div>
              <p className="text-sm font-medium truncate lg:w-[250px] w-[120px]">
                {title}
              </p>
              {/* <p className="text-xs">{new URL(url).hostname}</p> */}
            </div>
          </div>
        </div>
        <div className="h-[200px]">
          <img
            src={ogImage || ""}
            alt="Preview"
            className="rounded-2xl object-cover h-full w-full"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium text-xs">{createdAt}</p>
          <Options
            options={[
              {
                icon: <PenNewSquare size={16} />,
                text: "Edit url",
                action: () => setModal("edit"),
              },
              {
                icon: <TrashBinMinimalistic size={16} />,
                text: "Delete",
                action: () => setModal("delete"),
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default BookmarkCard;

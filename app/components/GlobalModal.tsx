import { FolderWithFiles, LinkMinimalistic2 } from "solar-icon-set";
import Modal from "./ui/Modal";
import useGlobalModalStore from "~/stores/globalModalStore";

const GlobalModal = () => {
  const items = [
    {
      title: "Link",
      icon: LinkMinimalistic2,
    },
    {
      title: "Collection",
      icon: FolderWithFiles,
    },
  ];

  const { isOpen, setOpen } = useGlobalModalStore();
  return (
    <Modal title="Add new" isOpen={isOpen} onClose={() => setOpen(false)}>
      <div className="flex items-center gap-x-4 my-5">
        {items.map((item, i) => (
          <div
            className="h-[200px] w-full bg-gray-100 cursor-pointer hover:bg-gray-100/50 transition-colors rounded-2xl flex items-center flex-col justify-center group"
            key={i}
          >
            <item.icon
              size={100}
              iconStyle="BoldDuotone"
              className="group-hover:rotate-12 transition-all"
            />
            <p className="text-lg">{item.title}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default GlobalModal;

import { FolderWithFiles, LinkMinimalistic2 } from "solar-icon-set";
import useGlobalModalStore from "~/stores/globalModalStore";

const AddNew = () => {
  const { setActiveModal, activeModal } = useGlobalModalStore();
  const items = [
    {
      title: "Link",
      icon: LinkMinimalistic2,
      key: "add-new-link",
    },
    {
      title: "Collection",
      icon: FolderWithFiles,
      key: "create-collection",
    },
  ];
  return (
    <div className="flex items-center gap-x-4">
      {items.map((item, i) => (
        <div
          className="h-[200px] w-full bg-gray-100 cursor-pointer hover:bg-gray-100/50 transition-colors rounded-2xl flex items-center flex-col justify-center group"
          key={i}
          onClick={() => setActiveModal(item.key as typeof activeModal)}
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
  );
};

export default AddNew;

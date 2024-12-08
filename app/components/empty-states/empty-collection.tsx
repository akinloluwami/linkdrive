import { FolderOpen } from "solar-icon-set";
import Button from "../ui/button";
import useGlobalModalStore from "~/stores/globalModalStore";

const EmptyCollection = () => {
  const { setActiveModal } = useGlobalModalStore();
  return (
    <div className="w-full h-[calc(90vh-60px)] flex items-center justify-center flex-col space-y-2">
      <FolderOpen iconStyle="BoldDuotone" size={100} />
      <p className="font-medium text-2xl">This Collection is Empty</p>
      <p>Add links to start building your collection.</p>
      <Button
        className="!w-fit px-10"
        onClick={() => setActiveModal("add-new-link")}
      >
        Add new link
      </Button>
    </div>
  );
};

export default EmptyCollection;

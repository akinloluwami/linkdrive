import { FolderFavouriteStar, LinkCircle } from "solar-icon-set";
import Button from "../ui/button";
import useGlobalModalStore from "~/stores/globalModalStore";

const NoCollections = () => {
  const { setActiveModal } = useGlobalModalStore();
  return (
    <div className="w-full h-[calc(90vh-60px)] flex items-center justify-center flex-col space-y-2">
      <FolderFavouriteStar iconStyle="BoldDuotone" size={100} />
      <p className="font-medium text-2xl">Create Your First Collection</p>
      <p>
        Collections help you organize and manage your favorite links in one
        place.
      </p>
      <Button
        className="!w-fit px-10"
        onClick={() => setActiveModal("create-collection")}
      >
        Create collection
      </Button>
    </div>
  );
};

export default NoCollections;

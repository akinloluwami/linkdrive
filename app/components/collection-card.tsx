import { Link } from "@tanstack/react-router";
import { FolderWithFiles } from "solar-icon-set";
import { CollectionProps } from "~/types";

const CollectionCard: React.FC<CollectionProps> = ({
  id,
  lastUpdated,
  linksCount,
  name,
}) => {
  return (
    <Link
      to="/collections/$collectionId"
      params={{ collectionId: id }}
      className="h-[300px] w-full bg-white shadow rounded-2xl p-3 flex flex-col justify-between group"
    >
      <div className="">
        <p className="font-semibold">{name}</p>
        <p>{linksCount} links</p>
      </div>
      <div className="flex items-center justify-center group-hover:-rotate-12 transition-all">
        <FolderWithFiles size={100} iconStyle="Bold" />
      </div>
      <p className="font-medium text-xs">Updated {lastUpdated}</p>
    </Link>
  );
};

export default CollectionCard;

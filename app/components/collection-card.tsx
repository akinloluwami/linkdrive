import { Link } from "@tanstack/react-router";
import { FolderWithFiles } from "solar-icon-set";
import { CollectionProps } from "~/types";
import moment from "moment";
import { isMobile } from "react-device-detect";

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
      className="lg:h-[300px] h-[200px] w-full bg-white shadow rounded-2xl p-3 flex flex-col justify-between group"
    >
      <div className="">
        <p className="font-semibold">{name}</p>
        <p>{linksCount} links</p>
      </div>
      <div className="flex items-center justify-center group-hover:-rotate-12 transition-all">
        <FolderWithFiles size={isMobile ? 70 : 100} iconStyle="BoldDuotone" />
      </div>
      <p className="font-medium text-xs">
        Updated {moment(lastUpdated).fromNow()}
      </p>
    </Link>
  );
};

export default CollectionCard;

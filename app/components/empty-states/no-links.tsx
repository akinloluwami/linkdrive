import { LinkCircle } from "solar-icon-set";
import { isDesktop } from "react-device-detect";

const NoLinks = () => {
  return (
    <div className="w-full h-[calc(90vh-60px)] flex items-center justify-center flex-col">
      <LinkCircle iconStyle="BoldDuotone" size={100} />
      <p className="font-medium text-2xl my-1">No links yet.</p>
      <p>
        {isDesktop ? (
          `Click "Add New"`
        ) : (
          <span>
            Press <span className="text-2xl font-semibold">+</span>
          </span>
        )}{" "}
        to add a new link or collection.
      </p>
    </div>
  );
};

export default NoLinks;

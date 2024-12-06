import { LinkCircle } from "solar-icon-set";

const NoLinks = () => {
  return (
    <div className="w-full h-[calc(100vh-60px)] flex items-center justify-center flex-col">
      <LinkCircle iconStyle="BoldDuotone" size={100} />
      <p className="font-medium text-2xl my-1">No links yet.</p>
      <p>Click "Add New" to add a new link or collection.</p>
    </div>
  );
};

export default NoLinks;

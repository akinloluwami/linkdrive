import { Link, useRouter } from "@tanstack/react-router";
import cn from "classnames";
import useGlobalModalStore from "@/stores/globalModalStore";
import { Plus } from "lucide-react";
import { Bookmark, Folder2 } from "solar-icon-set";

const Sidebar = () => {
  const links = [
    {
      title: "Bookmarks",
      href: "/bookmarks",
      icon: Bookmark,
    },
    {
      title: "Collections",
      href: "/collections",
      icon: Folder2,
    },
  ];

  const router = useRouter();
  const { setActiveModal } = useGlobalModalStore();

  return (
    <div className="py-3 px-4 w-full h-screen bg-[#f5f5f3] sticky top-0 left-0">
      <h1>LinkDrive</h1>
      <button
        className="w-full px-8 mt-8 rounded-4xl bg-white text-accent shadow-2xl py-3 font-medium flex items-center justify-center gap-x-1 hover:bg-white/80 transition-colors"
        onClick={() => setActiveModal("add-new")}
      >
        <Plus size={18} />
        Add new
      </button>
      <div className="space-y-3 mt-8">
        {links.map((link, index) => {
          const isActive = router.latestLocation.pathname.includes(link.href);
          return (
            <Link
              key={index}
              to={link.href}
              className={cn(
                "flex items-center gap-x-2 bg-transparent px-4 py-3 rounded-full text-gray-600 transition-colors",
                {
                  "!bg-accent/15 !text-accent font-medium": isActive,
                  "hover:bg-accent/10 hover:text-accent": !isActive,
                }
              )}
            >
              <link.icon
                iconStyle={isActive ? "Bold" : "Linear"}
                size={20}
                className={isActive ? "!text-accent" : "!text-gray-600"}
              />
              <span>{link.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

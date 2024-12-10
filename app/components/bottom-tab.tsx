import { useRouter } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import React from "react";
import { Bookmark, Folder2 } from "solar-icon-set";
import useGlobalModalStore from "@/stores/globalModalStore";

const BottomTab = () => {
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

  const isActive = (href: string) => {
    return router.latestLocation.pathname.includes(href);
  };

  const { setActiveModal } = useGlobalModalStore();

  return (
    <div className="fixed bottom-2 w-full p-3 z-10 lg:hidden block">
      <div className="w-[95%] mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center gap-x-6 py-2 border">
        <Link href="/bookmarks" className="flex flex-col items-center">
          <Bookmark
            size={25}
            iconStyle={isActive("/bookmarks") ? "Bold" : "Linear"}
          />
          <p>Bookmarks</p>
        </Link>

        <button
          className="size-12 flex items-center justify-center rounded-full bg-accent text-white"
          onClick={() => setActiveModal("add-new")}
        >
          <Plus size={24} />
        </button>
        <Link href="/collections" className="flex flex-col items-center">
          <Folder2
            size={25}
            iconStyle={isActive("/collections") ? "Bold" : "Linear"}
          />
          <p>Collections</p>
        </Link>
      </div>
    </div>
  );
};

export default BottomTab;

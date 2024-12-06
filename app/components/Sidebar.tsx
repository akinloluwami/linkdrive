import { Link, useRouter } from "@tanstack/react-router";
import * as Icons from "solar-icon-set";
import cn from "classnames";

const Sidebar = () => {
  const links = [
    {
      title: "Home",
      href: "/dashboard",
      icon: Icons.Home2,
    },
    {
      title: "Collections",
      href: "/dashboard/collections",
      icon: Icons.Folder2,
    },
  ];

  const router = useRouter();

  return (
    <div className="py-3 px-4 w-full h-screen bg-[#f5f5f3]">
      <h1>Logo</h1>
      <div className="space-y-3 mt-10">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className={cn(
              "flex items-center gap-x-2 bg-transparent px-4 py-3 rounded-full text-gray-600 transition-colors",
              {
                "!bg-accent/15 !text-accent font-medium":
                  router.latestLocation.pathname === link.href,
                "hover:bg-accent/10 hover:text-accent":
                  router.latestLocation.pathname !== link.href,
              }
            )}
          >
            <link.icon
              iconStyle={
                router.latestLocation.pathname === link.href ? "Bold" : "Linear"
              }
              size={20}
            />
            <span>{link.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

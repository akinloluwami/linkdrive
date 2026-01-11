import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Bookmark01Icon,
  Folder03Icon,
  LabelImportantIcon,
  Clock05Icon,
  StarIcon,
  Delete03Icon,
  Settings03Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons";

export const Route = createFileRoute("/__authenticated/app")({
  component: RouteComponent,
});

const navItems = [
  { icon: Bookmark01Icon, label: "All Bookmarks", href: "/app/bookmarks" },
  { icon: Folder03Icon, label: "Collections", href: "/app/collections" },
  { icon: LabelImportantIcon, label: "Tags", href: "/app/tags" },
  { icon: Clock05Icon, label: "Recent", href: "/app/recent" },
  { icon: StarIcon, label: "Favorites", href: "/app/favorites" },
  { icon: Delete03Icon, label: "Trash", href: "/app/trash" },
];

function RouteComponent() {
  return (
    <div className="h-screen overflow-hidden bg-linear-to-br from-sky-50 via-blue-50 to-indigo-100">
      <div className="flex h-full">
        {/* Fixed Sidebar */}
        <div className="w-72 h-screen p-4 pr-0 shrink-0">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 h-[calc(100vh-2rem)] p-5 flex flex-col">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-gray-800">
                LinkDrive<span className="text-accent">.</span>
              </h1>
            </div>

            <div className="flex-1 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 transition-colors group border border-transparent"
                  activeProps={{
                    className:
                      "flex items-center gap-3 px-4 py-3 rounded-2xl bg-accent-light text-accent! font-medium hover:border-accent/50 hover:bg-accent-light!",
                  }}
                >
                  <HugeiconsIcon icon={item.icon} className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent hover:bg-accent-hover text-white rounded-2xl transition-colors font-medium text-sm">
                <HugeiconsIcon icon={Add01Icon} className="w-4 h-4" />
                Add Bookmark
              </button>
            </div>

            <div className="pt-4">
              <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-100/80 hover:text-gray-700 transition-colors w-full">
                <HugeiconsIcon icon={Settings03Icon} className="w-5 h-5" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 h-[calc(100vh-2rem)] p-6 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

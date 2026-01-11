import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Add01Icon,
  MoreHorizontalIcon,
  Folder03Icon,
  Bookmark01Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { CreateCollectionModal } from "@/components/app/modals/create-collection-modal";

export const Route = createFileRoute("/__authenticated/app/collections")({
  component: RouteComponent,
});

const collections = [
  {
    id: 1,
    name: "Development",
    description: "Programming resources and documentation",
    bookmarkCount: 24,
    color: "#3b82f6",
  },
  {
    id: 2,
    name: "Design",
    description: "UI/UX inspiration and design tools",
    bookmarkCount: 18,
    color: "#ec4899",
  },
  {
    id: 3,
    name: "Reading List",
    description: "Articles and blog posts to read later",
    bookmarkCount: 32,
    color: "#8b5cf6",
  },
  {
    id: 4,
    name: "Tools",
    description: "Useful online tools and utilities",
    bookmarkCount: 15,
    color: "#10b981",
  },
  {
    id: 5,
    name: "Learning",
    description: "Courses and tutorials",
    bookmarkCount: 21,
    color: "#f59e0b",
  },
  {
    id: 6,
    name: "Work",
    description: "Work-related resources and docs",
    bookmarkCount: 12,
    color: "#6366f1",
  },
];

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateCollection = (collection: {
    name: string;
    description: string;
    color: string;
  }) => {
    console.log("Creating collection:", collection);
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Collections</h1>
          <p className="text-sm text-gray-500 mt-1">
            {collections.length} collections
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl transition-colors font-medium text-sm"
        >
          <HugeiconsIcon icon={Add01Icon} className="w-4 h-4" />
          New Collection
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <HugeiconsIcon
            icon={Search01Icon}
            className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search collections..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="group p-5 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${collection.color}15` }}
              >
                <HugeiconsIcon
                  icon={Folder03Icon}
                  className="w-6 h-6"
                  style={{ color: collection.color }}
                />
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-lg transition-all">
                <HugeiconsIcon
                  icon={MoreHorizontalIcon}
                  className="w-4 h-4 text-gray-500"
                />
              </button>
            </div>

            <h3 className="font-semibold text-gray-900 mb-1">
              {collection.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
              {collection.description}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <HugeiconsIcon icon={Bookmark01Icon} className="w-3.5 h-3.5" />
              <span>{collection.bookmarkCount} bookmarks</span>
            </div>
          </div>
        ))}
      </div>

      <CreateCollectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateCollection}
      />
    </div>
  );
}

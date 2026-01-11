import { createFileRoute, Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  FilterIcon,
  GridViewIcon,
  ArrowLeft01Icon,
  Folder03Icon,
  Bookmark01Icon,
  Share01Icon,
  Edit02Icon,
  Delete02Icon,
  Globe02Icon,
  LockIcon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { BookmarkCard, Bookmark } from "@/components/app/bookmark-card";
import { EditBookmarkModal } from "@/components/app/modals/edit-bookmark-modal";
import type { Tag } from "@/components/ui/tag-picker";

export const Route = createFileRoute("/__authenticated/app/collections/$slug")({
  component: RouteComponent,
});

// Mock tags - in a real app this would come from state/API
const availableTags: Tag[] = [
  { id: 1, name: "react", color: "#61dafb" },
  { id: 2, name: "typescript", color: "#3178c6" },
  { id: 3, name: "javascript", color: "#f7df1e" },
  { id: 4, name: "css", color: "#264de4" },
  { id: 5, name: "design", color: "#ff6b6b" },
  { id: 6, name: "tools", color: "#10b981" },
  { id: 7, name: "docs", color: "#8b5cf6" },
  { id: 8, name: "tutorial", color: "#f59e0b" },
];

// Mock data - in real app this would come from an API based on slug
const collectionsData: Record<
  string,
  {
    id: number;
    name: string;
    description: string;
    color: string;
    isPublic: boolean;
    bookmarks: Bookmark[];
  }
> = {
  development: {
    id: 1,
    name: "Development",
    description: "Programming resources and documentation",
    color: "#3b82f6",
    isPublic: false,
    bookmarks: [
      {
        id: 1,
        title: "React Documentation",
        url: "https://react.dev",
        description: "The library for web and native user interfaces",
        favicon: "https://react.dev/favicon.ico",
        tags: ["react", "docs"],
        createdAt: "2026-01-10",
      },
      {
        id: 2,
        title: "TypeScript Handbook",
        url: "https://www.typescriptlang.org/docs/handbook",
        description: "The TypeScript Handbook is a comprehensive guide",
        favicon: "https://www.typescriptlang.org/favicon.ico",
        tags: ["typescript", "docs"],
        createdAt: "2026-01-09",
      },
      {
        id: 3,
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        description: "Resources for developers, by developers",
        favicon: "https://developer.mozilla.org/favicon.ico",
        tags: ["docs", "reference"],
        createdAt: "2026-01-08",
      },
    ],
  },
  design: {
    id: 2,
    name: "Design",
    description: "UI/UX inspiration and design tools",
    color: "#ec4899",
    isPublic: true,
    bookmarks: [
      {
        id: 1,
        title: "Dribbble",
        url: "https://dribbble.com",
        description: "Discover the world's top designers & creatives",
        favicon: "https://dribbble.com/favicon.ico",
        tags: ["inspiration", "design"],
        createdAt: "2026-01-10",
      },
      {
        id: 2,
        title: "Figma",
        url: "https://figma.com",
        description: "The collaborative interface design tool",
        favicon: "https://figma.com/favicon.ico",
        tags: ["tool", "design"],
        createdAt: "2026-01-09",
      },
    ],
  },
};

function RouteComponent() {
  const { slug } = Route.useParams();
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

  const collection = collectionsData[slug];

  const handleEdit = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
  };

  const handleSaveEdit = (updatedBookmark: Bookmark) => {
    console.log("Saved bookmark:", updatedBookmark);
    // In a real app, this would update the bookmark in state/API
  };

  const handleCreateTag = (name: string) => {
    console.log("Creating tag:", name);
    // In a real app, this would create the tag and refresh the list
  };

  if (!collection) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <HugeiconsIcon
          icon={Folder03Icon}
          className="w-16 h-16 text-gray-300 mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Collection not found
        </h2>
        <p className="text-gray-500 mb-6">
          The collection you're looking for doesn't exist.
        </p>
        <Link
          to="/app/collections"
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl transition-colors font-medium text-sm"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4" />
          Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-6">
        <Link
          to="/app/collections"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-4"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4" />
          Back to Collections
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${collection.color}15` }}
            >
              <HugeiconsIcon
                icon={Folder03Icon}
                className="w-7 h-7"
                style={{ color: collection.color }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {collection.name}
                </h1>
                {collection.isPublic ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 rounded-lg text-xs font-medium">
                    <HugeiconsIcon icon={Globe02Icon} className="w-3 h-3" />
                    Public
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium">
                    <HugeiconsIcon icon={LockIcon} className="w-3 h-3" />
                    Private
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {collection.description}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2">
                <HugeiconsIcon icon={Bookmark01Icon} className="w-3.5 h-3.5" />
                <span>{collection.bookmarks.length} bookmarks</span>
              </div>
            </div>
          </div>

          <DropdownMenu
            items={[
              {
                label: "Edit Collection",
                icon: Edit02Icon,
                onClick: () => console.log("Edit"),
              },
              {
                label: "Share Collection",
                icon: Share01Icon,
                onClick: () => console.log("Share"),
              },
              {
                label: "Delete Collection",
                icon: Delete02Icon,
                onClick: () => console.log("Delete"),
                variant: "danger",
              },
            ]}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <HugeiconsIcon
            icon={Search01Icon}
            className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search in collection..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors">
          <HugeiconsIcon icon={FilterIcon} className="w-4 h-4" />
          Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-colors">
          <HugeiconsIcon icon={GridViewIcon} className="w-4 h-4" />
        </button>
      </div>

      {collection.bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <HugeiconsIcon
            icon={Bookmark01Icon}
            className="w-12 h-12 text-gray-300 mb-4"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No bookmarks yet
          </h3>
          <p className="text-sm text-gray-500">
            Add bookmarks to this collection to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {collection.bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onEdit={handleEdit}
              onDelete={(b) => console.log("Delete:", b)}
              onRemoveFromCollection={(b) => console.log("Remove from collection:", b)}
              onToggleFavorite={(b) => console.log("Toggle favorite:", b)}
              onCopyLink={(b) => navigator.clipboard.writeText(b.url)}
              onShare={(b) => console.log("Share:", b)}
            />
          ))}
        </div>
      )}

      <EditBookmarkModal
        isOpen={!!editingBookmark}
        bookmark={editingBookmark}
        availableTags={availableTags}
        onClose={() => setEditingBookmark(null)}
        onSave={handleSaveEdit}
        onCreateTag={handleCreateTag}
      />
    </div>
  );
}

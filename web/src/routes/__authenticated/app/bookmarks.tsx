import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, FilterIcon, GridViewIcon } from "@hugeicons/core-free-icons";
import { BookmarkCard, Bookmark } from "@/components/app/bookmark-card";
import { EditBookmarkModal } from "@/components/app/modals/edit-bookmark-modal";
import { useState } from "react";
import type { Tag } from "@/components/ui/tag-picker";

export const Route = createFileRoute("/__authenticated/app/bookmarks")({
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

const initialBookmarks: Bookmark[] = [
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
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "Rapidly build modern websites without ever leaving your HTML",
    favicon: "https://tailwindcss.com/favicons/favicon.ico",
    tags: ["css", "design"],
    createdAt: "2026-01-09",
  },
  {
    id: 3,
    title: "GitHub",
    url: "https://github.com",
    description: "Where the world builds software",
    favicon: "https://github.com/favicon.ico",
    tags: ["dev", "git"],
    createdAt: "2026-01-08",
  },
  {
    id: 4,
    title: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs/handbook",
    description:
      "The TypeScript Handbook is a comprehensive guide to the TypeScript language",
    favicon: "https://www.typescriptlang.org/favicon.ico",
    tags: ["typescript", "docs"],
    createdAt: "2026-01-07",
  },
  {
    id: 5,
    title: "Vercel",
    url: "https://vercel.com",
    description: "Develop. Preview. Ship.",
    favicon: "https://vercel.com/favicon.ico",
    tags: ["hosting", "deploy"],
    createdAt: "2026-01-06",
  },
];

function RouteComponent() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

  const handleEdit = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
  };

  const handleSaveEdit = (updatedBookmark: Bookmark) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === updatedBookmark.id ? updatedBookmark : b))
    );
  };

  const handleDelete = (bookmark: Bookmark) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmark.id));
  };

  const handleAddToCollection = (bookmark: Bookmark) => {
    console.log("Add to collection:", bookmark);
  };

  const handleToggleFavorite = (bookmark: Bookmark) => {
    console.log("Toggle favorite:", bookmark);
  };

  const handleCopyLink = (bookmark: Bookmark) => {
    navigator.clipboard.writeText(bookmark.url);
  };

  const handleShare = (bookmark: Bookmark) => {
    console.log("Share bookmark:", bookmark);
  };

  const handleCreateTag = (name: string) => {
    console.log("Creating tag:", name);
    // In a real app, this would create the tag and refresh the list
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Bookmarks</h1>
          <p className="text-sm text-gray-500 mt-1">
            {bookmarks.length} bookmarks
          </p>
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
            placeholder="Search bookmarks..."
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

      <div className="space-y-3">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddToCollection={handleAddToCollection}
            onToggleFavorite={handleToggleFavorite}
            onCopyLink={handleCopyLink}
            onShare={handleShare}
          />
        ))}
      </div>

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

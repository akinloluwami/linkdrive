import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, FilterIcon, GridViewIcon } from "@hugeicons/core-free-icons";
import { BookmarkCard } from "@/components/app/bookmark-card";
import { EditBookmarkModal } from "@/components/app/modals/edit-bookmark-modal";
import { AddToCollectionModal } from "@/components/app/modals/add-to-collection-modal";
import { useState } from "react";
import { useBookmarks, type Bookmark } from "@/stores/bookmarks";
import { useCollections } from "@/stores/collections";
import { useTags } from "@/stores/tags";

export const Route = createFileRoute("/__authenticated/app/bookmarks")({
  component: RouteComponent,
});

function RouteComponent() {
  const { bookmarks, updateBookmark, deleteBookmark, addToCollection } = useBookmarks();
  const { collections, addCollection } = useCollections();
  const { tags, addTag } = useTags();
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [addingToCollectionBookmark, setAddingToCollectionBookmark] = useState<Bookmark | null>(null);

  const handleEdit = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark);
  };

  const handleSaveEdit = (updatedBookmark: Bookmark) => {
    updateBookmark(updatedBookmark.id, updatedBookmark);
  };

  const handleDelete = (bookmark: Bookmark) => {
    deleteBookmark(bookmark.id);
  };

  const handleAddToCollection = (bookmark: Bookmark) => {
    setAddingToCollectionBookmark(bookmark);
  };

  const handleAddToCollectionConfirm = (bookmarkId: string, collectionId: string) => {
    addToCollection(bookmarkId, collectionId);
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
    const colors = ["#61dafb", "#3178c6", "#f7df1e", "#264de4", "#ff6b6b", "#10b981", "#8b5cf6", "#f59e0b"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    addTag({ name, color });
  };

  const handleCreateCollection = (name: string) => {
    const colors = ["#3b82f6", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#06b6d4", "#84cc16"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    addCollection({ 
      name, 
      description: "", 
      color, 
      isPublic: false 
    });
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
        availableTags={tags}
        onClose={() => setEditingBookmark(null)}
        onSave={handleSaveEdit}
        onCreateTag={handleCreateTag}
      />

      <AddToCollectionModal
        isOpen={!!addingToCollectionBookmark}
        bookmark={addingToCollectionBookmark}
        collections={collections}
        onClose={() => setAddingToCollectionBookmark(null)}
        onAddToCollection={handleAddToCollectionConfirm}
        onCreateCollection={handleCreateCollection}
      />
    </div>
  );
}

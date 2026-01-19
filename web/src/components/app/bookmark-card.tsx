import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  Calendar03Icon,
  Edit02Icon,
  Delete02Icon,
  FolderAddIcon,
  FolderRemoveIcon,
  StarIcon,
  Copy01Icon,
  Share01Icon,
} from "@hugeicons/core-free-icons";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import type { Bookmark } from "@/stores/bookmarks";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onEdit?: (bookmark: Bookmark) => void;
  onDelete?: (bookmark: Bookmark) => void;
  onAddToCollection?: (bookmark: Bookmark) => void;
  onRemoveFromCollection?: (bookmark: Bookmark) => void;
  onToggleFavorite?: (bookmark: Bookmark) => void;
  onCopyLink?: (bookmark: Bookmark) => void;
  onShare?: (bookmark: Bookmark) => void;
}

export function BookmarkCard({
  bookmark,
  onEdit,
  onDelete,
  onAddToCollection,
  onRemoveFromCollection,
  onToggleFavorite,
  onCopyLink,
  onShare,
}: BookmarkCardProps) {
  const menuItems = [
    ...(onEdit
      ? [
          {
            label: "Edit",
            icon: Edit02Icon,
            onClick: () => onEdit(bookmark),
          },
        ]
      : []),
    ...(onAddToCollection
      ? [
          {
            label: bookmark.collectionId ? "Change Collection" : "Add to Collection",
            icon: FolderAddIcon,
            onClick: () => onAddToCollection(bookmark),
          },
        ]
      : []),
    ...(onRemoveFromCollection
      ? [
          {
            label: "Remove from Collection",
            icon: FolderRemoveIcon,
            onClick: () => onRemoveFromCollection(bookmark),
          },
        ]
      : []),
    ...(onToggleFavorite
      ? [
          {
            label: "Add to Favorites",
            icon: StarIcon,
            onClick: () => onToggleFavorite(bookmark),
          },
        ]
      : []),
    ...(onCopyLink
      ? [
          {
            label: "Copy Link",
            icon: Copy01Icon,
            onClick: () => onCopyLink(bookmark),
          },
        ]
      : []),
    ...(onShare
      ? [
          {
            label: "Share",
            icon: Share01Icon,
            onClick: () => onShare(bookmark),
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            label: "Delete",
            icon: Delete02Icon,
            onClick: () => onDelete(bookmark),
            variant: "danger" as const,
          },
        ]
      : []),
  ];

  return (
    <div className="group p-4 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center shrink-0">
          <img
            src={bookmark.favicon}
            alt=""
            className="w-5 h-5"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 truncate">
                {bookmark.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <HugeiconsIcon
                  icon={Link01Icon}
                  className="w-3 h-3 text-gray-400"
                />
                <span className="text-xs text-gray-400 truncate">
                  {bookmark.url}
                </span>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu items={menuItems} />
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2 line-clamp-1">
            {bookmark.description}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1.5">
              {bookmark.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-400">
              <HugeiconsIcon icon={Calendar03Icon} className="w-3 h-3" />
              <span>{bookmark.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

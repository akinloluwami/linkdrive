import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Add01Icon,
  LabelImportantIcon,
  Bookmark01Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { CreateTagModal } from "../../../components/app/modals/create-tag-modal";

export const Route = createFileRoute("/__authenticated/app/tags")({
  component: RouteComponent,
});

const initialTags = [
  { id: 1, name: "react", bookmarkCount: 15, color: "#61dafb" },
  { id: 2, name: "typescript", bookmarkCount: 12, color: "#3178c6" },
  { id: 3, name: "javascript", bookmarkCount: 18, color: "#f7df1e" },
  { id: 4, name: "css", bookmarkCount: 9, color: "#264de4" },
  { id: 5, name: "design", bookmarkCount: 14, color: "#ff6b6b" },
  { id: 6, name: "tools", bookmarkCount: 8, color: "#10b981" },
  { id: 7, name: "docs", bookmarkCount: 22, color: "#8b5cf6" },
  { id: 8, name: "tutorial", bookmarkCount: 11, color: "#f59e0b" },
  { id: 9, name: "api", bookmarkCount: 7, color: "#ec4899" },
  { id: 10, name: "database", bookmarkCount: 5, color: "#06b6d4" },
  { id: 11, name: "hosting", bookmarkCount: 6, color: "#84cc16" },
  { id: 12, name: "security", bookmarkCount: 4, color: "#ef4444" },
];

function RouteComponent() {
  const [tags, setTags] = useState(initialTags);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateTags = (newTags: { name: string; color: string }[]) => {
    setTags((prev) => {
      let maxId = Math.max(...prev.map((t) => t.id));
      return [
        ...prev,
        ...newTags.map((tag) => ({
          id: ++maxId,
          name: tag.name,
          color: tag.color,
          bookmarkCount: 0,
        })),
      ];
    });
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
          <p className="text-sm text-gray-500 mt-1">{tags.length} tags</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl transition-colors font-medium text-sm"
        >
          <HugeiconsIcon icon={Add01Icon} className="w-4 h-4" />
          New Tag
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
            placeholder="Search tags..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="group flex items-center gap-3 px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl transition-colors cursor-pointer"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${tag.color}20` }}
            >
              <HugeiconsIcon
                icon={LabelImportantIcon}
                className="w-4 h-4"
                style={{ color: tag.color }}
              />
            </div>

            <div>
              <span className="font-medium text-gray-900 text-sm">
                #{tag.name}
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                <HugeiconsIcon icon={Bookmark01Icon} className="w-3 h-3" />
                <span>{tag.bookmarkCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateTagModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTags}
      />
    </div>
  );
}

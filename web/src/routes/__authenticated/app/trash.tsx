import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  MoreHorizontalIcon,
  Link01Icon,
  Delete03Icon,
  RotateClockwiseIcon,
  Calendar03Icon,
} from "@hugeicons/core-free-icons";

export const Route = createFileRoute("/__authenticated/app/trash")({
  component: RouteComponent,
});

const trashedBookmarks = [
  {
    id: 1,
    title: "Old Project Docs",
    url: "https://example.com/old-docs",
    description: "Documentation for an old project",
    favicon: "https://example.com/favicon.ico",
    deletedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Deprecated API Reference",
    url: "https://api.example.com/v1",
    description: "API reference for version 1",
    favicon: "https://api.example.com/favicon.ico",
    deletedAt: "5 days ago",
  },
  {
    id: 3,
    title: "Outdated Tutorial",
    url: "https://tutorial.example.com",
    description: "Tutorial that is no longer relevant",
    favicon: "https://tutorial.example.com/favicon.ico",
    deletedAt: "1 week ago",
  },
];

function RouteComponent() {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trash</h1>
          <p className="text-sm text-gray-500 mt-1">
            {trashedBookmarks.length} items in trash
          </p>
        </div>
        {trashedBookmarks.length > 0 && (
          <button className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-medium text-sm">
            <HugeiconsIcon icon={Delete03Icon} className="w-4 h-4" />
            Empty Trash
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <HugeiconsIcon
            icon={Search01Icon}
            className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search trash..."
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
          />
        </div>
      </div>

      {trashedBookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <HugeiconsIcon
              icon={Delete03Icon}
              className="w-8 h-8 text-gray-400"
            />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Trash is empty</h3>
          <p className="text-sm text-gray-500">
            Items you delete will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {trashedBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="group p-4 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center shrink-0 opacity-50">
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
                      <h3 className="font-medium text-gray-600 truncate">
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
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        className="p-1.5 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                        title="Restore"
                      >
                        <HugeiconsIcon
                          icon={RotateClockwiseIcon}
                          className="w-4 h-4"
                        />
                      </button>
                      <button
                        className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                        title="Delete permanently"
                      >
                        <HugeiconsIcon
                          icon={Delete03Icon}
                          className="w-4 h-4"
                        />
                      </button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-all">
                        <HugeiconsIcon
                          icon={MoreHorizontalIcon}
                          className="w-4 h-4 text-gray-500"
                        />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mt-2 line-clamp-1">
                    {bookmark.description}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-3">
                    <HugeiconsIcon icon={Calendar03Icon} className="w-3 h-3" />
                    <span>Deleted {bookmark.deletedAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  FilterIcon,
  GridViewIcon,
  MoreHorizontalIcon,
  Link01Icon,
  Calendar03Icon,
} from "@hugeicons/core-free-icons";

export const Route = createFileRoute("/__authenticated/app/bookmarks")({
  component: RouteComponent,
});

const bookmarks = [
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
          <div
            key={bookmark.id}
            className="group p-4 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl transition-colors"
          >
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
                  <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-lg transition-all">
                    <HugeiconsIcon
                      icon={MoreHorizontalIcon}
                      className="w-4 h-4 text-gray-500"
                    />
                  </button>
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
        ))}
      </div>
    </div>
  );
}

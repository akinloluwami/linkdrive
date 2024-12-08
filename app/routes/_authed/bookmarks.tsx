import { createFileRoute } from "@tanstack/react-router";
import BookmarkCard from "~/components/bookmark-card";
import NoLinks from "~/components/empty-states/no-links";
import { bookmarks } from "~/mock";

export const Route = createFileRoute("/_authed/bookmarks")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-medium text-accent mb-3">
        Welcome to LinkDrive
      </h1>
      {!bookmarks.length ? (
        <NoLinks />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {bookmarks.map((bookmark, i) => (
            <BookmarkCard key={i} {...bookmark} />
          ))}
        </div>
      )}
    </div>
  );
}

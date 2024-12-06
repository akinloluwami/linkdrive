import { createFileRoute } from "@tanstack/react-router";
import BookmarkCard from "~/components/BookmarkCard";
import NoLinks from "~/components/NoLinks";
import { bookmarks } from "~/mock";

export const Route = createFileRoute("/_authed/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
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

import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import BookmarkCard from "~/components/bookmark-card";
import NoLinks from "~/components/empty-states/no-links";
import Button from "~/components/ui/button";
import { bookmarks } from "~/mock";
import useGlobalModalStore from "~/stores/globalModalStore";

export const Route = createFileRoute("/_authed/bookmarks")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setActiveModal } = useGlobalModalStore();
  return (
    <div>
      <div className="flex items-center justify-between mt-6 mb-12">
        <h1 className="text-2xl font-medium text-accent mb-3">
          Welcome to LinkDrive
        </h1>
        <Button
          className="!w-fit px-6"
          onClick={() => setActiveModal("add-new-link")}
        >
          <Plus />
          Add Bookmark
        </Button>
      </div>
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

import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import BookmarkCard from "~/components/bookmark-card";
import NoLinks from "~/components/empty-states/no-links";
import Button from "~/components/ui/button";
import { bookmarks } from "~/mock";
import useGlobalModalStore from "~/stores/globalModalStore";
import { isDesktop } from "react-device-detect";

export const Route = createFileRoute("/_authed/bookmarks")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setActiveModal } = useGlobalModalStore();
  return (
    <div>
      <div className="flex items-center justify-between lg:mt-6 mt-1 lg:mb-12 mb-6">
        <h1 className="lg:text-2xl text-lg font-medium text-accent mb-3">
          Welcome to LinkDrive
        </h1>
        {isDesktop && (
          <Button
            className="!w-fit px-6"
            onClick={() => setActiveModal("add-new-link")}
          >
            <Plus />
            Add Bookmark
          </Button>
        )}
      </div>
      {!bookmarks.length ? (
        <NoLinks />
      ) : (
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
          {bookmarks.map((bookmark, i) => (
            <BookmarkCard key={i} {...bookmark} />
          ))}
        </div>
      )}
    </div>
  );
}

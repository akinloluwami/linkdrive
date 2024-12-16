import { createFileRoute } from "@tanstack/react-router";
import Bookmarks from "@/components/pages/bookmarks";

export const Route = createFileRoute("/_authed/bookmarks")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Bookmarks />;
}

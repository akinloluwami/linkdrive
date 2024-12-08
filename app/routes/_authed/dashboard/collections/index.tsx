import { createFileRoute } from "@tanstack/react-router";
import NoCollections from "~/components/empty-states/no-collections";

export const Route = createFileRoute("/_authed/dashboard/collections/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <NoCollections />
    </div>
  );
}

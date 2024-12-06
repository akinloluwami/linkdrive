import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard/collections")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>This is the collection page.</div>;
}

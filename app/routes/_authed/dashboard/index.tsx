import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>This is the dashboard page.</div>;
}

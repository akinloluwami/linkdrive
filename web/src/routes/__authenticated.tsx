import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/__authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}

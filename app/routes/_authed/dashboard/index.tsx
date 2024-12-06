import { createFileRoute } from "@tanstack/react-router";
import NoLinks from "~/components/NoLinks";

export const Route = createFileRoute("/_authed/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const links = [];
  return <div>{!links.length ? <NoLinks /> : <>here are the links</>}</div>;
}

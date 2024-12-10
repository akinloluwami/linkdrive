import { createFileRoute } from "@tanstack/react-router";
import NoCollections from "@/components/empty-states/no-collections";
import { collections } from "@/mock";
import CollectionCard from "@/components/collection-card";

export const Route = createFileRoute("/_authed/collections/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      {!collections.length ? (
        <NoCollections />
      ) : (
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
          {collections.map((collection, i) => (
            <CollectionCard key={i} {...collection} />
          ))}
        </div>
      )}
    </div>
  );
}

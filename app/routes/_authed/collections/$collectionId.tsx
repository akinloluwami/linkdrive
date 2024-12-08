import { createFileRoute } from '@tanstack/react-router'
import EmptyCollection from '~/components/empty-states/empty-collection'

export const Route = createFileRoute('/_authed/collections/$collectionId')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <EmptyCollection />
    </div>
  )
}

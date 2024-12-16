import { prisma } from '@/db'
import { auth } from '@/lib/auth'
import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'

export const APIRoute = createAPIFileRoute('/api/collections/create-default')({
  POST: async ({ request, params }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    })
    await prisma.collection.create({
      data: {
        name: 'default',
        userId: session?.user.id!,
        isDefault: true,
      },
    })

    return json({ message: 'Default collection created.' })
  },
})

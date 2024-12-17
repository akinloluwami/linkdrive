import { prisma } from "@/db";
import { auth } from "@/lib/auth";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import validator from "validator";

export const APIRoute = createAPIFileRoute("/api/bookmarks/$id")({
  PUT: async ({ request, params }) => {
    const id = params.id;
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    const { url } = await request.json();

    if (!validator.isURL(url)) {
      return json({ error: "Invalid URL" }, { status: 400 });
    }

    await prisma.link.update({
      where: {
        id,
        userId: session?.user.id!,
      },
      data: { url },
    });

    await prisma.activity.create({
      data: {
        action: "UPDATE",
        targetType: "LINK",
        targetId: id,
        userId: session?.user.id!,
      },
    });

    return json({ message: "Link updated successfully" });
  },
});

import { prisma } from "@/db";
import { auth } from "@/lib/auth";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { getLinkPreview } from "link-preview-js";

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const APIRoute = createAPIFileRoute("/api/bookmarks")({
  GET: async ({ request, params }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    const bookmarks = await prisma.link.findMany({
      where: { userId: session?.user.id! },
    });
    return json(bookmarks);
  },
  POST: async ({ request, params }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    const { url, collectionId } = await request.json();

    if (!url || !isValidUrl(url)) {
      return json({ error: "Invalid URL" }, { status: 400 });
    }

    let metadata: {
      title?: string;
      favicons?: string[];
      images?: string[];
    } = {};

    try {
      metadata = await getLinkPreview(url);
    } catch (error) {
      console.warn("Failed to fetch link preview:", error);
    }

    const newBookmark = await prisma.link.create({
      data: {
        url,
        userId: session?.user.id!,
        collectionId,
        title: metadata.title || "",
        favicon: metadata.favicons?.[0] || "",
        ogImage: metadata.images?.[0] || "",
      },
    });

    await prisma.activity.create({
      data: {
        action: "CREATE",
        targetType: "LINK",
        targetId: newBookmark.id,
        userId: session?.user.id!,
      },
    });

    return json({ message: "New bookmark added!", newBookmark });
  },
});

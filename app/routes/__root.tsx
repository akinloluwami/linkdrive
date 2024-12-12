import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import { useAppSession } from "@/utils/session";
import appStyles from "@/styles/app.css?url";

const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useAppSession();

  if (!session.data.userEmail) {
    return null;
  }

  return {
    email: session.data.userEmail,
  };
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "LinkDrive",
      },
    ],
    links: [{ rel: "stylesheet", href: appStyles }],
  }),

  notFoundComponent: () => <>404</>,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

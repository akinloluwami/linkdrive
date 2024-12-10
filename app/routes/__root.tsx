import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import type { ReactNode } from "react";
import "../main.css";
import { useAppSession } from "@/utils/session";
import { loginFn } from "./_authed";

const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useAppSession();

  console.log("====================================");
  console.log(session.data);
  console.log("====================================");

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
  }),
  beforeLoad: async () => {
    await loginFn();
    const user = await fetchUser();
    return { user };
  },
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
  const { user } = Route.useRouteContext();
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

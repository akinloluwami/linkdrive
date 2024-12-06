import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { useAppSession } from "~/utils/session";

export const loginFn = createServerFn().handler(async () => {
  const user = {
    email: "akinkunmi@gmail.com",
  };

  if (!user) {
    return {
      error: true,
      userNotFound: true,
      message: "User not found",
    };
  }

  const session = await useAppSession();

  await session.update({
    userEmail: user.email,
  });
});

export const Route = createFileRoute("/_authed")({
  loader: () => loginFn,
  beforeLoad: ({ context }) => {
    //@ts-ignore
    if (!context.user) {
      throw new Error("Not authenticated");
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === "Not authenticated") {
      return <div>Login</div>;
    }

    throw error;
  },
});

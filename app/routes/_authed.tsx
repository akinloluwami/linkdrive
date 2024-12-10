import { createFileRoute, Outlet } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import BottomTab from "@/components/globals/bottom-tab";
import GlobalModal from "@/components/globals/global-modal";
import GlobalSearch from "@/components/globals/global-search";
import Sidebar from "@/components/globals/sidebar";
import { useAppSession } from "@/utils/session";

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
  // loader: () => loginFn,
  // beforeLoad: ({ context }) => {
  //   //@ts-ignore
  //   if (!context.user) {
  //     throw new Error("Not authenticated");
  //   }
  // },
  // errorComponent: ({ error }) => {
  //   if (error.message === "Not authenticated") {
  //     return <div>Login</div>;
  //   }

  //   throw error;
  // },
  component: () => {
    return (
      <>
        <GlobalModal />
        <BottomTab />
        <div className="flex relative">
          <div className="hidden lg:block w-[30%] max-w-[270px]">
            <Sidebar />
          </div>
          <div className="w-full relative">
            <div className="bg-gray-100 w-full h-[60px] lg:px-10 px-5 flex items-center justify-between sticky top-0 right-0 inset-0">
              <GlobalSearch />
              <div className="size-12 rounded-full bg-accent/10 lg:flex items-center justify-center hidden">
                <img
                  src="https://api.dicebear.com/9.x/adventurer/svg?seed=Luis"
                  alt="avatar"
                  className="w-10"
                />
              </div>
            </div>
            <div className="lg:px-10 px-5 py-5 bg-gray-100/50 min-h-[90vh]">
              <Outlet />
            </div>
          </div>
        </div>
      </>
    );
  },
});

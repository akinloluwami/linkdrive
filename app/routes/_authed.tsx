import { createFileRoute, Outlet } from "@tanstack/react-router";
import GlobalModal from "@/components/global-modal";
import GlobalSearch from "@/components/global-search";
import Sidebar from "@/components/sidebar";
import BottomTab from "@/components/bottom-tab";
import { authClient } from "@/lib/auth-client";

const session = await authClient.getSession();

const isAuthenticated = () => {
  console.log(session);
  return !!session.data;
};

export const Route = createFileRoute("/_authed")({
  // beforeLoad: async ({ location }) => {
  //   if (!isAuthenticated()) {
  //     throw redirect({
  //       to: "/login",
  //       search: {
  //         redirect: location.href,
  //       },
  //     });
  //   }
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

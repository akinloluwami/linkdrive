import { createRootRoute, Outlet } from "@tanstack/react-router";
import GlobalModal from "~/components/global-modal";
import Sidebar from "~/components/sidebar";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <GlobalModal />
      <div className="flex relative">
        <div className="w-[30%] max-w-[270px]">
          <Sidebar />
        </div>
        <div className="w-full relative">
          <div className="bg-gray-100 w-full h-[60px] px-10 flex items-center sticky top-0 right-0 inset-0">
            <div className=""></div>
          </div>
          <div className="px-10 py-5 bg-gray-100/50 min-h-[90vh]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

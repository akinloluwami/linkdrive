import { createRootRoute, Outlet } from "@tanstack/react-router";
import GlobalModal from "~/components/GlobalModal";
import Sidebar from "~/components/Sidebar";
import Modal from "~/components/ui/Modal";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <GlobalModal />
      <div className="flex">
        <div className="w-[30%] max-w-[270px]">
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="bg-gray-100/20 w-full h-[60px] px-10 flex items-center justify-between sticky top-0 right-0">
            <div className=""></div>
          </div>
          <div className="px-10 py-5 bg-gray-100/50">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

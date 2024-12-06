import { createRootRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "~/components/Sidebar";
import * as Icons from "solar-icon-set";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex">
      <div className="w-[30%] max-w-[270px]">
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="bg-gray-100/20 w-full h-[60px] px-10 flex items-center justify-between fixed top-0 right-0">
          <div className=""></div>
          {/* <button className="w-fit px-8 rounded-4xl bg-accent text-white py-3 font-medium flex items-center justify-center gap-x-2 cursor-pointer">
            <Icons.AddCircle size={24} iconStyle="Linear" />
            Add new
          </button> */}
        </div>
        <div className="px-10 py-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

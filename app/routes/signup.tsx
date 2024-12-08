import { createFileRoute } from "@tanstack/react-router";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col bg-gray-100/50">
      <div className="w-[500px] h-fit rounded-2xl bg-white shadow p-5">
        <h1 className="font-semibold text-xl">Create a LinkDrive</h1>
        <div className="mt-5 space-y-4">
          <div className="">
            <p className="font-medium">Email</p>
            <Input />
          </div>
          <div className="">
            <p className="font-medium">Password</p>
            <Input type="password" />
          </div>
          <Button>Continue</Button>
        </div>
      </div>
    </div>
  );
}

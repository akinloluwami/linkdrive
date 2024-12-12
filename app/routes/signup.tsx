import { createFileRoute, Link } from "@tanstack/react-router";
import SignupForm from "@/components/auth/signup";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col bg-gray-100/50">
      <div className="w-[500px]">
        <SignupForm />
        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-accent hover:bg-accent/10 rounded-lg px-2 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PasswordInput from "@/components/ui/password-input";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      step: 0,
      description: "Your email and password",
      component: (
        <>
          <div className="">
            <p className="font-medium">Email</p>
            <Input type="email" />
          </div>
          <div className="">
            <p className="font-medium">Password</p>
            <PasswordInput />
          </div>
        </>
      ),
      onNext: () => setCurrentStep(1),
    },
    {
      step: 1,
      description: "Your name and username",
      component: (
        <>
          <div className="">
            <p className="font-medium">Name</p>
            <Input />
          </div>
          <div className="">
            <p className="font-medium">Username</p>
            <Input />
          </div>
        </>
      ),
      onNext: () => {
        setCurrentStep(2);
      },
    },
    {
      step: 2,
      description: "Enter OTP",
      component: (
        <>
          <Input />
        </>
      ),
      onNext: () => {
        setCurrentStep(2);
      },
    },
  ];

  const step = steps.find((s) => s.step === currentStep);

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col bg-gray-100/50">
      <div className="w-[500px]">
        <motion.div
          className="w-full h-fit rounded-2xl bg-white shadow p-5 mb-5"
          // layout
        >
          <h1 className="font-semibold text-xl">Create a LinkDrive</h1>
          <p className="text-gray-400">{step?.description}</p>

          <div className="mt-5 space-y-4">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {step?.component}
              </motion.div>
            </AnimatePresence>
            <Button onClick={() => step?.onNext()}>Continue</Button>
          </div>
        </motion.div>
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

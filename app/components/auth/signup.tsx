import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Input from "../ui/input";
import PasswordInput from "../ui/password-input";
import Button from "../ui/button";
import { authClient } from "@/lib/auth-client";
import Error from "../error";
import { useRouter } from "@tanstack/react-router";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const signupFn = async () => {
    setErrorMessage("");

    if (!name) {
      return setErrorMessage("Name is required");
    }

    if (!username) {
      return setErrorMessage("Username is required");
    }

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        username,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
          router.navigate({ to: "/bookmarks" });
        },
        onError: (ctx) => {
          switch (ctx.error.code) {
            case "PASSWORD_TOO_SHORT":
              setErrorMessage("Password must be at least 8 characters");
              break;
            default:
              setErrorMessage(ctx.error.message);
              break;
          }
        },
      }
    );
  };

  return (
    <motion.div
      className="w-full h-fit rounded-2xl bg-white shadow p-5 mb-5"
      // layout
    >
      <h1 className="font-semibold text-xl">Create a LinkDrive</h1>
      <p className="text-gray-400"></p>

      <div className="mt-5 space-y-4">
        <div className="">
          <p className="font-medium">Email</p>
          <Input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="">
          <p className="font-medium">Name</p>
          <Input onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="">
          <p className="font-medium">Username</p>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
          />
        </div>
        <div className="">
          <p className="font-medium">Password</p>
          <PasswordInput onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Error message={errorMessage} />
        <Button onClick={() => signupFn()} loading={loading}>
          Continue
        </Button>
      </div>
    </motion.div>
  );
};

export default SignupForm;

import React, { useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import { useRouter } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginFn = async () => {
    setErrorMessage("");
    await authClient.signIn.email(
      { email, password },
      {
        onRequest: () => {
          setLoading(true);
        },
        onResponse: () => {
          setLoading(false);
        },
        onSuccess: () => {
          router.navigate({ to: "/bookmarks" });
        },
        onError: (ctx) => {
          setErrorMessage(ctx.error.message);
        },
      }
    );
  };

  return (
    <>
      <div className="">
        <p className="font-medium">Email</p>
        <Input onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="">
        <p className="font-medium">Password</p>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={errorMessage}
        />
      </div>
      <Button onClick={loginFn} loading={loading}>
        Login
      </Button>
    </>
  );
};

export default LoginForm;

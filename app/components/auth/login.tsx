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

  const loginFn = async () => {
    const { data, error } = await authClient.signIn.email(
      { email, password },
      {
        onRequest: (ctx) => {
          setLoading(true);
          console.log("test...");
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard
          console.log(ctx);
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          console.log("failed...");
        },
        onResponse: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <>
      <div className="">
        <p className="font-medium">Email</p>
        <Input name="email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="">
        <p className="font-medium">Password</p>
        <Input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button onClick={loginFn} loading={loading}>
        Login
      </Button>
    </>
  );
};

export default LoginForm;

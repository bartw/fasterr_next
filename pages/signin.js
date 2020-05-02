import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useRedirectAuthenticated } from "../auth";
import Button from "../components/Button";
import ErrorFeedback from "../components/ErrorFeedback";
import FormElement from "../components/FormElement";
import Input from "../components/Input";
import InternalLink from "../components/InternalLink";
import Layout from "../components/Layout";

const SignIn = () => {
  useRedirectAuthenticated();

  const router = useRouter();
  const auth = useAuth();
  const [email, setEmail] = useState(router.query.email ?? "");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setHasError(false);
    setPending(true);

    auth.signIn({ email, password }).catch(({ code }) => {
      if (code === "UserNotConfirmedException") {
        router.push({
          pathname: "/confirm-signup",
          query: { email },
        });
        return;
      }

      setPending(false);
      setHasError(true);
    });
  };

  return (
    <Layout title="Sign in">
      <h2 className="text-2xl">Sign in to your account</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <FormElement label="Email">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />
        </FormElement>
        <FormElement label="Password" className="mt-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />
        </FormElement>
        <Button
          type="submit"
          state={pending ? "pending" : "default"}
          className="mt-8 w-full"
        >
          Sign in
        </Button>
        {hasError && <ErrorFeedback />}
      </form>
      <p className="mt-2 text-center text-sm">
        Don't have an account?{" "}
        <InternalLink href="/signup">Sign up</InternalLink>
      </p>
    </Layout>
  );
};

export default SignIn;

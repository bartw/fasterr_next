import React, { useState } from "react";
import { useRedirectAuthenticated } from "../auth";
import Button from "../components/Button";
import FormElement from "../components/FormElement";
import Input from "../components/Input";
import InternalLink from "../components/InternalLink";
import Layout from "../components/Layout";

const SignUp = () => {
  useRedirectAuthenticated();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Layout title="Sign up">
      <h2 className="text-2xl">Create your Fasterr account</h2>
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
          Create account
        </Button>
      </form>
      <p className="mt-2 text-center text-sm">
        Have an account? <InternalLink href="/signin">Sign in</InternalLink>
      </p>
    </Layout>
  );
};

export default SignUp;

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth, useRedirectAuthenticated } from "../auth";
import Button from "../components/Button";
import ErrorFeedback from "../components/ErrorFeedback";
import FormElement from "../components/FormElement";
import Input from "../components/Input";
import LinkButton from "../components/LinkButton";
import Layout from "../components/Layout";

const ConfirmSignUp = () => {
  useRedirectAuthenticated();

  const router = useRouter();
  const auth = useAuth();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [pending, setPending] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { email } = router.query;

  const handleSubmit = (e) => {
    e.preventDefault();

    setHasError(false);
    setPending(true);

    auth
      .confirmSignUp({ email, confirmationCode })
      .then(() => {
        router.push({
          pathname: "/signin",
          query: { email },
        });
      })
      .catch(() => {
        setPending(false);
        setHasError(true);
      });
  };

  const handleClick = () => {
    auth.resendConfirmationCode({ email }).catch(() => {});
  };

  return (
    <Layout title="Confirm Sign Up">
      <h2 className="text-2xl">Activate your account</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <FormElement label="Email">
          <Input type="email" placeholder="Email" value={email} disabled />
        </FormElement>
        <FormElement label="Confirmation code">
          <Input
            placeholder="Confirmation code"
            value={confirmationCode}
            onChange={setConfirmationCode}
          />
        </FormElement>
        <Button
          type="submit"
          state={pending ? "pending" : "default"}
          className="mt-8 w-full"
        >
          Activate account
        </Button>
        {hasError && <ErrorFeedback />}
      </form>
      <p className="mt-2 text-center text-sm">
        Didn't receive your code?{" "}
        <LinkButton onClick={handleClick}>Resend</LinkButton>
      </p>
    </Layout>
  );
};

export default ConfirmSignUp;

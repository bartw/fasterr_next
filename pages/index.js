import { useState, useEffect } from "react";
import Head from "next/head";
import Button from "../components/Button";

const Home = () => {
  const [pending, setPending] = useState(true);

  useEffect(() => {
    window.setTimeout(() => {
      setPending(false);
    }, 5000);
  }, []);

  return (
    <>
      <Head>
        <title>Fasterr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-2xl">Fasterr</h1>
        <Button state={pending ? "pending" : "default"}>Click Me</Button>
      </div>
    </>
  );
};

export default Home;

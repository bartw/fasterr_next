import React from "react";
import { useRedirectAuthenticated } from "../auth";
import ExternalLink from "../components/ExternalLink";
import Highlight from "../components/Highlight";
import NavLink from "../components/NavLink";
import ButtonNavLink from "../components/ButtonNavLink";
import Layout from "../components/Layout";

const Home = () => {
  useRedirectAuthenticated();

  return (
    <Layout
      title="Home"
      nav={
        <ul>
          <li className="inline-block">
            <NavLink href="/signin">Sign in</NavLink>
          </li>
          <li className="inline-block ml-4">
            <ButtonNavLink href="/signup">Sign up</ButtonNavLink>
          </li>
        </ul>
      }
    >
      <p className="mt-4">
        According to{" "}
        <ExternalLink
          href="https://en.wikipedia.org/wiki/Intermittent_fasting"
          label="intermittent fasting on wikipedia"
        >
          Wikipedia
        </ExternalLink>
        , <Highlight>intermittent fasting</Highlight>, also known as
        intermittent energy restriction, is an umbrella term for various meal
        timing schedules that cycle between voluntary fasting (or reduced
        calories intake) and non-fasting over a given period.
      </p>
      <p className="mt-2">
        Intermittent fasting may produce <Highlight>weight loss</Highlight>,{" "}
        <Highlight>reduce insulin resistance</Highlight>, and{" "}
        <Highlight>lower the risk of cardiometabolic diseases</Highlight>,
        although its long-term sustainability is unknown.
      </p>
      <p className="mt-2">
        <Highlight>Fasterr</Highlight> allows you to{" "}
        <Highlight>track</Highlight> your <Highlight>weight</Highlight> and your{" "}
        <Highlight>fasting cycles</Highlight>. This enables you to{" "}
        <Highlight>analyse</Highlight> if intermittent fasting is working for
        you.
      </p>
      <div className="my-12 text-center">
        <ButtonNavLink href="/signup">Sign up now</ButtonNavLink>
      </div>
      <p>
        Please <Highlight>consult a doctor</Highlight> before performing any
        kind of diet change including intermittent fasting. Fasterr{" "}
        <Highlight>only</Highlight> tracks and visualizes your weight and
        fasting cycles. It does <Highlight>not</Highlight> provide medical
        adivice.
      </p>
    </Layout>
  );
};

export default Home;

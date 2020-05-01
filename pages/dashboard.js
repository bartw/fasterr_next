import React from "react";
import { useAuth, useRedirectUnauthenticated } from "../auth";
import NavLinkButton from "../components/NavLinkButton";
import Layout from "../components/Layout";

const Dashboard = () => {
  useRedirectUnauthenticated();

  const auth = useAuth();

  return (
    <Layout
      title="Dashboard"
      nav={
        <ul>
          <li className="inline-block ml-4">
            <NavLinkButton
              onClick={() => {
                auth.signOut();
              }}
            >
              Sign out
            </NavLinkButton>
          </li>
        </ul>
      }
    >
      <h2 className="text-2xl">This is your dashboard!</h2>
    </Layout>
  );
};

export default Dashboard;

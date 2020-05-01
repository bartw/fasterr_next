import React from "react";
import { useAuth, useRedirectUnauthenticated } from "../auth";
import Button from "../components/Button";
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
            <Button
              onClick={() => {
                auth.signOut();
              }}
            >
              Sign out
            </Button>
          </li>
        </ul>
      }
    >
      <h2 className="text-2xl">This is your dashboard!</h2>
    </Layout>
  );
};

export default Dashboard;

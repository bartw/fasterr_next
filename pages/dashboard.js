import React, { useEffect } from "react";
import { useAuth, useRedirectUnauthenticated } from "../auth";
import NavLinkButton from "../components/NavLinkButton";
import Layout from "../components/Layout";

const Dashboard = () => {
  useRedirectUnauthenticated();

  const auth = useAuth();

  useEffect(() => {
    auth
      .token()
      .then((token) =>
        fetch("/api/dashboard", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
      )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

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

import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { useRedirectUnauthenticated } from "../auth";
import { useApolloClient } from "../graphql";
import NavLinkButton from "../components/NavLinkButton";
import Layout from "../components/Layout";
import Weight from "../components/Weight";

const Dashboard = () => {
  useRedirectUnauthenticated();

  const client = useApolloClient();

  if (!client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
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
        <Weight />
      </Layout>
    </ApolloProvider>
  );
};

export default Dashboard;

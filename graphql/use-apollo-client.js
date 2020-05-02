import { useState, useEffect } from "react";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { useAuth } from "../auth";

const useApolloClient = () => {
  const auth = useAuth();
  const [token, setToken] = useState(null);

  useEffect(() => {
    auth.token().then((token) => setToken(token));
  }, [auth]);

  if (!token) {
    return null;
  }

  const client = new ApolloClient({
    uri: "/api/graphql",
    request: (operation) => {
      operation.setContext({
        headers: { authorization: `Bearer ${token}` },
      });
    },
    cache: new InMemoryCache(),
  });

  return client;
};

export default useApolloClient;

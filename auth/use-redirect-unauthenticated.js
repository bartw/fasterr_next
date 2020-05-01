import Router from "next/router";
import useIsAuthenticated from "./use-is-authenticated";

const useRedirectUnauthenticated = () => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    Router.push("/");
  }
};

export default useRedirectUnauthenticated;

import Router from "next/router";
import useIsAuthenticated from "./use-is-authenticated";

const useRedirectAuthenticated = () => {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    Router.push("/dashboard");
  }
};

export default useRedirectAuthenticated;

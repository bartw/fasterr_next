import { useState, useEffect } from "react";
import useAuth from "./use-auth";

const useIsAuthenticated = () => {
  const auth = useAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(
    auth.isAuthenticated()
  );

  useEffect(
    () =>
      auth.onAuthStateChanged((isAuthenticated) => {
        setIsAuthenticated(isAuthenticated);
      }),
    [auth]
  );

  return isAuthenticated;
};

export default useIsAuthenticated;

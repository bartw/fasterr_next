import { useContext } from "react";
import AuthContext from "./context";

const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Auth is not available");
  }

  return auth;
};

export default useAuth;

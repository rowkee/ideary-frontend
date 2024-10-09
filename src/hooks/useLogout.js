import useAuthContext from "./useAuthContext";
import { useIdeasContext } from "./useIdeasContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: ideasDispatch } = useIdeasContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    ideasDispatch({ type: "SET_IDEAS", payload: null });
  };

  return { logout };
};

export default useLogout;

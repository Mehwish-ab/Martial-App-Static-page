import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

const useLoggedIn = () => {
  const { setShowSidebar } = useGlobalContext();
  const navigate = useNavigate();

  // login handler
  const useLoggedIn = () => {
    setShowSidebar(false);
    navigate("/login");
  };

  return useLoggedIn;
};

export default useLoggedIn;

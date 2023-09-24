import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const Home = () => {
  const loginData = useAppSelector((state) => state.loginData.data);
  return (
    <>
      <Navbar />
      {loginData && <Sidebar />}
      <Outlet />
    </>
  );
};

export default Home;

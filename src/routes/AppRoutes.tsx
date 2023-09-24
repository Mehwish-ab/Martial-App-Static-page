import { Routes, Route } from "react-router-dom";
import {
  Login,
  VerifyOtp,
  Dashboard,
  Home,
  CreateUser,
  ErrorPage404,
} from "../screens/pages";
import ForgetPassword from "../screens/ForgetPassword/ForgetPasword";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="register" element={<CreateUser />} />
      <Route path="forget-password" element={<ForgetPassword />} />
      {/* error page */}
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  );
}

export default AppRoutes;

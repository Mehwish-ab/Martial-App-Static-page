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
import Otp from "../screens/ForgetPassword/Otp/Otp";
import CreatePassword from "../screens/ForgetPassword/CreatePassword/CreatePassword";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<CreateUser />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/register/verify-otp" element={<Otp />} />
      <Route
        path="/register/create-new-password"
        element={<CreatePassword />}
      />

      {/* error page */}
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  );
}

export default AppRoutes;

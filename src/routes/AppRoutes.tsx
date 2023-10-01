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
import CustomSelects from "../components/CustomSelect/CustomSelects";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setLanguage } from "../redux/features/selectedLanguageSlice";

function AppRoutes() {
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    dispatch(setLanguage(value));
  };
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );
  return (
    <>
      <div className="language-select">
        <div className="language-select-inner">
          <Select
            defaultValue={selectedLanguage}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "en", label: "English" },
              { value: "es", label: "Spanish (Español)" },
              { value: "pt", label: "Portuguese" },
              { value: "ar", label: "Arabic (العربية)" },
              { value: "ur", label: "Urdu (اردو)" },
            ]}
          />
        </div>
      </div>
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
    </>
  );
}

export default AppRoutes;

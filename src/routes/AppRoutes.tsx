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
import CreateSchool from "../screens/CreateSchool/CreateSchool";
import Layout from "antd/lib/layout/layout";
import AppLayout from "../components/Layout/Layout";
// import { loginData } from "../App";
import { lazy, useEffect } from "react";
import { local_storage_admin_key } from "../utils/axios.utils";
import EditSchool from "../screens/CreateSchool/EditSchool/EditSchool";
import CreateBranch from "../screens/Branches/CreateBranch/CreateBranch";
import EditBranch from "../screens/Branches/EditBranch/EditBranch";
import ListBranch from "../screens/Branches/ListBranch/ListBranch";
import ListFranchise from "../screens/Franchise/ListFranchise/ListFranchise";
import CreateFranchise from "../screens/Franchise/CreateFranchise/CreateFranchise";
import EditFranchise from "../screens/Franchise/EditFranchise/EditFranchise";
import ViewBranch from "../screens/Branches/ViewBranch/ViewBranch";
import ViewFranchise from "../screens/Franchise/ViewFranchise/ViewFranchise";
import SubscribeFranchise from "../screens/Franchise/SubscribeFranchise/SubscribeFranchise";
import ListInstructor from "../screens/Instructor/ListInstructor/ListInstructor";
import CreateInstructor from "../screens/Instructor/CreateInstructor/CreateInstructor";
import InformationInstructor from "../screens/Instructor/InformationInstructor/InformationInstructor";

function AppRoutes() {
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    dispatch(setLanguage(value));
  };
  const { selectedLanguage } = useSelector(
    (state: RootState) => state.selectedLanguage
  );

  return (
    <>
      {/* <div className="language-select">
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
      </div> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/register/verify-otp" element={<Otp />} />
        <Route
          path="/register/create-new-password"
          element={<CreatePassword />}
        />

        <Route
          path={"/"}
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />
        <Route
          path="/school/create"
          element={
            <AppLayout>
              <CreateSchool />
            </AppLayout>
          }
        />
        <Route
          path="/school/edit/:schoolId"
          element={
            <AppLayout>
              <EditSchool />
            </AppLayout>
          }
        />
        <Route
          path="/branch/list"
          element={
            <AppLayout>
              <ListBranch />
            </AppLayout>
          }
        />
        <Route
          path="/branch/create"
          element={
            <AppLayout>
              <CreateBranch />
            </AppLayout>
          }
        />

        <Route
          path="/branch/edit/:branchId"
          element={
            <AppLayout>
              <EditBranch />
            </AppLayout>
          }
        />
        <Route
          path="/branch/view/:branchId"
          element={
            <AppLayout>
              <ViewBranch />
            </AppLayout>
          }
        />
        <Route
          path="/franchise/list"
          element={
            <AppLayout>
              <ListFranchise />
            </AppLayout>
          }
        />

        <Route
          path="/franchise/create"
          element={
            <AppLayout>
              <CreateFranchise />
            </AppLayout>
          }
        />

        <Route
          path="/franchise/edit/:franchiseId"
          element={
            <AppLayout>
              <EditFranchise />
            </AppLayout>
          }
        />

        <Route
          path="/franchise/view/:franchiseId"
          element={
            <AppLayout>
              <ViewFranchise />
            </AppLayout>
          }
        />
        <Route
          path="/franchise/subscribe/:franchiseId"
          element={
            <AppLayout>
              <SubscribeFranchise />
            </AppLayout>
          }
        />

        <Route
          path="/instructor/list"
          element={
            <AppLayout>
              <ListInstructor />
            </AppLayout>
          }
        />

        <Route
          path="/instructor/create"
          element={
            <AppLayout>
              <CreateInstructor />
            </AppLayout>
          }
        />

        <Route
          path="/instructor/update"
          element={
            <AppLayout>
              <CreateInstructor />
            </AppLayout>
          }
        />

        <Route
          path="/instructor"
          element={
            <AppLayout>
              <InformationInstructor />
            </AppLayout>
          }
        />

        {/* error page */}
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </>
  );
}

export default AppRoutes;

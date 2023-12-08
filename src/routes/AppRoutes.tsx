import { Routes, Route } from "react-router-dom";
import {
  Login,
  Home,
  CreateUser,
  ErrorPage404,
} from "../screens/pages";
import ForgetPassword from "../screens/ForgetPassword/ForgetPasword";
import Otp from "../screens/ForgetPassword/Otp/Otp";
import CreatePassword from "../screens/ForgetPassword/CreatePassword/CreatePassword";
// import { setLanguage } from "../redux/features/selectedLanguageSlice";
import CreateSchool from "../screens/CreateSchool/CreateSchool";
import AppLayout from "../components/Layout/Layout";
import EditSchool from "../screens/CreateSchool/EditSchool/EditSchool";
import CreateBranch from "../screens/Branches/CreateBranch/CreateBranch";
import EditBranch from "../screens/Branches/EditBranch/EditBranch";
import ListBranch from "../screens/Branches/ListBranch/ListBranch";
import ListFranchise from "../screens/Franchise/ListFranchise/ListFranchise";
import CreateFranchise from "../screens/Franchise/CreateFranchise/CreateFranchise";
import EditFranchise from "../screens/Franchise/EditFranchise/EditFranchise";
import ViewFranchise from "../screens/Franchise/ViewFranchise/ViewFranchise";
import SubscribeFranchise from "../screens/Franchise/SubscribeFranchise/SubscribeFranchise";
import ListInstructor from "../screens/Instructor/ListInstructor/ListInstructor";
import CreateInstructor from "../screens/Instructor/CreateInstructor/CreateInstructor";
import InformationInstructor from "../screens/Instructor/InformationInstructor/InformationInstructor";
import ListTimeTable from "../screens/TimeTable/ListTimeTable/ListTimeTable";
import CreateTimeTable from "../screens/TimeTable/CreateTimeTable/createTimeTable";
import InformationTimeTable from "../screens/TimeTable/InformationTimeTable/InformationTimeTable";
import ViewSchool from "../screens/CreateSchool/ViewSchool/ViewSchool";
import CreateMembership from "../screens/Membership/CreateMembership/CreateMembership";
import ListMembership from "../screens/Membership/ListMembership/ListMembership";
import ListClass from "../screens/Class/ListClasses/ListClasses";
import CreateClass from "../screens/Class/CreateClasses/CreateClass";
import UpdateClass from "../screens/Class/UpdateClass/UpdateClass";
import BranchInformation from "../screens/Branches/BranchInformation/BranchInformation";
import AddPaymentSchool from "../screens/CreateSchool/AddPaymentSchool/AddPaymentSchool";
import AddPaymentFranchise from "../screens/Franchise/AddPaymentFranchise/AddPaymentFranchise";
import SchoolFranchise from "../screens/Franchise/SchoolFranchise/SchoolFranchise";
import AddPaymentBranch from "../screens/Branches/AddPaymentBranch/AddPaymentBranch";
import ProfileMembership from "../screens/Membership/ProfileMembership/ProfileMembership";
import ListTransactionHistort from "../screens/TransactionHistory/ListTransactionHistory/ListTransactionHistory";
import ListRules from "../screens/Rules/ListRules/ListRules";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store";

function AppRoutes() {
  // const dispatch = useDispatch();
  // const handleChange = (value: string) => {
  //   dispatch(setLanguage(value));
  // };
  // const { selectedLanguage } = useSelector(
  //   (state: RootState) => state.selectedLanguage
  // );

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
          path="/school/view"
          element={
            <AppLayout>
              <ViewSchool />
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
          path="/school/add-payment-information"
          element={
            <AppLayout>
              <AddPaymentSchool />
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
          path="/branch/information"
          element={
            <AppLayout>
              <BranchInformation />
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
              <BranchInformation />
            </AppLayout>
          }
        />

        <Route
          path="/branch/add-payment-information/:branchId"
          element={
            <AppLayout>
              <AddPaymentBranch />
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
          path="/franchise/add-payment-information/:franchiseId"
          element={
            <AppLayout>
              <AddPaymentFranchise />
            </AppLayout>
          }
        />
        <Route
          path="/franchise/school-franchise"
          element={
            <AppLayout>
              <SchoolFranchise />
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
          path="/instructor/view/:instructorId"
          element={
            <AppLayout>
              <InformationInstructor />
            </AppLayout>
          }
        />

        <Route
          path="/timetable/list"
          element={
            <AppLayout>
              <ListTimeTable />
            </AppLayout>
          }
        />

        <Route
          path="/timetable/create"
          element={
            <AppLayout>
              <CreateTimeTable />
            </AppLayout>
          }
        />

        <Route
          path="/timetable/information"
          element={
            <AppLayout>
              <InformationTimeTable />
            </AppLayout>
          }
        />
        <Route
          path="/membership/create"
          element={
            <AppLayout>
              <CreateMembership />
            </AppLayout>
          }
        />
        <Route
          path="/membership/list"
          element={
            <AppLayout>
              <ListMembership />
            </AppLayout>
          }
        />
        <Route
          path="/membership/school-profile"
          element={
            <AppLayout>
              <ProfileMembership />
            </AppLayout>
          }
        />
        <Route
          path="/class/create"
          element={
            <AppLayout>
              <CreateClass />
            </AppLayout>
          }
        />
        <Route
          path="/class/update/:id"
          element={
            <AppLayout>
              <UpdateClass />
            </AppLayout>
          }
        />
        <Route
          path="/class/list"
          element={
            <AppLayout>
              <ListClass />
            </AppLayout>
          }
        />
        <Route
          path="/transaction-history/list"
          element={
            <AppLayout>
              <ListTransactionHistort />
            </AppLayout>
          }
        />
        <Route
          path="/rules/list"
          element={
            <AppLayout>
              <ListRules />
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

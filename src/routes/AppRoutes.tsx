import { Routes, Route } from 'react-router-dom'
import { Login, Home, CreateUser, ErrorPage404 } from '../screens/pages'
import ForgetPassword from '../screens/ForgetPassword/ForgetPasword'
import Otp from '../screens/ForgetPassword/Otp/Otp'
import CreatePassword from '../screens/ForgetPassword/CreatePassword/CreatePassword'
// import { setLanguage } from "../redux/features/selectedLanguageSlice";
import CreateSchool from '../screens/CreateSchool/CreateSchool'
import AppLayout from '../components/Layout/Layout'
import EditSchool from '../screens/CreateSchool/EditSchool/EditSchool'
import CreateBranch from '../screens/Branches/CreateBranch/CreateBranch'
import EditBranch from '../screens/Branches/EditBranch/EditBranch'
import ListBranch from '../screens/Branches/ListBranch/ListBranch'
import ListFranchise from '../screens/Franchise/ListFranchise/ListFranchise'
import CreateFranchise from '../screens/Franchise/CreateFranchise/CreateFranchise'
import EditFranchise from '../screens/Franchise/EditFranchise/EditFranchise'
import ViewFranchise from '../screens/Franchise/ViewFranchise/ViewFranchise'
import SubscribeFranchise from '../screens/Franchise/SubscribeFranchise/SubscribeFranchise'
import ListInstructor from '../screens/Instructor/ListInstructor/ListInstructor'
import CreateInstructor from '../screens/Instructor/CreateInstructor/CreateInstructor'
import InformationInstructor from '../screens/Instructor/InformationInstructor/InformationInstructor'
import ListTimeTable from '../screens/TimeTable/ListTimeTable/ListTimeTable'
// import CreateTimeTable from '../screens/TimeTable/CreateTimeTable/createTimeTable'
import InformationTimeTable from '../screens/TimeTable/InformationTimeTable/InformationTimeTable'
import ViewSchool from '../screens/CreateSchool/ViewSchool/ViewSchool'
import MembershipCardView from '../screens/Membership/MembershipCards/MembershipCardView'
import CreateMembership from '../screens/Membership/CreateMembership/CreateMembership'
import ListMembership from '../screens/Membership/ListMembership/ListMembership'
import ListClass from '../screens/Class/ListClasses/ListClasses'
import CreateClass from '../screens/Class/CreateClasses/CreateClass'
import UpdateClass from '../screens/Class/UpdateClass/UpdateClass'
import BranchInformation from '../screens/Branches/BranchInformation/BranchInformation'
import AddPaymentSchool from '../screens/CreateSchool/AddPaymentSchool/AddPaymentSchool'
import AddPaymentFranchise from '../screens/Franchise/AddPaymentFranchise/AddPaymentFranchise'
import SchoolFranchise from '../screens/Franchise/SchoolFranchise/SchoolFranchise'
// import AddPaymentBranch from '../screens/Branches/AddPaymentBranch/AddPaymentBranch'
import ListTransactionHistort from '../screens/TransactionHistory/ListTransactionHistory/ListTransactionHistory'
import ListRules from '../screens/Rules/ListRules/ListRules'
import MainSettingPage from '../screens/SettingsPage/MainSettingPage/MainSettingPage'
import TabsSetting from '../screens/SettingsPage/SettingTabs/TabsSetting'
import Terms from '../screens/Terms/terms'
import Privacy from '../screens/Privacy/privacy'
import HelpSupport from '../screens/HelpSupport/helpSupport'
import Language from '../screens/LanguagePage/Language'
import Currency from '../screens/CurrencyPage/Currency'
import UpdateInstructor from '../screens/Instructor/UpdateInstructor/UpdateInstructor'
import ViewBranch from '../screens/Branches/ViewBranch/ViewBranch'
import AddPaymentInfo from '../screens/Branches/BranchPayment/AddPaymentinfo'
import TimeTableForm from '../screens/TimeTable/CreateTimeTable/TimeTableForm'
import TimeTableSheet from '../screens/TimeTable/CreateTimeTable/TimeTableSheet'
import { useState } from 'react'
import EditTimeTable from '../screens/TimeTable/EditTimeTable/EditTimeTable'
import ViewClass from '../screens/Class/ViewClass/ViewClass'
import UpdateMembership from '../screens/Membership/UpdateMembership/UpdateMembership'
import ViewMembership from '../screens/Membership/ViewMembership/ViewMembership'
import NewTimeTable from '../screens/TimeTable/NewTimeTableCreate/NewTimeTableCreate'
import ListSchool from '../screens/CreateSchool/ListSchool/ListSchool'
import UserList from '../screens/UserList/UserList'
import ListRoom from '../screens/Rooms/ListRoom/ListRoom'
import CreateRoom from '../screens/Rooms/CreateRoom/CreateRoom'
// import { RootState } from "../redux/store";

function AppRoutes(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [NewTimetable, setNewtimetable] = useState<any>()

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
                <Route path="/forgot-password" element={<ForgetPassword />} />
                <Route path="/register/verify-otp" element={<Otp />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route
                    path="/register/create-new-password"
                    element={<CreatePassword />}
                />
                <Route
                    path={'/'}
                    element={
                        <AppLayout>
                            <Home />
                        </AppLayout>
                    }
                />
                <Route
                    path="/user/list"
                    element={
                        <AppLayout>
                            <UserList />
                        </AppLayout>
                    }
                />
                <Route
                    path="/school/list"
                    element={
                        <AppLayout>
                            <ListSchool />
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
                    path="/school/view/:schoolId"
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
                    path="/school/add-payment-information/:schoolId"
                    element={
                        <AppLayout>
                            <AddPaymentSchool />
                        </AppLayout>
                    }
                />
                <Route
                    path="/school/add-payment-information/:schoolId"
                    element={
                        <AppLayout>
                            <AddPaymentSchool />
                        </AppLayout>
                    }
                />
                <Route
                    path="/room/list"
                    element={
                        <AppLayout>
                            <ListRoom />
                        </AppLayout>
                    }
                />
                <Route
                    path="/room/create"
                    element={
                        <AppLayout>
                            <CreateRoom />
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
                            {/* <BranchInformation /> */}
                            <ViewBranch />
                        </AppLayout>
                    }
                />
                <Route
                    path="/branch/add-payment-information/:branchId"
                    element={
                        <AppLayout>
                            {/* <AddPaymentBranch /> */}
                            <AddPaymentInfo />
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
                    path="/instructor/view/:instructorId"
                    element={
                        <AppLayout>
                            <InformationInstructor />
                        </AppLayout>
                    }
                />
                <Route
                    path="/instructor/edit/:instructorId"
                    element={
                        <AppLayout>
                            <UpdateInstructor />
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
                            <TimeTableForm setNewTimetable={setNewtimetable} />
                        </AppLayout>
                    }
                />
                {/* <Route
                    path="/timetable/slots/:timeTableId"
                    element={
                        <AppLayout>
                            <TimeTableSheet />
                        </AppLayout>
                    }
                /> */}
                <Route
                    path="/timetable/slots/:timeTableId"
                    element={
                        <AppLayout>
                            <NewTimeTable />
                        </AppLayout>
                    }
                />
                <Route
                    path="/timetable/slotss/:timeTableId"
                    element={
                        <AppLayout>
                            <TimeTableSheet />
                        </AppLayout>
                    }
                />
                <Route
                    path="/timetable/information/:timeTableId"
                    element={
                        <AppLayout>
                            <InformationTimeTable />
                        </AppLayout>
                    }
                />
                <Route
                    path="/timetable/edit/:timeTableId"
                    element={
                        <AppLayout>
                            <EditTimeTable />
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
                    path="/membership/update"
                    element={
                        <AppLayout>
                            <UpdateMembership />
                        </AppLayout>
                    }
                />
                <Route
                    path="/membership/information/:memberShipPlanId"
                    element={
                        <AppLayout>
                            <ViewMembership />
                        </AppLayout>
                    }
                />
                <Route
                    path="/membership/classes"
                    element={
                        <AppLayout>
                            <MembershipCardView />
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
                    path="/class/update/:classId"
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
                    path="/class/view/:classId"
                    element={
                        <AppLayout>
                            <ViewClass />
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
                <Route
                    path="/settings"
                    element={
                        <AppLayout>
                            <MainSettingPage />
                        </AppLayout>
                    }
                />
                <Route
                    path="/settings/tabs"
                    element={
                        <AppLayout>
                            <TabsSetting />
                        </AppLayout>
                    }
                />
                <Route
                    path="/help-support"
                    element={
                        <AppLayout>
                            <HelpSupport />
                        </AppLayout>
                    }
                />
                <Route
                    path="/language"
                    element={
                        <AppLayout>
                            <Language />
                        </AppLayout>
                    }
                />
                <Route
                    path="/currency"
                    element={
                        <AppLayout>
                            <Currency />
                        </AppLayout>
                    }
                />

                {/* error page */}
                <Route path="*" element={<ErrorPage404 />} />
            </Routes>
        </>
    )
}

export default AppRoutes

import { configureStore } from '@reduxjs/toolkit'
import locationSlice from './features/location/locationSlice'
import appDataSlice from './features/appDataSlice'
import loginDataSlice from './features/loginDataSlice'
import userDetailsSlice from './features/admin/user/userDetailsSlice'
import updateUserStatusSlice from './features/admin/user/updateUserStatusSlice'
import updateUserSlice from './features/admin/user/updateUserSlice'
import userProfileSlice from './features/admin/user/userProfileDetailsSlice'
import screenTranslationSlice from './features/screenTranslationSlice'
import selectedLanguageSlice from './features/selectedLanguageSlice'
import dashboardDataSlice from './features/dashboard/dashboardDataSlice'
import branchSlice from './features/branch/branchSlice'
import timeTableSlice from './features/TimeTable/TimeTableSlice'
import instructorSlice from './features/instructor/instructorSlice'
import MembershipSlice from './features/Membership/MembershipSlice'
import ClassSlice from './features/CLasses/ClassSlice'
import franchiseSlice from './features/franchise/franchiseSlice'
import RoomSlice from './features/Room/RoomSlice'
import UserSlice from './features/User/UserSlice'
import activitySlice from './features/activity/activitySlice'
const store = configureStore({
    reducer: {
        userLocation: locationSlice,
        appData: appDataSlice,
        loginData: loginDataSlice,
        userDetails: userDetailsSlice,
        userProfileDetails: userProfileSlice,
        updateUserStatus: updateUserStatusSlice,
        updateUser: updateUserSlice,
        translations: screenTranslationSlice,
        selectedLanguage: selectedLanguageSlice,
        dashboardData: dashboardDataSlice,
        branchData: branchSlice,
        timeTableData: timeTableSlice,
        instructorData: instructorSlice,
        MembershipData: MembershipSlice,
        ClassData: ClassSlice,
        franchiseData: franchiseSlice,
        RoomData: RoomSlice,
        UserData: UserSlice,
        activityData: activitySlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./features/location/locationSlice";
import appDataSlice from "./features/appDataSlice";
import loginDataSlice from "./features/loginDataSlice";
import userDetailsSlice from "./features/admin/user/userDetailsSlice";
import updateUserStatusSlice from "./features/admin/user/updateUserStatusSlice";
import updateUserSlice from "./features/admin/user/updateUserSlice";
import userProfileSlice from "./features/admin/user/userProfileDetailsSlice";
import screenTranslationSlice from "./features/screenTranslationSlice";
import selectedLanguageSlice from "./features/selectedLanguageSlice";

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
    selectedLanguage: selectedLanguageSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

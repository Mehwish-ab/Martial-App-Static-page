import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url, get_school_by_user_id_url } from "../../../utils/api_urls";
import { loginData } from "../../../App";
import { authorizationToken } from "../../../utils/api_urls";
import store from "../../store";
import { loginDataTypes } from "../types";
export interface SchoolDataType {
  schoolId: number;
  userId: number;
  businessName: string;
  businessType: number | string;
  address: string;
  phoneNumber: string;
  rank: boolean;
  defaultLanguageId: number;
  defaultCurrencyId: number;
  activities: string;
  facilities: string;
  description: string;
  stripePublicKey: string;
  stripeSecretKey: string;
  gclAccessToken: string;
  gclClientId: string;
  gclWebHook: string;
  gclClientSecret: string;
  bannerPicture: string | null | undefined;
  profilePicture: string | null | undefined;
  emailAddress: string;
}

export interface DashboardDataInitialState {
  schoolData: SchoolDataType;
  loading: boolean;
  error: string | undefined;
}

const initialState: DashboardDataInitialState = {
  schoolData: {
    schoolId: 0,
    userId: 0,
    businessName: "",
    businessType: "0",
    address: "",
    phoneNumber: "",
    rank: false,
    defaultCurrencyId: 0,
    defaultLanguageId: 0,
    activities: "",
    facilities: "",
    description: "",
    stripePublicKey: "",
    stripeSecretKey: "",
    gclAccessToken: "",
    gclClientId: "",
    gclWebHook: "",
    gclClientSecret: "",
    bannerPicture: "",
    profilePicture: "",
    emailAddress: "",
  },
  loading: false,
  error: "",
};

const dashboardDataSlice = createSlice({
  name: "dashboardData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSchoolByUserId.pending, (state, action) => {
        state.schoolData = initialState.schoolData;
        state.loading = true;
        state.error = "";
      })
      .addCase(getSchoolByUserId.fulfilled, (state, action) => {
        state.schoolData = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getSchoolByUserId.rejected, (state, action) => {
        console.log("action.error", action);
        state.schoolData = initialState.schoolData;
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const getSchoolByUserId = createAsyncThunk(
  "dashboardData/getSchoolByUserId", // Use the correct action type
  async (thunkAPI) => {
    // const userDetails: any = thunkAPI.getState().state.loginData.userDetails;
    const state = store.getState();
    try {
      const { data } = await axios.post(
        `${base_url}${get_school_by_user_id_url}`,
        {
          userId: state.loginData?.data?.userDetails?.id,
        },
        {
          headers: {
            ...authorizationToken(state.loginData?.data as loginDataTypes),
          },
        }
      );
      return data.results;
    } catch (error: any) {
      if (error.response && error.response.data) {
        let obj = {
          name: "AxiosError",
          message: error.response.data?.responseMessage,
          code: "ERR_BAD_RESPONSE",
        };
        throw obj;
      }
      throw error;
    }
  }
);

export default dashboardDataSlice.reducer;

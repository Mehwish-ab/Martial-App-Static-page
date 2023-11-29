import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../store";
import { base_url, get_branch_by_school_id_url } from "../../../utils/api_urls";
import { loginDataTypes } from "../types";
import { authorizationToken } from "../../../utils/api_urls";

export interface FranchiseDataType {
  franchiseId: number;
  schoolId: number;
  branchName: string;
  branchType: number | string;
  address: string;
  phoneNumber: string;
  defaultLanguageId: number;
  defaultCurrencyId: number;
  belts: boolean;
  ranks: boolean;
  schoolStripeMethod: boolean;
  schoolGclMethod: boolean;
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
  status: string;
  paymentMethod: string;
  accountNumber: string;
  countryName: string;
  mode: string;






}
export interface GetBranchBySchoolResTypes {
  data: FranchiseDataType[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
export interface franchiseDataInitialState {
  franchiseData: GetBranchBySchoolResTypes;
  loading: boolean;
  error: string | undefined;
}
const initialState: franchiseDataInitialState = {
  franchiseData: {
    data: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  },
  loading: false,
  error: "",
};
const franchiseSlice = createSlice({
  name: "franchiseData",
  initialState,
  reducers: {
    updateFranchise: (state, action) => {
      const updatedBranch: FranchiseDataType = action.payload;
      const index = state.franchiseData.data.findIndex(
        (b) => b.franchiseId === updatedBranch.franchiseId
      );
      state.franchiseData.data[index] = updatedBranch;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBranchBySchoolId.pending, (state, action) => {
        state.franchiseData = initialState.franchiseData;
        state.loading = true;
        state.error = "";
      })
      .addCase(getBranchBySchoolId.fulfilled, (state, action) => {
        state.franchiseData = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getBranchBySchoolId.rejected, (state, action) => {
        console.log("action.error", action);
        state.franchiseData = initialState.franchiseData;
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const getBranchBySchoolId = createAsyncThunk(
  "franchiseData/getBranchBySchoolId",
  async () => {
    const state = store.getState();
    console.log("state", state);
    try {
      const { data } = await axios.post(
        `${base_url}${get_branch_by_school_id_url}`,
        {
          schoolId:
            state.loginData.data?.schoolId ||
            state.dashboardData.schoolData.schoolId,
        },
        {
          headers: {
            ...authorizationToken(state.loginData.data as loginDataTypes),
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

export const { updateFranchise } = franchiseSlice.actions;

export default franchiseSlice.reducer;

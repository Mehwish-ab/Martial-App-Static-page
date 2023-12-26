import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../store";
import { base_url, get_branch_by_school_id_url } from "../../../utils/api_urls";
import { loginDataTypes } from "../types";
import { authorizationToken } from "../../../utils/api_urls";

export interface MembershipDataType {
  MembershipId: number;
  MembershipTitle: string;
  MembershipVisibility: string;
  MembershipExpires: string;
  MembershipPrice: number;
  MembershipStatus: string;
  MemberShipPicture: string | null | undefined;
}

export interface GetBranchBySchoolResTypes {
  data: MembershipDataType[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  MemberShipPicture: string;
}

export interface MembershipDataInitialState {
  MembershipData: GetBranchBySchoolResTypes;
  loading: boolean;
  error: string | undefined;
}

const initialState: MembershipDataInitialState = {
  MembershipData: {
    data: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    MemberShipPicture: "",
  },
  loading: false,
  error: "",
};
const MembershipSlice = createSlice({
  name: "instructorData",
  initialState,
  reducers: {
    updateInstructor: (state, action) => {
      const updateInstructor: MembershipDataType = action.payload;
      const index = state.MembershipData.data.findIndex(
        (b) => b.MembershipId === updateInstructor.MembershipId
      );
      state.MembershipData.data[index] = updateInstructor;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBranchBySchoolId.pending, (state, action) => {
        state.MembershipData = initialState.MembershipData;
        state.loading = true;
        state.error = "";
      })
      .addCase(getBranchBySchoolId.fulfilled, (state, action) => {
        state.MembershipData = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getBranchBySchoolId.rejected, (state, action) => {
        console.log("action.error", action);
        state.MembershipData = initialState.MembershipData;
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const getBranchBySchoolId = createAsyncThunk(
  "instructorData/getBranchBySchoolId",
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

export const { updateInstructor } = MembershipSlice.actions;

export default MembershipSlice.reducer;

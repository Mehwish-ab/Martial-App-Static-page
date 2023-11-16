import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../store";
import { base_url, get_branch_by_school_id_url } from "../../../utils/api_urls";
import { loginDataTypes } from "../types";
import { authorizationToken } from "../../../utils/api_urls";

export interface InstructorDataType {
  instructorId: number;
  instructorImage: number;
  instructorName: string;
  instructorSpecilization: number | string;
  instructorRanking: string;
  instructorExperience: string;
  instructorPhoneNumber: number;
  instructorStatus: number;
}

export interface GetBranchBySchoolResTypes {
  data: InstructorDataType[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface InstructorDataInitialState {
  instructorData: GetBranchBySchoolResTypes;
  loading: boolean;
  error: string | undefined;
}

const initialState: InstructorDataInitialState = {
  instructorData: {
    data: [],
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
  },
  loading: false,
  error: "",
};
const instructorSlice = createSlice({
  name: "instructorData",
  initialState,
  reducers: {
    updateInstructor: (state, action) => {
      const updateInstructor: InstructorDataType = action.payload;
      const index = state.instructorData.data.findIndex(
        (b) => b.instructorId === updateInstructor.instructorId
      );
      state.instructorData.data[index] = updateInstructor;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBranchBySchoolId.pending, (state, action) => {
        state.instructorData = initialState.instructorData;
        state.loading = true;
        state.error = "";
      })
      .addCase(getBranchBySchoolId.fulfilled, (state, action) => {
        state.instructorData = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(getBranchBySchoolId.rejected, (state, action) => {
        console.log("action.error", action);
        state.instructorData = initialState.instructorData;
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

export const { updateInstructor } = instructorSlice.actions;

export default instructorSlice.reducer;

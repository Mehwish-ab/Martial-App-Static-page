import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  authorizationToken,
  profile_details_url,
} from "../../../../utils/api_urls";
import { profileDetailTypes } from "../../types";

type initialStateTypes = {
  loading: boolean;
  result: profileDetailTypes;
  error: any;
};
const initialState: initialStateTypes = {
  loading: true,
  result: {} as profileDetailTypes,
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const getUseProfileDetails = createAsyncThunk(
  "admin/user/profile/details",
  async (userId: number, thunkAPI) => {
    const state: any = thunkAPI.getState();
    try {
      const { data } = await axios.post(
        profile_details_url,
        { userId },
        {
          headers: {
            ...authorizationToken(state.loginData.data),
          },
        }
      );
      console.log(data, "user profile details");
      return data.results;
    } catch (error: any) {
      console.log({ error }, "error in user profile");
      return thunkAPI.rejectWithValue(error.response.data.responseMessage);
    }
  }
);

const userDetailsSlice = createSlice({
  name: "userProfileDetails",
  initialState,
  reducers: {
    removeUserProfileError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUseProfileDetails.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      getUseProfileDetails.fulfilled,
      (state, action: PayloadAction<profileDetailTypes>) => {
        state.result = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(getUseProfileDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { removeUserProfileError } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;

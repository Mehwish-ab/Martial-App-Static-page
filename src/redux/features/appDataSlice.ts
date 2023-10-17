import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url, app_data_url } from "../../utils/api_urls";
import { appDataTypes } from "./types";

type appDataInitailValues = {
  data: appDataTypes;
  loading: boolean;
  error: string;
};

const initialState: appDataInitailValues = {
  data: {} as appDataTypes,
  loading: true,
  error: "",
};

export const getAppData = createAsyncThunk(
  "user/AppData",
  async (country: string, thunkAPI) => {
    try {
      const { data } = await axios.post(base_url + app_data_url, {
        countryName: country,
      });
      data.results.statusData.activities.forEach((element: any) => {
        element.id = element.id.toString();
      });
      data.results.statusData.facilities.forEach((element: any) => {
        element.id = element.id.toString();
      });
      return data.results;
    } catch (error: any) {
      console.log({ error });
      thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const appDataSlice = createSlice({
  name: "user_appData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAppData.fulfilled,
      (state, action: PayloadAction<appDataTypes>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      getAppData.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        console.log(action.payload, "error in getAppData");
        state.error = action.payload;
      }
    );
  },
});
export default appDataSlice.reducer;

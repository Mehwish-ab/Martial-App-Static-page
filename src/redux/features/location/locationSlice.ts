import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type userLocationTypes = {
  city: string;
  state: string;
  country: string;
  address?: string;
  latitude: number;
  longitude: number;
};
type initialStateTypes = {
  loading: boolean;
  result: null | userLocationTypes;
  error: any;
};
const initialState: initialStateTypes = {
  loading: false,
  result: {} as userLocationTypes,
  error: "",
};

// valid countries

const userLocationSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addCurrentLocation: (state, data: PayloadAction<userLocationTypes>) => {
      state.result = data.payload;
    },
  },
});

export const { addCurrentLocation } = userLocationSlice.actions;
export default userLocationSlice.reducer;

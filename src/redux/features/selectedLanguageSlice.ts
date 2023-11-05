import { createSlice } from "@reduxjs/toolkit";

interface SelectedLanguageInitialState {
  selectedLanguage: string;
}
const initialState: SelectedLanguageInitialState = {
  selectedLanguage: localStorage.getItem("lang") || "en",
};
const selectedLanguageSlice = createSlice({
  name: "selectedLanguage",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
  },
});
export const { setLanguage } = selectedLanguageSlice.actions;
export default selectedLanguageSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url, screen_translations } from '../../utils/api_urls'

export interface ScreenTranslation {
    id: string
    screenName: string
    labelKey: string
    en: string
    es: string
    pt: string
    ar: string
    ur: string
}

export interface ScreenTranslationInitialState {
    translations: { [screenName: string]: ScreenTranslation[] }
    // loading: boolean;
    // error: string;
}

const initialState: ScreenTranslationInitialState = {
    translations: {},
    // loading: false,
    // error: "",
}

export const getScreenTranslation = createAsyncThunk(
    'user_screenTranslations/getScreenTranslation', // Use the correct action type
    async () => {
        try {
            const { data } = await axios.post(
                `${base_url}${screen_translations}`,
                {
                    roleType: 'SCHOOL',
                },
                {
                    headers: {
                        LoggingToken: '4d0a9ee9-68d4-4977',
                        lang: 'en',
                    },
                }
            )
            return data.results
        } catch (error) {
            console.error(error, 'error in getScreenTranslation')
            throw error
        }
    }
)

const screenTranslationSlice = createSlice({
    name: 'user_screenTranslations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getScreenTranslation.pending, () => {
                // state.loading = true;
            })
            .addCase(getScreenTranslation.fulfilled, (state, action) => {
                // state.loading = false;
                state.translations = action.payload
                // state.error = "";
            })
            .addCase(getScreenTranslation.rejected, () => {
                // state.loading = false;
                // state.error = action.error.message || ''; // Access the error message
            })
    },
})

export default screenTranslationSlice.reducer

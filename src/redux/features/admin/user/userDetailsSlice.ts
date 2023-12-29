import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { user_details_url } from '../../../../utils/api_urls'
import { userDetailTypes } from '../../types'
import axios from 'axios'

type initialStateTypes = {
    loading: boolean
    result: userDetailTypes
    error: any
}
const initialState: initialStateTypes = {
    loading: true,
    result: {} as userDetailTypes,
    error: '',
}

// Generates pending, fulfilled and rejected action types
export const getUseDetails = createAsyncThunk(
    'user/details',
    async (userId: number, thunkAPI) => {
        const state: any = thunkAPI.getState()
        try {
            const { data } = await axios.post(
                user_details_url,
                {
                    userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${
                            state.loginData &&
                            state.loginData.data.jwtDetails.token
                        }`,
                    },
                }
            )
            console.log(data, 'user details')
            return data.results
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const userDetailsSlice = createSlice({
    name: 'user_details',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUseDetails.pending, (state) => {
            state.loading = true
        })
        builder.addCase(
            getUseDetails.fulfilled,
            (state, action: PayloadAction<userDetailTypes>) => {
                state.result = action.payload
                state.loading = false
            }
        )
        builder.addCase(getUseDetails.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Something went wrong'
        })
    },
})

export default userDetailsSlice.reducer

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { axiosRequest } from '../../../../utils/axios.utils'
import { auth_token_key, base_url, login_url } from '../../../../utils/api_urls'
import { setLoginData } from '../../loginDataSlice'
import { loginDataTypes } from '../../types'
import axios from 'axios'

type loginTypes = {
    userName: number
    password: string
}
type initialStateTypes = {
    loading: boolean
    result: null | loginDataTypes
    error: any
}
const initialState: initialStateTypes = {
    loading: false,
    result: null,
    error: '',
}

// Generates pending, fulfilled and rejected action types
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginData: loginTypes, thunkAPI) => {
        try {
            const {
                data: { results },
            } = await axios.post(base_url + login_url, loginData)
            localStorage.setItem(auth_token_key, JSON.stringify(results))
            thunkAPI.dispatch(setLoginData(results))
            return results
        } catch (error: any) {
            console.log({ error })
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const loginUserSlice = createSlice({
    name: 'login_user_data',
    initialState,
    reducers: {
        removeLoginError: (state) => {
            state.error = ''
        },
        removeUserLogin: (state) => {
            state.result = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(
            loginUser.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false
                state.result = action.payload
            }
        )
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || 'Something went wrong'
        })
    },
})
export const { removeLoginError, removeUserLogin } = loginUserSlice.actions
export default loginUserSlice.reducer

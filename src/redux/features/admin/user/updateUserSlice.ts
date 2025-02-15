import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { local_storage_admin_key } from '../../../../utils/axios.utils'
import { update_user } from '../../../../utils/api_urls'
import { loginDataTypes } from '../../types'
import { RootState } from '../../../store'
import { updateUserHandler } from '../../loginDataSlice'

export type userDataTypes = {
    userId: number
    firstName: string
    lastName: string
}

type updateUserDataTypes = {
    errors: null
}
type initialStateTypes = {
    loading: boolean
    result: null | updateUserDataTypes
    error: any
}
const initialState: initialStateTypes = {
    loading: false,
    result: {} as updateUserDataTypes,
    error: '',
}

// Generates pending, fulfilled and rejected action types
export const updateUser = createAsyncThunk(
    'user/update',
    async (userData: userDataTypes, thunkAPI) => {
        const state = thunkAPI.getState() as RootState

        try {
            const { data } = await axios.post(update_user, userData, {
                headers: {
                    Authorization: `Bearer ${
                        state.loginData &&
                        state.loginData.data?.jwtDetails.token
                    }`,
                },
            })
            // login data from local storage
            const localStorageLoginData: loginDataTypes = JSON.parse(
                localStorage.getItem(local_storage_admin_key)!
            )
            localStorageLoginData.userDetails = {
                ...localStorageLoginData.userDetails,
                userFirstName: userData.firstName,
                userLastName: userData.lastName,
            }
            localStorage.setItem(
                local_storage_admin_key,
                JSON.stringify(localStorageLoginData)
            )
            thunkAPI.dispatch(updateUserHandler(userData))
            console.log(data, 'data in update user')
            return data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.data.response.errorMessage)
        }
    }
)

const updateUserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        removeData: (state) => {
            state.result = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(
            updateUser.fulfilled,
            (state, action: PayloadAction<updateUserDataTypes>) => {
                state.result = action.payload
                state.loading = false
            }
        )
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false
            state.result = null
            state.error = action.payload || 'Something went wrong'
        })
    },
})

export const { removeData } = updateUserSlice.actions
export default updateUserSlice.reducer

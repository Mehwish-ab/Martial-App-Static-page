import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import {
    base_url,
    get_branch_by_school_id_url,
    get_branch_by_id_url,
    authorizationToken,
} from '../../../utils/api_urls'
import { loginDataTypes, registerDataType } from '../types'
const localStorageData = localStorage.getItem('ennvision-admin:token')

const loginData = JSON.parse(localStorageData as any)
export interface UserDataTypess {
    userId: number | string
    emailAddress: string
    phoneNumber: string
    profilePictureURL: string
    firstName: string
    schoolProfilePicture: string
}
export interface UserDataType {
    userId: number | string
    emailAddress: string
    phoneNumber: string
    profilePictureURL: string
    firstName: string
    lastName: string
    countryCode: string
    statusId: number | string
    schoolBusinessName: string
    schoolProfilePicture: string
}
export interface GetuserBySchoolResTypes {
    data: UserDataType[]
    totalItems: number
    totalPages: number
    currentPage: number
}
export interface UserDataInitialState {
    UserData: GetuserBySchoolResTypes
    loading: boolean
    userId: registerDataType
    userRole: string
    error: string | undefined
}
const initialState: UserDataInitialState = {
    UserData: {
        data: [
            {
                userId: 0,
                emailAddress: '',
                phoneNumber: '',
                profilePictureURL: '',
                firstName: '',
                lastName: '',
                countryCode: '',
                statusId: 0,
                schoolBusinessName: '',
                schoolProfilePicture: '',
            },
        ],
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
    },
    userRole: null!,
    userId: null!,
    loading: false,
    error: '',
}

export const getAllUsers = createAsyncThunk('userData/getuser', async () => {
    const state = store.getState()
    try {
        const { data } = await axios.post(
            `${base_url}api/auth/getAll`,
            {
                country: '',
                roleId: 1,
            },
            {
                headers: {
                    ...authorizationToken(
                        state.loginData.data as loginDataTypes
                    ),
                },
            }
        )
        return data.results
    } catch (error: any) {
        if (error.response && error.response.data) {
            const obj = {
                name: 'AxiosError',
                message: error.response.data?.responseMessage,
                code: 'ERR_BAD_RESPONSE',
            }
            throw obj
        }
        throw error
    }
})

const UserSlice = createSlice({
    name: 'dashboardData',
    initialState,
    reducers: {
        setUserListId: (state, action: PayloadAction<registerDataType>) => {
            state.userId = action.payload
        },
        setUserRole: (state, action: PayloadAction<string>) => {
            state.userRole = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.UserData = initialState.UserData
                state.loading = true
                state.error = ''
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.UserData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                console.log('action.error', action)
                state.UserData = initialState.UserData
                state.error = action.error.message
                state.loading = false
            })
    },
})
export const { setUserListId, setUserRole } = UserSlice.actions
export default UserSlice.reducer

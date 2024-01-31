import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import {
    base_url,
    get_branch_by_school_id_url,
    get_branch_by_id_url,
    authorizationToken,
} from '../../../utils/api_urls'
import { loginDataTypes } from '../types'
const localStorageData = localStorage.getItem('ennvision-admin:token')
const loginData = JSON.parse(localStorageData as any)
export interface userDataType {
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
    data: userDataType[]
    totalItems: number
    totalPages: number
    currentPage: number
}
export interface userDataInitialState {
    userData: userDataType
    loading: boolean
    error: string | undefined
}
const initialState: userDataInitialState = {
    userData: {
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

    loading: false,
    error: '',
}

export const getuserBySchoolId = createAsyncThunk(
    'userData/getuserBySchoolId',
    async () => {
        const state = store.getState()
        try {
            const { data } = await axios.post(
                `${base_url}${get_branch_by_school_id_url}`,
                {
                    schoolId:
                        // state.loginData?.data?.schoolIdl ||
                        // state.dashboardData?.schoolData?.schoolId,
                        loginData?.schoolId,
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
    }
)
export const getuserById = createAsyncThunk(
    'userData/getuserById',
    async () => {
        const state = store.getState()
        try {
            const { data } = await axios.post(
                `${base_url}${get_branch_by_id_url}`,
                {
                    branchId: state.branchData.branchData.data.map((b) => {
                        return b.branchId
                    }),
                },
                {
                    headers: {
                        ...authorizationToken(
                            state.loginData.data as loginDataTypes
                        ),
                    },
                }
            )
            return data.result[0]
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
    }
)
export const getSchoolByUserId = createAsyncThunk(
    'userData/getSchoolByUserId', // Use the correct action type
    async () => {
        // const userDetails: any = thunkAPI.getState().state.loginData.userDetails;
        const state = store.getState()
        try {
            const { data } = await axios.post(
                `${base_url}/api/auth/getAll`,
                {
                    userId: state.loginData?.data?.userDetails?.id,
                },
                {
                    headers: {
                        ...authorizationToken(
                            state.loginData?.data as loginDataTypes
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
    }
)

const UserDataSlice = createSlice({
    name: 'dashboardData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSchoolByUserId.pending, (state) => {
                state.userData = initialState.userData
                state.loading = true
                state.error = ''
            })
            .addCase(getSchoolByUserId.fulfilled, (state, action) => {
                state.userData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getSchoolByUserId.rejected, (state, action) => {
                console.log('action.error', action)
                state.userData = initialState.userData
                state.error = action.error.message
                state.loading = false
            })
    },
})

export default UserDataSlice.reducer

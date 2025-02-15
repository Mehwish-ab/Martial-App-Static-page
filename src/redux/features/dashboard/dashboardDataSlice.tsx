import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {
    base_url,
    get_school_by_user_id_url,
    authorizationToken,
} from '../../../utils/api_urls'

import store from '../../store'
import { loginDataTypes } from '../types'
import { boolean } from 'yup'
export interface SchoolDataType {
    schoolId: number
    userId: number
    businessName: string
    businessType: number | string
    address: string
    latitude: number
    longitude: number
    phoneNumber: string
    rank: boolean
    defaultLanguageId: number
    defaultCurrencyId: number
    activities: string
    facilities: string
    description: string
    stripePublicKey: string
    stripeSecretKey: string
    gclAccessToken: string
    gclClientId: string
    gclWebHook: string
    gclClientSecret: string
    bannerPicture: string | null | undefined
    profilePicture: string | null | undefined
    emailAddress: string
    countryName: string
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface AllUserSchoolList {
    activitiesId: string

    address: string

    bannerImg: string

    description: string
    emailAddress: string

    hasClass: boolean

    id: string

    membership: boolean

    name: string

    phoneNumber: string

    profileImg: string
    totalItems: number
    currentPage: number
    totalpages: number
}
export interface OwnerDataTypes {
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    id: number | string
}
export interface DashboardDataInitialState {
    schoolData: SchoolDataType
    ownerData: OwnerDataTypes
    loading: boolean
    error: string | undefined
}

const initialState: DashboardDataInitialState = {
    schoolData: {
        schoolId: 0,
        userId: 0,
        businessName: '',
        businessType: '0',
        address: '',
        latitude: 0,
        longitude: 0,
        phoneNumber: '',
        rank: false,
        defaultCurrencyId: 1,
        defaultLanguageId: 0,
        activities: '',
        facilities: '',
        description: '',
        stripePublicKey: '',
        stripeSecretKey: '',
        gclAccessToken: '',
        gclClientId: '',
        gclWebHook: '',
        gclClientSecret: '',
        bannerPicture: '',
        profilePicture: '',
        emailAddress: '',
        countryName: '',
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
    },
    loading: false,
    error: '',
    ownerData: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        id: 0,
    },
}

export const getSchoolByUserId = createAsyncThunk(
    'dashboardData/getSchoolByUserId', // Use the correct action type
    async () => {
        // const userDetails: any = thunkAPI.getState().state.loginData.userDetails;
        const state = store.getState()

        try {
            console.log(state, 'state')

            const { data } = await axios.post(
                `${base_url}${get_school_by_user_id_url}`,
                {
                    schoolId:
                        state.loginData.data?.schoolId ||
                        state.dashboardData.schoolData.schoolId,
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

const dashboardDataSlice = createSlice({
    name: 'dashboardData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSchoolByUserId.pending, (state) => {
                state.schoolData = initialState.schoolData
                state.loading = true
                state.error = ''
            })
            .addCase(getSchoolByUserId.fulfilled, (state, action) => {
                state.schoolData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getSchoolByUserId.rejected, (state, action) => {
                console.log('action.error', action)
                state.schoolData = initialState.schoolData
                state.error = action.error.message
                state.loading = false
            })
    },
})

export default dashboardDataSlice.reducer

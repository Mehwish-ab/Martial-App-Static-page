import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import {
    base_url,
    get_franchise_by_school_id_url,
    authorizationToken,
} from '../../../utils/api_urls'
import { loginDataTypes } from '../types'

export const localStorageData = localStorage.getItem('ennvision-admin:token')
const loginData = JSON.parse(localStorageData as any)
export interface FranchiseDataType {
    franchiseId: number
    schoolId: number
    franchiseName: string
    franchiseType: number | string
    address: string
    phoneNumber: string
    defaultLanguageId: number
    defaultCurrencyId: number
    rank: boolean
    activities: string
    facilities: string
    description: string
    profilePicture: string | null | undefined
    franchiseStatusId: number
    paymentMethod: string
    accountNumber: string
    countryName: string
    mode: string
    bannerPicture: string | null | undefined
}
export interface GetFranchiseBySchoolResTypes {
    data: FranchiseDataType[]
    totalItems: number
    totalPages: number
    currentPage: number
}
export interface franchiseDataInitialState {
    franchiseData: GetFranchiseBySchoolResTypes
    loading: boolean
    error: string | undefined
}
const initialState: franchiseDataInitialState = {
    franchiseData: {
        data: [
            {
                franchiseId: 0,
                schoolId: 0,
                franchiseName: '',
                franchiseType: '',
                address: '',
                phoneNumber: '',
                defaultLanguageId: 0,
                defaultCurrencyId: 0,
                rank: false,
                activities: '',
                facilities: '',
                description: '',
                bannerPicture: '',
                profilePicture: '',
                franchiseStatusId: 0,
                paymentMethod: '',
                accountNumber: '',
                countryName: '',
                mode: '',
            },
        ],
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
    },
    loading: false,
    error: '',
}
export const getfranchiseBySchoolIds: any = createAsyncThunk(
    'franchiseData/getfranchiseBySchoolId',
    async (id: number) => {
        const state = store.getState()
        console.log('state', state)
        try {
            const { data } = await axios.post(
                `${base_url}${get_franchise_by_school_id_url}`,
                {
                    // schoolId: state.dashboardData.schoolData.schoolId,
                    schoolId: id || loginData?.schoolId,
                },
                {
                    headers: {
                        ...authorizationToken(
                            state.loginData.data as loginDataTypes
                        ),
                    },
                }
            )
            console.log(data.results, 'data')

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
export const getfranchiseBySchoolId: any = createAsyncThunk(
    'franchiseData/getfranchiseBySchoolId',
    async () => {
        const state = store.getState()
        console.log('state', state)
        try {
            const { data } = await axios.post(
                `${base_url}${get_franchise_by_school_id_url}`,
                {
                    // schoolId: state.dashboardData.schoolData.schoolId,
                    schoolId: loginData?.schoolId,
                },
                {
                    headers: {
                        ...authorizationToken(
                            state.loginData.data as loginDataTypes
                        ),
                    },
                }
            )
            console.log(data.results, 'data')

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
const franchiseSlice = createSlice({
    name: 'franchiseData',
    initialState,
    reducers: {
        updateFranchise: (state, action) => {
            const updatedfranchise: FranchiseDataType = action.payload
            const index = state.franchiseData.data.findIndex(
                (b) => b.franchiseId === updatedfranchise.franchiseId
            )
            state.franchiseData.data[index] = updatedfranchise
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getfranchiseBySchoolId.pending, (state) => {
                state.franchiseData = initialState.franchiseData
                state.loading = true
                state.error = ''
            })
            .addCase(getfranchiseBySchoolId.fulfilled, (state, action) => {
                state.franchiseData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getfranchiseBySchoolId.rejected, (state, action) => {
                console.log('action.error', action)
                state.franchiseData = initialState.franchiseData
                state.error = action.error.message
                state.loading = false
            })
    },
})

export const { updateFranchise } = franchiseSlice.actions

export default franchiseSlice.reducer

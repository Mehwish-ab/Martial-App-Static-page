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
export interface BranchDataType {
    branchId: number
    schoolId: number
    branchName: string
    branchType: number | string
    address: string
    phoneNumber: string
    defaultLanguageId: number
    defaultCurrencyId: number
    belts: boolean
    ranks: boolean
    schoolStripeMethod: boolean
    schoolGclMethod: boolean
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
    branchStatusId: number
    paymentMethod: string
    accountNumber: string
    countryName: string
    mode: string
}
export interface GetBranchBySchoolResTypes {
    data: BranchDataType[]
    totalItems: number
    totalPages: number
    currentPage: number
}
export interface BranchDataInitialState {
    branchData: GetBranchBySchoolResTypes
    loading: boolean
    error: string | undefined
}
const initialState: BranchDataInitialState = {
    branchData: {
        data: [
            {
                branchId: 0,
                schoolId: 0,
                branchName: '',
                branchType: 0,
                address: '',
                phoneNumber: '',
                defaultLanguageId: 0,
                defaultCurrencyId: 0,
                belts: false,
                ranks: false,
                schoolStripeMethod: false,
                schoolGclMethod: false,
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
                branchStatusId: 0,
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

export const getBranchBySchoolId = createAsyncThunk(
    'branchData/getBranchBySchoolId',
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
export const getBranchById = createAsyncThunk(
    'branchData/getBranchById',
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

const branchSlice = createSlice({
    name: 'branchData',
    initialState,
    reducers: {
        updateBranch: (state, action) => {
            const updatedBranch: BranchDataType = action.payload
            const index = state.branchData.data.findIndex(
                (b) => b.branchId === updatedBranch.branchId
            )
            state.branchData.data[index] = updatedBranch
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getBranchBySchoolId.pending, (state) => {
                state.branchData = initialState.branchData
                state.loading = true
                state.error = ''
            })
            .addCase(getBranchBySchoolId.fulfilled, (state, action) => {
                state.branchData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getBranchBySchoolId.rejected, (state, action) => {
                console.log('action.error', action)
                state.branchData = initialState.branchData
                state.error = action.error.message
                state.loading = false
            })
    },
})

// export const getPyment = createAsyncThunk(
//   "branchData/paymentMethod",
//   async (branchId) => {
//     const state = store.getState();
//     try {
//       const { data } = await axios.post(
//         `${base_url}/paymentMethod/get`,
//         {
//           businessUC: "BRANCH",
//           branchId: branchId,
//         },
//         {
//           headers: {
//             ...authorizationToken(state.loginData.data as loginDataTypes),
//           },
//         }
//       );
//       return data.result[0];
//     } catch (error: any) {
//       if (error.response && error.response.data) {
//         let obj = {
//           name: "AxiosError",
//           message: error.response.data?.responseMessage,
//           code: "ERR_BAD_RESPONSE",
//         };
//         throw obj;
//       }
//       throw error;
//     }
//   }
// );

export const { updateBranch } = branchSlice.actions

export default branchSlice.reducer

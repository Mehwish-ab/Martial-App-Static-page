import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import { base_url, get_branch_by_school_id_url } from '../../../utils/api_urls'
import { loginDataTypes } from '../types'
import { authorizationToken } from '../../../utils/api_urls'

export interface RulesDataType {
    RulesID: number
    RulesInvoice: string
    RulesAmount: string
    RulesBillingDate: string
    RulesMember: string
    RulesStatus: string
    RulesDownload: string
    RulesAction: string | null | undefined
}

export interface GetBranchBySchoolResTypes {
    data: RulesDataType[]
    totalItems: number
    totalPages: number
    currentPage: number
    RulesPicture: string
}

export interface RulesDataInitialState {
    RulesData: GetBranchBySchoolResTypes
    loading: boolean
    error: string | undefined
}

const initialState: RulesDataInitialState = {
    RulesData: {
        data: [],
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        RulesPicture: '',
    },
    loading: false,
    error: '',
}
const RulesSlice = createSlice({
    name: 'instructorData',
    initialState,
    reducers: {
        updateInstructor: (state, action) => {
            const updateInstructor: RulesDataType = action.payload
            const index = state.RulesData.data.findIndex(
                (b) => b.RulesID === updateInstructor.RulesID
            )
            state.RulesData.data[index] = updateInstructor
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getBranchBySchoolId.pending, (state, action) => {
                state.RulesData = initialState.RulesData
                state.loading = true
                state.error = ''
            })
            .addCase(getBranchBySchoolId.fulfilled, (state, action) => {
                state.RulesData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getBranchBySchoolId.rejected, (state, action) => {
                console.log('action.error', action)
                state.RulesData = initialState.RulesData
                state.error = action.error.message
                state.loading = false
            })
    },
})

export const getBranchBySchoolId = createAsyncThunk(
    'instructorData/getBranchBySchoolId',
    async () => {
        const state = store.getState()
        console.log('state', state)
        try {
            const { data } = await axios.post(
                `${base_url}${get_branch_by_school_id_url}`,
                {
                    schoolId:
                        state.loginData.data?.schoolId ||
                        state.dashboardData.schoolData.schoolId,
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
                let obj = {
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

export const { updateInstructor } = RulesSlice.actions

export default RulesSlice.reducer

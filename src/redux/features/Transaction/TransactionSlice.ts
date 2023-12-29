import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import {
    base_url,
    get_branch_by_school_id_url,
    authorizationToken,
} from '../../../utils/api_urls'
import { loginDataTypes } from '../types'

export interface TransactionDataType {
    TransactionID: number
    TransactionInvoice: number
    TransactionAmount: string
    TransactionBillingDate: string
    TransactionMember: string
    TransactionStatus: string
    TransactionDownload: string
    TransactionAction: string | null | undefined
}

export interface GetBranchBySchoolResTypes {
    data: TransactionDataType[]
    totalItems: number
    totalPages: number
    currentPage: number
    TransactionPicture: string
}

export interface TransactionDataInitialState {
    TransactionData: GetBranchBySchoolResTypes
    loading: boolean
    error: string | undefined
}

const initialState: TransactionDataInitialState = {
    TransactionData: {
        data: [],
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        TransactionPicture: '',
    },
    loading: false,
    error: '',
}
const TransactionSlice = createSlice({
    name: 'instructorData',
    initialState,
    reducers: {
        updateInstructor: (state, action) => {
            const updateInstructor: TransactionDataType = action.payload
            const index = state.TransactionData.data.findIndex(
                (b) => b.TransactionID === updateInstructor.TransactionID
            )
            state.TransactionData.data[index] = updateInstructor
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getBranchBySchoolId.pending, (state, action) => {
                state.TransactionData = initialState.TransactionData
                state.loading = true
                state.error = ''
            })
            .addCase(getBranchBySchoolId.fulfilled, (state, action) => {
                state.TransactionData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getBranchBySchoolId.rejected, (state, action) => {
                console.log('action.error', action)
                state.TransactionData = initialState.TransactionData
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

export const { updateInstructor } = TransactionSlice.actions

export default TransactionSlice.reducer

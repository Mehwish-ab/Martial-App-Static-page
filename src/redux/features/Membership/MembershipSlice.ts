import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import {
    base_url,
    get_branch_by_school_id_url,
    authorizationToken,
} from '../../../utils/api_urls'
import { loginDataTypes } from '../types'

export interface MembershipDataType {
    classIds: number
    useCase: string
    id: number
    title: string
    startDate: string
    endDate: string
    visibility: number
    subscriptionType: number
    membershipFee: string
    minimumStudent: number
    dailySubsFee: string
    weeklySubsFee: string
    monthlySubsFee: string
    annuallySubsFee: string
    allowStudentCancel: string
    refundDate: string
    bookingCancelStartDate: string
    bookingCancelEndDate: string
    cancellationCharges: string
    accommodation: string
    description: string
}
export interface GetBranchBySchoolResTypes {
    data: MembershipDataType[]
    totalItems: number
    totalPages: number
    currentPage: number
    MemberShipPicture: string
}

export interface MembershipDataInitialState {
    MembershipData: GetBranchBySchoolResTypes
    loading: boolean
    error: string | undefined
}

const initialState: MembershipDataInitialState = {
    MembershipData: {
        data: [
            {
                classIds: 0,
                useCase: '',
                id: 0,
                title: '',
                startDate: '',
                endDate: '',
                visibility: 0,
                subscriptionType: 0,
                membershipFee: '',
                minimumStudent: 0,
                dailySubsFee: '',
                weeklySubsFee: '',
                monthlySubsFee: '',
                annuallySubsFee: '',
                allowStudentCancel: '',
                refundDate: '',
                bookingCancelStartDate: '',
                bookingCancelEndDate: '',
                cancellationCharges: '',
                accommodation: '',
                description: '',
            },
        ],
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        MemberShipPicture: '',
    },
    loading: false,
    error: '',
}

export const getMembershipById = createAsyncThunk(
    'membershipData/getMembershipById',
    async () => {
        const state = store.getState()
        console.log('state', state)
        try {
            const { data } = await axios.post(
                `${base_url}/classes/membershipPlan/getDetailsById`,
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

const MembershipSlice = createSlice({
    name: 'membershipData',
    initialState,
    reducers: {
        updateMembership: (state, action) => {
            const updateMembership: MembershipDataType = action.payload
            const index = state.MembershipData.data.findIndex(
                (b) => b.id === updateMembership.id
            )
            state.MembershipData.data[index] = updateMembership
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getMembershipById.pending, (state) => {
                state.MembershipData = initialState.MembershipData
                state.loading = true
                state.error = ''
            })
            .addCase(getMembershipById.fulfilled, (state, action) => {
                state.MembershipData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getMembershipById.rejected, (state, action) => {
                console.log('action.error', action)
                state.MembershipData = initialState.MembershipData
                state.error = action.error.message
                state.loading = false
            })
    },
})

export const { updateMembership } = MembershipSlice.actions

export default MembershipSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import {
    base_url,
    get_class_by_school_id_url,
    authorizationToken,
} from '../../../utils/api_urls'
import { loginDataTypes } from '../types'

export interface ClassDataType {
    useCase: string
    id: number
    classId: number
    title: string
    startDate: string
    endDate: string
    instructorId: number
    fee: string
    bannerPicture: string | null | undefined
    profilePicture: string | null | undefined
    activities: string
    capacity: number
    minimumStudent: number
    bookingStartDate: string
    bookingEndDate: string
    qrCodeStartDate: string
    qrCodeEndDate: string
    allowStudentCancel: string
    refundDate: string
    bookingCancelStartDate: string
    bookingCancelEndDate: string
    cancellationCharges: string
    accommodation: string
    description: string
    classStatusId: number
    timeTableId: number
}

export interface GetClassesBySchoolResTypes {
    profilePicture: string
    bannerPicture: string
    data: ClassDataType[]
    totalItems: number
    totalPages: number
    currentPage: number
}
export interface ClassDataInitialState {
    ClassData: GetClassesBySchoolResTypes
    loading: boolean
    error: string | undefined
}

const initialState: ClassDataInitialState = {
    ClassData: {
        data: [
            {
                useCase: '',
                id: 0,
                classId: 0,
                title: '',
                startDate: '',
                endDate: '',
                instructorId: 0,
                fee: '',
                bannerPicture: '',
                profilePicture: '',
                activities: '',
                capacity: 0,
                minimumStudent: 0,
                bookingStartDate: '',
                bookingEndDate: '',
                qrCodeStartDate: '',
                qrCodeEndDate: '',
                allowStudentCancel: '',
                refundDate: '',
                bookingCancelStartDate: '',
                bookingCancelEndDate: '',
                cancellationCharges: '',
                accommodation: '',
                description: '',
                classStatusId: 0,
                timeTableId: 0,
            },
        ],
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        profilePicture: '',
        bannerPicture: '',
    },
    loading: false,
    error: '',
}
export const getBranchBySchoolId = createAsyncThunk(
    'instructorData/getBranchBySchoolId',
    async () => {
        const state = store.getState()
        console.log('state', state)
        try {
            const { data } = await axios.post(
                `${base_url}${get_class_by_school_id_url}`,
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
const ClassSlice = createSlice({
    name: 'instructorData',
    initialState,
    reducers: {
        updateInstructor: (state, action) => {
            const updateInstructor: ClassDataType = action.payload
            const index = state.ClassData.data.findIndex(
                (b) => b.id === updateInstructor.id
            )
            state.ClassData.data[index] = updateInstructor
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getBranchBySchoolId.pending, (state) => {
                state.ClassData = initialState.ClassData
                state.loading = true
                state.error = ''
            })
            .addCase(getBranchBySchoolId.fulfilled, (state, action) => {
                state.ClassData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getBranchBySchoolId.rejected, (state, action) => {
                console.log('action.error', action)
                state.ClassData = initialState.ClassData
                state.error = action.error.message
                state.loading = false
            })
    },
})

export const { updateInstructor } = ClassSlice.actions

export default ClassSlice.reducer

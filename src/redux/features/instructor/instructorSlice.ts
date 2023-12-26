import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import {
    base_url,
    get_instructor_by_user_id_url,
} from '../../../utils/api_urls'
import { loginDataTypes } from '../types'
import { authorizationToken } from '../../../utils/api_urls'

export interface InstructorDataType {
    instructorId: number
    instructorImage: number
    instructorName: string
    instructorEmailAddress: string
    phoneNumber: number
    address: string
    experience: string
    rankId: string
    certificationURL: string
    specializations: number | string
    activities: number | string
    description: number | string
    instructorStatusId: number
}

export interface GetInstructorBySchoolResTypes {
    data: InstructorDataType[]
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface InstructorDataInitialState {
    instructorData: GetInstructorBySchoolResTypes
    loading: boolean
    error: string | undefined
}

const initialState: InstructorDataInitialState = {
    instructorData: {
        data: [
            {
                instructorId: 0,
                instructorImage: 0,
                instructorName: '',
                instructorEmailAddress: '',
                phoneNumber: 0,
                address: '',
                experience: '',
                rankId: '',
                certificationURL: '',
                specializations: 0,
                activities: 0,
                description: 0,
                instructorStatusId: 0,
            },
        ],
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
    },
    loading: false,
    error: '',
}
const instructorSlice = createSlice({
    name: 'instructorData',
    initialState,
    reducers: {
        updateInstructor: (state, action) => {
            const updateInstructor: InstructorDataType = action.payload
            const index = state.instructorData.data.findIndex(
                (b) => b.instructorId === updateInstructor.instructorId
            )
            state.instructorData.data[index] = updateInstructor
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getInstructorByUserId.pending, (state, action) => {
                state.instructorData = initialState.instructorData
                state.loading = true
                state.error = ''
            })
            .addCase(getInstructorByUserId.fulfilled, (state, action) => {
                state.instructorData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getInstructorByUserId.rejected, (state, action) => {
                console.log('action.error', action)
                state.instructorData = initialState.instructorData
                state.error = action.error.message
                state.loading = false
            })
    },
})

export const getInstructorByUserId = createAsyncThunk(
    'instructor/getByUserId',
    async () => {
        const state = store.getState()
        console.log('state', state)
        try {
            const { data } = await axios.post(
                `${base_url}${get_instructor_by_user_id_url}`,
                {
                    userId: state.loginData.data?.userDetails.id,
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

export const { updateInstructor } = instructorSlice.actions

export default instructorSlice.reducer

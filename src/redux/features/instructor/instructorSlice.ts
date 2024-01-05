import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import {
    base_url,
    get_instructor_by_user_id_url,
    authorizationToken,
} from '../../../utils/api_urls'
import { loginDataTypes } from '../types'

export interface InstructorDataType {
    instructorId: number
    instructorImage: number
    instructorName: string
    emailAddress: string
    phoneNumber: number
    address: string
    experience: string
    rankId: string
    certificationURL: string
    specializations: string
    activities: string
    description: number | string
    instructorStatusId: number
    profilePicture: string | null | undefined
    bannerPicture: string | null | undefined
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
                emailAddress: '',
                phoneNumber: 0,
                address: '',
                experience: '',
                rankId: '',
                certificationURL: '',
                specializations: '',
                activities: '',
                description: 0,
                instructorStatusId: 0,
                bannerPicture: '',
                profilePicture: '',
            },
        ],
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
    },
    loading: false,
    error: '',
}

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
            .addCase(getInstructorByUserId.pending, (state) => {
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

export const { updateInstructor } = instructorSlice.actions

export default instructorSlice.reducer

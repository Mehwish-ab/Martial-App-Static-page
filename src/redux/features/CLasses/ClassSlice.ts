import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import { base_url, get_branch_by_school_id_url } from '../../../utils/api_urls'
import { loginDataTypes } from '../types'
import { authorizationToken } from '../../../utils/api_urls'

export interface ClassDataType {
    ClassId: number
    ClassTitle: string
    ClassInstructor: String
    ClassStartDate: string
    ClassEndDate: string
    ClassFee: number
    ClassStatus: number
    bannerPicture: string | null | undefined
    profilePicture: string | null | undefined
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
        data: [],
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
        profilePicture: '',
        bannerPicture: '',
    },
    loading: false,
    error: '',
}

const ClassSlice = createSlice({
    name: 'instructorData',
    initialState,
    reducers: {
        updateInstructor: (state, action) => {
            const updateInstructor: ClassDataType = action.payload
            const index = state.ClassData.data.findIndex(
                (b) => b.ClassId === updateInstructor.ClassId
            )
            state.ClassData.data[index] = updateInstructor
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getBranchBySchoolId.pending, (state, action) => {
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
export const { updateInstructor } = ClassSlice.actions

export default ClassSlice.reducer

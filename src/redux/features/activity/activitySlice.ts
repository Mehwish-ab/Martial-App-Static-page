import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import {
    base_url,
    authorizationToken,
    get_all_activities,
} from '../../../utils/api_urls'
import { loginDataTypes } from '../types'

export interface ActivityDataType {
    activityId: number
    beltId: number
    experienceLevelId: number
    startDate: Date
    endDate: Date
    status: string
    id: number
    certificateURL: string
    activityStatusId: number
}

export interface ActivityDataInitialState {
    activityData: ActivityDataType[]
    loading: boolean
    error: string | undefined
}

const initialState: ActivityDataInitialState = {
    activityData: [
        // {
        //     activityId: null!,
        //     beltId: null!,
        //     experiencelevelId: null!,
        //     certificateURL: '',
        //     startDate: new Date('1970-01-01'),
        //     endDate: new Date('2000-12-31'),
        //     status: '',
        //     id: null!,
        //     activityStatusId: 0,
        // },
    ],
    loading: false,
    error: '',
}

export const getActivityBySchoolId = createAsyncThunk(
    'activityData/getActivityBySchoolId',
    async (schoolId: string) => {
        const state = store.getState()
        console.log(
            'state',
            state,
            state.loginData.data?.schoolId,
            state.dashboardData.schoolData.schoolId
        )
        try {
            const { data } = await axios.post(
                `${base_url}${get_all_activities}`,
                {
                    useCase: 'SCHOOL',
                    useCaseId: schoolId,
                    // state.loginData.data?.schoolId ||
                    // state.dashboardData.schoolData.schoolId,
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
const ActivitySlice = createSlice({
    name: 'ActivityData',
    initialState,
    reducers: {
        setActivityData: (state, action: PayloadAction<any>) => {
            state.activityData = action.payload
        },
        updateInstructor: (state, action) => {
            const updateInstructor: ActivityDataType = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getActivityBySchoolId.pending, (state) => {
                state.activityData = initialState.activityData
                state.loading = true
                state.error = ''
            })
            .addCase(getActivityBySchoolId.fulfilled, (state, action) => {
                state.activityData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getActivityBySchoolId.rejected, (state, action) => {
                console.log('action.error', action)
                state.activityData = initialState.activityData
                state.error = action.error.message
                state.loading = false
            })
    },
})

export const { updateInstructor, setActivityData } = ActivitySlice.actions

export default ActivitySlice.reducer

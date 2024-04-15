import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import {
    base_url,
    authorizationToken,
    get_all_activities,
    create_activity,
    edit_activity_url,
} from '../../../utils/api_urls'
import { loginDataTypes } from '../types'
import { ActivityInitialValues } from '../../../screens/Activitity/constant'

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
    async (payload: any) => {
        const state = store.getState()
        const { useCase, roleId } = payload
        console.log(payload)
        try {
            const { data } = await axios.post(
                `${base_url}${get_all_activities}`,
                {
                    useCase: useCase,
                    useCaseId: roleId,
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
export const createActivityBySchoolId = createAsyncThunk(
    'activityData/createActivityBySchoolId',
    async (props: any) => {
        const { payload, file } = props
        const state = store.getState()
        console.log('createActivityBySchoolId', file)

        try {
            const formData = new FormData()

            formData.append(
                'data',
                new Blob([JSON.stringify(payload)], {
                    type: 'application/json',
                })
            )

            formData.append('file', file)

            const { data } = await axios.post(
                `${base_url}${create_activity}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...authorizationToken(
                            state.loginData.data as loginDataTypes
                        ),
                    },
                }
            )
            console.log('data', data)
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
export const updateActivityBySchoolId = createAsyncThunk(
    'activityData/updateActivityBySchoolId',
    async (props: any) => {
        const { payload, file } = props
        const state = store.getState()
        console.log('updateActivityBySchoolId', file)

        try {
            const formData = new FormData()

            formData.append(
                'data',
                new Blob([JSON.stringify(payload)], {
                    type: 'application/json',
                })
            )

            formData.append('file', file)

            const { data } = await axios.post(
                `${base_url}${edit_activity_url}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
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
            // .addCase(getActivityBySchoolId.fulfilled, (state, action) => {
            //     state.activityData = action.payload
            //     state.loading = false
            //     state.error = ''
            // })
            .addCase(createActivityBySchoolId.fulfilled, (state, action) => {
                state.activityData = [...state.activityData, action.payload]
                state.loading = false
                state.error = ''
            })
            .addCase(updateActivityBySchoolId.fulfilled, (state, action) => {
                const { activityId } = action.payload
                // Find the index of the activity with the given activityId
                const index = state.activityData.findIndex(
                    (act) => act.activityId === activityId
                )
                if (index !== -1) {
                    state.activityData[index] = action.payload
                }
                state.loading = false
                state.error = ''
            })
    },
})

export const { updateInstructor, setActivityData } = ActivitySlice.actions

export default ActivitySlice.reducer

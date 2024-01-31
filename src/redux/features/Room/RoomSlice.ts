import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {
    base_url,
    get_school_by_user_id_url,
    authorizationToken,
} from '../../../utils/api_urls'

import store from '../../store'
import { loginDataTypes } from '../types'
export interface RoomDataType {
    useCase: string
    id: number | string
    name: string
    floorNumber: number | string
    roomNumber: number | string
    width: string
    height: string
    isActive: boolean
    roomId: number | string
}

export interface DashboardDataInitialState {
    roomData: RoomDataType
    loading: boolean
    error: string | undefined
}

const initialState: DashboardDataInitialState = {
    roomData: {
        useCase: '',
        id: '',
        name: '',
        floorNumber: '',
        roomNumber: '',
        width: '',
        height: '',
        isActive: false,
        roomId: '',
    },
    loading: false,
    error: '',
}

export const getSchoolByUserId = createAsyncThunk(
    'dashboardData/getSchoolByUserId', // Use the correct action type
    async () => {
        // const userDetails: any = thunkAPI.getState().state.loginData.userDetails;
        const state = store.getState()
        try {
            const { data } = await axios.post(
                `${base_url}${get_school_by_user_id_url}`,
                {
                    userId: state.loginData?.data?.userDetails?.id,
                },
                {
                    headers: {
                        ...authorizationToken(
                            state.loginData?.data as loginDataTypes
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

const dashboardDataSlice = createSlice({
    name: 'dashboardData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSchoolByUserId.pending, (state) => {
                state.roomData = initialState.roomData
                state.loading = true
                state.error = ''
            })
            .addCase(getSchoolByUserId.fulfilled, (state, action) => {
                state.roomData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getSchoolByUserId.rejected, (state, action) => {
                console.log('action.error', action)
                state.roomData = initialState.roomData
                state.error = action.error.message
                state.loading = false
            })
    },
})

export default dashboardDataSlice.reducer

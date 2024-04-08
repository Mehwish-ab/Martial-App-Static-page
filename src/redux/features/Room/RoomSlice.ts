import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {
    base_url,
    get_school_by_user_id_url,
    authorizationToken,
} from '../../../utils/api_urls'

import store from '../../store'
import { loginDataTypes } from '../types'
import { useEffect } from 'react'
import { getAllUsers } from '../User/UserSlice'
export interface RoomDataType {
    useCase: string
    id: string | undefined | number
    name: string
    floorNumber: number | string
    roomNumber: number | string
    width: string
    height: string
    isActive: boolean
    roomId: number | string
}

export interface GetRoomBySchoolResTypes {
    data: RoomDataType[]
    totalItems: number
    totalPages: number
    currentPage: number
}
export interface ClassDataInitialState {
    RoomData: GetRoomBySchoolResTypes
    loading: boolean
    error: string | undefined
}

const initialState: ClassDataInitialState = {
    RoomData: {
        data: [
            {
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
        ],
        currentPage: 0,
        totalItems: 0,
        totalPages: 0,
    },
    loading: false,
    error: '',
}

export const getRoomDataByUseCase = createAsyncThunk(
    'RoomData/getRoomDataByUseCase',
    async (
        { id, usecase }: { id: number | string; usecase: string },
        thunkAPI
    ) => {
        const state = store.getState()
        try {
            const { data } = await axios.post(
                `${base_url}rooms/byUC`,
                {
                    id: id,
                    useCase: usecase,
                },
                {
                    headers: {
                        ...authorizationToken(
                            state.loginData?.data as loginDataTypes
                        ),
                    },
                }
            )
            return data.results.data
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

export const updateRoomStatusByUseCase = createAsyncThunk(
    'RoomData/updateRoomStatusByUseCase',
    async (
        { id, usecase }: { id: number | string; usecase: string },
        thunkAPI
    ) => {
        const state = store.getState()
        try {
            const { data } = await axios.post(
                `${base_url}rooms/byUC`,
                {
                    id: id,
                    useCase: usecase,
                },
                {
                    headers: {
                        ...authorizationToken(
                            state.loginData?.data as loginDataTypes
                        ),
                    },
                }
            )
            return data.results.data
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

export const deleteRoomDataByUseCase = createAsyncThunk(
    'RoomData/getRoomDataByUseCase',
    async (
        { id, usecase }: { id: number | string; usecase: string },
        thunkAPI
    ) => {
        const state = store.getState()
        try {
            const { data } = await axios.post(
                `${base_url}rooms/byUC`,
                {
                    id: id,
                    useCase: usecase,
                },
                {
                    headers: {
                        ...authorizationToken(
                            state.loginData?.data as loginDataTypes
                        ),
                    },
                }
            )
            return data.results.data
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

const RoomSlice = createSlice({
    name: 'instructorData',
    initialState,
    reducers: {
        updateInstructor: (state, action) => {
            const updateInstructor: RoomDataType = action.payload
            const index = state.RoomData.data.findIndex(
                (b) => b.id === updateInstructor.id
            )
            state.RoomData.data[index] = updateInstructor
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getRoomDataByUseCase.pending, (state) => {
                state.RoomData = initialState.RoomData
                state.loading = true
                state.error = ''
            })
            .addCase(getRoomDataByUseCase.fulfilled, (state, action) => {
                state.RoomData = action.payload
                state.loading = false
                state.error = ''
            })
            .addCase(getRoomDataByUseCase.rejected, (state, action) => {
                console.log('action.error', action)
                state.RoomData = initialState.RoomData
                state.error = action.error.message
                state.loading = false
            })
    },
})

export const { updateInstructor } = RoomSlice.actions

export default RoomSlice.reducer

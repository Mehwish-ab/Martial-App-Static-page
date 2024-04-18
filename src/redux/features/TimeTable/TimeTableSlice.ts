import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import { base_url, authorizationToken } from '../../../utils/api_urls'
import { loginDataTypes } from '../types'

export interface TimeTableDataType {
    timeTableId: number
    title: string
    isRepeated: boolean
    startDate: string
    endDate: string
    isActive: boolean
    showDayOfWeek?: boolean
    classId: number
    activities: string[]
    roomIds: string | number
    instructorIds: string | number
}

export interface GetBranchBySchoolResTypes {
    data: TimeTableDataType[]
    totalItems: number
    totalPages: number
    currentPage: number
}

export interface TimeTableDataInitialState {
    timeTableData: GetBranchBySchoolResTypes
    loading: boolean
    error: string | undefined
}

// const initialState: TimeTableDataInitialState = {
//     timeTableData: {
//         data: [
//             {
//                 timeTableId: 0,
//                 title: '',
//                 isRepeated: false,
//                 startDate: '',
//                 endDate: '',
//                 isActive: false,
//                 activities: null!,
//                 roomIds: null,
//                 instructorIds: null,
//                 classId: null,
//             },
//         ],
//         currentPage: 0,
//         totalItems: 0,
//         totalPages: 0,
//     },
//     loading: false,
//     error: '',
// }

// export const getTimetableByUserId = createAsyncThunk(
//     'TimetableData/getTimetableByUserId',
//     async (classId: any) => {
//         const state = store.getState()
//         console.log('state', state, classId)
//         try {
//             const { data } = await axios.post(
//                 `${base_url}timetable/getAll`,
//                 {
//                     userId:
//                         state.loginData.data?.userDetails.id ||
//                         state.dashboardData.schoolData.userId,
//                     classId: classId,
//                 },
//                 {
//                     headers: {
//                         ...authorizationToken(
//                             state.loginData.data as loginDataTypes
//                         ),
//                     },
//                 }
//             )
//             return data.results
//         } catch (error: any) {
//             if (error.response && error.response.data) {
//                 const obj = {
//                     name: 'AxiosError',
//                     message: error.response.data?.responseMessage,
//                     code: 'ERR_BAD_RESPONSE',
//                 }
//                 throw obj
//             }
//             throw error
//         }
//     }
// )

// const timeTableSlice = createSlice({
//     name: 'TimeTableData',
//     initialState,
//     reducers: {
//         updateTimeTable: (state, action) => {
//             const updateTimeTable: TimeTableDataType = action.payload
//             const index = state.timeTableData.data.findIndex(
//                 (b) => b.timeTableId === updateTimeTable.timeTableId
//             )
//             state.timeTableData.data[index] = updateTimeTable
//         },
//     },
//     extraReducers(builder) {
//         builder
//             .addCase(getTimetableByUserId.pending, (state) => {
//                 state.timeTableData = initialState.timeTableData
//                 state.loading = true
//                 state.error = ''
//             })
//             .addCase(getTimetableByUserId.fulfilled, (state, action) => {
//                 state.timeTableData = action.payload
//                 state.loading = false
//                 state.error = ''
//             })
//             .addCase(getTimetableByUserId.rejected, (state, action) => {
//                 console.log('action.error', action)
//                 state.timeTableData = initialState.timeTableData
//                 state.error = action.error.message
//                 state.loading = false
//             })
//     },
// })

// export const { updateTimeTable } = timeTableSlice.actions

// export default timeTableSlice.reducer

import produce from 'immer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userDataTypes } from './admin/user/updateUserStatusSlice'
import {
    loginDataTypes,
    professionalDetailTypes,
    registerDataType,
} from './types'

type appDataTypes = {
    data: null | loginDataTypes
    userId: registerDataType
    loading: boolean
    error: any
}

const initialState: appDataTypes = {
    data: {} as loginDataTypes,
    userId: null!,
    loading: false,
    error: '',
}

const loginDataSlice = createSlice({
    name: 'user/loginData',
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<registerDataType>) => {
            state.userId = action.payload
        },
        setLoginData: (state, action: PayloadAction<loginDataTypes>) => {
            state.data = action.payload
        },
        removeLoginData: (state) => {
            state.data = null
        },
        becomeProHandler: (
            state,
            { payload }: PayloadAction<professionalDetailTypes>
        ) => {
            return produce(state, (draft) => {
                if (draft.data !== null) {
                    draft.data.ProfessionalDetails = payload
                }
            })
        },
        becomeUserHandler: (state) => {
            return produce(state, (draft) => {
                if (draft.data !== null) {
                    draft.data.ProfessionalDetails = null
                }
            })
        },
        updateUserHandler: (
            state,
            { payload: { firstName, lastName } }: PayloadAction<userDataTypes>
        ) => {
            console.log(
                { firstName, lastName },
                'payload of update user detaisl'
            )
            return produce(state, (draft) => {
                if (draft.data !== null) {
                    draft.data.userDetails = {
                        ...draft.data.userDetails,
                        userFirstName: firstName,
                        userLastName: lastName,
                    }
                }
            })
        },
    },
})
export const {
    setLoginData,
    removeLoginData,
    becomeProHandler,
    becomeUserHandler,
    updateUserHandler,
    setUserId,
} = loginDataSlice.actions
export default loginDataSlice.reducer

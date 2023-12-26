import produce from 'immer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userDataTypes } from './admin/user/updateUserStatusSlice'
import { loginDataTypes, professionalDetailTypes } from './types'

type appDataTypes = {
    data: null | loginDataTypes
    loading: boolean
    error: any
}

const initialState: appDataTypes = {
    data: {} as loginDataTypes,
    loading: false,
    error: '',
}

const loginDataSlice = createSlice({
    name: 'user/loginData',
    initialState,
    reducers: {
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
            console.log({ payload }, 'payload')
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
} = loginDataSlice.actions
export default loginDataSlice.reducer

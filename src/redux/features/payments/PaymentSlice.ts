import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../store'
import {
    base_url,
    get_payment,
    authorizationToken,
} from '../../../utils/api_urls'
import { loginDataTypes } from '../types'

export interface PaymentDataType {
    businessUC: string
    id: number
    publishableKey: string
    secretKey: string
    paymentMethod: string
    accountName: string
    countryName: string
    accessToken: string
    clientId: string
    webhook: string
    clientSecret: string
    isActive: boolean
    bankName: string
    accountHolder: string
    ibanNumber: string
    accountNumber: string
    sortCode: string
    bic: string
}

export interface GetPaymentBySchoolResTypes {
    data: PaymentDataType[]
}

export interface PaymentDataInitialState {
    PaymentData: GetPaymentBySchoolResTypes
    loading: boolean
    error: string | undefined
}

const initialState: PaymentDataInitialState = {
    PaymentData: {
        data: [
            {
                businessUC: '',
                id: 0,
                publishableKey: '',
                secretKey: '',
                paymentMethod: '',
                accountName: '',
                countryName: '',
                accessToken: '',
                clientId: '',
                webhook: '',
                clientSecret: '',
                isActive: false,
                bankName: '',
                accountHolder: '',
                ibanNumber: '',
                accountNumber: '',
                sortCode: '',
                bic: '',
            },
        ],
    },
    loading: false,
    error: '',
}
const PaymentSlice = createSlice({
    name: 'PaymentData',
    initialState,
    reducers: {
        updatePayment: (state, action) => {
            const updatePayment: PaymentDataType = action.payload
            const index = state.PaymentData.data.findIndex(
                (b) =>
                    b.id === updatePayment.id &&
                    b.businessUC === updatePayment.businessUC
            )
            state.PaymentData.data[index] = updatePayment
        },
    },
    //   extraReducers(builder) {
    //     builder
    //       .addCase(getPaymentByUserId.pending, (state, action) => {
    //         state.PaymentData = initialState.PaymentData;
    //         state.loading = true;
    //         state.error = "";
    //       })
    //       .addCase(getPaymentByUserId.fulfilled, (state, action) => {
    //         state.PaymentData = action.payload;
    //         state.loading = false;
    //         state.error = "";
    //       })
    //       .addCase(getPaymentByUserId.rejected, (state, action) => {
    //         console.log("action.error", action);
    //         state.PaymentData = initialState.PaymentData;
    //         state.error = action.error.message;
    //         state.loading = false;
    //       });
    //   },
})

export const getPaymentByUserId = createAsyncThunk('Payment/get', async () => {
    const state = store.getState()
    console.log('state', state)
    try {
        const { data } = await axios.post(
            `${base_url}${get_payment}`,
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
})

export const { updatePayment } = PaymentSlice.actions

export default PaymentSlice.reducer

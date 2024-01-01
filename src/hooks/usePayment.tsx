import { useState } from 'react'
import axios from 'axios'
import { authorizationToken, get_payment } from '../utils/api_urls'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { loginDataTypes } from '../redux/features/types'
import CustomModal from '../components/Modal/CustomModal'
import EnnvisionModal from '../components/CustomModals/EnnvisionModal'
import { toast } from 'react-toastify'
import { createPaymentInitialValues } from '../components/Modals/payments/constant'

interface IUsePayments {
    loading: boolean
    error: string
    get_bank: (businessUC: any, id: number) => Promise<any>
    get_gocard: (businessUC: any, id: number) => Promise<any>
    get_paypal: (businessUC: any, id: number) => Promise<any>
    get_stripe: (businessUC: any, id: number) => Promise<any>
    get_cash: (businessUC: any, id: number) => Promise<any>
    deletePayment: (paymentMethod: string, id: number) => Promise<void>
    Createmodal: () => {
        modalComponent: JSX.Element
    }
    UpdateModal: () => {
        modalComponent: JSX.Element
    }
    deletemodal: () => {
        modalComponent: JSX.Element
    }
    create_Payment: (
        businessuc: any,
        values: any,
        Id: any,
        PaymentMethod: createPaymentInitialValues
    ) => Promise<any>
    editPayment: (businessuc: any, values: any, id: any) => Promise<any>
    data: any
}

const usePayment = (): IUsePayments => {
    const [loading, setLoading] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [data, setData] = useState<unknown>({})
    const [error, setError] = useState('')
    const { loginData } = useSelector((state: RootState) => state)

    const editPayment = async (businessuc: any, values: any): Promise<any> => {
        // const url = 'paymentMethod/update'

        try {
            setError('')
            setLoading(true)

            const payload = {
                businessUC: businessuc,
                id: values.id,
                publishableKey: values.publishableKey,
                secretKey: values.secretKey,
                accountName: values.accountName,
                paymentMethod: values.paymentMethod,
                isActive: values.isActive,
                countryName: values.countryName,
                accessToken: values.accessToken,
                clientId: values.clientId,
                webhook: values.webhook,
                clientSecret: values.clientSecret,
                bankName: values.bankName,
                accountHolder: values.accountHolder,
                ibanNumber: values.ibanNumber,
                accountNumber: values.accountNumber,
                sortCode: values.sortCode,
                bic: values.bic,
                // schoolPaypalMethod:false,
                // schoolCashMethod:false,
                // schoolBankAccountMethod:false,
                // schoolStripeMethod:false,
                // schoolGclMethod:false,
                // stripePublicKey: values.stripePublishableKey,
                // stripeSecretKey: values.stripeSecretKey,
                // gclAccessToken: values.cardAccessToken,
                // gclClientId: values.cardClientId,
                // gclWebHook: values.cardWebHook,
                // gclClientSecret: values.cardClientSecret,
                // schoolStripeMethod: values.schoolStripeMethod,
                // schoolGclMethod: values.schoolGclMethod,
            }

            const { data: data2 } = await axios.post(
                'paymentMethod/update',
                payload,
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }

            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                // navigate(`school/add-payment-information/${Id}`);
            }, 3000)

            // navigate("/school/view");
            return data2
            //setIsUploadImgVisible(true);
            // navigate("/school/view");
        } catch (error2: any) {
            console.log('error is', error2.response.data.responseMessage)
            setLoading(false)
            setError(error2.response.data.responseMessage)
            const id = setTimeout(() => {
                setError('')
            }, 3000)
            if (!setIsShowModal) {
                clearTimeout(id)
            }
        }
    }

    const create_Payment = async (
        businessuc: any,
        values: any,
        Id: any,
        PaymentMethod: createPaymentInitialValues
    ): Promise<any> => {
        const token = values.accessToken
        console.log('token', token)

        const payload = {
            businessUC: businessuc,
            id: Number(Id),
            secretKey: values.secretKey,
            publishableKey: values.publishableKey,
            paymentMethod: PaymentMethod,
            accountName: values.accountName,
            countryName: values.countryName,
            accessToken: values.accessToken,
            clientId: values.clientId,
            webhook: values.webhook,
            clientSecret: values.clientSecret,
            isActive: true,
            bankName: values.bankName,
            accountHolder: values.accountHolder,
            ibanNumber: values.ibanNumber,
            accountNumber: values.ccountNumber,
            sortCode: values.sortCode,
            bic: values.bic,

            // schoolPaypalMethod:false,
            // schoolCashMethod:false,
            // schoolBankAccountMethod:false,
            // schoolStripeMethod:false,
            // schoolGclMethod:false,
            // stripePublicKey: values.stripePublishableKey,
            // stripeSecretKey: values.stripeSecretKey,
            // gclAccessToken: values.cardAccessToken,
            // gclClientId: values.cardClientId,
            // gclWebHook: values.cardWebHook,
            // gclClientSecret: values.cardClientSecret,
            // schoolStripeMethod: values.schoolStripeMethod,
            // schoolGclMethod: values.schoolGclMethod,
        }

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/paymentMethod/create',
                payload,
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                // navigate("/branch/list");
            }, 3000)
            const values2 = data2
            console.log('payment info', values2)

            return values2
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }

    const get_bank = async (businessUC: any, id: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data2.results.bankAccount
            console.log('payment info', values)

            return values
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }

    const get_gocard = async (businessUC: any, id: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data2.results.goCardLess
            console.log('payment info gocardless', values)

            return values
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }

    const get_stripe = async (businessUC: any, id: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/paymentMethod/get',
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data2.results.stripe
            console.log('payment info', values)

            return values
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }

    const get_paypal = async (businessUC: any, id: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data2.results.paypal
            console.log('payment info', values)

            return values
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }

    const get_cash = async (businessUC: any, id: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data2.results.cash
            console.log('payment info', values)

            return values
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }

    const deletePayment = async (
        paymentMethod: string,
        id: number
    ): Promise<void> => {
        const url = '/paymentMethod/delete'
        console.log('nada', paymentMethod, id)

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                url,
                { paymentMethod, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (data2.responseCode === '500') {
                toast(data2.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return
            }
            const values = data2
            console.log('payment info', values)

            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                // navigate("/branch/list");
            }, 3000)
            setData('results: ' + data2.results)
            console.log('data', { data: data2 })
            setLoading(false)
            // return values;
        } catch (error2: any) {
            console.log('api error', error2)
            setError(error2.response.data.responseMessage)
            setLoading(false)
            console.log(
                error2.response.data.responseMessage,
                'error in api data'
            )
        }
    }

    const Createmodal = (): {
        modalComponent: JSX.Element
    } => {
        return {
            modalComponent: (
                <CustomModal
                    isModalVisible={isShowModal}
                    setIsModalVisible={setIsShowModal}
                    showCloseBtn={false}
                >
                    {' '}
                    <EnnvisionModal
                        doTask={() => {
                            // navigate("/branch/list");
                            setIsShowModal(false)
                        }}
                        title="Added Successfully"
                        description="Your payment method has been successfully added. Enjoy a hassle-free experience with our app!"
                    />
                </CustomModal>
            ),
        }
    }

    const deletemodal = (): {
        modalComponent: JSX.Element
    } => {
        return {
            modalComponent: (
                <CustomModal
                    isModalVisible={isShowModal}
                    setIsModalVisible={setIsShowModal}
                    showCloseBtn={false}
                >
                    {' '}
                    <EnnvisionModal
                        doTask={() => {
                            // navigate("/pa/view");
                            setIsShowModal(false)
                        }}
                        title="Successfully deleted PAyment"
                        description="The Payment has been successfully removed, and please note that any associated data will be retained for a period of 30 days before it is permanently deleted from our system."
                    />
                </CustomModal>
            ),
        }
    }

    const UpdateModal = (): {
        modalComponent: JSX.Element
    } => {
        return {
            modalComponent: (
                <CustomModal
                    isModalVisible={isShowModal}
                    setIsModalVisible={setIsShowModal}
                    showCloseBtn={false}
                >
                    {' '}
                    <EnnvisionModal
                        doTask={() => {
                            setIsShowModal(false)
                        }}
                        title="Update Profile Successfully!"
                        description="Congratulations! on updating your profile! Your changes have been successfully saved, enhancing your experience within the Marital platform."
                    />
                </CustomModal>
            ),
        }
    }

    return {
        loading,
        error,
        get_bank,
        get_gocard,
        get_paypal,
        get_stripe,
        get_cash,
        deletePayment,
        Createmodal,
        UpdateModal,
        deletemodal,
        create_Payment,
        editPayment,
        data,
    }
}

export default usePayment

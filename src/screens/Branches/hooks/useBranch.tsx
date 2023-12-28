/* eslint-disable max-len */
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import {
    authorizationToken,
    create_branch_url,
    get_payment,
    edit_branch_url,
    get_branch_by_school_id_url,
} from '../../../utils/api_urls'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { loginDataTypes } from '../../../redux/features/types'
import { CreateBranchInitialValues } from '../constant'
import EnnvisionModal from '../../../components/CustomModals/EnnvisionModal'
import CustomModal from '../../../components/Modal/CustomModal'
import { useAppSelector } from '../../../app/hooks'

interface IUseBranch {
    loading: boolean
    handleSubmit: (
        values: CreateBranchInitialValues,
        { resetForm }: any
    ) => Promise<void>
    editSchool: (id: number, values: CreateBranchInitialValues) => Promise<void>
    getallbranch: (schoolid: number) => Promise<any> // Change the parameter type to number
    errorMessage: string
    // error: (message: string) => Promise<void>
    get_bank: (businessUC: any, id: number) => Promise<any>
    get_gocard: (businessUC: any, id: number) => Promise<any>
    get_paypal: (businessUC: any, id: number) => Promise<any>
    get_stripe: (businessUC: any, id: number) => Promise<any>
    get_cash: (businessUC: any, id: number) => Promise<any>
    getbranchbyid: (_branchId: number) => Promise<any>
    deletebranch: (_branchId: number) => Promise<void>
    deletePayment: (paymentMethod: string, id: number) => Promise<void>
    deletemodal: () => { modalComponent: JSX.Element }
    UpdateModal: () => { modalComponent: JSX.Element }
    Createmodal: () => { modalComponent: JSX.Element }
}

const useBranch = (): IUseBranch => {
    const [loading, setLoading] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [data, setData] = useState<any>({})

    const [errorMessage, setError] = useState('')
    const toastId = useRef<any>(null)
    const { branchId } = useParams()

    const navigate = useNavigate()
    const { loginData } = useSelector((state: RootState) => state)
    const { data: logindata } = useAppSelector((state) => state.loginData)

    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )

    // const dispatch = useDispatch()

    const handleSubmit = async (
        values: CreateBranchInitialValues,
        { resetForm }: any
    ): Promise<void> => {
        const userDetails = loginData.data?.userDetails
        console.log('values', values)
        const payload = {
            userId: userDetails?.id || '',
            branchName: values.branchName,
            branchType: values.branchType,
            address: values.address,
            phoneNumber: values?.branchPhoneNumber || '',
            rank: values.rank == '1' ? true : false,
            activities: values.selectedActivities.join(','),
            facilities: values.selectedFacilities.join(','),
            description: values.description,
            stripePublicKey: values.stripePublishableKey,
            stripeSecretKey: values.stripeSecretKey,
            gclAccessToken: values.cardAccessToken,
            gclClientId: values.cardClientId,
            gclWebHook: values.cardWebHook,
            gclClientSecret: values.cardClientSecret,
            schoolId: schoolData.schoolId || loginData.data?.schoolId,
            schoolStripeMethod: values.schoolStripeMethod,
            schoolGclMethod: values.schoolGclMethod,
            defaultLanguageId: values.defaultLanguage,
            defaultCurrencyId: values.defaultCurrency,
            schoolCashMethod: false,
            schoolBankAccountMethod: false,
            schoolPaypalMethod: false,

            ...(branchId && { branchId }), // Add schoolId conditionally
        }

        //let endpoint = branchId ? edit_branch_url : create_branch_url;
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                create_branch_url,
                payload,
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (data.responseCode === '500') {
                toast(data.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return data2
            }
            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/branch/list')
            }, 3000)
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            //setLoading(false);
            console.log({ data })
            console.log(userDetails)

            //setIsUploadImgVisible(true);
            // navigate("/");
            resetForm()
        } catch (e: any) {
            console.error('Error:', e)
            //console.log({ error });
            setLoading(false)
            //setError(error.response.data.responseMessage);
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(e, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    const getallbranch = async (schoolid: number): Promise<any> => {
        const url = get_branch_by_school_id_url
        console.log('>> im in getall branch button')
        try {
            setError('')
            setLoading(true)
            const { data: data3 } = await axios.post(
                url,
                { schoolId: schoolid },
                {
                    headers: {
                        ...authorizationToken(logindata!),
                    },
                }
            )
            if (data3.responseCode === '500') {
                toast(data.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return data3
            }
            // setIsShowModal(true);
            // setTimeout(() => {
            //   setLoading(false);
            //   setIsShowModal(false);
            //   //navigate("/school/view");
            // }, 3000);
            setData('results: ' + data)
            console.log('data', data.results.data)
            // console.log(
            //   "hello",
            //   data.map((pic: any) => {
            //     return pic;
            //   })
            // );
            setLoading(false)
            return data.results.data
        } catch (e: any) {
            console.log('api error', errorMessage)
            setError((errorMessage as any).response.data.responseMessage)
            setLoading(false)
            console.log(
                (errorMessage as any).response.data.responseMessage,
                'error in api data'
            )
            setError(
                (errorMessage as any).response?.data?.responseMessage ||
                    'An error occurred'
            )
        }
    }

    const editSchool = async (
        id: number,
        values: CreateBranchInitialValues
    ): Promise<void> => {
        const userDetails = loginData.data?.userDetails

        try {
            setError('')
            setLoading(true)
            console.log('id sch', schoolData.schoolId, values)

            const payload = {
                userId: userDetails?.id || '',
                branchName: values.branchName,
                branchType: values.branchType,
                address: values.address,
                phoneNumber: values?.branchPhoneNumber || '',
                rank: values.rank == 1 ? true : false,
                activities: values.selectedActivities.join(','),
                facilities: values.selectedFacilities.join(','),
                description: values.description,
                gclClientSecret: false,
                schoolId: schoolData.schoolId,
                // schoolId: 3,
                defaultCurrencyId: values.defaultCurrency,
                defaultLanguageId: values.defaultLanguage,
                schoolStripeMethod: false,
                schoolGclMethod: false,
                stripePublicKey: false,
                stripeSecretKey: false,
                gclAccessToken: false,
                gclClientId: 'gclClientId_8efc27897a56',
                gclWebHook: 'gclWebHook_1c49144280a8',
                schoolBankAccountMethod: false,
                schoolCashMethod: false,
                schoolPaypalMethod: false,

                ...(branchId && { branchId }), // Add schoolId conditionally
            }

            const { data: data4 } = await axios.post(edit_branch_url, payload, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                },
            })
            if (data.responseCode === '500') {
                setLoading(false)
                return
            }

            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/branch/list')
            }, 3000)
            console.log('hi', data.results.data)

            // navigate("/school/view");
            console.log('hello', data4)
            //setIsUploadImgVisible(true);
            // navigate("/school/view");
        } catch (e: any) {
            console.log('error', { error: errorMessage })
            setLoading(false)
            setError((errorMessage as any).response.data.responseMessage)
            const id2 = setTimeout(() => {
                setError('')
            }, 3000)
            if (!setIsShowModal) {
                clearTimeout(id2)
            }
            toastId.current = toast(
                (errorMessage as any).response.data.errors,
                {
                    type: 'error',
                    autoClose: 1000,
                }
            )
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
            console.log('payment info', values)

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
                        ...authorizationToken(logindata!),
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
                navigate('/branch/list')
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

    const deletebranch = async (_branchId: number): Promise<void> => {
        const url = '/branch/delete'
        console.log(_branchId)

        console.log('>> im in deletebranch button')

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                url,
                { branchId: _branchId },
                {
                    headers: {
                        ...authorizationToken(logindata!),
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
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/branch/list')
            }, 3000)
            setData('results: ' + data2)
            console.log('data', { data: data2 })
            setLoading(false)
            // navigate("/school");
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

    const getbranchbyid = async (_branchId: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/branch/getDetailsById',
                { branchId: _branchId },
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
            console.log('branchh info', data2.results)
            setLoading(false)
            return data2.results
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
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
                            navigate('/branch/list')
                            setIsShowModal(false)
                        }}
                        title="Complete Profile Successfully!"
                        description="Congratulations! Your profile has been successfully completed, ensuring a seamless experience within the Marital"
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
                            navigate('/school/view')
                            setIsShowModal(false)
                        }}
                        title="Successfully Branch Removed"
                        description="The Branch has been successfully removed, and please note that any associated data will be retained for a period of 30 days before it is permanently deleted from our system."
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
        handleSubmit,
        editSchool,
        getallbranch,
        errorMessage,
        Createmodal,
        get_bank,
        get_gocard,
        get_paypal,
        get_stripe,
        get_cash,
        getbranchbyid,
        deletebranch,
        deletemodal,
        deletePayment,
        UpdateModal,
    }
}

export default useBranch

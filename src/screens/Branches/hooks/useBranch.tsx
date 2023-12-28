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
import { useDispatch, useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { loginDataTypes } from '../../../redux/features/types'
import { CreateBranchInitialValues } from '../constant'
import EnnvisionModal from '../../../components/CustomModals/EnnvisionModal'
import CustomModal from '../../../components/Modal/CustomModal'
import { useAppSelector } from '../../../app/hooks'

const useBranch = () => {
    const [loading, setLoading] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [data, setData] = useState<unknown>({})

    const [error, setError] = useState('')
    const toastId = useRef<any>(null)
    const { branchId } = useParams()

    const navigate = useNavigate()
    const { loginData } = useSelector((state: RootState) => state)
    const { data: logindata } = useAppSelector((state) => state.loginData)

    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )
    const dispatch = useDispatch()

    const handleSubmit = async (
        values: CreateBranchInitialValues,
        { resetForm }: any
    ) => {
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
            const { data } = await axios.post(create_branch_url, payload, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                },
            })
            if (data.responseCode === '500') {
                toast(data.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return
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
        } catch (error: any) {
            console.error('Error:', error)
            //console.log({ error });
            setLoading(false)
            //setError(error.response.data.responseMessage);
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(error, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    const getallbranch = async (schoolid: number) => {
        const url = get_branch_by_school_id_url
        console.log('>> im in getall branch button')
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                url,
                { schoolId: schoolid },
                {
                    headers: {
                        ...authorizationToken(logindata!),
                    },
                }
            )
            if (data.responseCode === '500') {
                toast(data.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return
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
        } catch (error: any) {
            console.log('api error', error)
            setError(error.response.data.responseMessage)
            setLoading(false)
            console.log(
                error.response.data.responseMessage,
                'error in api data'
            )
            setError(
                error.response?.data?.responseMessage || 'An error occurred'
            )
        }
    }

    const editSchool = async (
        branchId: number,
        values: CreateBranchInitialValues
    ) => {
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

            const { data } = await axios.post(edit_branch_url, payload, {
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
            console.log('hello', data)
            //setIsUploadImgVisible(true);
            // navigate("/school/view");
        } catch (error: any) {
            console.log('error', { error })
            setLoading(false)
            setError(error.response.data.responseMessage)
            const id = setTimeout(() => {
                setError('')
            }, 3000)
            if (!setIsShowModal) {
                clearTimeout(id)
            }
            toastId.current = toast(error.response.data.errors, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    const get_bank = async (businessUC: any, id: number) => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data.results.bankAccount
            console.log('payment info', values)

            return values
        } catch (error: any) {
            console.log('error', error)
            setLoading(false)
            setError(error)
        }
    }
    const get_gocard = async (businessUC: any, id: number) => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data.results.goCardLess
            console.log('payment info', values)

            return values
        } catch (error: any) {
            console.log('error', error)
            setLoading(false)
            setError(error)
        }
    }
    const get_stripe = async (businessUC: any, id: number) => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                '/paymentMethod/get',
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data.results.stripe
            console.log('payment info', values)

            return values
        } catch (error: any) {
            console.log('error', error)
            setLoading(false)
            setError(error)
        }
    }
    const get_paypal = async (businessUC: any, id: number) => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data.results.paypal
            console.log('payment info', values)

            return values
        } catch (error: any) {
            console.log('error', error)
            setLoading(false)
            setError(error)
        }
    }
    const get_cash = async (businessUC: any, id: number) => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data.results.cash
            console.log('payment info', values)

            return values
        } catch (error: any) {
            console.log('error', error)
            setLoading(false)
            setError(error)
        }
    }
    const deletePayment = async (paymentMethod: string, id: number) => {
        const url = '/paymentMethod/delete'
        console.log('nada', paymentMethod, id)

        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                url,
                { paymentMethod, id },
                {
                    headers: {
                        ...authorizationToken(logindata!),
                    },
                }
            )
            if (data.responseCode === '500') {
                toast(data.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return
            }
            const values = data
            console.log('payment info', values)

            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/branch/list')
            }, 3000)
            setData('results: ' + data.results)
            console.log('data', { data })
            setLoading(false)
            // return values;
        } catch (error: any) {
            console.log('api error', error)
            setError(error.response.data.responseMessage)
            setLoading(false)
            console.log(
                error.response.data.responseMessage,
                'error in api data'
            )
        }
    }

    const deletebranch = async (branchId: number) => {
        const url = '/branch/delete'
        console.log(branchId)

        console.log('>> im in deletebranch button')

        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                url,
                { branchId },
                {
                    headers: {
                        ...authorizationToken(logindata!),
                    },
                }
            )
            if (data.responseCode === '500') {
                toast(data.responseMessage, {
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
            setData('results: ' + data)
            console.log('data', { data })
            setLoading(false)
            // navigate("/school");
        } catch (error: any) {
            console.log('api error', error)
            setError(error.response.data.responseMessage)
            setLoading(false)
            console.log(
                error.response.data.responseMessage,
                'error in api data'
            )
        }
    }

    const getbranchbyid = async (branchId: number) => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                '/branch/getDetailsById',
                { branchId },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data.responseCode === '500') {
                setLoading(false)
                return
            }
            console.log('branchh info', data.results)
            setLoading(false)
            return data.results
        } catch (error: any) {
            console.log('error', error)
            setLoading(false)
            setError(error)
        }
    }

    const CreateModal = (): JSX.Element => {
        return (
            <CustomModal
                isModalVisible={isShowModal}
                setIsModalVisible={setIsShowModal}
                showCloseBtn={false}
            >
                <EnnvisionModal
                    doTask={() => {
                        navigate('/branch/list')
                        setIsShowModal(false)
                    }}
                    title="Complete Profile Successfully!"
                    description="Congratulations! Your profile has been successfully completed, ensuring a seamless experience within the Marital"
                />
            </CustomModal>
        )
    }

    const deletemodal = () => {
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

    const UpdateModal = () => {
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
        error,
        CreateModal,
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

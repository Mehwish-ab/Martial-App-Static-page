import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { authorizationToken } from '../../../utils/api_urls'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import { loginDataTypes } from '../../../redux/features/types'
import { CreateFranchiseInitialValues } from '../constant'
import { FormikHelpers } from 'formik'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useFranchise = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const toastId = useRef<unknown>(null)
    const navigate = useNavigate()
    const { loginData } = useSelector((state: RootState) => state)
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isShowModal, setIsShowModal] = useState(false)
    const [data, setData] = useState<unknown>({})

    const handleSubmit = async (
        values: CreateFranchiseInitialValues,
        { resetForm }: FormikHelpers<CreateFranchiseInitialValues>
    ): Promise<void> => {
        console.log('values', values)
        const payload = {
            franchiseName: values.franchiseName,
            franchiseType: values.franchiseType,
            address: values.address,
            phoneNumber: values?.franchisePhoneNumber || '',
            rank: values.rank == '1' ? true : false,
            activities: values.selectedActivities.join(','),
            facilities: values.selectedFacilities.join(','),
            description: values.description,
            schoolId: schoolData.schoolId || loginData.data?.schoolId,
            defaultCurrencyId: values.defaultCurrency,
            defaultLanguageId: values.defaultLanguage,
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
            const { data: data4 } = await axios.post(
                '/franchise/create',
                payload,
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (data4.responseCode === '500') {
                toast(data4.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return
            }
            toastId.current = toast(data4.responseMessage, {
                type: 'success',
                autoClose: 1000,
            })
            setLoading(false)
            console.log({ data })
            navigate('/franchise/list')
            resetForm()
            // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log({ error })
            setLoading(false)
            setError(error.response.data.responseMessage)
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(error.response.data.responseMessage, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    const viewFranchisebyid = async (franchiseId: number): Promise<unknown> => {
        try {
            setError('')
            setLoading(true)
            const { data: data3 } = await axios.post(
                '/franchise/getDetailsById',
                { franchiseId },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data3.responseCode === '500') {
                setLoading(false)
                return
            }
            console.log('franchise info', data3.results)
            setLoading(false)
            return data3.results
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-shadow
        } catch (error: any) {
            console.log('error', error)
            setLoading(false)
            setError(error)
        }
    }

    const editFranchise = async (
        franchiseId: number,
        values: CreateFranchiseInitialValues
    ): Promise<unknown> => {
        const url = '/franchise/edit'
        const userDetails = loginData.data?.userDetails

        try {
            setError('')
            setLoading(true)

            const payload = {
                userId: userDetails?.id || '',
                franchiseId: franchiseId,
                franchiseName: values.franchiseName,
                franchiseType: values.franchiseType,
                address: values.address,
                phoneNumber: values?.franchisePhoneNumber || '',
                rank: values.rank == '1' ? true : false,
                defaultLanguageId: values.defaultLanguage,
                defaultCurrencyId: values.defaultCurrency,
                activities: values.selectedActivities.join(','),
                facilities: values.selectedFacilities.join(','),
                description: values.description,
                franchiseStatusId: 1,
                // schoolId: schoolData.schoolId,
                schoolId: 3,
                ...(franchiseId && { franchiseId }),
            }
            console.log('Payload', payload)

            const { data: data1 } = await axios.post(url, payload, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                },
            })
            if (data1.responseCode === '500') {
                setLoading(false)
                return data1.response
            }

            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/school/view')
            }, 3000)

            console.log({ data })
            // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log({ error })
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

    const getFranchisebyid = async (franchiseId: number): Promise<unknown> => {
        try {
            setError('')
            setLoading(true)
            const { data: datas } = await axios.post(
                '/franchise/getDetailsById',
                { franchiseId },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (datas.responseCode === '500') {
                setLoading(false)
                return datas
            }
            console.log('franchise info', datas.results)
            setLoading(false)
            return datas.results
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (Error: any) {
            console.log('error', Error)
            setLoading(false)
            setError(Error)
        }
    }

    const deleteFranchise = async (franchiseId: number): Promise<void> => {
        const url = '/franchise/delete'
        console.log(franchiseId)

        console.log('>> im in deletefranchise button')

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                url,
                { franchiseId },
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
            // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-explicit-any
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

    return {
        loading,
        handleSubmit,
        viewFranchisebyid,
        editFranchise,
        deleteFranchise,
        getFranchisebyid,
        error,
    }
}

export default useFranchise

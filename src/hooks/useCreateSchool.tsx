/* eslint-disable max-len */
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { CreateSchoolInitialValues } from '../screens/Home/constants'
import axios from 'axios'
import {
    authorizationToken,
    create_school_url,
    edit_school_url,
} from '../utils/api_urls'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { loginDataTypes } from '../redux/features/types'
import EnnvisionModal from '../components/CustomModals/EnnvisionModal'
import CustomModal from '../components/Modal/CustomModal'
import { useAppSelector } from '../app/hooks'

interface IModalComponent {
    modalComponent: JSX.Element
}

interface IUseSchool {
    loading: boolean
    handleCreateSubmit: (
        values: CreateSchoolInitialValues,
        { resetForm }: any
    ) => Promise<void>
    editSchool: (
        _schoolId: number,
        values: CreateSchoolInitialValues
    ) => Promise<void>
    deleteSchool: (userId: number) => Promise<void>
    errorMessage: string
    isUploadImgModalVisible: boolean
    setIsUploadImgVisible: (param: boolean) => void
    deletemodal: () => IModalComponent
    Createmodal: () => IModalComponent
    UpdateModal: () => IModalComponent
}

const useCreateSchool = (): IUseSchool => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setError] = useState('')
    const [isUploadImgModalVisible, setIsUploadImgVisible] = useState(false)
    const toastId = useRef<any>(null)
    const { schoolId } = useParams()
    const { data: logindata } = useAppSelector((state) => state.loginData)

    const navigate = useNavigate()

    const [isShowModal, setIsShowModal] = useState(false)
    const { loginData } = useSelector((state: RootState) => state)

    // to create School
    const handleCreateSubmit = async (
        values: CreateSchoolInitialValues,
        { resetForm }: any
    ): Promise<void> => {
        console.log('>> im in handleSubmit')
        const userDetails = loginData.data?.userDetails

        const payload = {
            userId: userDetails?.id || '',
            businessName: values.businessName || '',
            businessType: values.businessType,
            address: values.address || '',
            phoneNumber: values?.businessPhoneNumber || '',
            rank: values.rank === 1 ? true : false,
            defaultLanguageId: values.defaultLanguage,
            defaultCurrencyId: values.defaultCurrency,
            activities: values.selectedActivities.join(','),
            facilities: values.selectedFacilities.join(','),
            description: values.description,
            stripePublicKey: '',
            stripeSecretKey: '',
            gclAccessToken: '',
            gclClientId: '',
            gclWebHook: '',
            gclClientSecret: '',

            ...(schoolId && { schoolId }), // Add schoolId conditionally
        }

        const endpoint = schoolId ? edit_school_url : create_school_url
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(endpoint, payload, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                },
            })
            if (data2.responseCode === '500') {
                toast(data2.responseMessage, {
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
                navigate('/school/view')
            }, 3000)
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            //setLoading(false);
            console.log('data', { data: data2 })
            //setIsUploadImgVisible(true);
            // navigate("/");
            resetForm()
        } catch (error2: any) {
            console.log('error', { error: error2 })
            setLoading(false)
            setError(error2.response.data.responseMessage)
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(error2.message, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    //to edit school
    const editSchool = async (
        _schoolId: number,
        values: CreateSchoolInitialValues
    ): Promise<void> => {
        const url = edit_school_url
        const userDetails = loginData.data?.userDetails

        try {
            setError('')
            setLoading(true)

            const payload = {
                userId: userDetails?.id || '',
                businessName: values.businessName,
                businessType: values.businessType,
                address: values.address,
                phoneNumber: values?.businessPhoneNumber || '',
                rank: values.rank === 1 ? true : false,
                defaultLanguageId: values.defaultLanguage,
                defaultCurrencyId: values.defaultCurrency,
                activities: values.selectedActivities.join(','),
                facilities: values.selectedFacilities.join(','),
                description: values.description,
                stripePublicKey: '',
                stripeSecretKey: '',
                gclAccessToken: '',
                gclClientId: '',
                gclWebHook: '',
                gclClientSecret: '',

                ...(_schoolId && { schoolId: _schoolId }), // Add schoolId conditionally
            }

            const { data: data2 } = await axios.post(url, payload, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                },
            })
            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }

            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/school/view')
            }, 3000)

            // navigate("/school/view");
            console.log({ data: data2 })
            //setIsUploadImgVisible(true);
            // navigate("/school/view");
        } catch (error2: any) {
            console.log({ error: error2 })
            setLoading(false)
            setError(error2.response.data.responseMessage)
            const id = setTimeout(() => {
                setError('')
            }, 3000)
            if (!setIsShowModal) {
                clearTimeout(id)
            }
            toastId.current = toast(error2.response.data.errors, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    //to delete school
    const deleteSchool = async (userId: number): Promise<void> => {
        const url = '/school/delete'
        console.log('>> im in deleteSchool button')

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                url,
                { schoolId: userId },
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
                navigate('/school/create')
            }, 3000)
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

    const deletemodal = (): IModalComponent => {
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
                        title="Successfully Account Removed"
                        description="The student class has been successfully removed, and please note that any associated data will be retained for a period of 30 days before it is permanently deleted from our system."
                    />
                </CustomModal>
            ),
        }
    }

    const Createmodal = (): IModalComponent => {
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
                        title="Complete Profile Successfully!"
                        description="Congratulations! Your profile has been successfully completed, ensuring a seamless experience within the Marital"
                    />
                </CustomModal>
            ),
        }
    }

    const UpdateModal = (): IModalComponent => {
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
                        title="Update Profile Successfully!"
                        description="Congratulations! on updating your profile! Your changes have been successfully saved, enhancing your experience within the Marital platform."
                    />
                </CustomModal>
            ),
        }
    }

    return {
        loading,
        handleCreateSubmit,
        editSchool,
        deleteSchool,
        errorMessage,
        isUploadImgModalVisible,
        setIsUploadImgVisible,
        deletemodal,
        Createmodal,
        UpdateModal,
    }
}

export default useCreateSchool

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
import store, { RootState } from '../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { loginDataTypes } from '../redux/features/types'
import CustomModal from '../components/Modal/CustomModal'
import { useAppSelector } from '../app/hooks'
import ic_success from '../assets/images/ic_success.svg'
import ic_error from '../assets/icons/ic_error.svg'
import CustomButton from '../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    lightBlue3,
    lightColor1,
    maastrichtBlue,
} from '../components/GlobalStyle'
import { Col, Row } from 'react-bootstrap'
import { SchoolSuccessfulModals } from './PopupModalsStyling'
import { getAllUsers } from '../redux/features/User/UserSlice'
import CustomMessageModal from '../components/Modal/CustomMessageModal'
import { initialValuesType } from '../screens/User/constant'

interface IModalComponent {
    modalComponent: JSX.Element
}

interface IuseUser {
    loading: boolean
    CreateSubmit: (values: any) => Promise<void>

    errorMessage: string
    isUploadImgModalVisible: boolean
    setIsUploadImgVisible: (param: boolean) => void
    deletemodal: () => IModalComponent
    Createmodal: () => IModalComponent
    UpdateModal: () => IModalComponent
    WarningModal: () => IModalComponent
    SuccessModal: () => IModalComponent

    deleteConfirmation: (id: number) => IModalComponent
    setIsShowModal: (showModal: true) => void
    setIsShowWarningModal: (showModal: true) => void
    getAllUser: (c: string) => Promise<any>
    getAllUserPagination: (c: string, page: number) => Promise<void>
    getUSerById: (Id: number) => Promise<any>
}

const useUser = (): IuseUser => {
    const [loading, setLoading] = useState(false)
    const [Error, setError] = useState('')
    const [isUploadImgModalVisible, setIsUploadImgVisible] = useState(false)
    const toastId = useRef<any>(null)
    const { schoolId } = useParams()
    const { data: logindata } = useAppSelector(
        (state: RootState) => state.loginData
    )
    // const { schoolData } = useAppSelector((state) => state.dashboardData)

    const navigate = useNavigate()

    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const [isShowWarningModal, setIsShowWarningModal] = useState(false)
    const [isShowSuccessModal, setIsShowSuccessModal] = useState(false)
    const [isShowErrorModal, setIsShowErrorModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const { loginData } = useSelector((state: RootState) => state)

    // to create user
    const CreateSubmit = async (values: initialValuesType): Promise<void> => {
        console.log('welcome')

        const payload = {
            firstName: values.firstName || '',
            lastName: values.lastName,
            emailAddress: values.emailAddress || '',
            phoneNumber: values?.phoneNumber || '',
            roleId: values.roleId,
            password: values.password,
            address: values.address,
            city: values.city,
            state: values.state,
            countryName: values.countryName,
            channel: values.channel,
            countryCode: values.countryCode,
        }
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/api/auth/signup',
                payload,
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            setSuccessMessage(data2.responseMessage)
            setIsShowSuccessModal(true)
            setLoading(false)
            setTimeout(() => {
                setIsShowSuccessModal(false)
                navigate('/user/list')
            }, 3000)
            console.log('data', { data: data2 })
            //setIsUploadImgVisible(true);
            // navigate("/");
        } catch (error2: any) {
            console.log('error', error2.response?.data?.errors.length)
            const errorMessages = error2.response?.data?.errors.map(
                (err: { field: string; errorMessage: string }) =>
                    `<strong>${err.field}</strong> : ${err.errorMessage}`
            )
            setLoading(false)
            setError(error2.response)
            console.log('errorss', errorMessages.length)

            if (errorMessages.length >= 1) {
                setErrorMessage(`${errorMessages.join('<br />')}`)
            } else {
                setErrorMessage(error2.response?.data?.responseMessage)
            }
            setIsShowErrorModal(true)
            setTimeout(() => {
                setIsShowErrorModal(false)
                setError('')
            }, 10000)
        }
    }
    //get all users list
    const getAllUser = async (c: string): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: allschool } = await axios.post(
                'api/auth/getAll',
                { country: '', roleId: 1 },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (allschool.responseCode === '500') {
                setLoading(false)
                return
            }

            setLoading(false)
            return allschool.results
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

    //getUser by id
    const getUSerById = async (Id: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: allschool } = await axios.post(
                'api/auth/getAll', //change it
                { userId: Id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (allschool.responseCode === '500') {
                setLoading(false)
                return
            }

            setLoading(false)
            return allschool.results
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

    //get all user pagenation
    const getAllUserPagination = async (
        c: string,
        page: number
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: allschool } = await axios.post(
                `api/auth/getAll?pageNo=${page}`,
                { country: '' },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (allschool.responseCode === '500') {
                setLoading(false)
                return
            }

            setLoading(false)

            return allschool.results
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

    //delete Modal
    const deletemodal = (): IModalComponent => {
        return {
            modalComponent: (
                <CustomModal
                    isModalVisible={isShowDeleteModal}
                    setIsModalVisible={setIsShowDeleteModal}
                    showCloseBtn={true}
                >
                    <SchoolSuccessfulModals>
                        <div className="mainContainer d-flex flex-column align-items-center">
                            <img
                                src={ic_success}
                                alt="Success Icon"
                                width={79}
                                height={79}
                            />
                            <h3 className="mainContainer-heading text-center">
                                Successfully Account Removed
                            </h3>
                            <p className="mainContainer-subText text-center">
                                The student class has been successfully removed,
                                and please note that any associated data will be
                                retained for a period of 30 days before it is
                                permanently deleted from our system.
                            </p>
                        </div>
                    </SchoolSuccessfulModals>
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
                    showCloseBtn={true}
                >
                    <SchoolSuccessfulModals>
                        <div className="mainContainer d-flex flex-column align-items-center">
                            <img
                                src={ic_success}
                                alt="Success Icon"
                                width={79}
                                height={79}
                            />
                            <h3 className="mainContainer-heading text-center">
                                Complete Successfully!
                            </h3>
                            <p className="mainContainer-subText text-center">
                                Congratulations! Your profile has been
                                successfully completed, ensuring a seamless
                                experience within the Marital
                            </p>
                        </div>
                    </SchoolSuccessfulModals>
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
                    showCloseBtn={true}
                >
                    <SchoolSuccessfulModals>
                        <div className="mainContainer d-flex flex-column align-items-center">
                            <img
                                src={ic_success}
                                alt="Success Icon"
                                width={79}
                                height={79}
                            />
                            <h3 className="mainContainer-heading text-center">
                                Update Successfully!
                            </h3>
                            <p className="mainContainer-subText text-center">
                                Congratulations! on updating your profile! Your
                                changes have been successfully saved, enhancing
                                your experience within the Marital platform.
                            </p>
                        </div>
                    </SchoolSuccessfulModals>
                </CustomModal>
            ),
        }
    }

    const SuccessModal = (): IModalComponent => {
        return {
            modalComponent: (
                <CustomMessageModal
                    title="Success"
                    description={successMessage}
                    isModalVisible={isShowSuccessModal}
                    setIsModalVisible={setIsShowSuccessModal}
                    imageProp={'success'}
                />
            ),
        }
    }

    const WarningModal = (): IModalComponent => {
        return {
            modalComponent: (
                <CustomMessageModal
                    title="Warning"
                    description={errorMessage}
                    isModalVisible={isShowErrorModal}
                    setIsModalVisible={setIsShowSuccessModal}
                    imageProp={'error'}
                />
            ),
        }
    }
    const deleteConfirmation = (_id: number): IModalComponent => {
        const Deleteschool = async (id: number): Promise<void> => {
            setIsShowModal(false) // Close any other modals
            setIsShowDeleteModal(true)
            //   await deleteSchool(id)
        }
        return {
            modalComponent: (
                <CustomModal
                    isModalVisible={isShowModal}
                    setIsModalVisible={setIsShowModal}
                    showCloseBtn={true}
                >
                    <SchoolSuccessfulModals>
                        <div className="mainContainer">
                            <h3 className="mainContainer-heading text-center">
                                Want to Remove Account
                            </h3>
                            <p className="mainContainer-subText text-center">
                                Before proceeding with the removal of a student
                                account, please be aware that once the removal
                                is confirmed, all access will be permanently
                                revoked. If the user still holds an active
                                membership, the account cannot be removed until
                                the membership is completed or canceled.
                            </p>
                            <Row className="mt-20">
                                <Col md="6">
                                    <CustomButton
                                        bgcolor={lightColor1}
                                        textTransform="Captilize"
                                        color={maastrichtBlue}
                                        padding="10px 12.5px"
                                        fontFamily={fontFamilyMedium}
                                        width="100%"
                                        type="button"
                                        title="Cancel"
                                        fontSize="16px"
                                        loading={false}
                                        clicked={() => setIsShowModal(false)}
                                    />
                                </Col>
                                <Col md="6">
                                    <CustomButton
                                        bgcolor={lightBlue3}
                                        textTransform="Captilize"
                                        color={maastrichtBlue}
                                        padding="10px 12.5px"
                                        fontFamily={fontFamilyMedium}
                                        width="100%"
                                        type="submit"
                                        title="Confirmed"
                                        fontSize="16px"
                                        loading={false}
                                        clicked={() => Deleteschool(_id)}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </SchoolSuccessfulModals>
                </CustomModal>
            ),
        }
    }

    return {
        loading,
        setIsShowModal,
        CreateSubmit,
        SuccessModal,
        errorMessage,
        isUploadImgModalVisible,
        setIsUploadImgVisible,
        deletemodal,
        Createmodal,
        UpdateModal,
        deleteConfirmation,
        WarningModal,
        setIsShowWarningModal,
        getAllUser,
        getAllUserPagination,
        getUSerById,
    }
}

export default useUser

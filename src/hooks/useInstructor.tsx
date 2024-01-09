/* eslint-disable max-len */
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { authorizationToken } from '../utils/api_urls'
import { useSelector } from 'react-redux'
import store, { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { loginDataTypes } from '../redux/features/types'
import { CreateInstructorInitialValues } from '../../src/screens/Instructor/constant'
import CustomModal from '../components/Modal/CustomModal'
import { SchoolSuccessfulModals } from './PopupModalsStyling'
import ic_success from '../assets/images/ic_success.svg'
import { Col, Row } from 'react-bootstrap'
import { getInstructorByUserId } from '../redux/features/instructor/instructorSlice'

import CustomButton from '../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    lightBlue3,
    lightColor1,
    maastrichtBlue,
} from '../components/GlobalStyle'

interface IModalComponent {
    modalComponent: JSX.Element
}
interface IUseInstructor {
    loading: boolean
    handleSubmit: (
        values: CreateInstructorInitialValues,
        file: any
    ) => Promise<void>
    deleteInstructor: (instructorId: number) => Promise<void>
    getInstructorbyid: (instructorId: number) => Promise<any>
    updateInstructor: (
        id: number,
        values: CreateInstructorInitialValues,
        file: any
    ) => Promise<void>
    errorMessage: string
    setIsShowModal: (showModal: true) => void
    setImageURL: (imageURL: any) => void
    ImageModal: () => IModalComponent
    Createmodal: () => IModalComponent
    UpdateModal: () => IModalComponent
    deletemodal: () => IModalComponent
    deleteConfirmation: (_id: number) => IModalComponent
    InstructorStatus: (instructorid: number, statusid: number) => Promise<any>
}

const useInstructor = (): IUseInstructor => {
    const [imageURL, setImageURL] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    // const [data, setData] = useState<unknown>({})
    const [errorMessage, setError] = useState('')
    const toastId = useRef<any>(null)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)

    const navigate = useNavigate()
    const { loginData } = useSelector((state: RootState) => state)
    //   const { data: logindata } = useAppSelector((state) => state.loginData);

    // const { schoolData } = useSelector(
    //     (state: RootState) => state.dashboardData
    // )
    // const dispatch = useDispatch()

    const handleSubmit = async (
        values: CreateInstructorInitialValues,
        file: any
    ): Promise<void> => {
        console.log('values from form:', values, 'hu', file)
        const Payload = {
            instructorName: values.instructorName,
            emailAddress: values.emailAddress,
            phoneNumber: values.instructorPhoneNumber,
            address: values?.address || '',
            experience: values.yearsOfExperience,
            rankId: values.rankId,
            specializations: values.specializations.join(','),
            activities: values.activities.join(','),
            description: values.description,
        }
        // const val= values.File
        try {
            setError('')
            setLoading(true)

            const formData = new FormData()
            formData.append(
                'data',
                new Blob([JSON.stringify(Payload)], {
                    type: 'application/json',
                })
            )
            // formData.append('file', (file as any).file)
            formData.append('file', values.latestCertification)
            // formData.append('file', String(values?.latestCertification))

            const { data } = await axios.post('/instructor/create', formData, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                    // ...axios.defaults.headers.post,
                    // 'Content-Type': 'application/json',
                    'Content-Type': 'multipart/form-data',
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
                navigate('/instructor/list')
            }, 3000)

            console.log({ data })
        } catch (error2: any) {
            console.error('Error:', error2.response.data.error)
            setLoading(false)
            setError(error2.message || 'An error occurred')
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(error2.message || 'An error occurred', {
                type: 'error',
                autoClose: 1000,
            })
        }
    }
    const deleteInstructor = async (instructorId: number): Promise<void> => {
        console.log('<<instructor id to delete', instructorId)
        const url = '/instructor/delete'
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                url,
                { instructorId },
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
                return
            }
            setLoading(false)
            setIsShowModal(false)
            setIsShowDeleteModal(true)
            setTimeout(() => {
                setIsShowDeleteModal(false)

                navigate('/instructor/list')
            }, 3000)
            store.dispatch(getInstructorByUserId())

            // setData('results: ' + data.results)
            console.log('data', { data })
            setLoading(false)
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

    const getInstructorbyid = async (instructorId: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                '/instructor/getDetailsById',
                { instructorId },
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
            console.log('Instructor info', data.results)
            setLoading(false)
            return data.results
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }
    const updateInstructor = async (
        id: number,
        values: CreateInstructorInitialValues,
        file: any
    ): Promise<void> => {
        console.log('values from form:', values, 'hu', file)
        const Payload = {
            instructorId: id,
            instructorName: values.instructorName,
            emailAddress: values.emailAddress,
            phoneNumber: values.instructorPhoneNumber,
            address: values?.address || '',
            experience: values.yearsOfExperience,
            rankId: values.rankId,
            specializations: values.specializations.join(','),
            activities: values.activities.join(','),
            description: values.description,
        }
        // const val= values.File
        try {
            setError('')
            setLoading(true)

            const formData = new FormData()
            formData.append(
                'data',
                new Blob([JSON.stringify(Payload)], {
                    type: 'application/json',
                })
            )
            formData.append('file', values.latestCertification)

            const { data } = await axios.post('/instructor/edit', formData, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                    'Content-Type': 'multipart/form-data',
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

            setLoading(false)
            setIsShowModal(true)
            setTimeout(() => {
                setIsShowModal(false)
                navigate('/instructor/list')
            }, 3000)

            console.log({ data })
        } catch (error2: any) {
            console.error('Error:', error2.response.data.error)
            setLoading(false)
            setError(error2.message || 'An error occurred')
            setTimeout(() => {
                setError('')
            }, 3000)
            toastId.current = toast(error2.message || 'An error occurred', {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    const InstructorStatus = async (
        instructorid: number,
        statusid: number
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/instructor/updateStatus',
                { instructorId: instructorid, instructorStatusId: statusid },
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

            setTimeout(() => {
                setLoading(false)
                // navigate('/school/view')
            }, 3000)
            console.log('done changing', data2)
            store.dispatch(getInstructorByUserId())

            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            //setLoading(false);
            console.log('data', { data: data2 })
            //setIsUploadImgVisible(true);
            // navigate("/");
            // resetForm()
            return data2.results
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
                                Complete Profile Successfully!
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
                                Update Profile Successfully!
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

    const deleteConfirmation = (_id: number): IModalComponent => {
        const deleteInstructos = async (id: number): Promise<void> => {
            setIsShowModal(false) // Close any other modals
            setIsShowDeleteModal(true)
            await deleteInstructor(id)
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
                                        clicked={() => deleteInstructos(_id)}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </SchoolSuccessfulModals>
                </CustomModal>
            ),
        }
    }

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

    const ImageModal = (): {
        modalComponent: JSX.Element
    } => {
        return {
            modalComponent: (
                <CustomModal
                    isModalVisible={isShowModal}
                    setIsModalVisible={setIsShowModal}
                    showCloseBtn={true}
                >
                    <div className="d-flex flex-column align-items-center p-2">
                        <img
                            src={`https://fistastore.com:444/${imageURL}`}
                            alt="Success Icon"
                            width={600}
                            height={500}
                        />
                    </div>
                </CustomModal>
            ),
        }
    }

    return {
        loading,
        handleSubmit,
        deleteInstructor,
        getInstructorbyid,
        updateInstructor,
        errorMessage,
        setIsShowModal,
        setImageURL,
        ImageModal,
        Createmodal,
        UpdateModal,
        deleteConfirmation,
        deletemodal,
        InstructorStatus,
    }
}

export default useInstructor

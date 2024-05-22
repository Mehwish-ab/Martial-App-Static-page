import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { authorizationToken } from '../utils/api_urls'
import { useSelector } from 'react-redux'
import store, { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { loginDataTypes } from '../redux/features/types'
import { Col, Row } from 'react-bootstrap'
import {
    fontFamilyMedium,
    lightBlue3,
    lightColor1,
    maastrichtBlue,
} from '../components/GlobalStyle'
import CustomButton from '../components/CustomButton/CustomButton'
import { SchoolSuccessfulModals } from './PopupModalsStyling'
import CustomModal from '../components/Modal/CustomModal'
import ic_success from '../assets/images/ic_success.svg'
import { getBranchBySchoolId } from '../redux/features/CLasses/ClassSlice'
import { getRoomDataByUseCase } from '../redux/features/Room/RoomSlice'
import CustomMessageModal from '../components/Modal/CustomMessageModal'
import { VideonitialValues } from '../screens/Video/constant'

interface IModalComponent {
    modalComponent: JSX.Element
}
interface IWarningModal {
    customMessage: string
}
interface IUseRoom {
    loading: boolean
    handleCreateSubmit: (values: any, bannerImage: any) => Promise<void>
    handleUpdate: (values: VideonitialValues, id: any) => Promise<void>
    deletemodal: () => IModalComponent
    Createmodal: () => IModalComponent
    UpdateModal: () => IModalComponent
    WarningModal: () => IModalComponent
    getAllVideos: () => Promise<any>
    deleteConfirmation: (id: number) => IModalComponent
    deleteVideo: (id: number) => Promise<void>
    setIsShowModal: (showModal: true) => void
    AllVideos: any
}

const useVideo = (): IUseRoom => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const toastId = useRef<any>(null)
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const navigate = useNavigate()
    const [AllVideos, setAllVideos] = useState([])
    const [isShowSuccessModal, setIsShowSuccessModal] = useState(false)
    const [isShowErrorModal, setIsShowErrorModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const { loginData } = useSelector((state: RootState) => state)

    const getAllVideos = async (): Promise<any> => {
        try {
            setLoading(true)
            const schoolId = Number(loginData.data?.schoolId)
            const { data: data3 } = await axios.post(
                '/video/getall',
                { schoolId },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            setLoading(false)
            setAllVideos(data3.results)
        } catch (e: any) {
            setLoading(false)
            // setError((errorMessage as any).response.data.responseMessage)
            // setLoading(false)
            // console.log(
            //     (errorMessage as any).response.data.responseMessage,
            //     'error in api data'
            // )
            // setError(
            //     (errorMessage as any).response?.data?.responseMessage ||
            //         'An error occurred'
            // )
        }
    }

    const handleCreateSubmit = async (
        values: any,
        bannerImage: any
    ): Promise<void> => {
        const userDetails = loginData.data?.userDetails
        console.log('clicked submit room')

        console.log('payload', values, bannerImage)
        try {
            setError('')
            setLoading(true)
            const formData = new FormData()

            formData.append(
                'data',
                new Blob([JSON.stringify({ ...values, thumbImageURL: '' })], {
                    type: 'application/json',
                })
            )
            formData.append('thumbImage', values.thumbImageURL)
            // .formData.append('file', (file as any).file)

            console.log('payload', values, formData)
            const { data: data1 } = await axios.post('video/create', formData, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                    'Content-Type': 'multipart/form-data',
                },
            })
            setSuccessMessage(data1.responseMessage)
            setIsShowSuccessModal(true)
            setLoading(false)
            setTimeout(() => {
                setIsShowSuccessModal(false)

                navigate(`/video-list`)
            }, 3000)
        } catch (error2: any) {
            setLoading(false)
            setError(error2.response)
            setErrorMessage(error2.response?.data?.responseMessage)
            setIsShowErrorModal(true)
            setTimeout(() => {
                setIsShowErrorModal(false)
                setError('')
            }, 2000)
        }
    }

    const handleUpdate = async (
        values: VideonitialValues,
        id: any
    ): Promise<void> => {
        try {
            setError('')
            setLoading(true)
            const formData = new FormData()

            formData.append(
                'data',
                new Blob(
                    [
                        JSON.stringify({
                            ...values,
                            thumbImageURL: '',
                            videoId: Number(id),
                        }),
                    ],
                    {
                        type: 'application/json',
                    }
                )
            )
            formData.append('thumbImage', values.thumbImageURL)
            // .formData.append('file', (file as any).file)

            console.log('payload', values, formData)
            const { data: data1 } = await axios.post('video/update', formData, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                    'Content-Type': 'multipart/form-data',
                },
            })
            setSuccessMessage(data1.responseMessage)
            setIsShowSuccessModal(true)
            setLoading(false)
            setTimeout(() => {
                setIsShowSuccessModal(false)

                navigate(`/video-list`)
            }, 3000)
        } catch (error2: any) {
            setLoading(false)
            setError(error2.response)
            setErrorMessage(error2.response?.data?.responseMessage)
            setIsShowErrorModal(true)
            setTimeout(() => {
                setIsShowErrorModal(false)
                setError('')
            }, 2000)
        }
    }
    const Createmodal = (): IModalComponent => {
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

    const UpdateModal = (): IModalComponent => {
        return {
            modalComponent: (
                <CustomMessageModal
                    title="Update"
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

    const deleteVideo = async (id: number): Promise<void> => {
        const url = '/video/delete'

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                url,
                { videoId: id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            console.log({ data2 })
            setLoading(false)

            setTimeout(() => {
                setIsShowDeleteModal(false)
            }, 1000)
            // setData('results: ' + data2)
            setLoading(false)
            store.dispatch(getBranchBySchoolId())
            navigate('/video-list')
            // navigate("/school");
        } catch (error2: any) {
            toast(error2.responseMessage, {
                type: 'error',
                autoClose: 1000,
            })
            setError(error2.response.data.responseMessage)
            setLoading(false)
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

    const deleteConfirmation = (_id: number): IModalComponent => {
        console.log('in video delete hand;er', _id)
        const Deleteschool = async (id: number): Promise<void> => {
            setIsShowModal(false) // Close any other modals
            setIsShowDeleteModal(true)
            await deleteVideo(id)
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
        handleCreateSubmit,
        AllVideos,
        deletemodal,
        Createmodal,
        UpdateModal,
        deleteConfirmation,
        handleUpdate,
        deleteVideo,
        setIsShowModal,
        getAllVideos,
        WarningModal,
    }
}

export default useVideo

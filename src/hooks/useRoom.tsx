/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { CreateRoomInitialValues } from '../screens/Rooms/constant'
import { getRoomDataByUseCase } from '../redux/features/Room/RoomSlice'
import CustomMessageModal from '../components/Modal/CustomMessageModal'

interface IModalComponent {
    modalComponent: JSX.Element
}
interface IWarningModal {
    customMessage: string
}
interface IUseRoom {
    loading: boolean
    handleCreateSubmit: (values: CreateRoomInitialValues) => Promise<void>
    handleUpdate: (values: CreateRoomInitialValues) => Promise<void>
    error: string
    isUploadImgModalVisible: boolean
    setIsUploadImgVisible: (param: boolean) => void
    getInstructorstartenddate: (
        startDate: string,
        endDate: string,
        schoolid: number
    ) => Promise<any>
    getbyroomid: (Id: number) => Promise<any>
    deletemodal: () => IModalComponent
    Createmodal: () => IModalComponent
    UpdateModal: () => IModalComponent
    RoomStatus: (
        classid: number,
        classStatusid: boolean,
        Id: number,
        schoolInUpperCase: string
    ) => Promise<any>
    WarningModal: () => IModalComponent

    getClassbyid: (classid: number) => Promise<any>
    getallRoombyUC: (id: number, us: string) => Promise<any>
    deleteConfirmation: (id: number) => IModalComponent
    deleteRoom: (id: number) => Promise<void>
    setIsShowModal: (showModal: true) => void
}

const useRoom = (): IUseRoom => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isUploadImgModalVisible, setIsUploadImgVisible] = useState(false)
    const [isShowWarningModal, setIsShowWarningModalInternal] = useState(false)
    const [customWarningMessage, setCustomWarningMessage] = useState('')
    const toastId = useRef<any>(null)
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const navigate = useNavigate()

    const [isShowSuccessModal, setIsShowSuccessModal] = useState(false)
    const [isShowErrorModal, setIsShowErrorModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const { loginData } = useSelector((state: RootState) => state)
    const setIsShowWarningModal = (
        showModal: boolean,
        message: string = ''
    ): void => {
        setCustomWarningMessage(message)
        setIsShowWarningModalInternal(showModal)
    }

    const getallRoombyUC = async (Id: number, us: string): Promise<any> => {
        // const url = get_branch_by_school_id_url
        console.log('>> im in getallbranchbyschoolid')
        try {
            setLoading(true)
            const { data: data3 } = await axios.post(
                'rooms/byUC',
                { useCase: us, id: Id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            console.log('>>v', data3)

            // setIsShowModal(true);
            // setTimeout(() => {
            //   setLoading(false);
            //   setIsShowModal(false);
            //   //navigate("/school/view");
            // }, 3000);
            // setIsShowModal(true)
            // setTimeout(() => {
            setLoading(false)
            //     setIsShowModal(false)
            //    // navigate('/branch/list')
            // }, 3000)
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            //setLoading(false);
            console.log({ data3 })
            return data3.results
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
    const getbyroomid = async (Id: number): Promise<any> => {
        // const url = get_branch_by_school_id_url
        console.log('>> im in getallbranchbyschoolid')
        try {
            setLoading(true)
            const { data: data3 } = await axios.post(
                '/rooms/getDetailsById',
                { roomId: Id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            console.log('>>v', data3)

            // setIsShowModal(true);
            // setTimeout(() => {
            //   setLoading(false);
            //   setIsShowModal(false);
            //   //navigate("/school/view");
            // }, 3000);
            // setIsShowModal(true)
            // setTimeout(() => {
            setLoading(false)
            //     setIsShowModal(false)
            //    // navigate('/branch/list')
            // }, 3000)
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            //setLoading(false);
            console.log({ data3 })
            return data3.results
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
    // to create room
    const handleCreateSubmit = async (
        values: CreateRoomInitialValues
    ): Promise<void> => {
        const userDetails = loginData.data?.userDetails
        console.log('clicked submit room')

        const payload = {
            useCase: values.useCase,
            id: values.id,
            name: values.roomName,
            floorNumber: values.floorNumber,
            roomNumber: values.roomNumber,
            height: `${values.lFeet}'${values.lInch}"`,
            width: `${values.wFeet}'${values.wInch}"`,
        }
        console.log('payload', payload)

        // const endpoint = schoolId ? edit_school_url : create_school_url
        const datas = JSON.stringify(payload)
        try {
            setError('')
            setLoading(true)

            const { data: data1 } = await axios.post('/rooms/create', payload, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                },
            })
            setSuccessMessage(data1.responseMessage)
            setIsShowSuccessModal(true)
            setLoading(false)
            setTimeout(() => {
                setIsShowSuccessModal(false)
                if (values.useCase === 'SCHOOL') {
                    const schoolId = values.id
                    navigate(`/school/room/list/${schoolId}`)
                }
                if (values.useCase === 'BRANCH') {
                    const branchId = values.id
                    navigate(`/branch/room/list/${branchId}`)
                }
                if (values.useCase === 'FRANCHISE') {
                    const franchiseId = values.id
                    navigate(`/franchise/room/list/${franchiseId}`)
                }
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
    const getInstructorstartenddate = async (
        startDate: string,
        endDate: string,
        schoolid: number
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                `/classes/getSchoolId?startDate=${startDate}&endDate=${endDate}`,
                { schoolId: schoolid },
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
            console.log(
                'classes info according to start date and end date',
                data.results.data
            )
            setLoading(false)
            return data.results.data
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }
    const handleUpdate = async (
        values: CreateRoomInitialValues
    ): Promise<void> => {
        const userDetails = loginData.data?.userDetails
        console.log('clicked handleUpdate room')

        const payload = {
            roomId: values.roomId,
            name: values.roomName,
            floorNumber: values.floorNumber,
            roomNumber: values.roomNumber,
            height: `${values.lFeet}'${values.lInch}"`,
            width: `${values.wFeet}'${values.wInch}"`,
        }
        console.log('payload', payload)
        try {
            setError('')
            setLoading(true)

            const { data: data1 } = await axios.post('/rooms/edit', payload, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                },
            })
            setSuccessMessage(data1.responseMessage)
            setIsShowSuccessModal(true)
            setLoading(false)
            setTimeout(() => {
                setIsShowSuccessModal(false)
                if (values.useCase === 'SCHOOL') {
                    const schoolId = values.id
                    navigate(`/school/room/list/${schoolId}`)
                }
                if (values.useCase === 'BRANCH') {
                    const branchId = values.id
                    navigate(`/branch/room/list/${branchId}`)
                }
                if (values.useCase === 'FRANCHISE') {
                    const franchiseId = values.id
                    navigate(`/franchise/room/list/${franchiseId}`)
                }
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
    const RoomStatus = async (
        classid: number,
        classStatusid: boolean,
        Id: number,
        schoolInUpperCase: string
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/rooms/updateStatus',
                { roomId: classid, isActive: classStatusid },
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
            await store.dispatch(
                getRoomDataByUseCase({
                    id: Id,
                    usecase: schoolInUpperCase,
                })
            )
            // store.dispatch(getBranchBySchoolId())

            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            //setLoading(false);
            //setIsUploadImgVisible(true);
            // navigate("/");
            // resetForm()
            return data2.results
        } catch (error2: any) {
            setLoading(false)
            setError(error2.response.data.responseMessage)
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(error2.message, {
                type: 'error',
                autoClose: 1000,
            })
            setLoading(false)
            setError(error2.response.data.responseMessage)
            setTimeout(() => {
                setError('')
            }, 2000)

            // Show the warning modal with custom message from API response
            const warningMessage =
                error2.response?.data?.responseMessage || 'An error occurred'
            setIsShowWarningModal(true, warningMessage)
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

    const deleteRoom = async (id: number): Promise<void> => {
        const url = '/rooms/delete'

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                url,
                { roomId: id },
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
            setLoading(false)
            setIsShowModal(false)
            setIsShowDeleteModal(true)
            setTimeout(() => {
                setIsShowDeleteModal(false)
                // navigate('/branch/list')
            }, 3000)
            // setData('results: ' + data2)
            setLoading(false)
            store.dispatch(getBranchBySchoolId())
            // navigate("/school");
        } catch (error2: any) {
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
        const Deleteschool = async (id: number): Promise<void> => {
            setIsShowModal(false) // Close any other modals
            setIsShowDeleteModal(true)
            await deleteRoom(id)
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
    const getClassbyid = async (classid: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                '/classes/getDetailsById',
                { classId: classid },
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
            setLoading(false)
            return data.results
        } catch (error2: any) {
            setLoading(false)
            setError(error2)
        }
    }

    return {
        loading,
        handleCreateSubmit,
        error,
        isUploadImgModalVisible,
        setIsUploadImgVisible,
        deletemodal,
        Createmodal,
        UpdateModal,
        deleteConfirmation,
        RoomStatus,
        getClassbyid,
        handleUpdate,
        deleteRoom,
        setIsShowModal,
        getInstructorstartenddate,
        getallRoombyUC,
        WarningModal,
        getbyroomid,
    }
}

export default useRoom

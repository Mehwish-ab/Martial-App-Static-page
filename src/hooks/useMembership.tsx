/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { authorizationToken, edit_school_url } from '../utils/api_urls'
import { useSelector } from 'react-redux'
import store, { RootState } from '../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { loginDataTypes } from '../redux/features/types'
import { CreateMembershipInitialValues } from '../screens/Membership/constant'
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
import ic_error from '../assets/icons/ic_error.svg'
import ic_success from '../assets/images/ic_success.svg'
import { getBranchBySchoolId } from '../redux/features/CLasses/ClassSlice'
import { getMembershipById } from '../redux/features/Membership/MembershipSlice'

interface IModalComponent {
    modalComponent: JSX.Element
}
interface IUseMembership {
    loading: boolean
    handleCreateSubmit: (
        values: CreateMembershipInitialValues,
        file: any
    ) => Promise<void>
    handleUpdate: (
        id: number,
        values: CreateMembershipInitialValues,
        file: any,
        bannerImages: any
    ) => Promise<void>
    error: string
    isUploadImgModalVisible: boolean
    setIsUploadImgVisible: (param: boolean) => void
    deletemodal: () => IModalComponent
    Createmodal: () => IModalComponent
    UpdateModal: () => IModalComponent
    membershipStatus: (
        memberShipPlanId: number,
        isActive: boolean
    ) => Promise<any>
    getClassbyid: (classid: number) => Promise<any>
    deleteConfirmation: (id: number) => IModalComponent
    deleteClass: (id: number) => Promise<void>
    setIsShowModal: (showModal: true) => void
}

const useMembership = (): IUseMembership => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isUploadImgModalVisible, setIsUploadImgVisible] = useState(false)
    const toastId = useRef<any>(null)
    const { schoolId } = useParams()
    const [isShowWarningModal, setIsShowWarningModal] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const navigate = useNavigate()

    const { loginData } = useSelector((state: RootState) => state)

    // to create Membership
    const handleCreateSubmit = async (
        values: any,
        file: any
    ): Promise<void> => {
        const userDetails = loginData.data?.userDetails

        const payload = {
            useCase: 'SCHOOL',
            classIds: values.classIds,
            // id: values.id,
            id: 148,
            title: values.title,
            startDate: values.startDate,
            endDate: values.endDate,
            visibility: values.visibility,
            // subscriptionType: values.subscriptionType,
            subscriptionType: 1,
            membershipFee: values.membershipFee,
            minimumStudent: values.minimumStudent,
            dailySubsFee: values.dailySubsFee,
            weeklySubsFee: values.weeklySubsFee,
            monthlySubsFee: values.monthlySubsFee,
            annuallySubsFee: values.annuallySubsFee,
            allowStudentCancel: values.allowStudentCancel,
            refundDate: values.refundDate,
            bookingCancelStartDate: values.bookingCancelStartDate,
            bookingCancelEndDate: values.bookingCancelEndDate,
            cancellationCharges: values.cancellationCharges,
            accommodation: values.accommodation.join(','),
            description: values.description,
            ...(schoolId && { schoolId }), // Add schoolId conditionally
        }
        console.log('use membership payload', payload)
        console.log('use membership payload', file)

        // const endpoint = schoolId ? edit_school_url : create_school_url
        const datas = JSON.stringify(payload)
        try {
            setError('')
            setLoading(true)
            const formData = new FormData()
            formData.append(
                'data',
                new Blob([JSON.stringify(payload)], {
                    type: 'application/json',
                })
            )
            // .formData.append('file', (file as any).file)
            formData.append('file', file)
            // formData.append('file', String(values?.latestCertification))

            const { data: data1 } = await axios.post(
                '/classes/membershipPlan/create',
                formData,
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            if (data1.responseCode === '500') {
                toast(data1.responseMessage, {
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
                navigate('/membership/list')
            }, 3000)
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            //setLoading(false);
            console.log('data', { data1 })
            //setIsUploadImgVisible(true);
            // navigate("/");
            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: any) {
            console.log('error', { error })
            setLoading(false)
            setError(error.response)
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(error.message, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }
    const handleUpdate = async (
        id: number,
        values: CreateMembershipInitialValues,
        file: any,
        bannerImages: any
    ): Promise<void> => {
        console.log('>> im in handleUpdate')
        const userDetails = loginData.data?.userDetails

        const payload = {
            classIds: values.classIds,
            id: values.id,
            title: values.title,
            startDate: values.startDate,
            endDate: values.endDate,
            visibility: values.visibility,
            subscriptionType: values.subscriptionType,
            membershipFee: values.membershipFee,
            minimumStudent: values.minimumStudent,
            dailySubsFee: values.dailySubsFee,
            weeklySubsFee: values.weeklySubsFee,
            monthlySubsFee: values.monthlySubsFee,
            annuallySubsFee: values.annuallySubsFee,
            allowStudentCancel: values.allowStudentCancel,
            refundDate: values.refundDate,
            bookingCancelStartDate: values.bookingCancelStartDate,
            bookingCancelEndDate: values.bookingCancelEndDate,
            cancellationCharges: values.cancellationCharges,
            accommodation: values.accommodation,
            description: values.description,
            ...(bannerImages === null && { bannerPicture: file }),
            ...(schoolId && { schoolId }), // Add schoolId conditionally
        }
        console.log('payload', payload, 'file', file)
        try {
            setError('')
            setLoading(true)
            const formData = new FormData()
            formData.append(
                'data',
                new Blob([JSON.stringify(payload)], {
                    type: 'application/json',
                })
            )
            formData.append('file', file)
            console.log('formdata', formData)
            const { data: data1 } = await axios.post(
                '/membership/update',
                formData,
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            if (data1.responseCode === '500') {
                toast(data1.responseMessage, {
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

                navigate('/membership/list')
            }, 3000)
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            //setLoading(false);
            console.log('data', { data1 })
            //setIsUploadImgVisible(true);
            // navigate("/");
            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: any) {
            console.log('error', { error })
            setLoading(false)
            setError(error.response)
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(error.message, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }
    const membershipStatus = async (
        memberShipPlanId: number,
        isActive: boolean
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/classes/membershipPlan/updateStatus',
                { memberShipPlanId: memberShipPlanId, isActive: isActive },
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
            store.dispatch(getMembershipById())

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

    const WarningModal = (): IModalComponent => {
        return {
            modalComponent: (
                <CustomModal
                    isModalVisible={isShowWarningModal}
                    setIsModalVisible={setIsShowWarningModal}
                    showCloseBtn={true}
                >
                    <SchoolSuccessfulModals>
                        <div className="mainContainer d-flex flex-column align-items-center">
                            <img
                                src={ic_error}
                                alt="error Icon"
                                width={79}
                                height={79}
                            />
                            <h3 className="mainContainer-heading text-center">
                                Warning!
                            </h3>
                            <p className="mainContainer-subText text-center">
                                Please remove the first Branches and Franchise.
                            </p>
                        </div>
                    </SchoolSuccessfulModals>
                </CustomModal>
            ),
        }
    }
    const deleteClass = async (id: number): Promise<void> => {
        const url = '/classes/delete'

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                url,
                { classId: id },
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
            }, 3000)
            // setData('results: ' + data2)
            console.log('data', { data: data2 })
            setLoading(false)
            store.dispatch(getBranchBySchoolId())
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
            await deleteClass(id)
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
            console.log('Instructor info', data.results)
            setLoading(false)
            return data.results
        } catch (error2: any) {
            console.log('error', error2)
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
        membershipStatus,
        getClassbyid,
        handleUpdate,
        deleteClass,
        setIsShowModal,
    }
}

export default useMembership

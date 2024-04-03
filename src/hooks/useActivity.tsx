/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { authorizationToken, edit_school_url } from '../utils/api_urls'
import { useDispatch, useSelector } from 'react-redux'
import store, { RootState } from '../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { loginDataTypes } from '../redux/features/types'

import { useAppSelector } from '../app/hooks'
import { CreateClassInitialValues } from '../screens/Class/constant'
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
import {
    ActivityDataInitialState,
    setActivityData,
} from '../redux/features/activity/activitySlice'
import { ActivityInitialValues } from '../screens/Activitity/constant'

interface IModalComponent {
    modalComponent: JSX.Element
}
interface IUseActivity {
    loading: boolean
    handleCreateSubmit: (
        values: ActivityInitialValues,
        file: any,
        useCaseId: any
    ) => Promise<void>
    handleUpdate: (id: any, values: any, file: any) => Promise<void>
    error: string
    isUploadImgModalVisible: boolean
    setIsUploadImgVisible: (param: boolean) => void
    getAllActivities: (useCase: string, useCaseId: number) => Promise<void>
    getInstructorstartenddate: (
        startDate: string,
        endDate: string,
        schoolid: number
    ) => Promise<any>
    deletemodal: () => IModalComponent
    Createmodal: () => IModalComponent
    UpdateModal: () => IModalComponent
    ClassStatus: (classid: number, classStatusid: number) => Promise<any>
    getClassbyid: (classid: number) => Promise<any>
    deleteConfirmation: (id: number) => IModalComponent
    deleteClass: (id: number) => Promise<void>
    setIsShowModal: (showModal: true) => void
    getClassPegination: (schoolid: number, page: number) => Promise<any>
    getClassbyschoolId: (schoolid: number) => Promise<any>
}

const useActivity = (): IUseActivity => {
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
    // to create School
    const handleCreateSubmit = async (
        values: ActivityInitialValues,
        file: any,
        useCaseId: any
    ): Promise<void> => {
        const userDetails = loginData.data?.userDetails
        console.log('file', file)
        const payload = {
            beltId: values.selectBelt ? values.selectBelt : '',
            activityId: values.activityId,
            startDate: '2024-02-24',
            endDate: '2024-02-24',
            experienceLevelId: values.experience,
            certificateURL: values.latestCertification
                ? URL.createObjectURL(values.latestCertification)
                : '',
            useCase: 'SCHOOL',
            useCaseId: useCaseId,
            // Add schoolId conditionally
        }

        console.log('payload', payload)

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

            const response = await axios.post(
                '/activityInfo/create',
                formData,
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            if (response.data.responseCode === '500') {
                toast(response.data.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return
            }

            setIsShowModal(true)
            setTimeout(() => {
                navigate(window.location.pathname, { replace: true })
                setLoading(false)
                setIsShowModal(false)
            }, 3000)
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            // setLoading(false);
            // setIsUploadImgVisible(true);
            //navigate("/");
            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: any) {
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
    const getClassPegination = async (
        schoolid: number,
        page: number
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                `/classes/getSchoolId?pageNo=${page}`,
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
                'classes info according to pagination',
                data.results.data
            )
            setLoading(false)
            return data.results
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }
    const getClassbyschoolId = async (schoolid: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(
                `/classes/getSchoolId`,
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
                'classes info according to pagination',
                data.results.data
            )
            setLoading(false)
            return data.results
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }
    const handleUpdate = async (
        id: number,
        values: any,
        file: any
    ): Promise<void> => {
        console.log('values in handle', values)
        const payload = {
            id: id,
            activityId: values.activityId,
            startDate: values.startDate,
            endDate: values.endDate || '',
            beltId: values.selectBelt ? values.selectBelt : '',
            certificateURL: values.latestCertification
                ? URL.createObjectURL(values.latestCertification)
                : ' ',
            experienceLevelId: values.experience,
            useCase: 'SCHOOL',
            useCaseId: values.schoolId,
            // Add schoolId conditionally
        }
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
            const { data: data1 } = await axios.post(
                '/activityInfo/edit',
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
                navigate(window.location.pathname, { replace: true })
                setIsShowModal(false)
            }, 5000)
            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: any) {
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
    const getAllActivities = async (
        useCase: string,
        useCaseId: number
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/activityInfo/getList',
                { useCase: useCase, useCaseId: useCaseId },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            console.log('get activities', data2)
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
            }, 3000)
            store.dispatch(setActivityData(data2.results))

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
        }
    }

    const ClassStatus = async (
        classid: number,
        classStatusid: number
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/classes/updateStatus',
                { classId: classid, classStatusId: classStatusid },
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
            store.dispatch(getBranchBySchoolId())

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
                                Register Profile Sucessfully!
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
                                Congratulations! Your profile has been
                                successfully completed, ensuring a seamless
                                experience within the Marital.
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
            setLoading(false)
            return data.results
        } catch (error2: any) {
            setLoading(false)
            setError(error2)
        }
    }

    return {
        loading,
        getAllActivities,
        handleCreateSubmit,
        error,
        isUploadImgModalVisible,
        setIsUploadImgVisible,
        deletemodal,
        Createmodal,
        UpdateModal,
        deleteConfirmation,
        ClassStatus,
        getClassbyid,
        handleUpdate,
        deleteClass,
        setIsShowModal,
        getInstructorstartenddate,
        getClassPegination,
        getClassbyschoolId,
    }
}

export default useActivity

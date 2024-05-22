/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import {
    authorizationToken,
    base_url,
    create_activity,
    edit_activity_url,
    edit_school_url,
} from '../utils/api_urls'
import { useDispatch, useSelector } from 'react-redux'
import store, { RootState } from '../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
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
import ic_error from '../assets/icons/ic_error.svg'
import ic_success from '../assets/images/ic_success.svg'
import { getBranchBySchoolId } from '../redux/features/CLasses/ClassSlice'
import {
    ActivityDataInitialState,
    createActivityBySchoolId,
    setActivityData,
    updateActivityBySchoolId,
} from '../redux/features/activity/activitySlice'
import { ActivityInitialValues } from '../screens/Activitity/constant'
import CustomMessageModal from '../components/Modal/CustomMessageModal'

interface IModalComponent {
    modalComponent: JSX.Element
}
interface IUseActivity {
    loading1: boolean
    handleCreateSubmit: (
        values: ActivityInitialValues,
        file: any,
        useCaseId: any,
        useCase: string
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
    WarningModal: () => IModalComponent
    ClassStatus: (classid: number, classStatusid: number) => Promise<any>
    getClassbyid: (classid: number) => Promise<any>
    deleteConfirmation: (id: number) => IModalComponent
    deleteActivity: (id: number) => Promise<void>
    setIsShowModal: (showModal: true) => void
    getClassPegination: (schoolid: number, page: number) => Promise<any>
    getClassbyschoolId: (schoolid: number) => Promise<any>
    getActivitybySchoolId: (schoolid: number) => Promise<any>
    getActivitybyInstructorId: (instructorId: number) => Promise<any>
    AllActivities: any
}

const useActivity = (): IUseActivity => {
    const [loading1, setloading1] = useState(false)
    const [error, setError] = useState('')
    const [isUploadImgModalVisible, setIsUploadImgVisible] = useState(false)
    const toastId = useRef<any>(null)
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
    const navigate = useNavigate()
    const { loginData } = useSelector((state: RootState) => state)
    const [AllActivities, setAllActivities] = useState([] as any)
    const [isUpdateModal, setIsUpdateModal] = useState(false)
    const [isShowSuccessModal, setIsShowSuccessModal] = useState(false)
    const [isShowErrorModal, setIsShowErrorModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { loading } = useSelector((state: RootState) => state.activityData)
    // to create School
    const handleCreateSubmit = async (
        values: ActivityInitialValues,
        file: any,
        useCaseId: any,
        useCase: string
    ): Promise<void> => {
        try {
            const payload = {
                beltId: values.selectBelt ? values.selectBelt : '',
                activityId: values.activityId,
                startDate: '2024-02-24',
                endDate: '2024-02-24',
                experienceLevelId: values.experience,
                certificateURL: values.latestCertification
                    ? URL.createObjectURL(values.latestCertification)
                    : '',
                useCase: useCase,
                useCaseId: useCaseId,
                // Add schoolId conditionally
            }

            setError('')
            setloading1(true)
            const formData = new FormData()

            formData.append(
                'data',
                new Blob([JSON.stringify(payload)], {
                    type: 'application/json',
                })
            )

            formData.append('file', file)

            const response = await axios.post(
                `${base_url}${create_activity}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            console.log('response', response, loading)

            // Updating the state with the new activity added to the existing list
            if (response.data.responseCode === 200) {
                setSuccessMessage(response.data.responseMessage)
                setIsShowSuccessModal(true)
                setloading1(false)
                console.log('isUpdate Modal', isUpdateModal)
                setTimeout(() => {
                    setIsShowSuccessModal(false)
                    const newActivity = response.data.results
                    setAllActivities((prevActivities: any) => [
                        ...prevActivities,
                        newActivity,
                    ])
                    console.log('isUpdate in time out Modal', isUpdateModal)
                }, 1000)
            }
        } catch (errors: any) {
            console.log('error', errors.response?.data?.errors.length)
            const errorMessages = errors.response?.data?.errors.map(
                (err: { field: string; errorMessage: string }) =>
                    `<strong>${err.field}</strong> : ${err.errorMessage}`
            )
            setloading1(false)
            setError(errors.response)
            console.log('errorss', errorMessages.length)

            if (errorMessages.length > 1) {
                setErrorMessage(`${errorMessages.join('<br />')}`)
            } else {
                setErrorMessage(errors.response?.data?.responseMessage)
            }
            setIsShowErrorModal(true)
            setTimeout(() => {
                setIsShowErrorModal(false)
                setError('')
            }, 10000)
        }
    }

    const getActivitybySchoolId = async (schoolid: number): Promise<any> => {
        try {
            setError('')
            setloading1(true)
            const { data: data3 } = await axios.post(
                '/school/getById',
                { schoolId: schoolid },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            console.log('dataa 3', data3)
            setAllActivities(data3.results.activitiesData)
            // return data3.results
        } catch (error2: any) {
            console.log({ error })
        }
    }
    const getActivitybyInstructorId = async (
        instructorId: number
    ): Promise<any> => {
        try {
            setError('')
            setloading1(true)
            const { data: data3 } = await axios.post(
                '/instructor/getDetailsById',
                { instructorId },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            console.log('dataa 3', data3)
            setAllActivities(data3.results.activitiesData)
            // return data3.results
        } catch (error2: any) {
            console.log({ error })
        }
    }
    const getInstructorstartenddate = async (
        startDate: string,
        endDate: string,
        schoolid: number
    ): Promise<any> => {
        try {
            setError('')
            setloading1(true)
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
                setloading1(false)
                return
            }
            console.log(
                'classes info according to start date and end date',
                data.results.data
            )
            setloading1(false)
            return data.results.data
        } catch (error2: any) {
            console.log('error', error2)
            setloading1(false)
            setError(error2)
        }
    }
    const getClassPegination = async (
        schoolid: number,
        page: number
    ): Promise<any> => {
        try {
            setError('')
            setloading1(true)
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
                setloading1(false)
                return
            }
            console.log(
                'classes info according to pagination',
                data.results.data
            )
            setloading1(false)
            return data.results
        } catch (error2: any) {
            console.log('error', error2)
            setloading1(false)
            setError(error2)
        }
    }
    const getClassbyschoolId = async (schoolid: number): Promise<any> => {
        try {
            setError('')
            setloading1(true)
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
                setloading1(false)
                return
            }
            console.log(
                'classes info according to pagination',
                data.results.data
            )
            setloading1(false)
            return data.results
        } catch (error2: any) {
            console.log('error', error2)
            setloading1(false)
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
            setloading1(true)
            const formData = new FormData()

            formData.append(
                'data',
                new Blob([JSON.stringify(payload)], {
                    type: 'application/json',
                })
            )

            formData.append('file', file)

            const response = await axios.post(
                `${base_url}${edit_activity_url}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            console.log('response in edit', response)
            console.log('isUpdate  beore Modal', isUpdateModal)
            if (response.data.responseCode === 200) {
                setSuccessMessage(response.data.responseMessage)
                setIsShowSuccessModal(true)
                setloading1(false)
                console.log('isUpdate Modal', isUpdateModal)
                setTimeout(() => {
                    setIsShowSuccessModal(false)
                    console.log('isUpdate in time out Modal', isUpdateModal)
                }, 3000)
            }
            console.log('response in edit', response)
            const updatedid = response.data.results.id
            console.log('updatedid in edit', updatedid, AllActivities)
            const index = AllActivities?.findIndex(
                (act: any) => act.id === updatedid
            )

            console.log('index', index)
            if (index !== -1) {
                // Create a new array with the updated item
                const updatedActivities = [
                    ...AllActivities.slice(0, index), // All items before the updated item
                    response.data.results, // Updated item
                    ...AllActivities.slice(index + 1), // All items after the updated item
                ]

                console.log(
                    'index',
                    index,
                    updatedActivities,
                    AllActivities[index] == response.data.results
                )
                // Update the state with the new array
                setAllActivities(updatedActivities)
            }
            // if (data1.responseCode === '500') {
            //     toast(data1.responseMessage, {
            //         type: 'error',
            //         autoClose: 1000,
            //     })
            //     setloading1(false)
            //     return
            // }
            console.log('loadin in edit')

            // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (error: any) {
            setloading1(false)
            setError(error.response)
            setErrorMessage(error.response?.data?.responseMessage)
            setIsShowErrorModal(true)
            const timeId = setTimeout(() => {
                setError('')
                setIsShowErrorModal(false)
            }, 3000)
            if (!setIsShowModal) {
                clearTimeout(timeId)
            }
        }
    }
    const getAllActivities = async (
        useCase: string,
        useCaseId: number
    ): Promise<any> => {
        try {
            setError('')
            setloading1(true)
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
                setloading1(false)
                return
            }

            setTimeout(() => {
                setloading1(false)
            }, 3000)
            store.dispatch(setActivityData(data2.results))

            return data2.results
        } catch (error2: any) {
            setloading1(false)
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
            setloading1(true)
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
                setloading1(false)
                return
            }

            setTimeout(() => {
                setloading1(false)
                // navigate('/school/view')
            }, 3000)
            store.dispatch(getBranchBySchoolId())

            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            //setloading1(false);
            //setIsUploadImgVisible(true);
            // navigate("/");
            // resetForm()
            return data2.results
        } catch (error2: any) {
            setloading1(false)
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
    const deleteActivity = async (id: number): Promise<void> => {
        const url = '/activityInfo/delete'
        try {
            setError('')
            setloading1(true)
            const { data: data2 } = await axios.post(
                url,
                { id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            const index = AllActivities?.findIndex(
                (act: any) => act.id === data2.results.id
            )

            console.log('index of school', index)
            // If the school is found, remove it from the array
            if (index !== -1 && index !== undefined) {
                if (AllActivities) {
                    const newData = [...AllActivities] // Create a copy of the data array
                    const removedItems = newData.splice(index, 1) // Remove the item at the specified index
                    console.log('removed item of school', removedItems, newData)
                    if (removedItems.length > 0) {
                        // Check if any item was removed
                        setAllActivities(newData) // Update the state with the new array
                    }
                }
            }
            if (data2.responseCode === '500') {
                toast(data2.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setloading1(false)
                return
            }
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            setloading1(false)
            setIsShowModal(false)
            setIsShowDeleteModal(true)
            setTimeout(() => {
                setIsShowDeleteModal(false)
                // navigate('/branch/list')
            }, 3000)
            // setData('results: ' + data2)
            setloading1(false)
            store.dispatch(getBranchBySchoolId())
            // navigate("/school");
        } catch (error2: any) {
            setError(error2.response.data.responseMessage)
            setloading1(false)
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
                                width={65}
                                height={65}
                            />
                            <h3 className="mainContainer-heading text-center">
                                Successfully Activity Removed
                            </h3>
                            <p className="mainContainer-subText text-center">
                                The Activity has been successfully removed, and
                                please note that any associated data will be
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
        console.log('in delete confirmation of activity', _id)
        const Deleteschool = async (id: number): Promise<void> => {
            setIsShowModal(false) // Close any other modals
            setIsShowDeleteModal(true)
            await deleteActivity(id)
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
                                Want to Delete An Activity
                            </h3>
                            <p className="mainContainer-subText text-center">
                                Before proceeding with the removal of a activity
                                , please be aware that once the removal is
                                confirmed, all access will be permanently
                                revoked.
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
            setloading1(true)
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
                setloading1(false)
                return
            }
            setloading1(false)
            return data.results
        } catch (error2: any) {
            setloading1(false)
            setError(error2)
        }
    }

    return {
        loading1,
        getAllActivities,
        handleCreateSubmit,
        AllActivities,
        getActivitybySchoolId,
        getActivitybyInstructorId,
        error,
        isUploadImgModalVisible,
        setIsUploadImgVisible,
        deletemodal,
        Createmodal,
        WarningModal,

        deleteConfirmation,
        ClassStatus,
        getClassbyid,
        handleUpdate,
        deleteActivity,
        setIsShowModal,
        getInstructorstartenddate,
        getClassPegination,
        getClassbyschoolId,
    }
}

export default useActivity

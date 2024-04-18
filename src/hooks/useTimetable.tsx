/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { CreateSchoolInitialValues } from '../screens/Home/constants'
import axios from 'axios'
import { authorizationToken, edit_school_url } from '../utils/api_urls'
import { useSelector } from 'react-redux'
import store, { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
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
import { CreateTimeTableInitialValues } from '../screens/TimeTable/constant'
import { TimeTableDataType } from '../redux/features/TimeTable/TimeTableSlice'

interface CommonResponseProps {
    responseCode: number
    responseMessage: string
    execTime: number
    errors: null | unknown
}

interface CreateTimeSheetSlotProps extends CommonResponseProps {
    results: {
        slotId: number
        dayOfWeek: string
        startTime: string
        endTime: string
        startBreak: string
        endBreak: string
        isActive: boolean
    }
}

interface IModalComponent {
    modalComponent: JSX.Element
}

interface CreateSlotsProps {
    timeTableId: number
    startTime: string
    endTime: string
    startBreak: string
    endBreak: string
    dayOfWeek: string
}

interface IUseTimetable {
    loading: boolean
    handleCreateSubmit: (
        values: CreateTimeTableInitialValues,
        userId: number,
        classId: number
    ) => Promise<any>

    createSlots: (props: CreateSlotsProps) => Promise<any>
    getTimetableSlot: (timeTableid: number) => Promise<any>
    getAllTimetable: (userid: number, classId: number) => Promise<any>
    getTimetableById: (timeTableId: number) => Promise<any>
    getAllUserPagination: (userid: number, page: number) => Promise<any>

    //     CreateSlots: (
    //         timeTableId: any,
    //         StartTimee: any,
    //         EndTimee: any,
    //         StartBreakk: any,
    //         EndBreakk: any,
    //         dayOfWeekk: any
    //     ) => Promise<any>
    //     getTimetableSlot: (timeTableid: number) => Promise<any>
    //     getAllTimetable: (userid: number) => Promise<any>
    //     getTimetableById: (timeTableId: number) => Promise<any>

    editSchool: (
        _schoolId: number,
        values: CreateSchoolInitialValues
    ) => Promise<void>
    TimeTableStatus: (timeTableid: number, isactive: boolean) => Promise<any>
    deleteTimeTable: (timeTableid: number) => Promise<void>
    errorMessage: string
    isUploadImgModalVisible: boolean
    setIsUploadImgVisible: (param: boolean) => void
    deletemodal: () => IModalComponent
    Createmodal: () => IModalComponent
    UpdateModal: () => IModalComponent
    WarningModal: () => IModalComponent
    deleteConfirmation: (id: number) => IModalComponent
    setIsShowModal: (showModal: true) => void
    setIsShowWarningModal: (showModal: true) => void
    AllTimetable: any
}

const useTimetable = (): IUseTimetable => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setError] = useState('')
    const [isUploadImgModalVisible, setIsUploadImgVisible] = useState(false)
    const [isShowWarningModal, setIsShowWarningModal] = useState(false)
    const [AllTimetable, setAllTimetable] = useState<
        | {
              currentPage: number
              totalItems: number | undefined
              data: TimeTableDataType[]
          }
        | undefined
    >(undefined)

    const toastId = useRef<any>(null)
    const { data: logindata } = useAppSelector(
        (state: { loginData: any }) => state.loginData
    )
    // const { schoolData } = useAppSelector((state) => state.dashboardData)

    const navigate = useNavigate()

    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)

    const { loginData } = useSelector((state: RootState) => state)

    // to create timetable
    const handleCreateSubmit = async (
        values: CreateTimeTableInitialValues,
        userId: number,
        classId: number
    ): Promise<any> => {
        // const userDetails = loginData.data?.userDetails
        let valu = null
        // const userDetails = loginData.data?.userDetails
        if (values.endDate === 'Invalid date') valu = null
        else valu = values.endDate
        const payload = {
            userId: userId,
            title: values.title,
            isRepeated: values.isRepeated === 1 ? true : false,
            startDate: values.startDate,
            endDate: values.endDate,
            activities: values.activities.join(','),
            roomIds: values.roomId,
            instructorIds: values.instructorId,
            classId: classId,

            // ...(schoolId && { schoolId }), // Add schoolId conditionally
        }

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/timetable/create',
                payload,
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
            setIsShowModal(false)

            setTimeout(() => {
                setLoading(false)
            }, 3000)
            console.log('data', { data: data2 })

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

    //update timeTable Status
    const TimeTableStatus = async (
        timeTableid: number,
        isactive: boolean
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/timetable/updateStatus',
                { timeTableId: timeTableid, isActive: isactive },
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
            // setIsShowModal(true)
            // store.dispatch(getTimetableByUserId())

            setTimeout(() => {
                setLoading(false)
                //store.dispatch(getTimetableByUserId())

                // navigate('/school/view')
            }, 3000)
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
    //get all timetable slots
    const getTimetableSlot = async (timeTableid: number): Promise<any> => {
        const url = '/timetable/slot/getByTimeTableId'
        console.log('>> im in getTimetableSlot button')
        try {
            setError('')
            setLoading(true)
            const { data: data3 } = await axios.post(
                url,
                { timeTableId: timeTableid },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (data3.responseCode === '500') {
                toast(data3.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                console.log('all slot list', data3)

                return data3.results
            }
            setLoading(false)
            setIsShowModal(true)
            setTimeout(() => {
                setIsShowModal(false)
                //navigate("/school/view");
            }, 3000)

            // console.log(
            //   "hello",
            //   data.map((pic: any) => {
            //     return pic;
            //   })
            // );
            return data3.results.data
        } catch (e: any) {
            console.log('api error', errorMessage)
            setError(errorMessage as any)
            setLoading(false)
            console.log(errorMessage as any, 'error in api data')
            setError(
                (errorMessage as any).response?.data?.responseMessage ||
                    'An error occurred'
            )
        }
    }
    //get all timetable of user
    const getAllTimetable = async (
        userid: number,
        classId: number
    ): Promise<any> => {
        const url = '/timetable/getAll'
        console.log('>> im in getAllTimetable button')
        try {
            setError('')
            setLoading(true)
            const { data: data3 } = await axios.post(
                url,
                { userId: userid, classId: classId },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (data3.responseCode === '500') {
                toast(data3.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                console.log('add timetable list', data3.results.data)
            }
            setLoading(false)
            setAllTimetable(data3.results)

            // console.log(
            //   "hello",
            //   data.map((pic: any) => {
            //     return pic;
            //   })
            // );
            // return data3.results
        } catch (e: any) {
            console.log('api error', errorMessage)
            setError((errorMessage as any).response.data.responseMessage)
            setLoading(false)
            console.log(
                (errorMessage as any).response.data.responseMessage,
                'error in api data'
            )
            setError(
                (errorMessage as any).response?.data?.responseMessage ||
                    'An error occurred'
            )
        }
    }
    const getTimetableById = async (timeTableid: number): Promise<any> => {
        const url = '/timetable/getDetailsById'
        console.log('>> im in getAllTimetable button')
        try {
            setError('')
            setLoading(true)
            const { data: data3 } = await axios.post(
                url,
                { timeTableId: timeTableid },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (data3.responseCode === '500') {
                toast(data3.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                console.log('add timetable list', data3.results.data)

                return data3.results
            }
            setLoading(false)
            setTimeout(() => {
                setIsShowModal(false)
                //navigate("/school/view");
            }, 3000)

            // console.log(
            //   "hello",
            //   data.map((pic: any) => {
            //     return pic;
            //   })
            // );
            return data3
        } catch (e: any) {
            console.log('api error', errorMessage)
            setError((errorMessage as any).response.data.responseMessage)
            setLoading(false)
            console.log(
                (errorMessage as any).response.data.responseMessage,
                'error in api data'
            )
            setError(
                (errorMessage as any).response?.data?.responseMessage ||
                    'An error occurred'
            )
        }
    }
    const getAllUserPagination = async (
        userid: number,
        page: number
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: allschool } = await axios.post(
                `timetable/getAll?pageNo=${page}`,
                { userId: userid },
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
            setAllTimetable(allschool.results)
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
    const createSlots = async (params: CreateSlotsProps): Promise<any> => {
        const payload = {
            ...params,
        }
        try {
            setError('')
            setLoading(true)
            console.log('payload', payload)

            const createTimeSlotResponse: CreateTimeSheetSlotProps =
                await axios.post('/timetable/slot/create', payload, {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                })
            if (createTimeSlotResponse.responseCode === 500) {
                toast(createTimeSlotResponse.responseMessage, {
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
                // navigate('/school/view')
            }, 3000)
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            //setLoading(false);
            console.log('slots added', { createTimeSlotResponse })
            //setIsUploadImgVisible(true);
            // navigate("/");
            // resetForm()
            return createTimeSlotResponse.results
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
                defaultLanguageId: values.defaultLanguageId,
                defaultCurrencyId: values.defaultCurrencyId,
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
            setLoading(false)
            setIsShowModal(true)
            setTimeout(() => {
                setIsShowModal(false)
                navigate('/school/view')
            }, 3000)

            console.log({ data: data2 })
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

    //to delete school
    const deleteTimeTable = async (timeTableid: number): Promise<void> => {
        const url = '/timetable/delete'

        try {
            setError('')
            setLoading(true)

            const { data: data2 } = await axios.post(
                url,
                { timeTableId: timeTableid },
                {
                    headers: {
                        ...authorizationToken(logindata!),
                    },
                }
            )
            if (data2.responseCode === 500) {
                toast(data2.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return
            }

            setLoading(false)
            setIsShowModal(false) // Open the deletemodal
            setIsShowDeleteModal(true)
            const storedObject = JSON.parse(
                localStorage.getItem('ennvision-admin:token') as any
            )
            storedObject.schoolId = null
            localStorage.setItem(
                'ennvision-admin:token',
                JSON.stringify(storedObject)
            )
            setTimeout(() => {
                setIsShowDeleteModal(false)
                // setIsShowDeleteModal(true)
            }, 3000)
            //  store.dispatch(getTimetableByUserId())

            // console.log('data', { data: data2 })
        } catch (error2: any) {
            console.log('api error', error2)
            setError(error2.response.data.responseMessage)
            setLoading(false)
            console.log(
                error2.response.data.responseMessage,
                'error in api data'
            )
            setIsShowWarningModal(true)

            setTimeout(() => {
                setIsShowWarningModal(false)
            }, 3000)
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

    const deleteConfirmation = (_id: number): IModalComponent => {
        const Deleteschool = async (id: number): Promise<void> => {
            setIsShowModal(false) // Close any other modals
            // setIsShowDeleteModal(true)
            await deleteTimeTable(id)
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
        handleCreateSubmit,
        editSchool,
        deleteTimeTable,
        errorMessage,
        isUploadImgModalVisible,
        AllTimetable,
        setIsUploadImgVisible,
        deletemodal,
        Createmodal,
        UpdateModal,
        deleteConfirmation,
        getTimetableSlot,
        getAllTimetable,
        WarningModal,
        getTimetableById,
        createSlots,
        setIsShowWarningModal,
        TimeTableStatus,
        getAllUserPagination,
    }
}

export default useTimetable

/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { CreateSchoolInitialValues } from '../screens/Home/constants'
import axios from 'axios'
import { authorizationToken, edit_school_url } from '../utils/api_urls'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { loginDataTypes } from '../redux/features/types'
import CustomModal from '../components/Modal/CustomModal'
import { useAppSelector } from '../app/hooks'
import ic_success from '../assets/images/ic_success.svg'
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
        schoolId: number
    ) => Promise<any>

    createSlots: (props: CreateSlotsProps) => Promise<any>
    getTimetableSlot: (timeTableid: number) => Promise<any>
    getAllTimetable: (userid: number) => Promise<any>
    getTimetableById: (timeTableId: number) => Promise<any>

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
    deleteSchool: (userId: number) => Promise<void>
    errorMessage: string
    isUploadImgModalVisible: boolean
    setIsUploadImgVisible: (param: boolean) => void
    deletemodal: () => IModalComponent
    Createmodal: () => IModalComponent
    UpdateModal: () => IModalComponent
    deleteConfirmation: (id: number) => IModalComponent
    setIsShowModal: (showModal: true) => void
}

const useTimetable = (): IUseTimetable => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setError] = useState('')
    const [isUploadImgModalVisible, setIsUploadImgVisible] = useState(false)
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
        schoolId: number
    ): Promise<any> => {
        // const userDetails = loginData.data?.userDetails

        const payload = {
            userId: schoolId,
            title: values.title,
            isRepeated: values.isRepeated === 1 ? true : false,
            startDate: values.startDate,
            endDate: values.endDate,

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
    //get all timetable of user
    const getAllTimetable = async (userid: number): Promise<any> => {
        const url = '/timetable/getAll'
        console.log('>> im in getAllTimetable button')
        try {
            setError('')
            setLoading(true)
            const { data: data3 } = await axios.post(
                url,
                { userId: userid },
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

                return data3.results.data
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

                return data3
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

    const createSlots = async (
        params: CreateSlotsProps

        //const CreateSlots = async (
        //   timeTableIds: any,
        //    StartTimee: any,
        //     EndTimee: any,
        //      StartBreakk: any,
        //       EndBreakk: any,
        //        dayOfWeekk: any
        //>>>>>>> main
    ): Promise<any> => {
        const payload = {
            ...params,
        }

        //        const payload = {
        //           dayOfWeek: dayOfWeekk,
        //          timeTableId: timeTableIds,
        //         startTime: StartTimee,
        //        endTime: EndTimee,
        //       startBreak: StartBreakk,
        //      endBreak: EndBreakk,
        // }

        try {
            setError('')
            setLoading(true)
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
    const deleteSchool = async (userId: number): Promise<void> => {
        const url = '/school/delete'

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
                navigate('/school/create')
            }, 3000)
            // console.log('data', { data: data2 })
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
        const Deleteschool = async (id: number): Promise<void> => {
            setIsShowModal(false) // Close any other modals
            setIsShowDeleteModal(true)
            await deleteSchool(id)
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
        deleteSchool,
        errorMessage,
        isUploadImgModalVisible,
        setIsUploadImgVisible,
        deletemodal,
        Createmodal,
        UpdateModal,
        deleteConfirmation,
        getTimetableSlot,
        getAllTimetable,
        getTimetableById: getTimetableById,
        createSlots,
    }
}

export default useTimetable

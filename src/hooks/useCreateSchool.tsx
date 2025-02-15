import { useRef, useState } from 'react'
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
import CustomModal from '../components/Modal/CustomModal'
import { useAppSelector } from '../app/hooks'
import CustomButton from '../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    lightBlue3,
    lightColor1,
    maastrichtBlue,
} from '../components/GlobalStyle'
import { Col, Row } from 'react-bootstrap'
import { SchoolSuccessfulModals } from './PopupModalsStyling'
import CustomMessageModal from '../components/Modal/CustomMessageModal'
import { setUserRole } from '../redux/features/User/UserSlice'
import store from '../redux/store'
import { SchoolDataType } from '../redux/features/dashboard/dashboardDataSlice'

interface IModalComponent {
    modalComponent: JSX.Element
}

interface IUseSchool {
    loading: boolean
    handleCreateSubmit: (
        id: number,
        values: CreateSchoolInitialValues

        // { resetForm }: any
    ) => Promise<void>
    editSchool: (
        _schoolId: number,
        values: CreateSchoolInitialValues
    ) => Promise<void>
    deleteSchool: (userId: number) => Promise<void>
    AllSchools: any
    errorMessage: string
    isUploadImgModalVisible: boolean
    setIsUploadImgVisible: (param: boolean) => void
    SuccessModal: () => IModalComponent
    WarningModal: () => IModalComponent
    deleteConfirmation: (id: number) => IModalComponent
    setIsShowModal: (showModal: true) => void
    getAllSchool: (country: string) => Promise<void>
    getSchoolbyId: (schoolid: number) => Promise<any>
    getAllAppSchool: (page: any) => Promise<any>
    getAllSchoolPagination: (v: string, page: any) => Promise<any>
}

const useCreateSchool = (): IUseSchool => {
    const [AllSchools, setAllSchools] = useState<
        | {
              currentPage: number
              totalItems: number | undefined
              data: SchoolDataType[]
          }
        | undefined
    >(undefined)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isUploadImgModalVisible, setIsUploadImgVisible] = useState(false)
    const { schoolId } = useParams()
    const { data: logindata } = useAppSelector((state) => state.loginData)
    // const { schoolData } = useAppSelector((state) => state.dashboardData)

    const navigate = useNavigate()

    const [isShowModal, setIsShowModal] = useState(false)
    const { loginData } = useSelector((state: RootState) => state)

    const [isShowSuccessModal, setIsShowSuccessModal] = useState(false)
    const [isShowErrorModal, setIsShowErrorModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    // Create School
    const handleCreateSubmit = async (
        id: number,
        values: CreateSchoolInitialValues
        // { resetForm }: any
    ): Promise<void> => {
        const userDetails = loginData.data?.userDetails

        const payload = {
            // userId: userDetails?.id || '',
            userId: id,
            businessName: values.businessName || '',
            businessType: values.businessType,
            address: values.address || '',
            latitude: values.latitude,
            longitude: values.longitude,
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

            ...(schoolId && { schoolId }), // Add schoolId conditionally
        }
        console.log('payload', payload)

        try {
            setError('')
            setLoading(true)
            const { data: data1 } = await axios.post(
                create_school_url,
                payload,
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            console.log('school is created', data1)
            setSuccessMessage(data1.responseMessage)
            setIsShowSuccessModal(true)
            setLoading(false)
            store.dispatch(setUserRole('school'))
            //navigate(`/activity/create/${data1.results.schoolId}`)
            setTimeout(() => {
                setIsShowSuccessModal(false)
                navigate(`/activity/create/${data1.results.schoolId}`)
            }, 3000)
            // resetForm()
        } catch (error2: any) {
            console.log('error', error2.response?.data?.errors.length)
            const errorMessages = error2.response?.data?.errors.map(
                (err: { field: string; errorMessage: string }) =>
                    `<strong>${err.field}</strong> : ${err.errorMessage}`
            )
            setLoading(false)
            setError(error2.response)
            console.log('errorss', errorMessages.length)

            if (errorMessages.length > 1) {
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

    // List School
    const getAllSchool = async (v: string): Promise<any> => {
        try {
            setError('')
            setLoading(true)

            // const response = store.dispatch(getAllSchoolData(v))

            const { data: allSchool } = await axios.post(
                '/school/getAll',
                { country: '' },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            setAllSchools(allSchool.results)
            setSuccessMessage(allSchool.responseMessage)
            setIsShowSuccessModal(false)
            setLoading(false)
            setTimeout(() => {
                setIsShowSuccessModal(false)
            }, 3000)
            // return response
        } catch (error2: any) {
            setLoading(false)
            setError(error2.response)
            setErrorMessage(error2.response?.data?.responseMessage)
            setIsShowErrorModal(true)
            const id = setTimeout(() => {
                setIsShowErrorModal(false)
                setError('')
            }, 2000)
            if (!setIsShowModal) {
                clearTimeout(id)
            }
        }
    }

    const getAllAppSchool = async (page: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: allSchool } = await axios.post(
                `/app/school/getAll?pageNo=${page}`,
                { country: '' },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            setSuccessMessage(allSchool.responseMessage)
            setIsShowSuccessModal(false)
            setLoading(false)
            setTimeout(() => {
                setIsShowSuccessModal(false)
            }, 3000)
            return allSchool.results
        } catch (error2: any) {
            setLoading(false)
            setError(error2.response)
            setErrorMessage(error2.response?.data?.responseMessage)
            setIsShowErrorModal(true)
            const id = setTimeout(() => {
                setIsShowErrorModal(false)
                setError('')
            }, 2000)
            if (!setIsShowModal) {
                clearTimeout(id)
            }
        }
    }

    const getAllUserSchoolPagination = async (
        v: string,
        page: number
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: allSchool } = await axios.post(
                `/school/getAll?pageNo=${page}`,
                { country: '' },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            return allSchool.results
        } catch (error2: any) {
            setLoading(false)
            setError(error2.response)
            setErrorMessage(error2.response?.data?.responseMessage)
            setIsShowErrorModal(false)
            const id = setTimeout(() => {
                setIsShowErrorModal(false)
                setError('')
            }, 2000)
            if (!setIsShowModal) {
                clearTimeout(id)
            }
        }
    }

    // Pagination School
    const getAllSchoolPagination = async (
        v: string,
        page: number
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: allSchool } = await axios.post(
                `/school/getAll?pageNo=${page}`,
                { country: '' },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            setAllSchools(allSchool.results)
            // return allSchool.results
        } catch (error2: any) {
            setLoading(false)
            setError(error2.response)
            setErrorMessage(error2.response?.data?.responseMessage)
            setIsShowErrorModal(false)
            const id = setTimeout(() => {
                setIsShowErrorModal(false)
                setError('')
            }, 2000)
            if (!setIsShowModal) {
                clearTimeout(id)
            }
        }
    }

    // Edit School
    const editSchool = async (
        _schoolId: number,
        values: CreateSchoolInitialValues
    ): Promise<any> => {
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
                latitude: values.latitude,
                longitude: values.longitude,
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
            const { data: data1 } = await axios.post(url, payload, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                },
            })
            setSuccessMessage(data1.responseMessage)
            setIsShowSuccessModal(true)
            setLoading(false)
            setTimeout(() => {
                setIsShowSuccessModal(false)
                navigate(`/school/view/${data1.results.schoolId}`)
            }, 3000)
        } catch (error2: any) {
            setLoading(false)
            setError(error2.response)
            setErrorMessage(error2.response?.data?.responseMessage)
            setIsShowErrorModal(true)
            const id = setTimeout(() => {
                setError('')
                setIsShowErrorModal(false)
            }, 3000)
            if (!setIsShowModal) {
                clearTimeout(id)
            }
        }
    }

    // View School
    const getSchoolbyId = async (schoolid: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data3 } = await axios.post(
                '/school/getById',
                { schoolId: schoolid },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            setSuccessMessage(data3.responseMessage)
            setIsShowSuccessModal(false)
            setLoading(false)
            setTimeout(() => {
                setIsShowSuccessModal(false)
            }, 2000)
            return data3.results
        } catch (error2: any) {
            setLoading(false)
            setError(error2.response)
            setErrorMessage(error2.response?.data?.responseMessage)
            setIsShowErrorModal(true)
            setTimeout(() => {
                setIsShowErrorModal(false)
                navigate('/school/list')
                setError('')
            }, 2000)
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

            const index = AllSchools?.data.findIndex(
                (school) => school.schoolId === data2.results.id
            )

            console.log('index of school', index)
            // If the school is found, remove it from the array
            if (index !== -1 && index !== undefined) {
                if (AllSchools) {
                    const newData = [...AllSchools.data] // Create a copy of the data array
                    const removedItems = newData.splice(index, 1) // Remove the item at the specified index
                    if (removedItems.length > 0) {
                        // Check if any item was removed
                        setAllSchools({
                            ...AllSchools,
                            data: newData, // Update the state with the new array
                        })
                    }
                }
                //     const AllData = AllSchools?.data.splice(index, 1)
                //    setAllSchools({ ...AllSchools, data:  AllData})
            }

            // store.dispatch(deleteSchoolData(data2.results.id))
            const storedObject = JSON.parse(
                localStorage.getItem('ennvision-admin:token') as any
            )
            storedObject.schoolId = null
            localStorage.setItem(
                'ennvision-admin:token',
                JSON.stringify(storedObject)
            )
            setLoading(false)
            setSuccessMessage(data2.responseMessage)
            setIsShowSuccessModal(true)
            setTimeout(() => {
                setIsShowSuccessModal(false)
                // navigate('/school/list')
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
        const DeleteSchool = async (id: number): Promise<void> => {
            setIsShowModal(false)
            await deleteSchool(Number(id))
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
                                        clicked={() => DeleteSchool(_id)}
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
        editSchool,
        deleteSchool,
        AllSchools,
        errorMessage,
        isUploadImgModalVisible,
        setIsUploadImgVisible,
        SuccessModal,
        deleteConfirmation,
        WarningModal,
        getAllAppSchool,
        getAllSchool,
        getSchoolbyId,
        getAllSchoolPagination,
        handleCreateSubmit,
    }
}

export default useCreateSchool

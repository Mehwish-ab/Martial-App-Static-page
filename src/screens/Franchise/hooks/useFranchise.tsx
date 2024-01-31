import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { authorizationToken } from '../../../utils/api_urls'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import { loginDataTypes } from '../../../redux/features/types'
import { CreateFranchiseInitialValues } from '../constant'
import { FormikHelpers } from 'formik'
import CustomModal from '../../../components/Modal/CustomModal'
import { SchoolSuccessfulModals } from '../../../hooks/PopupModalsStyling'
import ic_success from '../../../assets/images/ic_success.svg'
import { Row, Col } from 'react-bootstrap'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    lightBlue3,
    lightColor1,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import { getfranchiseBySchoolId } from '../../../redux/features/franchise/franchiseSlice'

interface IModalComponent {
    modalComponent: JSX.Element
}
interface IUseFranchise {
    loading: boolean
    handleSubmit: (
        values: CreateFranchiseInitialValues,
        { resetForm }: FormikHelpers<CreateFranchiseInitialValues>
    ) => Promise<void>
    viewFranchisebySchoolid: (schoolid: number) => Promise<unknown>
    editFranchise: (
        franchiseId: number,
        values: CreateFranchiseInitialValues
    ) => Promise<unknown>
    deleteFranchise: (franchiseId: number) => Promise<void>
    getFranchisebyid: (franchiseId: number) => Promise<unknown>
    FranchiseStatus: (timeTableid: number, statusid: number) => Promise<any>

    errorMessage: string
    Createmodal: () => IModalComponent
    UpdateModal: () => IModalComponent
    deletemodal: () => IModalComponent
    deleteConfirmation: (_id: number) => IModalComponent
    setIsShowModal: (showModal: true) => void
}

const useFranchise = (): IUseFranchise => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setError] = useState('')
    const [isShowModal, setIsShowModal] = useState(false)
    const [data, setData] = useState<unknown>({})
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)

    const navigate = useNavigate()
    const toastId = useRef<any>(null)
    const { loginData } = useSelector((state: RootState) => state)
    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )

    const handleSubmit = async (
        values: CreateFranchiseInitialValues,
        { resetForm }: any
    ): Promise<void> => {
        console.log('values', values)
        const payload = {
            franchiseName: values.franchiseName,
            franchiseType: values.franchiseType,
            address: values.address,
            phoneNumber: values?.franchisePhoneNumber || '',
            rank: values.rank == '1' ? true : false,
            activities: values.selectedActivities.join(','),
            facilities: values.selectedFacilities.join(','),
            description: values.description,
            schoolId: schoolData.schoolId || loginData.data?.schoolId,
            defaultCurrencyId: values.defaultCurrency,
            defaultLanguageId: values.defaultLanguage,
            // schoolPaypalMethod:false,
            // schoolCashMethod:false,
            // schoolBankAccountMethod:false,
            // schoolStripeMethod:false,
            // schoolGclMethod:false,
            // stripePublicKey: values.stripePublishableKey,
            // stripeSecretKey: values.stripeSecretKey,
            // gclAccessToken: values.cardAccessToken,
            // gclClientId: values.cardClientId,
            // gclWebHook: values.cardWebHook,
            // gclClientSecret: values.cardClientSecret,
            // schoolStripeMethod: values.schoolStripeMethod,
            // schoolGclMethod: values.schoolGclMethod,
        }

        try {
            setError('')
            setLoading(true)
            const { data: data4 } = await axios.post(
                '/franchise/create',
                payload,
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )
            if (data4.responseCode === '500') {
                toast(data4.responseMessage, {
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
                navigate('/franchise/list')
            }, 3000)
            resetForm()
            store.dispatch(getfranchiseBySchoolId())
        } catch (error: any) {
            console.log({ error })
            setLoading(false)
            setError(error.response.data.responseMessage)
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(error.response.data.responseMessage, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    const viewFranchisebySchoolid = async (
        schoolid: number
    ): Promise<unknown> => {
        try {
            setError('')
            setLoading(true)
            const { data: data3 } = await axios.post(
                '/franchise/getBySchoolId',
                { schoolId: schoolid },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data3.responseCode === '500') {
                setLoading(false)
                return
            }
            console.log('franchise info', data3.results)
            setLoading(false)
            return data3
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }

    const editFranchise = async (
        franchiseId: number,
        values: CreateFranchiseInitialValues
    ): Promise<void> => {
        const url = '/franchise/edit'
        const userDetails = loginData.data?.userDetails

        try {
            setError('')
            setLoading(true)

            const payload = {
                userId: userDetails?.id || '',
                franchiseId: franchiseId,
                franchiseName: values.franchiseName,
                franchiseType: values.franchiseType,
                address: values.address,
                phoneNumber: values?.franchisePhoneNumber || '',
                rank: values.rank == '1' ? true : false,
                defaultLanguageId: values.defaultLanguage,
                defaultCurrencyId: values.defaultCurrency,
                activities: values.selectedActivities.join(','),
                facilities: values.selectedFacilities.join(','),
                description: values.description,
                franchiseStatusId: 1,
                // schoolId: schoolData.schoolId,
                schoolId: 3,
                ...(franchiseId && { franchiseId }),
            }
            console.log('Payload', payload)

            const { data: data1 } = await axios.post(url, payload, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                },
            })
            if (data1.responseCode === '500') {
                setLoading(false)
                return data1.response
            }

            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/franchise/list')
            }, 3000)
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

    const getFranchisebyid = async (franchiseId: number): Promise<unknown> => {
        try {
            setError('')
            setLoading(true)
            const { data: datas } = await axios.post(
                '/franchise/getDetailsById',
                { franchiseId },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (datas.responseCode === '500') {
                setLoading(false)
                return datas
            }
            console.log('franchise info', datas.results)
            setLoading(false)
            return datas.results
        } catch (Error: any) {
            console.log('error', Error)
            setLoading(false)
            setError(Error)
        }
    }

    const FranchiseStatus = async (
        franchiseid: number,
        statusid: number
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/franchise/updateStatus',
                { franchiseId: franchiseid, statusId: statusid },
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
            store.dispatch(getfranchiseBySchoolId())

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

    const deleteFranchise = async (franchiseId: number): Promise<void> => {
        const url = '/franchise/delete'
        console.log(franchiseId)

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                url,
                { franchiseId },
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
            // setIsShowModal(false)
            // setTimeout(() => {
            //     setLoading(false)
            //     setIsShowModal(false)
            //     navigate('/franchise/list')
            // }, 3000)
            setIsShowModal(false)
            setIsShowDeleteModal(true)
            setTimeout(() => {
                setIsShowDeleteModal(false)
                navigate('/franchise/list')
            }, 3000)
            setData('results: ' + data)
            setLoading(false)
            store.dispatch(getfranchiseBySchoolId())
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
                                width={188}
                                height={55}
                            />
                            <h3 className="mainContainer-heading text-center">
                                Successfully Account Removed
                            </h3>
                            <p className="mainContainer-subText text-center">
                                The student Branch has been successfully
                                removed,and please note that any associated data
                                will be retained for a period of 30 days before
                                it is permanently deleted from our system.
                            </p>
                        </div>
                    </SchoolSuccessfulModals>
                </CustomModal>
            ),
        }
    }
    const deleteConfirmation = (_id: number): IModalComponent => {
        const Deleteschool = async (id: number): Promise<void> => {
            setIsShowModal(false)
            setIsShowDeleteModal(true)
            await deleteFranchise(id)
        }
        return {
            modalComponent: (
                <CustomModal
                    isModalVisible={isShowModal}
                    setIsModalVisible={setIsShowModal}
                    showCloseBtn={true}
                >
                    <SchoolSuccessfulModals>
                        <h3 className="mainContainer-heading text-center">
                            Want to Remove Account
                        </h3>
                        <p className="mainContainer-subText text-center">
                            Before proceeding with the removal of a student
                            account, please be aware that once the removal is
                            confirmed, all access will be permanently revoked.
                            If the user still holds an active membership, the
                            account cannot be removed until the membership is
                            completed or canceled.
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
                    </SchoolSuccessfulModals>
                </CustomModal>
            ),
        }
    }

    return {
        loading,
        handleSubmit,
        viewFranchisebySchoolid,
        editFranchise,
        deleteFranchise,
        getFranchisebyid,
        errorMessage,
        Createmodal,
        UpdateModal,
        deletemodal,
        deleteConfirmation,
        setIsShowModal,
        FranchiseStatus,
    }
}

export default useFranchise

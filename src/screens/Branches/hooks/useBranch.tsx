/* eslint-disable max-len */
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import {
    authorizationToken,
    create_branch_url,
    get_payment,
    edit_branch_url,
    get_branch_by_school_id_url,
} from '../../../utils/api_urls'
import { useSelector } from 'react-redux'
import store, { RootState } from '../../../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { loginDataTypes } from '../../../redux/features/types'
import { CreateBranchInitialValues } from '../constant'
import CustomModal from '../../../components/Modal/CustomModal'
import { useAppSelector } from '../../../app/hooks'
import ic_success from '../../../assets/images/ic_success.svg'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    lightBlue3,
    lightColor1,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import { Col, Row } from 'react-bootstrap'
import { getBranchBySchoolId } from '../../../redux/features/branch/branchSlice'
import { SchoolSuccessfulModals } from '../../../hooks/PopupModalsStyling'

interface IModalComponent {
    modalComponent: JSX.Element
}

interface IUseBranch {
    loading: boolean
    handleSubmit: (
        id: number,
        values: CreateBranchInitialValues
    ) => Promise<any>
    editSchool: (
        id: number,
        values: CreateBranchInitialValues,
        schoolid: number
    ) => Promise<void>
    getallbranch: (schoolid: number) => Promise<any> // Change the parameter type to number
    errorMessage: string
    // error: (message: string) => Promise<void>
    get_bank: (businessUC: any, id: number) => Promise<any>
    get_gocard: (businessUC: any, id: number) => Promise<any>
    get_paypal: (businessUC: any, id: number) => Promise<any>
    get_stripe: (businessUC: any, id: number) => Promise<any>
    get_cash: (businessUC: any, id: number) => Promise<any>
    getbranchbyid: (_branchId: number) => Promise<any>
    getallbranchbyschoolid: (schoolId: number) => Promise<any>
    getallbranchbyschoolidPagination: (
        schoolid: number,
        page: number
    ) => Promise<any>
    BranchStatus: (timeTableid: number, statusid: number) => Promise<any>
    deletebranch: (_branchId: number) => Promise<void>
    deletePayment: (paymentMethod: string, id: number) => Promise<void>
    deletemodal: () => IModalComponent
    UpdateModal: () => IModalComponent
    Createmodal: () => IModalComponent
    deleteConfirmation: (id: number) => IModalComponent
    setIsShowModal: (showModal: true) => void
}

const useBranch = (): IUseBranch => {
    const [loading, setLoading] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)
    const [data, setData] = useState<any>({})

    const [errorMessage, setError] = useState('')
    const toastId = useRef<any>(null)
    const { branchId } = useParams()

    const navigate = useNavigate()
    const { loginData } = useSelector((state: RootState) => state)
    const { data: logindata } = useAppSelector((state) => state.loginData)
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)

    const { schoolData } = useSelector(
        (state: RootState) => state.dashboardData
    )

    // const dispatch = useDispatch()

    const handleSubmit = async (
        id: number,
        values: CreateBranchInitialValues
    ): Promise<any> => {
        const userDetails = loginData.data?.userDetails
        console.log('values', values)
        const payload = {
            schoolId: id ? id : loginData.data?.schoolId,
            branchName: values.branchName,
            branchType: values.branchType,
            address: values.address,
            phoneNumber: values?.branchPhoneNumber || '',
            rank: values.rank == '1' ? true : false,
            activities: values.selectedActivities.join(','),
            facilities: values.selectedFacilities.join(','),
            description: values.description,
            stripePublicKey: values.stripePublishableKey,
            stripeSecretKey: values.stripeSecretKey,
            gclAccessToken: values.cardAccessToken,
            gclClientId: values.cardClientId,
            gclWebHook: values.cardWebHook,
            gclClientSecret: values.cardClientSecret,
            // schoolId: schoolData.schoolId || loginData.data?.schoolId,
            schoolStripeMethod: values.schoolStripeMethod,
            schoolGclMethod: values.schoolGclMethod,
            defaultLanguageId: values.defaultLanguage,
            defaultCurrencyId: values.defaultCurrency,
            schoolCashMethod: false,
            schoolBankAccountMethod: false,
            schoolPaypalMethod: false,

            ...(branchId && { branchId }), // Add schoolId conditionally
        }

        //let endpoint = branchId ? edit_branch_url : create_branch_url;
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                create_branch_url,
                payload,
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
                return data2
            }
            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/branch/list')
            }, 3000)
        } catch (e: any) {
            console.error('Error:', e)
            setLoading(false)
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(e, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    const BranchStatus = async (
        branchid: number,
        statusid: number
    ): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/branch/updateStatus',
                { branchId: branchid, statusId: statusid },
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
            store.dispatch(getBranchBySchoolId())

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
    const getallbranch = async (schoolid: number): Promise<any> => {
        console.log('>> im in getall branch button')
        try {
            setError('')
            setLoading(true)
            const { data: data3 } = await axios.post(
                `branch/getBySchoolId`,
                { schoolId: schoolid },
                {
                    headers: {
                        ...authorizationToken(logindata!),
                    },
                }
            )
            if (data3.responseCode === '500') {
                toast(data.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return data3
            }
            setData('results: ' + data)
            setLoading(false)
            return data.results.data
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
    const getallbranchbyschoolid = async (schoolid: number): Promise<any> => {
        // const url = get_branch_by_school_id_url
        console.log('>> im in getallbranchbyschoolid')
        try {
            setLoading(true)
            const { data: data3 } = await axios.post(
                'branch/getBySchoolId',
                { schoolId: schoolid },
                {
                    headers: {
                        ...authorizationToken(logindata!),
                    },
                }
            )
            console.log('v', data)
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
            console.log({ data })
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
    const getallbranchbyschoolidPagination = async (
        schoolid: number,
        page: number
    ): Promise<any> => {
        // const url = get_branch_by_school_id_url
        console.log('>> im in getallbranchbyschoolid')
        try {
            setLoading(true)
            const { data: data3 } = await axios.post(
                `branch/getBySchoolId?pageNo=${page}`,
                { schoolId: schoolid },
                {
                    headers: {
                        ...authorizationToken(logindata!),
                    },
                }
            )
            console.log('v', data)
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
            console.log({ data })
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

    const editSchool = async (
        id: number,
        values: CreateBranchInitialValues,
        schoolid: number
    ): Promise<void> => {
        const userDetails = loginData.data?.userDetails

        try {
            setError('')
            setLoading(true)
            console.log('id sch', schoolData.schoolId, values)

            const payload = {
                userId: userDetails?.id || '',
                branchName: values.branchName,
                branchType: values.branchType,
                address: values.address,
                phoneNumber: values?.branchPhoneNumber || '',
                rank: values.rank == 1 ? true : false,
                activities: values.selectedActivities.join(','),
                facilities: values.selectedFacilities.join(','),
                description: values.description,
                gclClientSecret: false,
                schoolId: schoolid,
                // schoolId: 3,
                defaultCurrencyId: values.defaultCurrency,
                defaultLanguageId: values.defaultLanguage,
                schoolStripeMethod: false,
                schoolGclMethod: false,
                stripePublicKey: false,
                stripeSecretKey: false,
                gclAccessToken: false,
                gclClientId: 'gclClientId_8efc27897a56',
                gclWebHook: 'gclWebHook_1c49144280a8',
                schoolBankAccountMethod: false,
                schoolCashMethod: false,
                schoolPaypalMethod: false,

                ...(branchId && { branchId }), // Add schoolId conditionally
            }

            const { data: data4 } = await axios.post(edit_branch_url, payload, {
                headers: {
                    ...authorizationToken(loginData.data as loginDataTypes),
                },
            })
            if (data.responseCode === '500') {
                setLoading(false)
                return
            }

            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/branch/list')
            }, 3000)

            // navigate("/school/view");
            console.log('hello', data4)
            //setIsUploadImgVisible(true);
            // navigate("/school/view");
        } catch (e: any) {
            console.log('error', { error: errorMessage })
            setLoading(false)
            setError((errorMessage as any).response.data.responseMessage)
            const id2 = setTimeout(() => {
                setError('')
            }, 3000)
            if (!setIsShowModal) {
                clearTimeout(id2)
            }
            toastId.current = toast(
                (errorMessage as any).response.data.errors,
                {
                    type: 'error',
                    autoClose: 1000,
                }
            )
        }
    }

    const get_bank = async (businessUC: any, id: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data2.results.bankAccount
            console.log('payment info', values)

            return values
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }
    const get_gocard = async (businessUC: any, id: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data2.results.goCardLess
            console.log('payment info', values)

            return values
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }
    const get_stripe = async (businessUC: any, id: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/paymentMethod/get',
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data2.results.stripe
            console.log('payment info', values)

            return values
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }
    const get_paypal = async (businessUC: any, id: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data2.results.paypal
            console.log('payment info', values)

            return values
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }
    const get_cash = async (businessUC: any, id: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                get_payment,
                { businessUC, id },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            const values = data2.results.cash
            console.log('payment info', values)

            return values
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
        }
    }
    const deletePayment = async (
        paymentMethod: string,
        id: number
    ): Promise<void> => {
        const url = '/paymentMethod/delete'
        console.log('nada', paymentMethod, id)

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                url,
                { paymentMethod, id },
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
            const values = data2
            console.log('payment info', values)

            setIsShowModal(true)
            setTimeout(() => {
                setLoading(false)
                setIsShowModal(false)
                navigate('/branch/list')
            }, 3000)
            setData('results: ' + data2.results)
            console.log('data', { data: data2 })
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

    const deletebranch = async (_branchId: number): Promise<void> => {
        const url = '/branch/delete'
        console.log(_branchId)

        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                url,
                { branchId: _branchId },
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
            // toastId.current = toast(data.responseMessage, {
            //   type: "success",
            //   autoClose: 1000,
            // });
            setLoading(false)
            setIsShowModal(false)
            setIsShowDeleteModal(true)
            setTimeout(() => {
                setIsShowDeleteModal(false)
                navigate('/branch/list')
            }, 3000)
            setData('results: ' + data2)
            console.log('data', { data: data2 })
            setLoading(false)
            store.dispatch(getBranchBySchoolId()) as any
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
    const getbranchbyid = async (_branchId: number): Promise<any> => {
        try {
            setError('')
            setLoading(true)
            const { data: data2 } = await axios.post(
                '/branch/getDetailsById',
                { branchId: _branchId },
                {
                    headers: {
                        ...authorizationToken(loginData.data as loginDataTypes),
                    },
                }
            )

            if (data2.responseCode === '500') {
                setLoading(false)
                return
            }
            setLoading(false)
            return data2.results
        } catch (error2: any) {
            console.log('error', error2)
            setLoading(false)
            setError(error2)
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
                                width={188}
                                height={55}
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
            await deletebranch(id)
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
        BranchStatus,
        editSchool,
        getallbranch,
        errorMessage,
        Createmodal,
        get_bank,
        get_gocard,
        get_paypal,
        get_stripe,
        get_cash,
        getbranchbyid,
        deletebranch,
        deletemodal,
        deletePayment,
        UpdateModal,
        deleteConfirmation,
        setIsShowModal,
        getallbranchbyschoolid,
        getallbranchbyschoolidPagination,
    }
}

export default useBranch

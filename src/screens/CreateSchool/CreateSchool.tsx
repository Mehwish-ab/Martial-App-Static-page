import { CreateSchoolStyled, StudentViewStyling } from './styles'
import { ErrorMessage, Formik } from 'formik'
import { Card, Form } from 'antd'

import { Col, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import useScreenTranslation from '../../hooks/useScreenTranslation'
import store, { RootState } from '../../redux/store'
import useCreateSchool from '../../hooks/useCreateSchool'
import {
    CreateSchoolInitialValues,
    SelectOptionsDataTypes,
} from '../Home/constants'
import { validationFinder } from '../../utils/utilities'
import { DataTypesWithIdAndMultipleLangLabel } from '../../redux/features/types'
import FormControl from '../../components/FormControl'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    maastrichtBlue,
} from '../../components/GlobalStyle'
import CustomPhoneInput from '../../components/CustomPhoneInput/CustomPhoneInput'
import CustomButton from '../../components/CustomButton/CustomButton'
import PlacesAutoCompleteInput from '../../maps/PlacesAutocomplete'
import CheckboxesSelect from '../../components/CustomCheckbox/CheckboxesSelect'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import Head from '../../components/Head/Head'
import { UserDataType } from '../../redux/features/User/UserSlice'
import { getSchoolByUserId } from '../../redux/features/dashboard/dashboardDataSlice'

const CreateSchool = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('schoolCreate')

    const {
        statusData: { activities, facilities },
        dropdowns: { currency, language, businessTypes },
    } = useSelector((state: RootState) => state.appData.data)

    const { schoolData } = useAppSelector((state) => state.dashboardData)
    const navigate = useNavigate()
    const { userId } = useParams()
    // const { getUSerById } = useUser()
    // const { data: loginData } = useAppSelector((state) => state.loginData)
    const { UserData } = useAppSelector((state) => state.UserData)
    // const {userId}=useAppSelector((state)=>s)

    // const [OwnerData, setOwnerData] = useState<OwnerDataTypes>()

    const { schoolId } = useParams()
    console.log('school data', schoolData, schoolId)
    // const { data: loginData } = useAppSelector((state) => state.loginData)
    // console.log('login', loginData)

    // useEffect(() => {
    //     const fetchData = async (): Promise<void> => {
    //         try {
    //             const response: any = await getSchoolbyId(Number(schoolId))
    //             if (response) {
    //                 setschoolData(response)
    //                 setOwnerData(response.ownerData)
    //             }

    //             // eslint-disable-next-line @typescript-eslint/no-shadow
    //         } catch (error) {
    //         } finally {
    //         }
    //     }

    //     fetchData()
    // }, [schoolId])
    const [User, setUser] = useState<UserDataType | undefined>(undefined)
    console.log('User', userId, User)
    // useEffect(() => {
    //     const fetchData = async (): Promise<any> => {
    //         try {
    //             const res = await getUSerById(Number(userId))

    //             setUser(res)
    //         } catch (errors) {
    //             /// setError('Error fetching data')
    //         } finally {
    //             //  setLoading(false)
    //         }
    //     }

    //     fetchData()
    // }, [])
    const { handleCreateSubmit, loading, SuccessModal, WarningModal } =
        useCreateSchool()

    const initialValues: CreateSchoolInitialValues = {
        businessName: '',
        businessType: '',
        address: '',
        businessPhoneNumber: '',
        defaultLanguageId: '',
        description: '',
        rank: '',
        defaultCurrencyId: '',
        selectedActivities: [],
        selectedFacilities: [],
        UserId: Number(userId),
    }

    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

    const businessName = validationFinder('BUSINESS_NAME')!
    const businessNameReg = new RegExp(businessName.pattern)
    const address = validationFinder('ADDRESS')!
    const businessPhoneNumber = validationFinder('PHONE_NUMBER')!

    const validationSchema = Yup.object({
        businessName: Yup.string()
            .required(businessName.notBlankMsgEn)
            .matches(businessNameReg, businessName.patternMsgEn),
        address: Yup.string().required(address.notBlankMsgEn),

        businessType: Yup.string().required('Please select business type'),
        businessPhoneNumber: Yup.string().required(
            businessPhoneNumber.notBlankMsgEn
        ),
        defaultLanguageId: Yup.string().required(
            'Please select default language'
        ),
        defaultCurrencyId: Yup.string().required(
            'Please select default currency'
        ),
        description: Yup.string().required('Please enter description'),
        // stripePublishableKey: Yup.string().required(
        //   "Please enter stipe publishable key"
        // ),
        // stripeSecretKey: Yup.string().required("Please enter stipe secret key"),
        // cardAccessToken: Yup.string().required("Please enter card access token"),
        // cardClientId: Yup.string().required("Please enter card client id"),
        // cardWebHook: Yup.string().required("Please enter card web hook"),
        // cardClientSecret: Yup.string().required("Please enter card client secret"),
        selectedActivities: Yup.array()
            .of(Yup.string().required('Select at least one activity'))
            .min(1, 'Select at least one activity'),
        selectedFacilities: Yup.array()
            .of(Yup.string().required('Select at least one facility'))
            .min(1, 'Select at least one facility'),
    })
    const { loginData } = useSelector((state: RootState) => state)
    const onsubmit = async (
        values: CreateSchoolInitialValues
    ): Promise<void> => {
        let id = null
        if (loginData.userId) {
            id = loginData.userId
        } else {
            id = loginData.data?.userDetails.id
        }

        console.log('id of registered user', loginData, id)
        await handleCreateSubmit(Number(id), values)
    }
    const createOptions = (
        list: DataTypesWithIdAndMultipleLangLabel[]
    ): SelectOptionsDataTypes[] => {
        const options: SelectOptionsDataTypes[] = []
        list?.forEach((item) => {
            const obj = {
                label: (item as any)[selectedLanguage],
                value: item.id,
            }
            options.push(obj)
        })
        return options
    }
    console.log('login data', loginData)
    // useEffect(() => {
    //     if (logindata?.schoolId > 0)
    //         return navigate(`/school/view/${schoolData.schoolId}`)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [schoolData, loginData])
    useEffect(() => {
        // const localStorageData = localStorage.getItem('ennvision-admin:token')
        //const loginData = JSON.parse(localStorageData as any)
        if (
            loginData?.data?.userDetails.roleName === 'USER' &&
            loginData?.data.schoolId
        ) {
            console.log('loginData', loginData)
            // navigate(`/school/view/${loginData.schoolId}`)
            navigate('/activity/create/')
        } else {
            console.log('loginData', loginData)
            navigate(`/school/create/`)
        }
        // if (!loginData?.schoolId) {
        //     navigate('/school/create')
        //     return
        // }
        // if (!schoolData || !schoolData.schoolId) {
        //     store.dispatch(getSchoolByUserId())
        // }
    }, [])

    const showActivities = (_activities: string[]): string => {
        let activitiesName = ''
        _activities.forEach((activity) => {
            const index = activities.findIndex((act) => act.id === activity)
            if (index !== -1) {
                const activityLabel = (activities[index] as any)[
                    selectedLanguage
                ]
                activitiesName =
                    activitiesName === ''
                        ? activityLabel
                        : `${activitiesName}, ${activityLabel}`
            }
        })
        if (activitiesName.length > 35) {
            return `${activitiesName.slice(0, 35)}...`
        }
        return activitiesName || getLabelByKey('activity')
    }
    const showFacilities = (_facilities: string[]): string => {
        let facilitiesName = ''
        _facilities.forEach((facility) => {
            const index = facilities.findIndex(
                (facts: any) => facts.id === facility
            )
            if (index !== -1) {
                const facilityLabel = (facilities[index] as any)[
                    selectedLanguage
                ]
                facilitiesName =
                    facilitiesName === ''
                        ? facilityLabel
                        : `${facilitiesName}, ${facilityLabel}`
            }
        })
        if (facilitiesName.length > 35) {
            return `${facilitiesName.slice(0, 35)}...`
        }
        return facilitiesName || getLabelByKey('facilities')
    }
    return (
        <>
            <Head title="Create School" />
            {/* <StudentViewStyling>
                <Card>
                    <h3>Owner Information</h3>
                    <Row className="mt-20">
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Owner First Name
                                </div>
                                <div className="list-item-value">
                                    {User?.firstName || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Owner Last Name
                                </div>
                                <div className="list-item-value">
                                    {User?.firstName || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">Email</div>
                                <div className="list-item-value">
                                    {User?.emailAddress || '--'}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Phone Number
                                </div>
                                <div className="list-item-value">
                                    {User?.phoneNumber || '--'}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </StudentViewStyling> */}
            <CreateSchoolStyled>
                {SuccessModal().modalComponent}
                {WarningModal().modalComponent}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onsubmit}
                >
                    {(formik) => {
                        console.log('for', formik.values)
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="bg-white form mt-20">
                                    <h3>{getLabelByKey('title')}</h3>

                                    <Row>
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="businessName"
                                                label={getLabelByKey(
                                                    'businessName'
                                                )}
                                                fontSize="16px"
                                                max={6}
                                                placeholder={getLabelByKey(
                                                    'businessNamePlaceholder'
                                                )}
                                                className={
                                                    formik.errors
                                                        .businessName &&
                                                    formik.touched.businessName
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="businessType"
                                                label={getLabelByKey(
                                                    'businessType'
                                                )}
                                                placeholder={getLabelByKey(
                                                    'businessTypePlaceholder'
                                                )}
                                                className={
                                                    formik.errors
                                                        .businessType &&
                                                    formik.touched.businessType
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                                options={createOptions(
                                                    businessTypes
                                                )}
                                            />
                                        </Col>
                                        <Col md="4" className="mt-20">
                                            <CustomPhoneInput
                                                label={getLabelByKey(
                                                    'businessPhoneNumber'
                                                )}
                                                name="businessPhoneNumber"
                                                value={
                                                    formik.values
                                                        .businessPhoneNumber
                                                }
                                                placeholder={getLabelByKey(
                                                    'businessPhoneNumber'
                                                )}
                                                limitMaxLength={true}
                                                handleOnChange={(e: string) => {
                                                    formik.setFieldValue(
                                                        'businessPhoneNumber',
                                                        e
                                                    )
                                                }}
                                            />
                                            <ErrorMessage
                                                name={'businessPhoneNumber'}
                                            >
                                                {(msg) => (
                                                    <div
                                                        className="error-message is-invalid"
                                                        style={{
                                                            color: 'red',
                                                            textAlign: 'right',
                                                            marginLeft: '3px',
                                                            fontSize: '12px',
                                                            letterSpacing:
                                                                '1px',
                                                            fontFamily:
                                                                fontFamilyRegular,
                                                        }}
                                                    >
                                                        {msg}
                                                    </div>
                                                )}
                                            </ErrorMessage>
                                        </Col>
                                        <Col md="4" className="mt-20">
                                            <PlacesAutoCompleteInput
                                                label={getLabelByKey('address')}
                                                placeholder={getLabelByKey(
                                                    'enterCompleteAddress'
                                                )}
                                                handleChange={(val) => {
                                                    formik.setFieldValue(
                                                        'address',
                                                        val
                                                    )
                                                }}
                                                className={
                                                    formik.errors.address &&
                                                    formik.touched.address
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                                formik={formik}
                                                name="address"
                                                value={formik.values.address}
                                            />
                                        </Col>
                                        <Col md="8">
                                            <Row>
                                                {/* <Col md="4" className="mt-20">
                                                    <FormControl
                                                        control="select"
                                                        type="text"
                                                        name="rank"
                                                        fontFamily={
                                                            fontFamilyRegular
                                                        }
                                                        label={getLabelByKey(
                                                            'belts'
                                                        )}
                                                        placeholder={getLabelByKey(
                                                            'beltsPlaceholder'
                                                        )}
                                                        className={
                                                            formik.errors
                                                                .rank &&
                                                            formik.touched.rank
                                                                ? 'is-invalid'
                                                                : 'customInput'
                                                        }
                                                        options={
                                                            BELTS_SELECT_OPTIONS
                                                        }
                                                    />
                                                </Col> */}
                                                <Col md="6" className="mt-20">
                                                    <FormControl
                                                        control="select"
                                                        type="text"
                                                        name="defaultLanguageId"
                                                        fontFamily={
                                                            fontFamilyRegular
                                                        }
                                                        label={getLabelByKey(
                                                            'defaultLanguage'
                                                        )}
                                                        placeholder={getLabelByKey(
                                                            'defaultLanguage'
                                                        )}
                                                        className={
                                                            formik.errors
                                                                .defaultLanguageId &&
                                                            formik.touched
                                                                .defaultLanguageId
                                                                ? 'is-invalid'
                                                                : 'customInput'
                                                        }
                                                        options={createOptions(
                                                            language
                                                        )}
                                                    />
                                                </Col>
                                                <Col md="6" className="mt-20">
                                                    <FormControl
                                                        control="select"
                                                        type="text"
                                                        name="defaultCurrencyId"
                                                        fontFamily={
                                                            fontFamilyRegular
                                                        }
                                                        label={getLabelByKey(
                                                            'defaultCurrency'
                                                        )}
                                                        placeholder={getLabelByKey(
                                                            'defaultCurrency'
                                                        )}
                                                        className={
                                                            formik.errors
                                                                .defaultCurrencyId &&
                                                            formik.touched
                                                                .defaultCurrencyId
                                                                ? 'is-invalid'
                                                                : 'customInput'
                                                        }
                                                        options={createOptions(
                                                            currency
                                                        )}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md="6" className="">
                                            <CheckboxesSelect
                                                list={activities}
                                                name="selectedActivities"
                                                label={getLabelByKey(
                                                    'activity'
                                                )}
                                                showErrorMsgInList={false}
                                                placeholder={showActivities(
                                                    formik.values
                                                        .selectedActivities
                                                )}
                                            />
                                        </Col>

                                        <Col md="6" className="">
                                            <CheckboxesSelect
                                                name="selectedFacilities"
                                                label={getLabelByKey(
                                                    'facilities'
                                                )}
                                                placeholder={showFacilities(
                                                    formik.values
                                                        .selectedFacilities
                                                )}
                                                list={facilities}
                                                showErrorMsgInList={false}
                                            />
                                        </Col>

                                        <div className="mt-20">
                                            <FormControl
                                                control="textarea"
                                                type="text"
                                                name="description"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    'description'
                                                )}
                                                padding="10px"
                                                placeholder={getLabelByKey(
                                                    'enterDescription'
                                                )}
                                                className={
                                                    formik.errors.description &&
                                                    formik.touched.description
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                                height="200px"
                                            />
                                        </div>
                                    </Row>
                                </div>
                                {/* <PaymentInformation formik={formik} /> */}
                                {/* <PaymentInfoTable formik={formik} /> */}

                                <div className="mt-20 d-flex justify-content-end">
                                    <CustomButton
                                        bgcolor={lightBlue3}
                                        textTransform="capitalize"
                                        color={maastrichtBlue}
                                        padding="11px 40.50px"
                                        fontFamily={`${fontFamilyMedium}`}
                                        width="fit-content"
                                        type="submit"
                                        title={getLabelByKey('primaryButton')}
                                        fontSize="18px"
                                        loading={loading}
                                        clicked={() => {
                                            onsubmit
                                        }}
                                    />
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </CreateSchoolStyled>
        </>
    )
}

export default CreateSchool

import { CreateSchoolStyled, StudentViewStyling } from './styles'
import { ErrorMessage, Formik } from 'formik'
import { Card, Form } from 'antd'

import { Col, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import useScreenTranslation from '../../hooks/useScreenTranslation'
import { RootState } from '../../redux/store'
import useCreateSchool from '../../hooks/useCreateSchool'
import {
    BELTS_SELECT_OPTIONS,
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
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import { getSchoolByUserId } from '../../redux/features/dashboard/dashboardDataSlice'
import { useAppSelector } from '../../app/hooks'
import Head from '../../components/Head/Head'
// import { getSchoolByUserId } from '../../redux/features/dashboard/dashboardDataSlice'

const localStorageData = localStorage.getItem('ennvision-admin:token')
const loginData = JSON.parse(localStorageData as any)
const CreateSchool = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('schoolCreate')

    const {
        statusData: { activities, facilities },
        dropdowns: { currency, language, businessTypes },
    } = useSelector((state: RootState) => state.appData.data)

    const { schoolData } = useAppSelector((state) => state.dashboardData)
    const navigate = useNavigate()

    // const { data } = useSelector((state: RootState) => state.loginData)

    console.log('checking schoolData: ', schoolData)

    const { handleCreateSubmit, loading, Createmodal } = useCreateSchool()

    const initialValues: CreateSchoolInitialValues = {
        businessName: '',
        businessType: '',
        address: '',
        businessPhoneNumber: '',

        defaultLanguage: '',
        defaultCurrency: '',
        description: '',
        rank: '',
        defaultCurrencyId: 1,
        defaultLanguageId: 1,
        selectedActivities: [],
        selectedFacilities: [],
    }

    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

    const businessName = validationFinder('BUSINESS_NAME')!
    const businessNameReg = new RegExp(businessName.pattern)
    // const address = validationFinder('ADDRESS')!
    // const addressReg = new RegExp(address.pattern)
    const businessPhoneNumber = validationFinder('PHONE_NUMBER')!

    const validationSchema = Yup.object({
        businessName: Yup.string()
            .required(businessName.notBlankMsgEn)
            .matches(businessNameReg, businessName.patternMsgEn),
        // address: Yup.string()
        //   .required(address.notBlankMsgEn)
        //   .matches(addressReg, address.patternMsgEn),

        businessType: Yup.string().required('Please select business type'),
        businessPhoneNumber: Yup.string().required(
            businessPhoneNumber.notBlankMsgEn
        ),
        rank: Yup.string().required('Please select rank'),
        defaultLanguage: Yup.string().required(
            'Please select default language'
        ),
        defaultCurrency: Yup.string().required(
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
    useEffect(() => {
        console.log('>>im create school')

        // store.dispatch(getSchoolByUserId())
        // if (schoolData && schoolData?.schoolId > 0) {
        //     console.log('checking loginData: ', loginData)

        if (schoolData.schoolId > 0) return navigate('/school/view')
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schoolData, loginData])

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
            <StudentViewStyling>
                <Card>
                    <h3>Owner Information</h3>
                    <Row className="mt-20">
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Owner First Name
                                </div>
                                <div className="list-item-value">Adnan</div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Owner Last Name
                                </div>
                                <div className="list-item-value">Qureshi</div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">Email</div>
                                <div className="list-item-value">
                                    adnan@gmail.com
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Phone Number
                                </div>
                                <div className="list-item-value">
                                    +923000000000
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </StudentViewStyling>
            <CreateSchoolStyled>
                {Createmodal().modalComponent}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleCreateSubmit}
                >
                    {(formik) => {
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
                                                <Col md="4" className="mt-20">
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
                                                </Col>
                                                <Col md="4" className="mt-20">
                                                    <FormControl
                                                        control="select"
                                                        type="text"
                                                        name="defaultLanguage"
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
                                                                .defaultLanguage &&
                                                            formik.touched
                                                                .defaultLanguage
                                                                ? 'is-invalid'
                                                                : 'customInput'
                                                        }
                                                        options={createOptions(
                                                            language
                                                        )}
                                                    />
                                                </Col>
                                                <Col md="4" className="mt-20">
                                                    <FormControl
                                                        control="select"
                                                        type="text"
                                                        name="defaultCurrency"
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
                                                                .defaultCurrency &&
                                                            formik.touched
                                                                .defaultCurrency
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
                                        textTransform="Captilize"
                                        color={maastrichtBlue}
                                        padding="11px 40.50px"
                                        fontFamily={`${fontFamilyMedium}`}
                                        width="fit-content"
                                        type="submit"
                                        title={getLabelByKey('primaryButton')}
                                        fontSize="18px"
                                        loading={loading}
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

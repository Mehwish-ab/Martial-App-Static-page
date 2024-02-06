import { CreateSchoolStyled, StudentViewStyling } from '../styles'
import { ErrorMessage, Formik } from 'formik'
import { Card, Form } from 'antd'
import { Col, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { RootState } from '../../../redux/store'
import useSchool from '../../../hooks/useCreateSchool'
import { useParams } from 'react-router-dom'
import {
    BELTS_SELECT_OPTIONS,
    CreateSchoolInitialValues,
    SelectOptionsDataTypes,
} from '../../Home/constants'
import { validationFinder } from '../../../utils/utilities'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import FormControl from '../../../components/FormControl'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import CustomPhoneInput from '../../../components/CustomPhoneInput/CustomPhoneInput'
import CustomButton from '../../../components/CustomButton/CustomButton'
import PlacesAutoCompleteInput from '../../../maps/PlacesAutocomplete'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import Head from '../../../components/Head/Head'
import { useEffect, useState } from 'react'
import {
    OwnerDataTypes,
    SchoolDataType,
} from '../../../redux/features/dashboard/dashboardDataSlice'

const EditSchool = (): JSX.Element => {
    const { editSchool, loading, SuccessModal, WarningModal, getSchoolbyId } =
        useSchool()
    const { activities } = useSelector(
        (state: RootState) => state.appData.data.statusData
    )
    const { facilities } = useSelector(
        (state: RootState) => state.appData.data.statusData
    )
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

    const { getLabelByKey } = useScreenTranslation('schoolCreate')
    const { getLabelByKey: getTitleLabelByKey } =
        useScreenTranslation('schoolUpdate')
    const {
        dropdowns: { currency, language, businessTypes },
    } = useSelector((state: RootState) => state.appData.data)
    const [schoolData, setschoolData] = useState<SchoolDataType>()
    const [OwnerData, setOwnerData] = useState<OwnerDataTypes>()

    const { schoolId } = useParams()
    console.log('schoolID', schoolData)

    // const businessName = validationFinder('BUSINESS_NAME')!
    // const businessNameReg = new RegExp(businessName.pattern)
    // const address = validationFinder('ADDRESS')!
    // const addressReg = new RegExp(address.pattern)
    const businessPhoneNumber = validationFinder('PHONE_NUMBER')!
    const validationSchema = Yup.object({
        // businessName: Yup.string()
        //     .required(businessName.notBlankMsgEn)
        //     .matches(businessNameReg, businessName.patternMsgEn),
        // address: Yup.string()
        //   .required(address.notBlankMsgEn)
        //   .matches(addressReg, address.patternMsgEn),
        businessType: Yup.string().required('Please select business type'),
        businessPhoneNumber: Yup.string().required(
            businessPhoneNumber.notBlankMsgEn
        ),
        belts: Yup.string().required('Please select belts'),
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
    const handleEditSchool = async (value: any): Promise<void> => {
        if (!value.selectedActivities[0] || !value.selectedFacilities[0]) {
            return
        }
        await editSchool(Number(schoolId), value)
    }
    const createOptions = (
        list: DataTypesWithIdAndMultipleLangLabel[]
    ): SelectOptionsDataTypes[] => {
        const options: SelectOptionsDataTypes[] = []
        list.forEach((item) => {
            const obj = {
                label: (item as any)[selectedLanguage],
                value: item.id,
            }

            options.push(obj)
        })

        return options
    }

    const showActivities = (_activities: string[]): string => {
        let activitiesName = ''
        _activities.map((activity) => {
            const index = activities.findIndex((act) => act.id === activity)
            if (index !== -1) {
                activitiesName =
                    activitiesName === ''
                        ? (activities[index] as any)[selectedLanguage]
                        : `${activitiesName}, ${
                              (activities[index] as any)[selectedLanguage]
                          }`
            }
        })
        if (activitiesName.length > 40) {
            return `${activitiesName.slice(0, 40)}...`
        }
        return activitiesName || getLabelByKey('activity')
    }

    const showFacilities = (_facilities: string[]): string => {
        let facilitiesName = ''
        _facilities.map((facility) => {
            const index = facilities.findIndex(
                (facts: any) => facts.id === facility
            )
            if (index !== -1) {
                facilitiesName =
                    facilitiesName === ''
                        ? (facilities[index] as any)[selectedLanguage]
                        : `${facilitiesName}, ${
                              (facilities[index] as any)[selectedLanguage]
                          }`
            }
        })

        if (facilitiesName.length > 40) {
            return `${facilitiesName.slice(0, 40)}...`
        }
        return facilitiesName || getLabelByKey('facilities')
    }
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response: any = await getSchoolbyId(Number(schoolId))
                setschoolData(response)
                setOwnerData(response.ownerData)

                console.log('response', response)

                // eslint-disable-next-line @typescript-eslint/no-shadow
            } catch (error) {
                // setError('Error fetching data')
            } finally {
                // setLoading(false)
            }
        }

        fetchData()
    }, [])
    console.log('school dat', schoolData?.rank)

    const initialValuesForEdit: CreateSchoolInitialValues = {
        businessName: schoolData ? schoolData.businessName : '--',
        businessType: schoolData ? schoolData.businessType : 0,
        address: schoolData ? schoolData.address : '--',
        businessPhoneNumber: schoolData ? schoolData.phoneNumber : '--',
        defaultLanguageId: schoolData ? schoolData.defaultLanguageId : '--',
        defaultCurrencyId: schoolData ? schoolData.defaultCurrencyId : '--',
        description: schoolData ? schoolData.description : '--',
        rank: schoolData?.rank === true ? 1 : 2,

        // stripePublishableKey: schoolData.stripePublicKey,
        // stripeSecretKey: schoolData.stripeSecretKey,
        // cardAccessToken: schoolData.gclAccessToken,
        // cardClientId: schoolData.gclClientId,
        // cardWebHook: schoolData.gclWebHook,
        // cardClientSecret: schoolData.gclClientSecret,
        selectedActivities: schoolData
            ? schoolData?.activities?.split(',').map(String)
            : [],
        selectedFacilities: schoolData
            ? schoolData.facilities?.split(',').map(String)
            : [],
        UserId: Number(schoolData?.userId),
    }
    console.log('belte', initialValuesForEdit.rank)

    return (
        <>
            <Head title="Update School" />
            <StudentViewStyling>
                <Card>
                    <h3>Owner Information</h3>
                    <Row className="mt-20">
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Owner First Name
                                </div>
                                <div className="list-item-value">
                                    {OwnerData?.firstName}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Owner Last Name
                                </div>
                                <div className="list-item-value">
                                    {OwnerData?.lastName}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">Email</div>
                                <div className="list-item-value">
                                    {OwnerData?.emailAddress}
                                </div>
                            </div>
                        </Col>
                        <Col md="6">
                            <div className="list-item">
                                <div className="list-item-title">
                                    Phone Number
                                </div>
                                <div className="list-item-value">
                                    {OwnerData?.phoneNumber}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </StudentViewStyling>
            <CreateSchoolStyled>
                {SuccessModal().modalComponent}
                {WarningModal().modalComponent}
                <Formik
                    initialValues={initialValuesForEdit}
                    validationSchema={validationSchema}
                    validateOnMount
                    enableReinitialize
                    onSubmit={(values) => handleEditSchool(values)}
                >
                    {(formik) => {
                        console.log('asdf', formik.values)

                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="bg-white form mt-20">
                                    <h3>{getTitleLabelByKey('title')}</h3>
                                    <Row>
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="businessName"
                                                label={getLabelByKey(
                                                    'businessName'
                                                )}
                                                padding="10px"
                                                fontFamily={fontFamilyRegular}
                                                fontSize="16px"
                                                // prefix={<img src={lock_icon} alt="lock_icon" />}
                                                max={6}
                                                // border="none"
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
                                                fontFamily={fontFamilyRegular}
                                                // prefix={<img src={lock_icon} alt="lock_icon" />}
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
                                                value={
                                                    schoolId
                                                        ? createOptions(
                                                              businessTypes
                                                          ).find(
                                                              (item) =>
                                                                  item.value ===
                                                                  formik.values
                                                                      .businessType
                                                          )?.value
                                                        : undefined
                                                }
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
                                                            textAlign: 'end',
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
                                                    'addressPlaceholder'
                                                )}
                                                handleChange={(val: any) => {
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
                                        {/* <Col md="2" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="rank"
                                                fontFamily={fontFamilyRegular}
                                                label={getLabelByKey('belts')}
                                                placeholder={getLabelByKey(
                                                    'beltsPlaceholder'
                                                )}
                                                className={
                                                    formik.errors.rank &&
                                                    formik.touched.rank
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                                options={BELTS_SELECT_OPTIONS}
                                                value={
                                                    schoolId
                                                        ? BELTS_SELECT_OPTIONS.find(
                                                              (item) =>
                                                                  item.value ===
                                                                  formik.values
                                                                      .rank
                                                          )?.label
                                                        : undefined
                                                }
                                            />
                                        </Col> */}
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="defaultLanguageId"
                                                fontFamily={fontFamilyRegular}
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
                                                value={
                                                    schoolId
                                                        ? createOptions(
                                                              language
                                                          ).find(
                                                              (item) =>
                                                                  item.value ===
                                                                  formik.values
                                                                      .defaultLanguageId
                                                          )?.label
                                                        : undefined
                                                }
                                            />
                                        </Col>
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="select"
                                                type="text"
                                                name="defaultCurrencyId"
                                                fontFamily={fontFamilyRegular}
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
                                                value={
                                                    formik.values
                                                        .defaultCurrencyId
                                                }
                                            />
                                        </Col>

                                        <Col md="6">
                                            <CheckboxesSelect
                                                list={activities}
                                                name="selectedActivities"
                                                label={getLabelByKey(
                                                    'activity'
                                                )}
                                                placeholder={showActivities(
                                                    formik.values
                                                        .selectedActivities
                                                )}
                                                showErrorMsgInList={false}
                                            />
                                        </Col>

                                        <Col md="6">
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
                                    </Row>
                                    {/* </div> */}

                                    <div className="mt-20">
                                        <FormControl
                                            control="textarea"
                                            type="text"
                                            name="description"
                                            fontFamily={fontFamilyRegular}
                                            // prefix={<img src={lock_icon} alt="lock_icon" />}
                                            label={getLabelByKey('description')}
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
                                    {/* </Row> */}
                                    {/* <PaymentInformation formik={formik} /> */}
                                </div>

                                <div className="mt-20 d-flex justify-content-end">
                                    <CustomButton
                                        bgcolor={lightBlue3}
                                        textTransform="Captilize"
                                        color={maastrichtBlue}
                                        padding="11px 40.50px"
                                        fontFamily={`${fontFamilyMedium}`}
                                        width="fit-content"
                                        type="submit"
                                        title="Update"
                                        fontSize="18px"
                                        clicked={() =>
                                            handleEditSchool(formik.values)
                                        }
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

export default EditSchool

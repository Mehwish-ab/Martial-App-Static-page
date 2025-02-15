import { Formik } from 'formik'
import { Form } from 'antd'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { RootState } from '../../../redux/store'
import FormControl from '../../../components/FormControl'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import ImagesUpload from '../../../components/ImagesUpload/ImagesUpload'
import CustomPhoneInput from '../../../components/CustomPhoneInput/CustomPhoneInput'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CreateSchoolStyled } from '../../CreateSchool/styles'
import { CreateInstructorInitialValues } from '../constant'
import useInstructor from '../../../hooks/useInstructor'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import PlacesAutoCompleteInput from '../../../maps/PlacesAutocomplete'
import DateCalander from '../../../assets/images/dateCalander.svg'
import FileSubmit from '../../../assets/icons/ic_fileSubmit.svg'
import { validationFinder } from '../../../utils/utilities'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import {
    BELTS_SELECT_OPTIONS,
    SelectOptionsDataTypes,
} from '../../Home/constants'
import Head from '../../../components/Head/Head'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
const CreateInstructor = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('instructorCreate')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const {
        statusData: { activities, facilities },
        belts: { adult },
    } = useSelector((state: RootState) => state.appData.data)
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
    console.log('adults', adult)
    const [selectedFiles, setSelectedFiless] = useState<FileList | null>(null)
    useEffect(() => {
        console.log('this is create instructor')
    }, [])
    const handleImagesUpload = (selectedFiless: any): void => {
        setSelectedFiless(selectedFiless)
    }
    const { loading, handleSubmit, Createmodal } = useInstructor()

    const initialValues: CreateInstructorInitialValues = {
        instructorName: '',
        emailAddress: '',
        instructorPhoneNumber: '',
        address: '',
        yearsOfExperience: '',
        rankId: '',
        latestCertification: '',
        description: '',
        activities: [],
        specializations: [],
        termCondition: '',
        ranking: '',
    }

    const instructorName = validationFinder('BUSINESS_NAME')!
    const franchiseNameReg = new RegExp(instructorName.pattern)
    const emailAddress = validationFinder('EMAIL_ADDRESS')!
    const emailAddressReg = new RegExp(emailAddress.pattern)
    const instructorPhoneNumber = validationFinder('PHONE_NUMBER')!

    const validationSchema = Yup.object({
        instructorName: Yup.string()
            .required(instructorName.notBlankMsgEn)
            .matches(franchiseNameReg, instructorName.patternMsgEn),
        address: Yup.string().required('Please enter description'),
        emailAddress: Yup.string()
            .required(emailAddress.notBlankMsgEn)
            .matches(emailAddressReg, emailAddress.patternMsgEn),
        instructorPhoneNumber: Yup.string().required(
            instructorPhoneNumber.notBlankMsgEn
        ),
        latestCertification: Yup.mixed().test(
            'fileType',
            'Unsupported File Format',
            function (value) {
                if (value) {
                    const allowedTypes = [
                        'image/jpeg',
                        'image/png',
                        'image/webp',
                        'image/jpg',
                        'image/bmp',
                        'image/tiff',
                    ]
                    const isAllowedType = allowedTypes.includes(value.type)
                    return isAllowedType
                }
                return true
            }
        ),
        // rankId: Yup.string().required('Please select belts'),
        description: Yup.string().required('Please enter description'),
        // yearsOfExperience: Yup.string().required(
        //     'Please select years Of Experience'
        // ),

        defaultCurrency: Yup.string().required(
            'Please select default currency'
        ),
        activities: Yup.array()
            .of(Yup.string().required('Select an activity'))
            .min(1, 'Select at least one activity'),
        specializations: Yup.array()
            .of(Yup.string().required('Select an specilization'))
            .min(1, 'Select at least one specilization'),
    })
    const { userId } = useSelector((state: RootState) => state.UserData)
    const { loginData } = useSelector((state: RootState) => state)
    const onsubmit = async (
        values: CreateInstructorInitialValues
    ): Promise<void> => {
        let id = null
        if (loginData.userId) {
            id = loginData.userId
        } else if (
            loginData.data?.userDetails.id &&
            loginData.data.userDetails.roleName === 'SCHOOL'
        ) {
            id = loginData.data.userDetails.id
        } else {
            id = userId
        }

        console.log('id of registered user', id)
        await handleSubmit(Number(id), values, selectedFiles)
    }
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
        return activitiesName || 'Activities'
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
        return facilitiesName || 'Specializations'
    }
    return (
        <CreateSchoolStyled>
            <Head title="Instructor Create" />
            {Createmodal().modalComponent}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onsubmit}
            >
                {(formik) => {
                    console.log('formik values', formik.values)

                    return (
                        <Form
                            name="basic"
                            onFinish={formik.handleSubmit}
                            autoComplete="off"
                        >
                            <div className="bg-white form">
                                <h3>{getLabelByKey('title')}</h3>
                                <Row>
                                    <Col md="4" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="text"
                                            name="instructorName"
                                            label={getLabelByKey(
                                                'instructorName'
                                            )}
                                            padding="10px"
                                            fontFamily={fontFamilyRegular}
                                            fontSize="16px"
                                            max={6}
                                            placeholder={getLabelByKey(
                                                'placeholderInstructorName'
                                            )}
                                        />
                                    </Col>
                                    <Col md="4" className="mt-20">
                                        <FormControl
                                            control="input"
                                            type="email"
                                            name="emailAddress"
                                            fontFamily={fontFamilyRegular}
                                            label={getLabelByKey(
                                                'emailAddress'
                                            )}
                                            padding="10px"
                                            placeholder={getLabelByKey(
                                                'PlaceholderEmailAddress'
                                            )}
                                        />
                                    </Col>
                                    <Col md="4" className="mt-20">
                                        <CustomPhoneInput
                                            label={getLabelByKey(
                                                'instructorMobileNumber'
                                            )}
                                            name="instructorPhoneNumber"
                                            value={String(
                                                formik.values
                                                    .instructorPhoneNumber
                                            )}
                                            placeholder={getLabelByKey(
                                                'instructorPhoneNumber'
                                            )}
                                            limitMaxLength={true}
                                            handleOnChange={(e: string) => {
                                                formik.setFieldValue(
                                                    'instructorPhoneNumber',
                                                    e
                                                )
                                            }}
                                        />
                                    </Col>

                                    <Col md="6" className="mt-20">
                                        <PlacesAutoCompleteInput
                                            label={getLabelByKey('address')}
                                            placeholder={getLabelByKey(
                                                'placeholderAddress'
                                            )}
                                            handleChange={(val) => {
                                                formik.setFieldValue(
                                                    'address',
                                                    val.selectedAddress
                                                )
                                                formik.setFieldValue(
                                                    'latitude',
                                                    val.latitude
                                                )
                                                formik.setFieldValue(
                                                    'longitude',
                                                    val.longitude
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
                                    {/* <Col md="8"> */}
                                    {/* <Row> */}
                                    {/* <Col md="4" className="mt-20">
                                                <FormControl
                                                    control="select"
                                                    type="text"
                                                    name="rankId"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    label={getLabelByKey(
                                                        'belts'
                                                    )}
                                                    placeholder={getLabelByKey(
                                                        'selectBelt'
                                                    )}
                                                    options={createOptions(
                                                        adult
                                                    )}
                                                />
                                            </Col> */}
                                    {/* <Col md="4" className="mt-20">
                                                <FormControl
                                                    control="input"
                                                    type="number"
                                                    name="yearsOfExperience"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    label={getLabelByKey(
                                                        'yearsOfExperience'
                                                    )}
                                                    padding="10px"
                                                    suffix={
                                                        <img
                                                            src={
                                                                DateCalander as string
                                                            }
                                                            alt="Calander"
                                                            width={21}
                                                            height={21}
                                                        />
                                                    }
                                                    placeholder={getLabelByKey(
                                                        'placeholderYearsOfExperience'
                                                    )}
                                                />
                                            </Col> */}
                                    <Col md="6" className="mt-20">
                                        <FormControl
                                            control="file"
                                            type="file"
                                            name="latestCertification"
                                            fontFamily={fontFamilyRegular}
                                            label={
                                                <>
                                                    {getLabelByKey(
                                                        'latestCertification'
                                                    )}{' '}
                                                    <span>
                                                        {getLabelByKey(
                                                            'optional'
                                                        )}
                                                    </span>
                                                </>
                                            }
                                            src={FileSubmit}
                                            suffix={
                                                <ImagesUpload
                                                    onImagesSelect={
                                                        handleImagesUpload
                                                    }
                                                />
                                            }
                                            padding="10px"
                                            placeholder={getLabelByKey(
                                                'PlaceholderLatestCertification'
                                            )}
                                        />
                                    </Col>
                                    {/* </Row> */}
                                    {/* </Col> */}

                                    <Col md="6">
                                        <CheckboxesSelect
                                            name="activities"
                                            label={
                                                <>
                                                    {getLabelByKey(
                                                        'activities'
                                                    )}{' '}
                                                    <span>
                                                        {getLabelByKey(
                                                            'toInstructWithin'
                                                        )}
                                                    </span>
                                                </>
                                            }
                                            list={activities}
                                            showErrorMsgInList={false}
                                            placeholder={
                                                formik.values.activities
                                                    .length > 0
                                                    ? showActivities(
                                                          formik.values
                                                              .activities
                                                      )
                                                    : getLabelByKey(
                                                          'placeholderActivities'
                                                      )
                                            }
                                        />
                                    </Col>
                                    <Col md="6">
                                        <CheckboxesSelect
                                            name="specializations"
                                            label={getLabelByKey(
                                                'specializations'
                                            )}
                                            list={activities}
                                            showErrorMsgInList={false}
                                            placeholder={
                                                formik.values.specializations
                                                    .length > 0
                                                    ? showActivities(
                                                          formik.values
                                                              .specializations
                                                      )
                                                    : getLabelByKey(
                                                          'placeholderSpecializations'
                                                      )
                                            }
                                        />
                                    </Col>

                                    <div className="mt-20">
                                        <FormControl
                                            control="textarea"
                                            type="text"
                                            name="description"
                                            fontFamily={fontFamilyRegular}
                                            label={getLabelByKey(
                                                'biographyOrIntroduction'
                                            )}
                                            padding="10px"
                                            placeholder={getLabelByKey(
                                                'placeholderBiographyOrIntroduction'
                                            )}
                                            height="200px"
                                        />
                                    </div>
                                    <label htmlFor="termCondition">
                                        <form className="mt-10 d-flex align-items-center justify-content-start column-gap-2">
                                            <FormControl
                                                control="checkbox"
                                                type="checkbox"
                                                id="termsAndConditions"
                                                name="termsAndConditions"
                                            />
                                            <p
                                                className="ms-2 mb-0"
                                                id="termsAndConditions"
                                            >
                                                {getLegalLabelByKey(
                                                    'termsAndConditions'
                                                )}
                                            </p>
                                        </form>
                                    </label>
                                    <label htmlFor="agreement">
                                        <form className="mt-10 d-flex align-items-center justify-content-start column-gap-2">
                                            <FormControl
                                                control="checkbox"
                                                type="checkbox"
                                                id="AgreementGuidelines"
                                                name="AgreementGuidelines"
                                            />
                                            <p
                                                className="ms-2 mb-0"
                                                id="AgreementGuidelines"
                                            >
                                                {getLegalLabelByKey(
                                                    'AgreementGuidelines'
                                                )}
                                            </p>
                                        </form>
                                    </label>
                                    <label htmlFor="liability">
                                        <form className="mt-10 d-flex align-items-center justify-content-start column-gap-2">
                                            <FormControl
                                                control="checkbox"
                                                type="checkbox"
                                                id="liabilityWaivers"
                                                name="liabilityWaivers"
                                            />
                                            <p
                                                className="ms-2 mb-0"
                                                id="liabilityWaivers"
                                            >
                                                {getLegalLabelByKey(
                                                    'liabilityWaivers'
                                                )}
                                            </p>
                                        </form>
                                    </label>
                                </Row>
                            </div>

                            <div className="mt-20 d-flex justify-content-end">
                                <CustomButton
                                    bgcolor={lightBlue3}
                                    // disabled={!formik.isValid}
                                    textTransform="Captilize"
                                    color={maastrichtBlue}
                                    padding="11px 40.50px"
                                    fontFamily={`${fontFamilyMedium}`}
                                    width="fit-content"
                                    type="submit"
                                    title={getLabelByKey('primaryButton')}
                                    fontSize="18px"
                                    loading={loading}
                                    clicked={() => onsubmit(formik.values)}
                                />
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </CreateSchoolStyled>
    )
}

export default CreateInstructor

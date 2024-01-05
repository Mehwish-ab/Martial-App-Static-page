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
import { BELTS_SELECT_OPTIONS } from '../../Home/constants'
const CreateInstructor = (): JSX.Element => {
    const { getLabelByKey } = useScreenTranslation('instructorCreate')
    const {
        statusData: { activities, facilities },
    } = useSelector((state: RootState) => state.appData.data)
    const [selectedFiles, setSelectedFiless] = useState<FileList | null>(null)
    useEffect(() => {
        console.log('this is create instructor')
    }, [])
    const handleImagesUpload = (selectedFiless: any): void => {
        setSelectedFiless(selectedFiless)
    }
    const { loading, handleSubmit } = useInstructor()

    const initialValues: CreateInstructorInitialValues = {
        instructorName: '',
        emailAddress: '',
        instructorPhoneNumber: '',
        address: '',
        yearsOfExperience: '',
        rankId: 0,
        latestCertification: '',
        description: '',
        activities: [],
        specializations: [],
        termCondition: '',
    }
    // const [file, setFile] = useState<File[]>([])
    // const inputFile = useRef<HTMLInputElement | null>(null)
    // const handleChange = (e: any): void => {
    //     const selectedFile = e.target.files && e.target.files[0]
    //     if (selectedFile) {
    //         setFile(selectedFile)
    //         console.log('File state updated:', file)
    //     }
    // }
    const instructorName = validationFinder('BUSINESS_NAME')!
    const franchiseNameReg = new RegExp(instructorName.pattern)
    const address = validationFinder('ADDRESS')!
    const addressReg = new RegExp(address.pattern)
    const emailAddress = validationFinder('EMAIL_ADDRESS')!
    const emailAddressReg = new RegExp(emailAddress.pattern)
    const instructorPhoneNumber = validationFinder('PHONE_NUMBER')!

    const validationSchema = Yup.object({
        in: Yup.string()
            .required(instructorName.notBlankMsgEn)
            .matches(franchiseNameReg, instructorName.patternMsgEn),
        address: Yup.string()
            .required(address.notBlankMsgEn)
            .matches(addressReg, address.patternMsgEn),
        emailAddress: Yup.string()
            .required(emailAddress.notBlankMsgEn)
            .matches(emailAddressReg, emailAddress.patternMsgEn),
        instructorPhoneNumber: Yup.string().required(
            instructorPhoneNumber.notBlankMsgEn
        ),
        rankId: Yup.string().required('Please select belts'),
        description: Yup.string().required('Please enter description'),
        yearsOfExperience: Yup.string().required(
            'Please select years Of Experience'
        ),
        latestCertification: Yup.string().required(
            'Please add your latest Certificates'
        ),

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
    const handleonSubmit = (values: CreateInstructorInitialValues): void => {
        handleSubmit(values, selectedFiles)
        console.log('submitted button pressed')
    }
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

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
        return facilitiesName || 'Specilizations'
    }
    return (
        <CreateSchoolStyled>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleonSubmit}
            >
                {(formik) => {
                    console.log(formik.values)

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
                                                'placeholderInstructorName'
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

                                    <Col md="4" className="mt-20">
                                        <PlacesAutoCompleteInput
                                            label={getLabelByKey('address')}
                                            placeholder={getLabelByKey(
                                                'placeholderAddress'
                                            )}
                                            handleChange={(val: unknown) => {
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
                                                    control="input"
                                                    type="text"
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
                                            </Col>
                                            <Col md="4" className="mt-20">
                                                <FormControl
                                                    control="select"
                                                    type="text"
                                                    name="rankId"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    label={getLabelByKey(
                                                        'ranking'
                                                    )}
                                                    placeholder={getLabelByKey(
                                                        'PlaceholderRanking'
                                                    )}
                                                    options={
                                                        BELTS_SELECT_OPTIONS
                                                    }
                                                />
                                            </Col>
                                            <Col md="4" className="mt-20">
                                                <FormControl
                                                    control="file"
                                                    type="file"
                                                    name="latestCertification"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    label={getLabelByKey(
                                                        'latestCertification'
                                                    )}
                                                    src={FileSubmit}
                                                    // onChange={handleChange}
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
                                        </Row>
                                    </Col>
                                    <Col md="6">
                                        <CheckboxesSelect
                                            name="specializations"
                                            label={getLabelByKey(
                                                'specializations'
                                            )}
                                            list={facilities}
                                            showErrorMsgInList={false}
                                            placeholder={showFacilities(
                                                formik.values.specializations
                                            )}
                                        />
                                    </Col>

                                    <Col md="6">
                                        <CheckboxesSelect
                                            name="activities"
                                            label={getLabelByKey('activities')}
                                            list={activities}
                                            showErrorMsgInList={false}
                                            placeholder={showActivities(
                                                formik.values.activities
                                            )}
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
                                        <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                            <FormControl
                                                control="checkbox"
                                                type="checkbox"
                                                id="rememberMe"
                                                name="rememberMe"
                                            />
                                            <p
                                                className="ms-3 mb-0"
                                                id="termCondition"
                                            >
                                                Terms and conditions
                                            </p>
                                        </form>
                                    </label>
                                    <label htmlFor="agreement">
                                        <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                            <FormControl
                                                control="checkbox"
                                                type="checkbox"
                                                id="rememberMe"
                                                name="rememberMe"
                                            />
                                            <p
                                                className="ms-3 mb-0"
                                                id="agreement"
                                            >
                                                Agreement to follow the apps
                                                guidelines and policies
                                            </p>
                                        </form>
                                    </label>
                                    <label htmlFor="liability">
                                        <form className="mt-3 d-flex align-items-center justify-content-start column-gap-2">
                                            <FormControl
                                                control="checkbox"
                                                type="checkbox"
                                                id="rememberMe"
                                                name="rememberMe"
                                            />
                                            <p
                                                className="ms-3 mb-0"
                                                id="liability"
                                            >
                                                Liability waivers
                                            </p>
                                        </form>
                                    </label>
                                </Row>
                            </div>

                            <div className="mt-20 d-flex justify-content-end">
                                <CustomButton
                                    bgcolor={lightBlue3}
                                    textTransform="Captilize"
                                    color={maastrichtBlue}
                                    padding="11px 40.50px"
                                    margin="30px 0px"
                                    fontFamily={`${fontFamilyMedium}`}
                                    width="fit-content"
                                    type="submit"
                                    title={getLabelByKey('primaryButton')}
                                    fontSize="18px"
                                    loading={loading}
                                    clicked={() =>
                                        handleSubmit(
                                            formik.values,
                                            selectedFiles
                                        )
                                    }
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

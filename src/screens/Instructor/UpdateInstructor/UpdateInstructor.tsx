import { useEffect, useState } from 'react'

import { Formik } from 'formik'
import { Form } from 'antd'
import * as Yup from 'yup'

import { Col, Row } from 'react-bootstrap'
// import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { RootState } from '../../../redux/store'
import DateCalander from '../../../assets/images/dateCalander.svg'

import FormControl from '../../../components/FormControl'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark,
} from '../../../components/GlobalStyle'
import CustomPhoneInput from '../../../components/CustomPhoneInput/CustomPhoneInput'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { CreateSchoolStyled } from '../../CreateSchool/styles'
import { CreateInstructorInitialValues } from '../constant'
import CheckboxesSelect from '../../../components/CustomCheckbox/CheckboxesSelect'
import PlacesAutoCompleteInput from '../../../maps/PlacesAutocomplete'
import useInstructor from '../../../hooks/useInstructor'
import { useParams } from 'react-router-dom'
import { InstructorDataType } from '../../../redux/features/instructor/instructorSlice'
import {
    BELTS_SELECT_OPTIONS,
    SelectOptionsDataTypes,
} from '../../Home/constants'
import ImagesUpload from '../../../components/ImagesUpload/ImagesUpload'
import { DataTypesWithIdAndMultipleLangLabel } from '../../../redux/features/types'
import { validationFinder } from '../../../utils/utilities'

const UpdateeInstructor = (): JSX.Element => {
    const { instructorId } = useParams()
    const [selectedFiles, setSelectedFiless] = useState<FileList | null>(null)
    const [bannerImages, setBannerImages] = useState<File | null>(null)

    const { getLabelByKey } = useScreenTranslation('instructorUpdate')
    const { getLabelByKey: getLegalLabelByKey } = useScreenTranslation('legal')
    const {
        statusData: { activities, facilities },
    } = useSelector((state: RootState) => state.appData.data)
    const { loading, getInstructorbyid, updateInstructor, UpdateModal } =
        useInstructor()
    const [instructorData, setinstructorData] = useState<
        InstructorDataType | undefined
    >()

    const handleupdate = async (values: any): Promise<void> => {
        console.log('values', selectedFiles, bannerImages)
        await updateInstructor(
            Number(instructorId),
            values,
            selectedFiles,
            bannerImages
        )
    }
    const handleImagesUpload = (selectedFiless: any): void => {
        setSelectedFiless(selectedFiless)
        setBannerImages(selectedFiless)
    }

    useEffect(() => {
        console.log('this is edit instructor')
        const fetchstripe = async (): Promise<void> => {
            const data = await getInstructorbyid(Number(instructorId))
            setinstructorData(data)
        }
        fetchstripe()
    }, [])

    const initialValues: CreateInstructorInitialValues = {
        instructorName: instructorData?.instructorName || '--',
        emailAddress: instructorData?.emailAddress || '--',
        instructorPhoneNumber: instructorData
            ? instructorData?.phoneNumber
            : '--',
        address: instructorData ? instructorData.address : '--',
        yearsOfExperience: instructorData?.experience || '--',
        rankId: Number(instructorData?.rankId) || 0, // or a default value
        latestCertification: instructorData?.certificationURL
            ? 'uploaded'
            : '--',
        description: instructorData ? instructorData.description : '--',
        activities: instructorData
            ? instructorData?.activities?.split(',').map(String)
            : [],
        specializations: instructorData
            ? instructorData?.specializations?.split(',').map(String)
            : [],
        termCondition: '',
        ranking: Number(instructorData?.rankId) > 0 ? 1 : 2,
    }
    const instructorName = validationFinder('BUSINESS_NAME')!
    const franchiseNameReg = new RegExp(instructorName.pattern)
    const address = validationFinder('ADDRESS')!
    const addressReg = new RegExp(address.pattern)
    const emailAddress = validationFinder('EMAIL_ADDRESS')!
    const emailAddressReg = new RegExp(emailAddress.pattern)
    const instructorPhoneNumber = validationFinder('PHONE_NUMBER')!

    const validationSchemas = Yup.object({
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
        // latestCertification: Yup.mixed().test(
        //     'fileType',
        //     'Unsupported File Format',
        //     function (value) {
        //         if (value) {
        //             const allowedTypes = [
        //                 'image/jpeg',
        //                 'image/png',
        //                 'image/webp',
        //                 'image/jpg',
        //                 'image/bmp',
        //                 'image/tiff',
        //             ]
        //             const isAllowedType = allowedTypes.includes(value.type)

        //             return isAllowedType
        //         }
        //         return true
        //     }
        // ),
        rankId: Yup.string().required('Please select belts'),
        description: Yup.string().required('Please enter description'),
        yearsOfExperience: Yup.string().required(
            'Please select years Of Experience'
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
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const showActivities = (_activities: string[]): string => {
        console.log('_activities', _activities)

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
        return activitiesName || getLabelByKey('activitiesPlaceholder')
    }
    const {
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
    const showFacilities = (_facilities: string[]): string => {
        let facilitiesName = ''
        _facilities?.map((facility) => {
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
        return facilitiesName || getLabelByKey('specializationsPlaceholder')
    }
    return (
        <>
            {UpdateModal().modalComponent}
            <CreateSchoolStyled>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchemas}
                    onSubmit={handleupdate}
                    enableReinitialize
                >
                    {(formik) => {
                        console.log('initial val', initialValues)
                        console.log('formmik val', formik.values)

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
                                                className={
                                                    formik.errors
                                                        .instructorName &&
                                                    formik.touched
                                                        .instructorName
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                                placeholder={getLabelByKey(
                                                    'instructorNamePlaceholder'
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
                                                    'emailAddressPlaceholder'
                                                )}
                                                value={String(
                                                    formik.values.emailAddress
                                                )}
                                            />
                                        </Col>
                                        <Col md="4" className="mt-20">
                                            <CustomPhoneInput
                                                label={getLabelByKey(
                                                    'instructorMobileNumber'
                                                )}
                                                name="instructorMobileNumber"
                                                value={String(
                                                    formik.values
                                                        .instructorPhoneNumber
                                                )}
                                                placeholder={getLabelByKey(
                                                    'instructorMobileNumber'
                                                )}
                                                limitMaxLength={true}
                                                handleOnChange={(e: string) => {
                                                    formik.setFieldValue(
                                                        'franchisePhoneNumber',
                                                        e
                                                    )
                                                }}
                                            />
                                        </Col>

                                        <Col md="4" className="mt-20">
                                            <PlacesAutoCompleteInput
                                                label={getLabelByKey(
                                                    'completeAddress'
                                                )}
                                                placeholder={getLabelByKey(
                                                    'completeAddressPlaceholder'
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
                                        <Col md="8">
                                            <Row>
                                                <Col md="4" className="mt-20">
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
                                                        defaultValue={
                                                            instructorId
                                                                ? createOptions(
                                                                      adult
                                                                  ).find(
                                                                      (item) =>
                                                                          item.value ===
                                                                          initialValues.rankId
                                                                  )?.value
                                                                : undefined
                                                        }
                                                    />
                                                </Col>
                                                <Col md="4" className="mt-20">
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
                                                </Col>
                                                <Col md="4" className="mt-20">
                                                    <FormControl
                                                        control="file"
                                                        type="file"
                                                        name="latestCertification"
                                                        fontFamily={
                                                            fontFamilyRegular
                                                        }
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
                                                        // src={FileSubmit}
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
                                                            'latestCertificationPlaceholder'
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
                                                placeholder={
                                                    formik.values
                                                        .specializations
                                                        .length > 0
                                                        ? showFacilities(
                                                              formik.values
                                                                  .specializations
                                                          )
                                                        : getLabelByKey(
                                                              'specializationsPlaceholder'
                                                          )
                                                }
                                            />
                                        </Col>

                                        <Col md="6">
                                            <CheckboxesSelect
                                                name="activities"
                                                label="Activities"
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
                                                    'biographyOrIntroductionPlace'
                                                )}
                                                height="200px"
                                            />
                                        </div>
                                        <label htmlFor="termCondition">
                                            <form className="mt-10 d-flex align-items-center justify-content-start column-gap-2">
                                                <FormControl
                                                    control="checkbox"
                                                    type="checkbox"
                                                    id="AgreementGuidelines"
                                                    name="AgreementGuidelines"
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
                                                    id="AgreementGuidelines"
                                                    name="AgreementGuidelines"
                                                />
                                                <p
                                                    className="ms-2 mb-0"
                                                    id="liability"
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
                                        textTransform="Captilize"
                                        color={pureDark}
                                        padding="11px 40.50px"
                                        margin="30px 0px"
                                        fontFamily={`${fontFamilyMedium}`}
                                        width="fit-content"
                                        type="submit"
                                        title={getLabelByKey('primaryButton')}
                                        fontSize="18px"
                                        loading={loading}
                                        // clicked={() => {
                                        //     updateInstructor
                                        // }}
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

export default UpdateeInstructor

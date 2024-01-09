import { useEffect, useState } from 'react'

import { Field, Formik } from 'formik'
import { Form } from 'antd'

import { Col, Row } from 'react-bootstrap'
// import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { RootState } from '../../../redux/store'

import FormControl from '../../../components/FormControl'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark,
    pureDark2,
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
import { BELTS_SELECT_OPTIONS } from '../../Home/constants'
import ImagesUpload from '../../../components/ImagesUpload/ImagesUpload'

const UpdateeInstructor = (): JSX.Element => {
    const { instructorId } = useParams()
    const [selectedFiles, setSelectedFiless] = useState<FileList | null>(null)

    const { getLabelByKey } = useScreenTranslation('instructorCreate')
    const {
        statusData: { activities, facilities },
    } = useSelector((state: RootState) => state.appData.data)
    const { loading, getInstructorbyid, updateInstructor, UpdateModal } =
        useInstructor()
    const [instructorData, setinstructorData] = useState<
        InstructorDataType | undefined
    >()

    const handleupdate = async (values: any): Promise<void> => {
        await updateInstructor(Number(instructorId), values, selectedFiles)
    }
    const handleImagesUpload = (selectedFiless: any): void => {
        setSelectedFiless(selectedFiless)
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
        emailAddress: '--',
        instructorPhoneNumber: instructorData
            ? instructorData?.phoneNumber
            : '--',
        address: instructorData ? instructorData.emailAddress : '--',
        yearsOfExperience: instructorData?.experience || '--',
        rankId: Number(instructorData?.rankId) || 0, // or a default value
        latestCertification: instructorData?.certificationURL || '--',
        description: instructorData ? instructorData.description : '--',
        activities: instructorData
            ? String(instructorData?.activities)
                  .split('')
                  .map(String)
            : [],
        specializations: instructorData
            ? String(instructorData?.specializations)
                  .split('')
                  .map(String)
            : [],
        termCondition: '',
    }

    // const franchiseName = validationFinder('BUSINESS_NAME')!
    // const franchiseNameReg = new RegExp(franchiseName.pattern)
    // const address = validationFinder('ADDRESS')!
    // const addressReg = new RegExp(address.pattern)
    // const emailAddress = validationFinder('EMAIL_ADDRESS')!
    // const emailAddressReg = new RegExp(emailAddress.pattern)

    // const franchisePhoneNumber = validationFinder('PHONE_NUMBER')!

    // const validationSchema = Yup.object({
    //     franchiseName: Yup.string()
    //         .required(franchiseName.notBlankMsgEn)
    //         .matches(franchiseNameReg, franchiseName.patternMsgEn),
    //     // address: Yup.string()
    //     //   .required(address.notBlankMsgEn)
    //     //   .matches(addressReg, address.patternMsgEn),
    //     emailAddress: Yup.string()
    //         .required(emailAddress.notBlankMsgEn)
    //         .matches(emailAddressReg, emailAddress.patternMsgEn),
    //     franchisePhoneNumber: Yup.string().required(
    //         franchisePhoneNumber.notBlankMsgEn
    //     ),
    //     rankId: Yup.string().required('Please select belts'),
    //     description: Yup.string().required('Please enter description'),
    //     defaultLanguage: Yup.string().required(
    //         'Please select default language'
    //     ),
    //     defaultCurrency: Yup.string().required(
    //         'Please select default currency'
    //     ),
    //     activities: Yup.array()
    //         .of(Yup.string().required('Select an activity'))
    //         .min(1, 'Select at least one activity'),
    //     specializations: Yup.array()
    //         .of(Yup.string().required('Select an activity'))
    //         .min(1, 'Select at least one facility'),
    // })

    return (
        <>
            {UpdateModal().modalComponent}
            <CreateSchoolStyled>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
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
                                    <h3 style={{ color: pureDark2 }}>
                                        Instructor Information
                                    </h3>
                                    <Row>
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="instructorName"
                                                label="Instructor Name"
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
                                                placeholder="Instructor Name"
                                            />
                                        </Col>
                                        <Col md="4" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="email"
                                                name="emailAddress"
                                                fontFamily={fontFamilyRegular}
                                                label="Email Address"
                                                padding="10px"
                                                placeholder="Email address"
                                            />
                                        </Col>
                                        <Col md="4" className="mt-20">
                                            <CustomPhoneInput
                                                label="Instructor Phone Number"
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
                                                        'franchisePhoneNumber',
                                                        e
                                                    )
                                                }}
                                            />
                                        </Col>

                                        <Col md="4" className="mt-20">
                                            <PlacesAutoCompleteInput
                                                label={getLabelByKey('address')}
                                                placeholder={getLabelByKey(
                                                    'enterCompleteAddress'
                                                )}
                                                handleChange={(
                                                    val: unknown
                                                ) => {
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
                                            <Col
                                                md="4"
                                                className="mt-20 d-inline-block"
                                            >
                                                <FormControl
                                                    control="input"
                                                    type="number"
                                                    name="experience"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    label="Years Of Experience"
                                                    padding="10px"
                                                    placeholder="Years Of Experience"
                                                />
                                            </Col>
                                            <Col
                                                md="4"
                                                className="mt-20 d-inline-block ps-3"
                                            >
                                                <FormControl
                                                    control="select"
                                                    type="text"
                                                    name="rankId"
                                                    fontFamily={
                                                        fontFamilyRegular
                                                    }
                                                    label={'Ranking'}
                                                    value={
                                                        formik.values.rankId ===
                                                        1
                                                            ? 'Yes'
                                                            : 'No'
                                                    }
                                                    padding="10px"
                                                    placeholder={'Rankings'}
                                                    className={
                                                        formik.errors.rankId &&
                                                        formik.touched.rankId
                                                            ? 'is-invalid'
                                                            : 'customInput'
                                                    }
                                                    options={
                                                        BELTS_SELECT_OPTIONS
                                                    }
                                                    // defaultValue={
                                                    //   // formik.values.rank === 1 ? "Yes" : "No"
                                                    //   formik.values
                                                    //     ? BELTS_SELECT_OPTIONS.find(
                                                    //         (item) => item.value === formik.values.rankId
                                                    //       )?.label
                                                    //     : undefined
                                                    // }
                                                />
                                            </Col>
                                            <Col
                                                md="4"
                                                className="mt-20 d-inline-block ps-3"
                                            >
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
                                                        'PlaceholderLatestCertification'
                                                    )}
                                                />
                                            </Col>
                                        </Col>

                                        <Col md="6">
                                            <CheckboxesSelect
                                                name="specializations"
                                                label="Specializations"
                                                list={facilities}
                                                showErrorMsgInList={false}
                                            />
                                        </Col>

                                        <Col md="6">
                                            <CheckboxesSelect
                                                name="activities"
                                                label="Activities"
                                                list={activities}
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
                                                    'description'
                                                )}
                                                height="200px"
                                            />
                                        </div>
                                        <label htmlFor="termCondition">
                                            <form className="mt-3 d-flex align-content-start justify-content-start">
                                                <Field
                                                    control="checkbox"
                                                    type="checkbox"
                                                    name="termCondition"
                                                    id="termCondition"
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
                                            <form className="mt-2 d-flex align-content-start justify-content-start">
                                                <Field
                                                    control="checkbox"
                                                    type="checkbox"
                                                    name="agreement"
                                                    id="agreement"
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
                                            <form className="mt-2 d-flex align-content-start justify-content-start">
                                                <Field
                                                    control="checkbox"
                                                    type="checkbox"
                                                    name="liability"
                                                    id="liability"
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
                                        color={pureDark}
                                        padding="12px 100px"
                                        margin="30px 0px"
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

export default UpdateeInstructor

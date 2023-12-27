import { FC, Fragment, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import FormControl from '../../../../components/FormControl'
import { EditPopUpStying } from './EditPopUpStying'
import {
    fontFamilyMedium,
    lightBlue3,
    pureDark2,
} from '../../../../components/GlobalStyle'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import CustomModal from '../../../../components/Modal/CustomModal'
import { Form, Formik, FormikHelpers } from 'formik'
import Input from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import dateIcon from '../../../../assets/images/dateCalander.svg'

type initialTypesSettings = {
    firstName: string
    lastName: string
    phoneNumber: string
    password: string
    confirmPassword: string
    username: string
    emailAddress: string
    address: string
}

const PersonalDetails: FC<{}> = () => {
    const initialValues: initialTypesSettings = {
        firstName: '',
        lastName: '',
        phoneNumber: '0',
        password: '',
        confirmPassword: '',
        username: '',
        emailAddress: '',
        address: '',
    }

    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

    useEffect(() => {
        const countrySelect = document.querySelector(
            '.PhoneInput .PhoneInputCountry'
        )
        const phoneNumberInput = document.querySelector('.PhoneInput input')

        if (countrySelect) {
            if (selectedLanguage === 'ur' || selectedLanguage === 'ar') {
                countrySelect.classList.remove(
                    'country-left-to-right-border-radius'
                )
                countrySelect.classList.add(
                    'country-right-to-left-border-radius'
                )
            } else {
                countrySelect.classList.add(
                    'country-left-to-right-border-radius'
                )
                countrySelect.classList.remove(
                    'country-right-to-left-border-radius'
                )
            }
        }
        if (phoneNumberInput) {
            if (selectedLanguage === 'ur' || selectedLanguage === 'ar') {
                phoneNumberInput.classList.add(
                    'phone-number-right-to-left-border-radius'
                )
                phoneNumberInput.classList.remove(
                    'phone-number-left-to-right-border-radius'
                )
            } else {
                phoneNumberInput.classList.add(
                    'phone-number-left-to-right-border-radius'
                )
                phoneNumberInput.classList.remove(
                    'phone-number-right-to-left-border-radius'
                )
            }
        }
    }, [selectedLanguage])

    const [isLanguageModalVisible, setIsLanguageModelVisible] = useState(true)
    const [isPhoneNumberModalVisible, setIsPhoneNumberModelVisible] =
        useState(false)
    const handleSubmit = (
        values: initialTypesSettings,
        { setSubmitting }: FormikHelpers<initialTypesSettings>
    ) => {
        setSubmitting(false)
    }

    return (
        <Fragment>
            <div className="panel-heading">
                <h3>Personal Details</h3>
                <p>Coming Soon</p>
            </div>
            <div>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading">Coming Soon</h4>
                    </Col>
                    <Col md="8">
                        <p className="m-0 panel-body-text">Coming Soon</p>
                    </Col>
                    <Col md="2" className="text-end">
                        <span
                            onClick={() => setIsLanguageModelVisible(true)}
                            className="panel-body-link"
                        >
                            Coming Soon
                        </span>
                    </Col>
                </Row>
            </div>

            {/* Update Name */}

            {/* <CustomModal
                width="485px"
                showCloseBtn={false}
                children={
                    <>
                        <EditPopUpStying>
                            <h3>Update Name</h3>
                            <p>Update your information and find out how it's used.</p>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form
                                            name="basic"
                                            autoComplete="off"
                                        >
                                            <div className="mt-20">
                                                <FormControl
                                                    control="input"
                                                    type="text"
                                                    name="firstName"
                                                    label="First Name"
                                                    fontSize="16px"
                                                    border="none"
                                                    placeholder="First Name"
                                                    // prefix={
                                                    //   <img src={profile_icon} alt="profile_icon" />
                                                    // }
                                                    labelFamily={fontFamilyMedium}
                                                    className={
                                                        formik.errors.firstName &&
                                                            formik.touched.firstName
                                                            ? "is-invalid"
                                                            : "customInput"
                                                    }
                                                />
                                            </div>
                                            <div className="mt-20">
                                                <FormControl
                                                    control="input"
                                                    type="text"
                                                    name="lastName"
                                                    fontSize="16px"
                                                    label="Last Name"
                                                    border="none"
                                                    labelFamily={fontFamilyMedium}
                                                    // prefix={
                                                    //   <img src={profile_icon} alt="profile_icon" />
                                                    // }
                                                    placeholder="Last Name"
                                                    className={
                                                        formik.errors.lastName &&
                                                            formik.touched.lastName
                                                            ? "is-invalid"
                                                            : "customInput"
                                                    }
                                                />
                                            </div>
                                            <div className="mt-20">
                                                <CustomButton
                                                    bgcolor={lightBlue3}
                                                    textTransform="Captilize"
                                                    color={pureDark2}
                                                    padding="12.5px"
                                                    fontFamily={fontFamilyMedium}
                                                    width="100%"
                                                    type="submit"
                                                    title="Save"
                                                    fontSize="16px"
                                                    loading={false}
                                                />
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </EditPopUpStying>
                    </>
                } isModalVisible={isLanguageModalVisible} setIsModalVisible={setIsLanguageModelVisible} /> */}

            {/* Update UserName */}

            {/* <CustomModal
                width="485px"
                showCloseBtn={false}
                children={
                    <>
                        <EditPopUpStying>
                            <h3>Update Username</h3>
                            <p>Update your information and find out how it's used.</p>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form
                                            name="basic"
                                            autoComplete="off"
                                        >
                                            <div className="mt-20">
                                                <FormControl
                                                    control="input"
                                                    type="text"
                                                    name="username"
                                                    label="Username"
                                                    fontSize="16px"
                                                    border="none"
                                                    placeholder="Username"
                                                    // prefix={
                                                    //   <img src={profile_icon} alt="profile_icon" />
                                                    // }
                                                    labelFamily={fontFamilyMedium}
                                                    className={
                                                        formik.errors.username &&
                                                            formik.touched.username
                                                            ? "is-invalid"
                                                            : "customInput"
                                                    }
                                                />
                                            </div>
                                            <div className="mt-20">
                                                <CustomButton
                                                    bgcolor={lightBlue3}
                                                    textTransform="Captilize"
                                                    color={pureDark2}
                                                    padding="12.5px"
                                                    fontFamily={fontFamilyMedium}
                                                    width="100%"
                                                    type="submit"
                                                    title="Save"
                                                    fontSize="16px"
                                                    loading={false}
                                                />
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </EditPopUpStying>
                    </>
                } isModalVisible={isLanguageModalVisible} setIsModalVisible={setIsLanguageModelVisible} /> */}

            {/* Update Email */}

            {/* <CustomModal
                width="485px"
                showCloseBtn={false}
                children={
                    <>
                        <EditPopUpStying>
                            <h3>Update Email</h3>
                            <p>Update your information and find out how it's used.</p>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form
                                            name="basic"
                                            autoComplete="off"
                                        >
                                            <div className="mt-20">
                                                <FormControl
                                                    control="input"
                                                    type="text"
                                                    name="email"
                                                    label="Email"
                                                    fontSize="16px"
                                                    border="none"
                                                    placeholder="abc@gmail.com"
                                                    // prefix={
                                                    //   <img src={profile_icon} alt="profile_icon" />
                                                    // }
                                                    labelFamily={fontFamilyMedium}
                                                    className={
                                                        formik.errors.emailAddress &&
                                                            formik.touched.emailAddress
                                                            ? "is-invalid"
                                                            : "customInput"
                                                    }
                                                />
                                            </div>
                                            <p className="text-start mt-10">We'll send a verification link to your new email address. Please check your inbox.</p>
                                            <div className="mt-20">
                                                <CustomButton
                                                    bgcolor={lightBlue3}
                                                    textTransform="Captilize"
                                                    color={pureDark2}
                                                    padding="12.5px"
                                                    fontFamily={fontFamilyMedium}
                                                    width="100%"
                                                    type="submit"
                                                    title="Save"
                                                    fontSize="16px"
                                                    loading={false}
                                                />
                                            </div>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </EditPopUpStying>
                    </>
                } isModalVisible={isLanguageModalVisible} setIsModalVisible={setIsLanguageModelVisible} /> */}

            {/* Update Email */}

            <CustomModal
                width="485px"
                showCloseBtn={false}
                children={
                    <>
                        <EditPopUpStying>
                            <h3>Update Phone</h3>
                            <p>
                                Update your information and find out how it's
                                used.
                            </p>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form name="basic" autoComplete="off">
                                            <div className="mt-10">
                                                <label
                                                    htmlFor="phoneNumber"
                                                    className="custom-phone-input-label"
                                                >
                                                    Phone
                                                </label>
                                                <Input
                                                    defaultCountry="GB"
                                                    international
                                                    placeholder="+44"
                                                    value={
                                                        formik.values
                                                            .phoneNumber
                                                    }
                                                    onChange={(e: string) => {
                                                        formik.setValues({
                                                            ...formik.values,
                                                            phoneNumber: e,
                                                        })
                                                    }}
                                                    withCountryCallingCode
                                                    countryCallingCodeEditable
                                                />
                                                {/* <div className="mt-1">
                                                    <ErrorMessage
                                                        name="phoneNumber"
                                                        component={Errormsg}
                                                    />
                                                </div> */}
                                            </div>

                                            <div className="mt-20">
                                                <CustomButton
                                                    bgcolor={lightBlue3}
                                                    textTransform="Captilize"
                                                    color={pureDark2}
                                                    padding="12.5px"
                                                    fontFamily={
                                                        fontFamilyMedium
                                                    }
                                                    width="100%"
                                                    type="submit"
                                                    title="Save"
                                                    fontSize="16px"
                                                    loading={false}
                                                />
                                            </div>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </EditPopUpStying>
                    </>
                }
                isModalVisible={isPhoneNumberModalVisible}
                setIsModalVisible={setIsPhoneNumberModelVisible}
            />

            {/* Update Nationality */}

            {/* <CustomModal
                width="485px"
                showCloseBtn={false}
                children={
                    <>
                        <EditPopUpStying>
                            <h3>Update Nationality</h3>
                            <p>Update your information and find out how it's used.</p>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form
                                            name="basic"
                                            autoComplete="off"
                                        >
                                            <Row>
                                                <Col md="12" className="mt-10">
                                                    <FormControl
                                                        control="select"
                                                        type="select"
                                                        name="countryName"
                                                        labelFamily={`${fontFamilyMedium}`}
                                                        label="Nationality"
                                                        fontSize="16px"
                                                        max={6}
                                                        placeholder="Pakistan"
                                                    />
                                                </Col>
                                                <Col md="12" className="mt-20">
                                                    <CustomButton
                                                        bgcolor={lightBlue3}
                                                        textTransform="Captilize"
                                                        color={pureDark2}
                                                        padding="12.5px"
                                                        fontFamily={fontFamilyMedium}
                                                        width="100%"
                                                        type="submit"
                                                        title="Save"
                                                        fontSize="16px"
                                                        loading={false}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </EditPopUpStying>
                    </>
                } isModalVisible={isLanguageModalVisible} setIsModalVisible={setIsLanguageModelVisible} /> */}

            {/* Update Gender */}

            {/* <CustomModal
                width="485px"
                showCloseBtn={false}
                children={
                    <>
                        <EditPopUpStying>
                            <h3>Update Gender</h3>
                            <p>Update your information and find out how it's used.</p>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form
                                            name="basic"
                                            autoComplete="off"
                                        >
                                            <Row>
                                                <Col md="12" className="mt-10">
                                                    <FormControl
                                                        control="select"
                                                        type="select"
                                                        name="countryName"
                                                        labelFamily={`${fontFamilyMedium}`}
                                                        label="Gender"
                                                        fontSize="16px"
                                                        max={6}
                                                        placeholder="Male"
                                                    />
                                                </Col>
                                                <Col md="12" className="mt-20">
                                                    <CustomButton
                                                        bgcolor={lightBlue3}
                                                        textTransform="Captilize"
                                                        color={pureDark2}
                                                        padding="12.5px"
                                                        fontFamily={fontFamilyMedium}
                                                        width="100%"
                                                        type="submit"
                                                        title="Save"
                                                        fontSize="16px"
                                                        loading={false}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </EditPopUpStying>
                    </>
                } isModalVisible={isLanguageModalVisible} setIsModalVisible={setIsLanguageModelVisible} /> */}

            {/* Update Address */}

            {/* <CustomModal
                width="485px"
                showCloseBtn={false}
                children={
                    <>
                        <EditPopUpStying>
                            <h3>Update Address</h3>
                            <p>Update your information and find out how it's used.</p>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form
                                            name="basic"
                                            autoComplete="off"
                                        >
                                            <Row>
                                                <Col md="12" className="mt-10">
                                                    <PlacesAutoCompleteInput
                                                        label="Address"
                                                        placeholder="Address"
                                                        handleChange={(val: any) => {
                                                            formik.setFieldValue("address", val);
                                                        }}
                                                        className={
                                                            formik.errors.address && formik.touched.address
                                                                ? "is-invalid"
                                                                : "customInput"
                                                        }
                                                        formik={formik}
                                                        name="address"
                                                        value={formik.values.address}
                                                    />
                                                </Col>
                                                <Col md="12" className="mt-20">
                                                    <CustomButton
                                                        bgcolor={lightBlue3}
                                                        textTransform="Captilize"
                                                        color={pureDark2}
                                                        padding="12.5px"
                                                        fontFamily={fontFamilyMedium}
                                                        width="100%"
                                                        type="submit"
                                                        title="Save"
                                                        fontSize="16px"
                                                        loading={false}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </EditPopUpStying>
                    </>
                } isModalVisible={isLanguageModalVisible} setIsModalVisible={setIsLanguageModelVisible} /> */}

            {/* Update Date Of Birth */}

            <CustomModal
                width="485px"
                showCloseBtn={false}
                children={
                    <>
                        <EditPopUpStying>
                            <h3>Update Date of Birth</h3>
                            <p>
                                Update your information and find out how it's
                                used.
                            </p>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form name="basic" autoComplete="off">
                                            <Row>
                                                <Col md="12" className="mt-10">
                                                    <FormControl
                                                        control="date"
                                                        type="date"
                                                        name="countryName"
                                                        labelFamily={`${fontFamilyMedium}`}
                                                        label="Date of birth"
                                                        fontSize="16px"
                                                        suffixIcon={
                                                            <img
                                                                src={
                                                                    dateIcon as string
                                                                }
                                                                alt="calender-icon"
                                                            />
                                                        }
                                                        max={6}
                                                        placeholder="12-05-1989"
                                                    />
                                                </Col>
                                                <Col md="12" className="mt-20">
                                                    <CustomButton
                                                        bgcolor={lightBlue3}
                                                        textTransform="Captilize"
                                                        color={pureDark2}
                                                        padding="12.5px"
                                                        fontFamily={
                                                            fontFamilyMedium
                                                        }
                                                        width="100%"
                                                        type="submit"
                                                        title="Save"
                                                        fontSize="16px"
                                                        loading={false}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </EditPopUpStying>
                    </>
                }
                isModalVisible={isLanguageModalVisible}
                setIsModalVisible={setIsLanguageModelVisible}
            />
        </Fragment>
    )
}
export default PersonalDetails

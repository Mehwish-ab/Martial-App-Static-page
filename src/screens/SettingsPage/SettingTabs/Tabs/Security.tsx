import { Fragment, useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import CustomModal from '../../../../components/Modal/CustomModal'
import { EditPopupStyling } from './EditPopUpStyling'
import FormControl from '../../../../components/FormControl'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    lightBlue3,
    lightColor1,
    pureDark2,
} from '../../../../components/GlobalStyle'
import { Form, Formik, FormikHelpers } from 'formik'

import Input from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

type initialTypesSettings = {
    firstName: string
    lastName: string
    phoneNumber: string
    password: string
    confirmPassword: string
}

const Security = (): JSX.Element => {
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

    const initialValues: initialTypesSettings = {
        firstName: '',
        lastName: '',
        phoneNumber: '0',
        password: '',
        confirmPassword: '',
    }
    const [isResetModalVisible, setIsResetModelVisible] = useState(false)
    const [isAuthenticationModalVisible, setAuthenticationModelVisible] =
        useState(false)
    const [isDeleteModalVisible, setIsDeleteModelVisible] = useState(false)

    const handleSubmit = (
        values: initialTypesSettings,
        { setSubmitting }: FormikHelpers<initialTypesSettings>
    ): void => {
        setSubmitting(false)
    }

    return (
        <Fragment>
            <div className="panel-heading">
                <h3>Security</h3>
                <p>
                    Adjust your security settings and set up two-factor
                    authentication.
                </p>
            </div>
            <div>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading">Password</h4>
                    </Col>
                    <Col md="8">
                        <p className="m-0 panel-body-text">
                            Reset your password regularly to keep your account
                            secure
                        </p>
                    </Col>
                    <Col md="2" className="text-end">
                        <span
                            onClick={() => setIsResetModelVisible(true)}
                            className="panel-body-link"
                        >
                            Reset
                        </span>
                    </Col>
                </Row>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading">
                            Two-factor authentication
                        </h4>
                    </Col>
                    <Col md="8">
                        <p className="m-0 panel-body-text">
                            Add a phone number to set up two-factor
                            authentication
                        </p>
                    </Col>
                    <Col md="2" className="text-end">
                        <span
                            onClick={() => setAuthenticationModelVisible(true)}
                            className="panel-body-link"
                        >
                            Set Up
                        </span>
                    </Col>
                </Row>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading">
                            Active sessions
                        </h4>
                    </Col>
                    <Col md="8">
                        <p className="m-0 panel-body-text">
                            Selecting ‘Sign out’ will sign you out from all
                            devices except this one. The process can take up to
                            10 minutes.
                        </p>
                    </Col>
                    <Col md="2" className="text-end">
                        <span className="panel-body-link">Sign out</span>
                    </Col>
                </Row>
                <Row className="panel-body">
                    <Col md="2">
                        <h4 className="m-0 panel-body-heading">
                            Delete account
                        </h4>
                    </Col>
                    <Col md="8">
                        <p className="m-0 panel-body-text">
                            Permanently delete your Booking.com account
                        </p>
                    </Col>
                    <Col md="2" className="text-end">
                        <span
                            onClick={() => setIsDeleteModelVisible(true)}
                            className="panel-body-link text-danger "
                        >
                            Delete Account
                        </span>
                    </Col>
                </Row>
            </div>
            {/* Reset Password Model */}
            <CustomModal
                width="485px"
                showCloseBtn={false}
                isModalVisible={isResetModalVisible}
                setIsModalVisible={setIsResetModelVisible}
            >
                <>
                    <EditPopupStyling>
                        <h3>Reset Password</h3>
                        <p>
                            Your new password must be different from previous
                            used passwords.
                        </p>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            {(formik) => {
                                return (
                                    <Form name="basic" autoComplete="off">
                                        <div className="mt-20">
                                            <FormControl
                                                control="password"
                                                type="text"
                                                name="currentPassword"
                                                label="Current Password"
                                                fontFamily={fontFamilyMedium}
                                                max={6}
                                                placeholder="Enter Password"
                                                className={
                                                    formik.errors &&
                                                    formik.touched
                                                        ? 'customPasswordInput'
                                                        : 'is-invalid'
                                                }
                                            />
                                        </div>
                                        <div className="createUserPassword">
                                            <div className="mt-20">
                                                <FormControl
                                                    control="password"
                                                    type="text"
                                                    name="newpassword"
                                                    label="New Password"
                                                    fontFamily={
                                                        fontFamilyMedium
                                                    }
                                                    max={6}
                                                    placeholder="Enter New Password"
                                                    className={
                                                        formik.errors &&
                                                        formik.touched
                                                            ? 'customPasswordInput'
                                                            : 'is-invalid'
                                                    }
                                                />
                                            </div>
                                            <div className="mt-20">
                                                <FormControl
                                                    control="password"
                                                    type="text"
                                                    name="confirmPassword"
                                                    fontFamily={
                                                        fontFamilyMedium
                                                    }
                                                    border="none"
                                                    label="Confirm Password"
                                                    // placeholder={getLabelByKey(
                                                    //   SCREEN_LABEL_KEYS.confrimPasscodeFieldPlaceholder
                                                    // )}
                                                    placeholder="Enter Confirm Password"
                                                    className={
                                                        formik.errors &&
                                                        formik.touched
                                                            ? 'customPasswordInput'
                                                            : 'is-invalid'
                                                    }
                                                />
                                            </div>
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
                                                title="Reset"
                                                fontSize="16px"
                                                loading={false}
                                            />
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </EditPopupStyling>
                </>
            </CustomModal>

            {/* Authentication Password Model */}
            <CustomModal
                width="485px"
                showCloseBtn={false}
                isModalVisible={isAuthenticationModalVisible}
                setIsModalVisible={setAuthenticationModelVisible}
            >
                <>
                    <EditPopupStyling>
                        <h3>Two-factor authentication</h3>
                        <p>
                            Update your information and find out how it&apos;s
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
                                                placeholder="44"
                                                value={
                                                    formik.values.phoneNumber
                                                }
                                                onChange={(e: any) => {
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

                                        <p className="text-start mt-10">
                                            To set up two-factor authentication,
                                            we’ll send a 6-digit code to this
                                            number. You’ll be asked to enter it
                                            at the next step.
                                        </p>
                                        <CustomButton
                                            bgcolor={lightBlue3}
                                            textTransform="Captilize"
                                            color={pureDark2}
                                            padding="12.5px"
                                            fontFamily={fontFamilyMedium}
                                            width="100%"
                                            type="submit"
                                            title="Set Up"
                                            fontSize="16px"
                                            loading={false}
                                        />
                                    </Form>
                                )
                            }}
                        </Formik>
                    </EditPopupStyling>
                </>
            </CustomModal>

            {/* Authentication Password Model */}
            <CustomModal
                width="485px"
                showCloseBtn={false}
                isModalVisible={isDeleteModalVisible}
                setIsModalVisible={setIsDeleteModelVisible}
            >
                <>
                    <EditPopupStyling>
                        <h3>Want to Delete Account</h3>
                        <p>
                            Before proceeding with the removal of a student
                            account, please be aware that once the removal is
                            confirmed, all access will be permanently revoked.
                            If the user still holds an active membership, the
                            account cannot be removed until the membership is
                            completed or canceled.
                        </p>
                        <Row>
                            <Col md="6">
                                <CustomButton
                                    bgcolor={lightColor1}
                                    textTransform="Captilize"
                                    color={pureDark2}
                                    padding="10px 12.5px"
                                    fontFamily={fontFamilyMedium}
                                    width="100%"
                                    type="button"
                                    title="Cancel"
                                    fontSize="16px"
                                    loading={false}
                                />
                            </Col>
                            <Col md="6">
                                <CustomButton
                                    bgcolor={lightBlue3}
                                    textTransform="Captilize"
                                    color={pureDark2}
                                    padding="10px 12.5px"
                                    fontFamily={fontFamilyMedium}
                                    width="100%"
                                    type="submit"
                                    title="Save"
                                    fontSize="16px"
                                    loading={false}
                                />
                            </Col>
                        </Row>
                    </EditPopupStyling>
                </>
            </CustomModal>
        </Fragment>
    )
}
export default Security

import CustomButton from '../../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    maastrichtBlue,
} from '../../../components/GlobalStyle'
import { Form } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import { CreateSchoolStyled } from '../../CreateSchool/styles'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { Col, Row } from 'react-bootstrap'
import { SCREEN_LABEL_KEYS } from './constant'
import FormControl from '../../../components/FormControl'
import { useAppSelector } from '../../../app/hooks'
import { useState } from 'react'
import axios from 'axios'
import { signup_url } from '../../../utils/api_urls'
import { toast } from 'react-toastify'
import MessageModal from '../../../components/Common/MessageModal/MessageModal'
import { useNavigate } from 'react-router-dom'
import CustomPhoneInput from '../../../components/CustomPhoneInput/CustomPhoneInput'
import * as Yup from 'yup'
import { validationFinder } from '../../../utils/utilities'
import useUser from '../../../hooks/useUser'

type initialValuesType = {
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    password: string
    confirmPassword?: string
}

const CreateUser = (): JSX.Element => {
    const initialValues: initialValuesType = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    }
    const { getLabelByKey } = useScreenTranslation('registerScreen')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleCreateSubmit = (): void => {}
    const { result: userLocation } = useAppSelector(
        (state) => state.userLocation
    )
    const {
        countryName: {
            results: { countryCode, name },
        },
    } = useAppSelector((state) => state.appData.data)
    const firstName = validationFinder('USER_FIRSTNAME')!
    const lastName = validationFinder('USER_LASTNAME')!
    const emailAddress = validationFinder('EMAIL_ADDRESS')!
    const phoneNumber = validationFinder('PHONE_NUMBER')!
    const password = validationFinder('PASSWORD')!
    // user regExpressions
    const firstNameReg = new RegExp(firstName.pattern)
    const lastNameReg = new RegExp(lastName.pattern)
    const emailAddressReg = new RegExp(emailAddress.pattern)
    const phoneNumberReg = new RegExp(phoneNumber.pattern)
    const passwordReg = new RegExp(password.pattern)
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required(firstName.notBlankMsgEn)
            .matches(firstNameReg, firstName.patternMsgEn),
        lastName: Yup.string()
            .required(lastName.notBlankMsgEn)
            .matches(lastNameReg, lastName.patternMsgEn),
        emailAddress: Yup.string()
            .required(emailAddress.notBlankMsgEn)
            .matches(emailAddressReg, emailAddress.patternMsgEn),
        phoneNumber: Yup.string()
            .required(phoneNumber.notBlankMsgEn)
            .matches(phoneNumberReg, phoneNumber.patternMsgEn),
        password: Yup.string()
            .required(password.notBlankMsgEn)
            .matches(passwordReg, password.patternMsgEn),
        confirmPassword: Yup.string()
            .required('confirm password is required!')
            .oneOf([Yup.ref('password')], 'passwords must match'),
    })
    const { CreateSubmit, loading, SuccessModal, WarningModal } = useUser()

    const onSubmit = async (values: initialValuesType): Promise<void> => {
        const allValues = {
            ...values,
        }
        delete allValues.confirmPassword
        const registerUserValues = {
            ...allValues,
            phoneNumber: values.phoneNumber.toString(),
            countryName: name,
            countryCode: countryCode,
        }
        const userData = {
            ...registerUserValues,
            roleId: 1,
            channel: 'Web',
            address: userLocation?.address,
            city: userLocation?.city,
            state: userLocation?.state,
        }
        console.log('Nada', userData)

        await CreateSubmit(userData)
    }
    return (
        <>
            <CreateSchoolStyled>
                {SuccessModal().modalComponent}
                {WarningModal().modalComponent}
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => {
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                            >
                                <div className="bg-white form mt-20">
                                    <h3 className="title mb-0">
                                        Create User Account
                                    </h3>
                                    <Row>
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="firstName"
                                                label={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.firstNameFieldTitle
                                                )}
                                                fontSize="16px"
                                                placeholder={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.firstNameFieldPlaceholder
                                                )}
                                                // prefix={
                                                //   <img src={profile_icon} alt="profile_icon" />
                                                // }
                                                labelFamily={fontFamilyRegular}
                                                className={
                                                    formik.errors.firstName &&
                                                    formik.touched.firstName
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="text"
                                                name="lastName"
                                                fontSize="16px"
                                                label={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.surNameFieldTitle
                                                )}
                                                border="none"
                                                labelFamily={fontFamilyRegular}
                                                // prefix={
                                                //   <img src={profile_icon} alt="profile_icon" />
                                                // }
                                                placeholder={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.surNameFieldPlaceholder
                                                )}
                                                className={
                                                    formik.errors.lastName &&
                                                    formik.touched.lastName
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="input"
                                                type="email"
                                                fontSize="16px"
                                                name="emailAddress"
                                                border="none"
                                                label={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.emailFieldTitle
                                                )}
                                                // prefix={<img src={email_icon} alt="email_icon" />}
                                                labelFamily={fontFamilyRegular}
                                                placeholder={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.emailFieldPlaceholder
                                                )}
                                                className={
                                                    formik.errors
                                                        .emailAddress &&
                                                    formik.touched.emailAddress
                                                        ? 'is-invalid'
                                                        : 'customInput'
                                                }
                                            />
                                        </Col>
                                        <Col md="6" className="mt-20">
                                            <CustomPhoneInput
                                                label={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.mobileFieldTitle
                                                )}
                                                name="phoneNumber"
                                                value={
                                                    formik.values.phoneNumber
                                                }
                                                placeholder={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.mobileFieldPlaceholder
                                                )}
                                                limitMaxLength={true}
                                                handleOnChange={(e: string) => {
                                                    formik.setFieldValue(
                                                        'phoneNumber',
                                                        e
                                                    )
                                                }}
                                            />
                                            <ErrorMessage name={'phoneNumber'}>
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
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="password"
                                                type="text"
                                                name="password"
                                                labelMarginBottom="0px"
                                                labelFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.passcodeFieldTitle
                                                )}
                                                fontFamily={fontFamilyRegular}
                                                max={6}
                                                placeholder={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.passcodeFieldPlaceholder
                                                )}
                                                className={
                                                    formik.errors.password &&
                                                    formik.touched.password
                                                        ? 'is-invalid'
                                                        : 'customPasswordInput'
                                                }
                                            />
                                        </Col>
                                        <Col md="6" className="mt-20">
                                            <FormControl
                                                control="password"
                                                type="text"
                                                name="confirmPassword"
                                                fontFamily={fontFamilyRegular}
                                                labelMarginBottom="0px"
                                                labelFamily={fontFamilyRegular}
                                                label={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.confrimPasscodeFieldTitle
                                                )}
                                                placeholder={getLabelByKey(
                                                    SCREEN_LABEL_KEYS.confrimPasscodeFieldPlaceholder
                                                )}
                                                className={
                                                    formik.errors
                                                        .confirmPassword &&
                                                    formik.touched
                                                        .confirmPassword
                                                        ? 'is-invalid'
                                                        : 'customPasswordInput'
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-20 d-flex justify-content-end">
                                    <CustomButton
                                        bgcolor={lightBlue3}
                                        textTransform="capitalize"
                                        color={maastrichtBlue}
                                        padding="11px 40.50px"
                                        fontFamily={`${fontFamilyMedium}`}
                                        width="fit-content"
                                        type="submit"
                                        title={getLabelByKey(
                                            SCREEN_LABEL_KEYS.registerButton
                                        )}
                                        fontSize="18px"
                                        loading={loading}
                                        clicked={() => {
                                            onSubmit
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

export default CreateUser

import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { Form } from 'antd'
import FormControl from '../../../components/FormControl'
import CustomButton from '../../../components/CustomButton/CustomButton'
import CreateUserStyle from './style'
import { ScrollView } from 'react-native'
import ic_success from '../../../assets/images/ic_success.svg'

import {
    fontFamilyMedium,
    lightBlue3,
    pureDark2,
} from '../../../components/GlobalStyle'
import Head from '../../../components/Head/Head'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import EnnvisionModal from "../../../components/CustomModals/EnnvisionModal";
import CustomModal from '../../../components/Modal/CustomModal'
import { useAppSelector } from '../../../app/hooks'
import { validationFinder } from '../../../utils/utilities'
import { toast } from 'react-toastify'
import axios from 'axios'
import { signup_url } from '../../../utils/api_urls'
import Errormsg from '../../../components/ErrorMessage'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { SCREEN_LABEL_KEYS } from './constant'
import Input from 'react-phone-number-input'

import 'react-phone-number-input/style.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { setUserId } from '../../../redux/features/loginDataSlice'
import { SchoolSuccessfulModals } from '../../../hooks/PopupModalsStyling'

// create user initial values types
type initialValuesType = {
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    password: string
    confirmPassword?: string
}

const RegisterUser = (): JSX.Element => {
    // const [isShowModal, setIsShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [terms, setTerms] = useState(false)
    const [showTermsError, setShowTermsError] = useState(false)
    const { getLabelByKey } = useScreenTranslation('registerScreen')
    const { loginData } = useSelector((state: RootState) => state)
    const scrollViewRef = useRef<ScrollView>(null)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )

    const initialValues: initialValuesType = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    }

    const { result: userLocation } = useAppSelector(
        (state) => state.userLocation
    )
    // get Validations from redux appData
    const {
        countryName: {
            results: { countryCode, name },
        },
    } = useAppSelector((state) => state.appData.data)
    // create user initial values
    useEffect(() => {
        const countrySelect = document.querySelector(
            '.PhoneInput .PhoneInputCountry'
        )
        console.log('i am in  register form')
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
    // user validations
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

    // create user validation schema
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
    // create user data submit
    const dispatch = useDispatch()
    const { userRole } = useSelector((state: RootState) => state.UserData)
    const onSubmit = async (values: initialValuesType): Promise<void> => {
        // get all values other than confirm password
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
        try {
            setIsLoading(true)
            const response = await axios.post(signup_url, userData)
            console.log('response of register', response)
            if (response.data.responseCode === 200) {
                setShowModal(true)
                setTimeout(() => {
                    setShowModal(false)
                    dispatch(setUserId(response?.data?.results.userId))
                    if (userRole === 'school') {
                        navigate('/school/create')
                    } else if (userRole === 'instructor') {
                        navigate('/instructor/create')
                    }

                    setIsLoading(false)
                }, 2000)
            }

            // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setIsLoading(false)
            const errorMessage = error.response?.data?.responseMessage
            toast(errorMessage, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    return (
        <>
            <Head title="Register" />
            <CustomModal
                isModalVisible={showModal}
                setIsModalVisible={setShowModal}
            >
                <SchoolSuccessfulModals>
                    <div className="mainContainer d-flex flex-column align-items-center">
                        <img
                            src={ic_success}
                            alt="error Icon"
                            width={65}
                            height={65}
                        />
                        <h3 className="mainContainer-heading text-center">
                            Account Created Successfully!
                        </h3>
                        <p className="mainContainer-subText text-center">
                            Thank You For Joining Us And We are Excited To Have
                            You On Board
                        </p>
                    </div>
                </SchoolSuccessfulModals>
            </CustomModal>
            <CreateUserStyle>
                <div className="inner-container">
                    <div className="inner-container-card">
                        <div className="inner-container-card-inner">
                            <h6 className="title mb-0 text-center">
                                {getLabelByKey(SCREEN_LABEL_KEYS.title)}
                            </h6>
                            <p className="text-center message mt-10 mb-0">
                                {getLabelByKey(SCREEN_LABEL_KEYS.subtitle)}
                            </p>
                            <div className="inner-container-card-form">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {(formik) => {
                                        return (
                                            <Form
                                                name="basic"
                                                onFinish={formik.handleSubmit}
                                                autoComplete="off"
                                            >
                                                <div className="register-input-fields">
                                                    <div className="mt-20">
                                                        <FormControl
                                                            control="input"
                                                            type="text"
                                                            name="firstName"
                                                            label={getLabelByKey(
                                                                SCREEN_LABEL_KEYS.firstNameFieldTitle
                                                            )}
                                                            fontSize="16px"
                                                            border="none"
                                                            placeholder={getLabelByKey(
                                                                SCREEN_LABEL_KEYS.firstNameFieldPlaceholder
                                                            )}
                                                            // prefix={
                                                            //   <img src={profile_icon} alt="profile_icon" />
                                                            // }
                                                            labelFamily={
                                                                fontFamilyMedium
                                                            }
                                                            className={
                                                                formik.errors
                                                                    .firstName &&
                                                                formik.touched
                                                                    .firstName
                                                                    ? 'is-invalid'
                                                                    : 'customInput'
                                                            }
                                                        />
                                                    </div>
                                                    <div className="mt-20">
                                                        <FormControl
                                                            control="input"
                                                            type="text"
                                                            name="lastName"
                                                            fontSize="16px"
                                                            label={getLabelByKey(
                                                                SCREEN_LABEL_KEYS.surNameFieldTitle
                                                            )}
                                                            border="none"
                                                            labelFamily={
                                                                fontFamilyMedium
                                                            }
                                                            // prefix={
                                                            //   <img src={profile_icon} alt="profile_icon" />
                                                            // }
                                                            placeholder={getLabelByKey(
                                                                SCREEN_LABEL_KEYS.surNameFieldPlaceholder
                                                            )}
                                                            className={
                                                                formik.errors
                                                                    .lastName &&
                                                                formik.touched
                                                                    .lastName
                                                                    ? 'is-invalid'
                                                                    : 'customInput'
                                                            }
                                                        />
                                                    </div>
                                                    <div className="mt-20">
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
                                                            labelFamily={
                                                                fontFamilyMedium
                                                            }
                                                            placeholder={getLabelByKey(
                                                                SCREEN_LABEL_KEYS.emailFieldPlaceholder
                                                            )}
                                                            className={
                                                                formik.errors
                                                                    .emailAddress &&
                                                                formik.touched
                                                                    .emailAddress
                                                                    ? 'is-invalid'
                                                                    : 'customInput'
                                                            }
                                                        />
                                                    </div>
                                                    <div className="mt-20">
                                                        <label htmlFor="phoneNumber">
                                                            {getLabelByKey(
                                                                SCREEN_LABEL_KEYS.mobileFieldTitle
                                                            )}
                                                        </label>
                                                        <Input
                                                            defaultCountry="GB"
                                                            international
                                                            placeholder={getLabelByKey(
                                                                SCREEN_LABEL_KEYS.mobileFieldPlaceholder
                                                            )}
                                                            className={
                                                                formik.errors
                                                                    .phoneNumber &&
                                                                formik.touched
                                                                    .phoneNumber
                                                                    ? 'is-invalid_phone'
                                                                    : 'custom-phone-input-label'
                                                            }
                                                            limitMaxLength={
                                                                true
                                                            }
                                                            value={
                                                                formik.values
                                                                    .phoneNumber
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) => {
                                                                formik.setValues(
                                                                    {
                                                                        ...formik.values,
                                                                        phoneNumber:
                                                                            e,
                                                                    }
                                                                )
                                                            }}
                                                            withCountryCallingCode
                                                            countryCallingCodeEditable
                                                        />

                                                        <div className="mt-1">
                                                            <ErrorMessage
                                                                name="phoneNumber"
                                                                component={
                                                                    Errormsg
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="createUserPassword">
                                                        <div className="mt-20">
                                                            <FormControl
                                                                control="password"
                                                                type="text"
                                                                name="password"
                                                                label={getLabelByKey(
                                                                    SCREEN_LABEL_KEYS.passcodeFieldTitle
                                                                )}
                                                                fontFamily={
                                                                    fontFamilyMedium
                                                                }
                                                                max={6}
                                                                placeholder={getLabelByKey(
                                                                    SCREEN_LABEL_KEYS.passcodeFieldPlaceholder
                                                                )}
                                                                className={
                                                                    formik
                                                                        .errors
                                                                        .password &&
                                                                    formik
                                                                        .touched
                                                                        .password
                                                                        ? 'is-invalid'
                                                                        : 'customPasswordInput'
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
                                                                label={getLabelByKey(
                                                                    SCREEN_LABEL_KEYS.confrimPasscodeFieldTitle
                                                                )}
                                                                placeholder={getLabelByKey(
                                                                    SCREEN_LABEL_KEYS.confrimPasscodeFieldPlaceholder
                                                                )}
                                                                className={
                                                                    formik
                                                                        .errors
                                                                        .confirmPassword &&
                                                                    formik
                                                                        .touched
                                                                        .confirmPassword
                                                                        ? 'is-invalid'
                                                                        : 'customPasswordInput'
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mt-20">
                                                        <CustomButton
                                                            bgcolor={lightBlue3}
                                                            fontFamily={`${fontFamilyMedium}`}
                                                            textTransform="Captilize"
                                                            color={pureDark2}
                                                            padding="12.5px 8px"
                                                            width="100%"
                                                            type="submit"
                                                            title={getLabelByKey(
                                                                SCREEN_LABEL_KEYS.registerButton
                                                            )}
                                                            fontSize="16px"
                                                            border=""
                                                            loading={isLoading}
                                                        />
                                                    </div>
                                                </div>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </CreateUserStyle>
            {/* {loginData.data?.jwtDetails.token ? <AppLayout /> : null} */}
        </>
    )
}

export default RegisterUser

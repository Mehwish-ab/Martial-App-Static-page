import { Formik } from 'formik'
import * as Yup from 'yup'
import { Form } from 'antd'
import FormControl from '../../components/FormControl'
import CustomButton from '../../components/CustomButton/CustomButton'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightBlue3,
    pureDark2,
} from '../../components/GlobalStyle'
import Head from '../../components/Head/Head'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EnnvisionModal from '../../components/CustomModals/EnnvisionModal'
import CustomModal from '../../components/Modal/CustomModal'
import { useAppSelector } from '../../app/hooks'
import { validationFinder } from '../../utils/utilities'
import { toast } from 'react-toastify'
import axios from 'axios'
import { signup_url } from '../../utils/api_urls'

import 'react-phone-number-input/style.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import HelpSupportStyling from './style'

// create user initial values types
type initialValuesType = {
    firstName: string
    lastName: string
    emailAddress: string
    phoneNumber: string
    password: string
    confirmPassword?: string
}

const HelpSupport = () => {
    const [isShowModal, setIsShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [terms] = useState(false)

    const scrollViewRef = useRef<any>()
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
    const onSubmit = async (values: initialValuesType) => {
        if (!terms) {
            setShowTermsError(true)
            setTimeout(() => {
                setShowTermsError(false)
            }, 2000)
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({ animated: true })
            }
            return
        }
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
            await axios.post(signup_url, userData)
            setIsShowModal(true)
            setTimeout(() => {
                setIsShowModal(false)
                navigate('/login')
            }, 2000)
            setIsLoading(false)
        } catch (error: any) {
            setIsLoading(false)
            toast(error.response.data.responseMessage, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }

    return (
        <>
            <Head title="Help & Support" />
            <CustomModal
                isModalVisible={isShowModal}
                setIsModalVisible={setIsShowModal}
                showCloseBtn={false}
            >
                <EnnvisionModal
                    doTask={() => {
                        navigate('/login')
                        setIsShowModal(false)
                    }}
                    title="Account Created Successfully!"
                    description="Thank You For Joining Us And We're Excited To Have You On Board"
                />
            </CustomModal>
            <HelpSupportStyling>
                <div className="inner-container-card">
                    <div className="inner-container-card-inner">
                        <h6 className="title mb-0 text-center">
                            Help & Support
                        </h6>
                        <p className="text-center message mt-10 mb-0">
                            Leave us your info and we will get back to you.
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
                                                        label="Full Name"
                                                        fontSize="16px"
                                                        border="none"
                                                        placeholder="Full Name"
                                                        labelFamily={
                                                            fontFamilyMedium
                                                        }
                                                        className="customInput"
                                                    />
                                                </div>
                                                <div className="mt-20">
                                                    <FormControl
                                                        control="input"
                                                        type="text"
                                                        name="lastName"
                                                        fontSize="16px"
                                                        label="Email"
                                                        border="none"
                                                        labelFamily={
                                                            fontFamilyMedium
                                                        }
                                                        placeholder="abc@gmail.com"
                                                        className="customInput"
                                                    />
                                                </div>
                                                <div className="mt-20">
                                                    <FormControl
                                                        control="textarea"
                                                        type="text"
                                                        name="description"
                                                        fontFamily={
                                                            fontFamilyRegular
                                                        }
                                                        // prefix={<img src={lock_icon} alt="lock_icon" />}
                                                        label="Message"
                                                        padding="10px"
                                                        placeholder="Write a message"
                                                        className="customInput"
                                                        height="200px"
                                                    />
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
                                                        title="Save"
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
            </HelpSupportStyling>
        </>
    )
}

export default HelpSupport
function setShowTermsError(arg0: boolean) {
    throw new Error('Function not implemented.')
}

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
// import CustomModal from "../../../components/Modal/CustomModal";
import { useAppSelector } from '../../../app/hooks'
import { validationFinder } from '../../../utils/utilities'
import { toast } from 'react-toastify'
import axios from 'axios'
import { signup_url } from '../../../utils/api_urls'
import Errormsg from '../../../components/ErrorMessage'
import useScreenTranslation from '../../../hooks/useScreenTranslation'

import Input from 'react-phone-number-input'

import 'react-phone-number-input/style.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import OauthLogin from '../../../components/Common/OauthLogin/OauthLogin'
import { OAUTH_USECASES } from '../../../components/Common/OauthLogin/constants'
import TermsAndConditions from '../../../components/TermsAndConditions/TermsAndConditions'
import MessageModal from '../../../components/Common/MessageModal/MessageModal'
import CustomModal from '../../../components/Modal/CustomModal'
import { SchoolSuccessfulModals } from '../../../hooks/PopupModalsStyling'

// create user initial values types
type initialValuesType = {
    firstName: string

    emailAddress: string
    phoneNumber: string
}

const InviteUser = (): JSX.Element => {
    const [errorModal, setErrorModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [terms, setTerms] = useState(false)
    const [showTermsError, setShowTermsError] = useState(false)
    const { getLabelByKey } = useScreenTranslation('inviteScreen')
    const [showModal, setShowModal] = useState(false)
    const scrollViewRef = useRef<ScrollView>(null)
    const navigate = useNavigate()
    const { selectedLanguage } = useSelector(
        (state: RootState) => state.selectedLanguage
    )
    const initialValues: initialValuesType = {
        firstName: '',
        emailAddress: '',
        phoneNumber: '',
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
    const emailAddress = validationFinder('EMAIL_ADDRESS')!
    const phoneNumber = validationFinder('PHONE_NUMBER')!

    // user regExpressions
    const firstNameReg = new RegExp(firstName.pattern)
    const emailAddressReg = new RegExp(emailAddress.pattern)
    const phoneNumberReg = new RegExp(phoneNumber.pattern)

    // create user validation schema
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required(firstName.notBlankMsgEn)
            .matches(firstNameReg, firstName.patternMsgEn),
        emailAddress: Yup.string()
            .required(emailAddress.notBlankMsgEn)
            .matches(emailAddressReg, emailAddress.patternMsgEn),
        phoneNumber: Yup.string()
            .required(phoneNumber.notBlankMsgEn)
            .matches(phoneNumberReg, phoneNumber.patternMsgEn),
    })
    // create user data submit
    const onSubmit = async (values: initialValuesType): Promise<void> => {
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
            if (response.data.responseCode === 200) {
                setShowModal(true)
                setTimeout(() => {
                    setShowModal(false)
                    //  navigate('/login')
                }, 2000)
            }

            setIsLoading(false)
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
            <Head title="Invitation" />
            <CustomModal
                isModalVisible={showModal}
                setIsModalVisible={setShowModal}
            >
                <SchoolSuccessfulModals>
                    <div className="mainContainer d-flex flex-column align-items-center">
                        <img
                            src={ic_success}
                            alt="error Icon"
                            width={89}
                            height={89}
                        />
                        <h3 className="mainContainer-heading text-center">
                            Sent Invitation Successfully!
                        </h3>
                        <p className="mainContainer-subText text-center">
                            Congratulations! Your activity information has been
                            successfully completed, ensuring a seamless
                            experience within the Marital
                        </p>
                    </div>
                </SchoolSuccessfulModals>
            </CustomModal>
            <CreateUserStyle>
                <div className="inner-container">
                    <div className="inner-container-card">
                        <div className="inner-container-card-inner">
                            <h6 className="title mb-0 text-center">
                                {getLabelByKey('title')}
                            </h6>
                            <p className="text-center message mt-10 mb-0">
                                {getLabelByKey('subtitle')}
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
                                                                'fullNameFieldTitle'
                                                            )}
                                                            fontSize="16px"
                                                            border="none"
                                                            placeholder={getLabelByKey(
                                                                'fullNameFieldPlaceholder'
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
                                                            type="email"
                                                            fontSize="16px"
                                                            name="emailAddress"
                                                            border="none"
                                                            label={getLabelByKey(
                                                                'emailFieldTitle'
                                                            )}
                                                            // prefix={<img src={email_icon} alt="email_icon" />}
                                                            labelFamily={
                                                                fontFamilyMedium
                                                            }
                                                            placeholder={getLabelByKey(
                                                                'emailFieldPlaceholder'
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
                                                                'mobileFieldTitle'
                                                            )}
                                                        </label>
                                                        <Input
                                                            defaultCountry="GB"
                                                            international
                                                            placeholder={getLabelByKey(
                                                                'mobileFieldPlaceholder'
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
                                                                e: string
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
                                                                'invitationButton'
                                                            )}
                                                            fontSize="16px"
                                                            border=""
                                                            loading={isLoading}
                                                        />
                                                    </div>
                                                    {/* to show login using google, facebook, apple, microsoft and discord. */}
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
        </>
    )
}

export default InviteUser

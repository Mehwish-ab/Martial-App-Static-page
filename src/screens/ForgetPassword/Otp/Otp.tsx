import React, { useEffect, useRef, useState } from 'react'
import Head from '../../../components/Head/Head'
import ForgetPasswordStyle from '../style'
import { Field, FieldProps, Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Input } from 'antd'
import { fontFamilyMedium, pureDark } from '../../../components/GlobalStyle'
import CustomButton from '../../../components/CustomButton/CustomButton'
import OtpInputsStyled from './style'
import useVerifyOtp from '../../../hooks/useVerifyOtp'
import useScreenTranslation from '../../../hooks/useScreenTranslation'
import { OTP_SCREEN_LABEL_KEYS } from '../constants'
import { useGlobalContext } from '../../../context/context'
import useGenerateOtp from '../../../hooks/useGenerateOtp'
import { toast } from 'react-toastify'
import {
    generate_otp_url,
    useCaseForgetPassowrd,
} from '../../../utils/api_urls'
import axios from 'axios'
export interface OtpPropValues {
    input0: string
    input1: string
    input2: string
    input3: string
}
const Otp: React.FC = () => {
    const initialValues: OtpPropValues = {
        input0: '',
        input1: '',
        input2: '',
        input3: '',
    }
    const { getLabelByKey } = useScreenTranslation('veriﬁcationPin')
    const { userPhoneNumber } = useGlobalContext()
    //const { handleSubmit } = useGenerateOtp()

    const validationSchema = Yup.object().shape({
        input0: Yup.string()
            .matches(/^\d$/, 'Enter a single digit')
            .required('Otp is required!'),
        input1: Yup.string()
            .matches(/^\d$/, 'Enter a single digit')
            .required('Otp is required!'),
        input2: Yup.string()
            .matches(/^\d$/, 'Enter a single digit')
            .required('Otp is required!'),
        input3: Yup.string()
            .matches(/^\d$/, 'Enter a single digit')
            .required('Otp is required!'),
    })

    const initialTimer = { minutes: 2, seconds: 0 }
    const [timer, setTimer] = useState(initialTimer)
    const [timerExpired, setTimerExpired] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const toastId = useRef<any>(null)
    const { handleOnSubmit, loading } = useVerifyOtp()
    const { minutes, seconds } = timer

    useEffect(() => {
        if (!timerExpired) {
            const interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Handle OTP expiration here
                        console.log('OTP has expired')
                        setTimerExpired(true)
                        setShowButton(true)
                        clearInterval(interval) // Stop the interval
                    } else {
                        setTimer({ minutes: minutes - 1, seconds: 59 })
                    }
                } else {
                    setTimer({ minutes, seconds: seconds - 1 })
                }
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [minutes, seconds, timerExpired])

    const formatTimer = (): string => {
        let timerText = ''

        if (!timerExpired) {
            if (minutes > 0) {
                timerText += `${getLabelByKey(
                    'expireMessageOne'
                )} ${minutes} ${getLabelByKey('expireMessageTwo')}${
                    minutes > 1 ? `${getLabelByKey('expireMessageThree')}` : ''
                }`

                if (seconds > 0) {
                    timerText += ` ${getLabelByKey(
                        'expireMessageFour'
                    )} ${seconds} ${getLabelByKey('expireMessageFive')}${
                        seconds > 1
                            ? `${getLabelByKey('expireMessageThree')}`
                            : ''
                    }`
                }
            } else if (seconds > 0) {
                timerText += `${getLabelByKey(
                    'expireMessageOne'
                )} ${seconds} ${getLabelByKey('expireMessageFive')}${
                    seconds > 1 ? `${getLabelByKey('expireMessageThree')}` : ''
                }`
            }
        } else {
            timerText = `${getLabelByKey('expireMessage')}`
        }

        return timerText
    }
    const handleButtonAction = async (): Promise<void> => {
        console.log('userPhoneNumber', userPhoneNumber)
        const phoneData = {
            phoneNumber: userPhoneNumber,
            useCase: useCaseForgetPassowrd,
        }
        console.log('phoneData', userPhoneNumber)
        try {
            // setError('')
            // setLoading(true)
            const { data } = await axios.post(generate_otp_url, phoneData)
            // if (data.responseCode === "500") {
            //   toast(data.responseMessage, {
            //     type: "error",
            //     autoClose: 1000,
            //   });
            //   setLoading(false);
            //   return;
            // }
            toastId.current = toast(data.responseMessage, {
                type: 'success',
                autoClose: 1000,
            })
            console.log({ data })
        } catch (error2: any) {
            console.log({ error: error2 })
            toastId.current = toast(error2.response.data.responseMessage, {
                type: 'error',
                autoClose: 1000,
            })
        }
        console.log('Button clicked after OTP expiration')
    }
    return (
        <>
            <Head title="Veriﬁcation One Time Pin" />

            <ForgetPasswordStyle>
                <div>
                    <div className="forget-password-container-card">
                        <div className="forget-password-container-card-inner">
                            <h6 className="title text-center">
                                {getLabelByKey(OTP_SCREEN_LABEL_KEYS.title)}
                            </h6>
                            <p className="text-center forget-password-text mt-10">
                                {getLabelByKey(OTP_SCREEN_LABEL_KEYS.subtitle)}
                            </p>
                            <h6 className="forget-password-phoneNumber text-center">
                                {userPhoneNumber}
                            </h6>
                            <div className="forget-password-container-card-form w-100 mt-20">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values) => {
                                        handleOnSubmit(values)
                                    }}
                                >
                                    {(formik) => {
                                        return (
                                            <Form
                                                onFinish={formik.handleSubmit}
                                            >
                                                <OtpInputsStyled>
                                                    {[0, 1, 2, 3].map(
                                                        (index) => {
                                                            return (
                                                                <>
                                                                    <Field
                                                                        name={`input${index}`}
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {({
                                                                            field,
                                                                        }: FieldProps<string>) => {
                                                                            return (
                                                                                <Input
                                                                                    {...field}
                                                                                    name={`input${index}`}
                                                                                    className="customInput otp-input"
                                                                                    placeholder="-"
                                                                                    maxLength={
                                                                                        1
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) => {
                                                                                        // Set the value directly into Formik's values
                                                                                        formik.setFieldValue(
                                                                                            `input${index}`,
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )

                                                                                        // Move focus to the next input field if a digit is entered
                                                                                        if (
                                                                                            e.target.value.match(
                                                                                                /^\d$/
                                                                                            ) &&
                                                                                            index <
                                                                                                3
                                                                                        ) {
                                                                                            const nextField =
                                                                                                document.getElementsByName(
                                                                                                    `input${index + 1}`
                                                                                                )[0]
                                                                                            nextField?.focus()
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            )
                                                                        }}
                                                                    </Field>

                                                                    {/* <Field
                                                                name={`input${index}`}
                                                                key={index}
                                                            >
                                                                {({
                                                                    field,
                                                                    // meta,
                                                                }: FieldProps<string>) => (
                                                                    <Input
                                                                        {...field}
                                                                        className="customInput otp-input"
                                                                        placeholder="-"
                                                                        maxLength={
                                                                            1
                                                                        }
                                                                        onKeyUp={(
                                                                            e
                                                                        ) => {
                                                                            if (
                                                                                e.key.match(
                                                                                    /^\d$/
                                                                                )
                                                                            ) {
                                                                                const nextIndex =
                                                                                    index <
                                                                                    3
                                                                                        ? index +
                                                                                          1
                                                                                        : index
                                                                                if (
                                                                                    (
                                                                                        values as any
                                                                                    )[
                                                                                        `input${nextIndex}`
                                                                                    ] ===
                                                                                    ''
                                                                                ) {
                                                                                    const nextField =
                                                                                        document.getElementsByName(
                                                                                            `input${nextIndex}`
                                                                                        )[0]
                                                                                    nextField?.focus()
                                                                                }
                                                                            }
                                                                        }}
                                                                    />
                                                                )}
                                                            </Field> */}
                                                                </>
                                                            )
                                                        }
                                                    )}
                                                </OtpInputsStyled>

                                                <div className="mt-20">
                                                    <CustomButton
                                                        bgcolor="#C0E9F9"
                                                        textTransform="Captilize"
                                                        color={pureDark}
                                                        padding="13.5px"
                                                        fontFamily={`${fontFamilyMedium}`}
                                                        width="100%"
                                                        type="submit"
                                                        title={getLabelByKey(
                                                            OTP_SCREEN_LABEL_KEYS.sumbitButton
                                                        )}
                                                        fontSize="16px"
                                                        loading={loading}
                                                    />
                                                </div>
                                            </Form>
                                        )
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-center forget-password-OTPtext">
                            {formatTimer()}{' '}
                            {timerExpired && showButton && (
                                <button
                                    style={{
                                        background: 'rgb(192, 233, 249)',
                                        padding: '4px',
                                        borderRadius: '2px',
                                    }}
                                    className="expired-button-container"
                                    onClick={handleButtonAction}
                                >
                                    {getLabelByKey('resendOtp')}
                                </button>
                            )}
                        </p>
                    </div>
                </div>
            </ForgetPasswordStyle>
        </>
    )
}

export default Otp

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useGlobalContext } from '../context/context'
import { useAppSelector } from '../app/hooks'
import {
    generate_otp_url,
    useCaseForgetPassowrd,
    useCaseRegisteration,
    verify_otp_url,
} from '../utils/api_urls'
import { forgetPasswordInitialTypes } from '../screens/ForgetPassword/ForgetPasword'
import * as Yup from 'yup'
import { OtpPropValues } from '../screens/ForgetPassword/Otp/Otp'

interface Otp {
    value: string | number
}
const useVerifyOtp = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const toastId = useRef<any>(null)
    const { setUserPhoneNumber, userPhoneNumber } = useGlobalContext()
    // get Validations from redux appData
    // const {
    //   countryName: {
    //     results: { countryCode },
    //   },
    //   validations,
    // } = useAppSelector((state) => state.appData.data);

    // // user validations
    // const phoneNumber = validations[countryCode === "92" ? 23 : 4];
    // // user regExpressions
    // const phoneNumberReg = new RegExp(phoneNumber.pattern);

    // // initial values
    // const initialValues: forgetPasswordInitialTypes = {
    //   phoneNumber: "",
    // };
    // // validation schema
    // const validationSchema = Yup.object({
    //   phoneNumber: Yup.string()
    //     .required(phoneNumber.notBlankMsgEn)
    //     .matches(phoneNumberReg, phoneNumber.pattern),
    // });

    // register phone handler
    const handleSubmit = async (values: OtpPropValues) => {
        // setOtp(values.phoneNumber.toString());
        console.log(values, 'otp number')
        const phoneData = {
            phoneNumber: userPhoneNumber,
            useCase: useCaseForgetPassowrd,
            otp: values.input0 + values.input1 + values.input2 + values.input3,
        }
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(verify_otp_url, phoneData)
            if (data.responseCode === '500') {
                toast(data.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return
            }
            toastId.current = toast(data.responseMessage, {
                type: 'success',
                autoClose: 1000,
            })
            setLoading(false)
            navigate('/register/create-new-password', {
                state: {
                    resetPasswordToken: data.results.resetPasswordToken,
                },
            })
            console.log({ data })
        } catch (error: any) {
            console.log({ error })
            setLoading(false)
            setError(error.response.data.responseMessage)
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(error.response.data.responseMessage, {
                type: 'error',
                autoClose: 1000,
            })
        }
    }
    return {
        loading,
        handleSubmit,
        error,
    }
}

export default useVerifyOtp

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useGlobalContext } from '../context/context'
import { generate_otp_url, useCaseForgetPassowrd } from '../utils/api_urls'
import { forgetPasswordInitialTypes } from '../screens/ForgetPassword/ForgetPasword'

interface IUseGenerator {
    loading: boolean
    handleSubmit: (values: forgetPasswordInitialTypes) => Promise<void>
    error: string
}

const useGenerateOtp = (): IUseGenerator => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const toastId = useRef<any>(null)
    const { setUserPhoneNumber } = useGlobalContext()
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
    const handleSubmit = async (
        values: forgetPasswordInitialTypes
    ): Promise<void> => {
        setUserPhoneNumber(values.phoneNumber.toString())
        console.log(values.phoneNumber, 'phone number')
        const phoneData = {
            phoneNumber: values.phoneNumber.toString(),
            useCase: useCaseForgetPassowrd,
        }

        try {
            setError('')
            setLoading(true)
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
            setLoading(false)
            navigate('/register/verify-otp')
            console.log({ data })
        } catch (error2: any) {
            console.log({ error: error2 })
            setLoading(false)
            setError(error2.response.data.responseMessage)
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(error2.response.data.responseMessage, {
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

export default useGenerateOtp

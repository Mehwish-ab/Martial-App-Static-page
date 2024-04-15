import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useGlobalContext } from '../context/context'
import { generate_otp_url, useCaseForgetPassowrd } from '../utils/api_urls'
import { forgetPasswordInitialTypes } from '../screens/ForgetPassword/ForgetPasword'
import ic_success from '../assets/images/ic_success.svg'
import { SchoolSuccessfulModals } from './PopupModalsStyling'
import CustomModal from '../components/Modal/CustomModal'
interface IModalComponent {
    modalComponent: JSX.Element
}
interface IUseGenerator {
    loading: boolean
    handleSubmit: (values: any) => Promise<void>
    error: string
}

const useGenerateOtp = (): IUseGenerator => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const toastId = useRef<any>(null)
    const { setUserPhoneNumber } = useGlobalContext()
    const [isShowModal, setIsShowModal] = useState(false)
    const [msg, setMsg] = useState('')
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
        console.log(values, 'phone number')
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
            // toastId.current = toast(data.responseMessage, {
            //     type: 'success',
            //     autoClose: 1000,
            // })
            setMsg(data.responseMessage)
            setIsShowModal(true)
            setTimeout(() => {
                setIsShowModal(false)
                setError('')
            }, 3000)
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
    const UpdateModal = (): IModalComponent => {
        return {
            modalComponent: (
                <CustomModal
                    isModalVisible={isShowModal}
                    setIsModalVisible={setIsShowModal}
                    showCloseBtn={true}
                >
                    <SchoolSuccessfulModals>
                        <div className="mainContainer d-flex flex-column align-items-center">
                            <img
                                src={ic_success}
                                alt="Success Icon"
                                width={79}
                                height={79}
                            />
                            <h3 className="mainContainer-heading text-center">
                                Update Password Successfully!
                            </h3>
                            <p className="mainContainer-subText text-center">
                                {msg}
                            </p>
                        </div>
                    </SchoolSuccessfulModals>
                </CustomModal>
            ),
        }
    }
    return {
        loading,
        handleSubmit,
        error,
    }
}

export default useGenerateOtp

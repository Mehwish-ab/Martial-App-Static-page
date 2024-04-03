import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import {
    auth_token_key,
    oauth_signin_url,
    oauth_signup_url,
} from '../utils/api_urls'
import { useAppSelector } from '../app/hooks'
import { RootState } from '../redux/store'
import { OauthApiValueTypes } from '../components/Common/OauthLogin/constants'
import { setLoginData } from '../redux/features/loginDataSlice'
import MessageModal from '../components/Common/MessageModal/MessageModal'
import { useDispatch } from 'react-redux'

interface IUseOauthLogin {
    loading: boolean
    handleSignup: (values: OauthApiValueTypes) => Promise<void>
    handleSignin: (values: OauthApiValueTypes) => Promise<void>
    error: string
}

const UseOauthLogin = (): IUseOauthLogin => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const toastId = useRef<any>(null)
    const dispatch = useDispatch()

    const {
        countryName: {
            results: { countryCode, name },
        },
    } = useAppSelector((state: RootState) => state.appData.data)
    const { result } = useAppSelector((state: RootState) => state.userLocation)
    console.log({ countryCode, name, result })

    // signin
    const handleSignin = async (values: OauthApiValueTypes): Promise<void> => {
        console.log(values, 'social login')
        const payload = {
            authProvider: values.authProvider,
            accessToken: values.accessToken,
        }
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(oauth_signin_url, payload)
            if (data.responseCode === '500') {
                toast(data.responseMessage, {
                    type: 'error',
                    autoClose: 1000,
                })
                setLoading(false)
                return
            }
            console.log('oauth_signin_url', { data })
            localStorage.setItem(auth_token_key, JSON.stringify(data.results))
            dispatch(setLoginData(data.results))

            toast(
                <MessageModal
                    message="Login Successfully"
                    description="You are successfully logged in to your account."
                    type="success"
                />,
                {
                    autoClose: 1000,
                }
            )
            setLoading(false)
            navigate('/dashboard')
            // navigate("/register/create-new-password", {
            //   state: {
            //     resetPasswordToken: data.results.resetPasswordToken,
            //   },
            // });
            console.log({ data })
        } catch (error2: any) {
            console.log({ error: error2 })
            setLoading(false)
            setError(error2?.response?.data?.responseMessage || error2.message)
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(
                error2?.response?.data?.responseMessage || error2.message,
                {
                    type: 'error',
                    autoClose: 1000,
                }
            )
        }
    }

    // register
    const handleSignup = async (values: OauthApiValueTypes): Promise<void> => {
        console.log(values, 'social signup')
        const payload = {
            authProvider: values.authProvider,
            accessToken: values.accessToken,
            address: result?.address || '',
            city: result?.city || '',
            state: result?.state || '',
            countryCode: countryCode,
            countryName: name,
            channel: 'WEB',
        }
        console.log('pay load', payload)
        try {
            setError('')
            setLoading(true)
            const { data } = await axios.post(oauth_signup_url, payload)
            console.log('Api response', { data }, data.responseMessage)
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
            navigate('/login')
            console.log({ data })
        } catch (error2: any) {
            console.log({ error: error2 })
            setLoading(false)
            setError(error2?.response?.data?.responseMessage || error2.message)
            setTimeout(() => {
                setError('')
            }, 2000)
            toastId.current = toast(
                error2?.response?.data?.responseMessage || error2.message,
                {
                    type: 'error',
                    autoClose: 1000,
                }
            )
        }
    }

    return {
        loading,
        handleSignup,
        handleSignin,
        error,
    }
}

export default UseOauthLogin

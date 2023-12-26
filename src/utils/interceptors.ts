import { auth_token_key, base_url, refresh_token_url } from './api_urls'
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios'
import store from '../redux/store'
import { removeUserLogin } from '../redux/features/admin/user/loginDataSlice'
import { removeLoginData } from '../redux/features/loginDataSlice'

// axios request client
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    console.log({ config })
    if (config.headers) {
        const token = JSON.parse(localStorage.getItem(auth_token_key)!)
        console.log({ token })
        if (token) {
            config.headers['Authorization'] = `Bearer ${token.jwtDetails.token}`
        }
    }

    return config
}

// error in request

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
}

// axios response
const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response
}

// on Error Response
const onResponseError = async (error: AxiosError<any>): Promise<AxiosError> => {
    if (error.response) {
        // Access Token was expired
        // checking if token is expire
        if (
            error.response.status === 401 &&
            error.response.data.responseMessage ===
                'JWT Token has been expired. Please refresh'
        ) {
            // alert("token expired");
            const storedTokenData = JSON.parse(
                localStorage.getItem(auth_token_key)!
            )

            try {
                const { data } = await axios.post(
                    `${base_url}${refresh_token_url}`,
                    {
                        refreshToken: storedTokenData.jwtDetails.refreshToken,
                    }
                )

                // update accessToken and refreshToken

                const { accessToken, refreshToken } = data.results
                localStorage.setItem(
                    auth_token_key,
                    JSON.stringify({
                        ...storedTokenData,
                        jwtDetails: {
                            ...storedTokenData.jwtDetails,
                            token: accessToken,
                            refreshToken,
                        },
                    })
                )
                // reload when new token is added
                window.location.reload()
                return Promise.reject('_error')
            } catch (_error) {
                // alert(error.response.data.responseMessage);
                localStorage.removeItem(auth_token_key)
                store.dispatch(removeUserLogin())
                store.dispatch(removeLoginData())
                return Promise.reject(_error)
            }
        }
    }
    return Promise.reject(error)
}

// axios interceptor
export const setupInterceptorsTo = (
    axiosInstance: AxiosInstance
): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError)
    axiosInstance.interceptors.response.use(onResponse, onResponseError)
    return axiosInstance
}

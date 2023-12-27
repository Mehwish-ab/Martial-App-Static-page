import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { base_url } from './api_urls'
const baseURL = base_url

export const local_storage_admin_key = 'ennvision-admin:token'

// create for all operation axios inceptor
const client = axios.create({ baseURL })
client.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
const authorizedClient = axios.create({ baseURL })

type axiosRequest = AxiosRequestConfig
// normal axios request
export const axiosRequest = <Type>({
    ...options
}: axiosRequest): Promise<AxiosResponse<Type, Type>> => {
    console.log({ options })
    const onSuccess = (
        response: AxiosResponse<Type, Type>
    ): AxiosResponse<Type, Type> => response
    const onError = (error: Type): Promise<never> => {
        // optionaly catch errors and add additional logging here
        return Promise.reject(error)
    }

    return client(options).then(onSuccess).catch(onError)
}

// authorized axios request
export const authorizedAxiosRequest = ({
    ...options
}: axiosRequest): Promise<unknown> => {
    console.log({ options })
    const onSuccess = (response: unknown): unknown => response
    const onError = (error: unknown): unknown => {
        // optionaly catch errors and add additional logging here
        return error
    }
    return authorizedClient(options).then(onSuccess).catch(onError)
}
// if (Object.keys(loginData!).length !== 0) {
//   authorizedClient.defaults.headers.common["Authorization"] = `Bearer ${
//     storeState && loginData?.jwtDetails.token
//   }`;
// }
// authorizedClient.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

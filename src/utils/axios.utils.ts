import axios, { AxiosRequestConfig } from 'axios'
import { base_url } from './api_urls'
const baseURL = base_url

export const local_storage_admin_key = 'ennvision-admin:token'

// create for all operation axios inceptor
const client = axios.create({ baseURL })
client.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
const authorizedClient = axios.create({ baseURL })

type axiosRequest = AxiosRequestConfig
// normal axios request
export const axiosRequest = ({ ...options }: axiosRequest) => {
    console.log({ options })
    const onSuccess = (response: any) => response
    const onError = (error: any) => {
        // optionaly catch errors and add additional logging here
        return error
    }
    return client(options).then(onSuccess).catch(onError)
}

// authorized axios request
export const authorizedAxiosRequest = ({ ...options }: axiosRequest) => {
    console.log({ options })
    const onSuccess = (response: any) => response
    const onError = (error: any) => {
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

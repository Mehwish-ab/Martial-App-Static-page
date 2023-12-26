import axios from 'axios'
import { useState } from 'react'
import { useAppSelector } from '../app/hooks'
import { authorizationToken } from '../utils/api_urls'

const useDeleteEvent = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState<unknown>({})
    // login data
    const { data: loginData } = useAppSelector((state) => state.loginData)
    // api data promise
    const apiDataPromise = async (url: string, postData: unknown) => {
        try {
            setLoading(true)
            const { data } = await axios.delete(url, {
                data: postData,
                headers: {
                    ...authorizationToken(loginData!),
                },
            })
            setData(data.results)
            console.log({ data })
            setLoading(false)
        } catch (error: any) {
            setError(error.response.data.responseMessage)
            setLoading(false)
            console.log(
                error.response.data.responseMessage,
                'error in api data'
            )
        }
    }

    return {
        loading,
        data,
        error,
        apiDataPromise,
    }
}

export default useDeleteEvent

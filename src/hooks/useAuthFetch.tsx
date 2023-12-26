import axios from 'axios'
import { useEffect, useState } from 'react'
import { authorizationToken } from '../utils/api_urls'
import { useAppSelector } from '../app/hooks'

const useAuthFetch = (url: string) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState<any>({})
    const loginData = useAppSelector((state) => state.loginData.data)
    const [refetch, setRefetch] = useState(false)

    // api data promise
    const apiDataPromise = async () => {
        try {
            setLoading(true)
            const { data } = await axios(url, {
                headers: {
                    ...authorizationToken(loginData!),
                },
            })
            setData(data.results)
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

    const refetchData = () => {
        setRefetch((prev) => !prev)
    }

    useEffect(() => {
        apiDataPromise()
    }, [refetch])

    return {
        loading,
        data,
        error,
        refetchData,
    }
}

export default useAuthFetch

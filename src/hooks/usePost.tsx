import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import { authorizationToken } from '../utils/api_urls'

const usePost = (url: string, postData: unknown) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState<any>({})
    const [refetch, setRefetch] = useState(false) // Add refetch state

    // login data
    const { data: loginData } = useAppSelector((state) => state.loginData)

    // api data promise
    const apiDataPromise = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post(url, postData, {
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

    // Fetch data when refetch state changes
    useEffect(() => {
        apiDataPromise()
    }, [refetch])

    // Function to trigger refetch
    const triggerRefetch = () => {
        setRefetch((prev) => !prev)
    }

    return {
        loading,
        data,
        error,
        refetch: triggerRefetch, // Provide the refetch function as part of the hook's return value
    }
}

export default usePost

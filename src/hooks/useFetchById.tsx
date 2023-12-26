import axios from 'axios'
import { useEffect, useState } from 'react'
import { authorizationToken } from '../utils/api_urls'
import { useAppSelector } from '../app/hooks'

const useFetchById = (url: string, id: number | string | undefined) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState<any>({})
    const loginData = useAppSelector((state) => state.loginData.data)

    // api data promise
    const apiDataPromise = async () => {
        try {
            setLoading(true)
            const { data } = await axios(url + id, {
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
            console.log(error.response.data, 'error in api data')
        }
    }

    useEffect(() => {
        apiDataPromise()
    }, [id])
    return {
        loading,
        data,
        error,
    }
}

export default useFetchById

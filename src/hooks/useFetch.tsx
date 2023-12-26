import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetch = (url: string) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState<any>({})
    const [refetch, setRefetch] = useState(false)

    // api data promise
    const apiDataPromise = async () => {
        try {
            setLoading(true)
            const { data } = await axios(url)
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

    // Function to trigger refetch
    const triggerRefetch = () => {
        console.log('refecth called')
        setRefetch((prev) => !prev)
    }

    console.log({ refetch, loading })

    useEffect(() => {
        apiDataPromise()
    }, [refetch])
    return {
        loading,
        data,
        error,
        triggerRefetch,
    }
}

export default useFetch

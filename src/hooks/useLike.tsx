import axios from 'axios'
import { useState } from 'react'
import { like_url } from '../utils/api_urls'
import { useGlobalContext } from '../context/context'
import { toast } from 'react-toastify'
import { useAppSelector } from '../app/hooks'
import { RootState } from '../redux/store'
// import { useNewsfeedContext } from "../context/NewsfeedContext";

//add like types
export type addLikeTypes = {
    newsFeedId: number
    userId: number
    isLike: boolean
}

const useLike = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    // const { setIsShowStories } = useNewsfeedContext();
    const { setCounter } = useGlobalContext()
    // login data
    const { data } = useAppSelector((state: RootState) => state.loginData)
    // add likes promise handler
    const addLikesPromiseHandler = async ({
        isLike,
        newsFeedId,
        userId,
    }: addLikeTypes) => {
        console.log({ isLike })
        try {
            setLoading(true)
            const { data: likesData } = await axios.post(
                like_url,
                {
                    newsFeedId: newsFeedId.toString(),
                    userId: userId.toString(),
                    isLike: !isLike,
                },
                {
                    headers: {
                        Authorization: `Bearer ${data?.jwtDetails.token}`,
                    },
                }
            )
            setCounter((count) => count + 1)
            setLoading(false)
            toast(likesData.responseMessage, {
                type: 'success',
            })
            // setIsShowStories(false);
        } catch (error: any) {
            setError(error.response.data.responseMessage)
            setLoading(false)
            toast(error.response.data.responseMessage, {
                type: 'error',
            })
        }
    }
    return {
        loading,
        error,
        addLikesPromiseHandler,
    }
}

export default useLike

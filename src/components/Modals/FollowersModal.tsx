import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../app/hooks'
// import { useProfessionalContext } from "../../context/ProfessionalContext";
import { authorizationToken, get_all_followers_url } from '../../utils/api_urls'
import ProfileIntro from '../Custom/ProfileIntro'
import { secondaryBlue } from '../GlobalStyle'
import Loader from '../Loader/Loader'
import { FollowingModalStyle } from './style'

export interface followerUserTypes {
    userId: number
    userProfilePicture: string
    userFirstName: string
    userLastName: string
    followingDateTime: string
    userUserName: string
    isFollower: boolean
}
export interface followerTypes {
    totalItems: number
    follower: followerUserTypes[]
}

const FollowersModal = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<null | followerTypes>({} as followerTypes)
    const [error, setError] = useState('')
    const followersToastId = useRef<any>()
    // const { isShowFollowers } = useProfessionalContext();

    // loginData
    const { data: loginData } = useAppSelector((state) => state.loginData)

    // get followers promise
    const getFollowersPromise = async () => {
        try {
            setLoading(true)
            const { data: followersData } = await axios(
                get_all_followers_url + loginData?.userDetails.id,
                {
                    headers: {
                        ...authorizationToken(loginData!),
                    },
                }
            )
            console.log({ data })
            setData(followersData.results)
            setLoading(false)

            followersToastId.current = toast('got followers successfully', {
                type: 'success',
            })
        } catch (error: any) {
            setError(error)
            setLoading(false)
            followersToastId.current = toast(error.responseMessage, {
                type: 'error',
            })
        }
    }

    // useEffect(() => {
    //   getFollowersPromise();
    // }, [isShowFollowers])
    useEffect(() => {
        getFollowersPromise()
    }, [])

    console.log({ error })

    console.log({ loading, data })
    return (
        <FollowingModalStyle>
            {loading ? (
                <Loader />
            ) : error ? (
                <h6 className="text-center">no followers available</h6>
            ) : (
                data?.follower.map((follower) => (
                    <ProfileIntro
                        btnColor="white"
                        btnBgColor={secondaryBlue}
                        btnText="Follow Back"
                        {...follower}
                    />
                ))
            )}
        </FollowingModalStyle>
    )
}

export default FollowersModal

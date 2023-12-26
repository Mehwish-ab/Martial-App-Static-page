import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppSelector } from '../../app/hooks'
import { authorizationToken, get_all_likes_url } from '../../utils/api_urls'
import ProfileIntroBox from '../Custom/LikeProfileBox'
import { secondaryBlue } from '../GlobalStyle'
import Loader from '../Loader/Loader'
import NoDataAvailable from '../NoData/NoDataAvailable'
import { LikesModalStyle } from './style'
import CustomModal from '../Modal/CustomModal'
import NewsfeedModal from './NewsFeedModal'
import NoModalData from '../NoData/NoDataModal'

export type likesOnNewsFeed = {
    ownerData: ownerData
}
export type ownerData = {
    countryCode: string
    emailAddress: boolean
    firstName: string
    id: string
    lastName: string
    phoneNumber: boolean
    profilePicture: string
    userName: string
}
// like data types
type likeDataResultTypes = {
    currentPage: string
    likesOnNewsFeed: likesOnNewsFeed[]
    totalItems: number
    totalPages: number
}

type likeModalProps = {
    isShowLikeModal: boolean
    setIsShowLikeModal: Dispatch<SetStateAction<boolean>>
    newsfeedId: number
}
const LikesModal: React.FC<likeModalProps> = ({
    isShowLikeModal,
    setIsShowLikeModal,
    newsfeedId,
}) => {
    const [loading, setLoading] = useState(true)
    const [likesData, setLikesData] = useState({} as likeDataResultTypes)
    const [error, setError] = useState('')
    const likeToastId = useRef<any>(null)
    // login data
    const { data: loginData } = useAppSelector((state) => state.loginData)
    // get followers promise
    const getNewsfeedLikesPromise = async () => {
        try {
            setLoading(true)
            const { data } = await axios(get_all_likes_url + newsfeedId, {
                headers: {
                    ...authorizationToken(loginData!),
                },
            })
            console.log({ data })
            setLikesData(data.results)
            setLoading(false)
            likeToastId.current = toast('got likes successfully', {
                type: 'success',
            })
        } catch (error: any) {
            setError(error.response.data.responseMessage)
            setLoading(false)
            likeToastId.current = toast(error.response.data.responseMessage, {
                type: 'error',
            })
        }
    }

    useEffect(() => {
        getNewsfeedLikesPromise()
    }, [isShowLikeModal])

    return (
        <CustomModal
            isModalVisible={isShowLikeModal}
            setIsModalVisible={setIsShowLikeModal}
            showCloseBtn={false}
        >
            <NewsfeedModal
                title="Who you Likes"
                closeHandler={() => setIsShowLikeModal(false)}
            >
                <LikesModalStyle>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <NoModalData error={error} />
                    ) : (
                        likesData.likesOnNewsFeed.map((data) => (
                            <ProfileIntroBox
                                btnColor="white"
                                btnBgColor={secondaryBlue}
                                btnText="Follow Back"
                                {...data.ownerData}
                            />
                        ))
                    )}
                </LikesModalStyle>
            </NewsfeedModal>
        </CustomModal>
    )
}

export default LikesModal

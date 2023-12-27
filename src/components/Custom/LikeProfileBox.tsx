import { BaseImgContainer } from '../GlobalStyle'
import { ownerData } from '../Modals/LikesModal'
import { LikeProfileBoxStyle } from './style'
import placeholder from '../../assets/icons/ic_use_placeholder.svg'

type likeProfileBoxProps = {
    btnText?: string
    btnColor?: string
    btnBgColor?: string
    profileName?: string
    userName?: string
    border?: string
    verfied?: boolean
} & ownerData
const LikeProfileBox: React.FC<likeProfileBoxProps> = ({
    firstName,
    lastName,
    profilePicture,
    userName,
}) => {
    console.log({ firstName, lastName })
    return (
        <LikeProfileBoxStyle>
            <div className="d-flex align-items-center">
                {firstName ? (
                    <BaseImgContainer
                        className="profile-icon"
                        img_url={profilePicture}
                        alt={firstName}
                    />
                ) : (
                    <img
                        className="profile-icon"
                        src={placeholder as string}
                        alt={userName}
                    />
                )}
                <div className="profile-details mt-2">
                    <h6 className="profile-details-title mb-0">
                        {firstName} {lastName}
                        {/* <span>
              <img
                className="ms-1 verified-icon"
                src={verifiedIcon}
                alt="verified"
              />
            </span> */}
                    </h6>
                    <p className="profile-details-sub-title w-100">
                        {userName}
                    </p>
                </div>
            </div>
        </LikeProfileBoxStyle>
    )
}

export default LikeProfileBox

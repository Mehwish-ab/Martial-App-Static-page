import verifiedIcon from '../../assets/icons/ic_verifed.svg'
import { ProfileIntroStyle } from './style'

type SuggestedUserProfileProps = {
    btnText?: string
    btnColor?: string
    btnBgColor?: string
    profileName?: string
    userName?: string
    border?: string
    verfied?: boolean
}
const SuggestedUserProfile: React.FC<SuggestedUserProfileProps> = ({}) => {
    return (
        <ProfileIntroStyle>
            <div className="d-flex align-items-center">
                {/* <BaseImgContainer
            img_url={userProfilePicture}
            alt={userFirstName + userLastName}
          /> */}
                <div className="profile-details mt-2">
                    <h6 className="profile-details-title mb-0">
                        name
                        <span>
                            <img
                                className="ms-1 verified-icon"
                                src={verifiedIcon as string}
                                alt="verified"
                            />
                        </span>
                    </h6>
                    <p className="profile-details-sub-title w-100">
                        serUserName
                    </p>
                </div>
            </div>
        </ProfileIntroStyle>
    )
}

export default SuggestedUserProfile

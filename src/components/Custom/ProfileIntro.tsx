import verifiedIcon from '../../assets/icons/ic_verifed.svg'
import CustomButton from '../CustomButton/CustomButton'
import { BaseImgContainer, primaryColor } from '../GlobalStyle'
import { followerUserTypes } from '../Modals/FollowersModal'
import { ProfileIntroStyle } from './style'
import profile_placeholder from '../../assets/icons/ic_profile_placeholder.svg'

type profileIntroProps = {
    btnText?: string
    btnColor?: string
    btnBgColor?: string
    profileName?: string
    userName?: string
    border?: string
    verfied?: boolean
} & followerUserTypes
const ProfileIntro: React.FC<profileIntroProps> = ({
    btnText = 'text',
    btnColor = primaryColor,
    btnBgColor = 'white',
    border = 'none',
    userFirstName,
    userLastName,
    userProfilePicture,
    userUserName,
}) => {
    return (
        <ProfileIntroStyle>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    {userProfilePicture ? (
                        <BaseImgContainer
                            className="property-listing-icon"
                            img_url={userProfilePicture}
                            alt={userFirstName + userLastName}
                        />
                    ) : (
                        <img
                            src={profile_placeholder as string}
                            className="property-listing-icon"
                            alt="place-holder"
                        />
                    )}

                    <div className="profile-details mt-2">
                        <h6 className="profile-details-title mb-0">
                            {userFirstName} {userLastName}
                            <span>
                                <img
                                    className="ms-1 verified-icon"
                                    src={verifiedIcon as string}
                                    alt="verified"
                                />
                            </span>
                        </h6>
                        <p className="profile-details-sub-title w-100">
                            {userUserName}
                        </p>
                    </div>
                </div>
                <CustomButton
                    bgcolor={btnBgColor}
                    color={btnColor}
                    padding="2px"
                    width="100px"
                    type="submit"
                    title={btnText}
                    margin="auto"
                    border={border}
                    fontFamily="EnnVisionsMedium"
                    fontSize="14px"
                    clicked={() => {}}
                />
            </div>
        </ProfileIntroStyle>
    )
}

export default ProfileIntro

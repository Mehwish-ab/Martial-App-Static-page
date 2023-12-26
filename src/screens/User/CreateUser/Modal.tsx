import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/icons/ic_logo.svg'
import CustomButton from '../../../components/CustomButton/CustomButton'
import { fontFamilyMedium, primaryColor } from '../../../components/GlobalStyle'
import { CreatedUserModalStyle } from './style'

const CreatedUserModal = () => {
    const navigate = useNavigate()
    return (
        <CreatedUserModalStyle>
            <div className="inner-container">
                <img src={logo} alt="logo" />
                <h6 className="account-created my-2">
                    Congratulations! Your Account Has Been{' '}
                </h6>
                <p className="message">
                    Successfully Created. Thank You For Joining Us And We're
                    Excited To Have You On Board
                </p>
                <div className="mt-1">
                    <CustomButton
                        bgcolor="transparent"
                        color={primaryColor}
                        padding="8px 8px"
                        width="100%"
                        type="submit"
                        title="DISMISS"
                        margin="auto"
                        fontFamily={fontFamilyMedium}
                        fontSize="18px"
                        clicked={() => navigate('/users-list')}
                    />
                </div>
            </div>
        </CreatedUserModalStyle>
    )
}

export default CreatedUserModal

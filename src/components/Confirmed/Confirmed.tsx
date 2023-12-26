import logo from '../../assets/icons/ic_logo.svg'
import CustomButton from '../CustomButton/CustomButton'
import { lightBlue } from '../GlobalStyle'
import ConfirmedStyle from './style'
const Confirmed = () => {
    return (
        <ConfirmedStyle>
            <div className="inner-container">
                <img src={logo} alt="logo" />
                <p className="message">
                    Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed
                    Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna
                </p>
                <div className="mt-4">
                    <CustomButton
                        bgcolor={lightBlue}
                        color="white"
                        padding="8px 8px"
                        width="100%"
                        type="submit"
                        title="THANKS!"
                        margin="auto"
                        fontSize="16px"
                    />
                </div>
            </div>
        </ConfirmedStyle>
    )
}

export default Confirmed

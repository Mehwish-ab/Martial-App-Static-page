import { FC } from 'react'
import logo from '../../assets/icons/ic_logo.svg'
import CustomButton from '../CustomButton/CustomButton'
import { lightBlue, secondaryDark3, tertiaryGrey13 } from '../GlobalStyle'
import ConfirmationStyle from './style'

interface Props {
    setIsModalVisible: (isModal: boolean) => void
}

const Index: FC<Props> = ({ setIsModalVisible }): JSX.Element => {
    return (
        <ConfirmationStyle>
            <div className="inner-container">
                <img src={logo as string} alt="logo" />
                <p className="message">
                    Are You Sure You Want To Delete Your Account? This Action Is
                    Irreversible And All Your Data And Information Associated
                    With The Account Will Be Permanently Deleted.
                </p>
                <div className="mt-4 d-flex gap-2">
                    <CustomButton
                        bgcolor={lightBlue}
                        color="white"
                        padding="8px 8px"
                        width="100%"
                        type="submit"
                        title="Yes"
                        margin="auto"
                        fontSize="16px"
                        clicked={() => setIsModalVisible(false)}
                    />
                    <CustomButton
                        bgcolor={tertiaryGrey13}
                        color={secondaryDark3}
                        padding="8px 8px"
                        width="100%"
                        type="submit"
                        title="Cancel"
                        margin="auto"
                        fontSize="16px"
                        clicked={() => setIsModalVisible(false)}
                    />
                </div>
            </div>
        </ConfirmationStyle>
    )
}

export default Index

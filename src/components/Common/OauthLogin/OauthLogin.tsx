import styled from 'styled-components'
import GoogleLogin from './GoogleLogin'
import FacebookLogin from './FacebookLogin'
import AppleLogin from './AppleLogin'
import MicroSoftLogin from './MicroSoftLogin'
import { OauthPropTypes } from './constants'
// import DiscordLogin from './DiscordLogin'

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    gap: 10px;
    margin-top: 20px;

    .social-auth-btn {
        padding: 17px;
        border-radius: 10px;
        border: 1px solid #eaeaea;
        justify-content: center;
        cursor: pointer;
        p {
            font-size: 14px;
        }
    }
    @media screen and (max-width: 425px) {
        .social-auth-btn {
            padding: 10px;
        }
    }
`

const OauthLogin = ({ useCase }: OauthPropTypes): JSX.Element => {
    return (
        <Wrapper>
            <GoogleLogin useCase={useCase} />
            <FacebookLogin useCase={useCase} />
            <AppleLogin useCase={useCase} />
            <MicroSoftLogin useCase={useCase} />
            {/* <DiscordLogin /> */}
        </Wrapper>
    )
}

export default OauthLogin

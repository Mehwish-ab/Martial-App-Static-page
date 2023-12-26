import styled from 'styled-components'
import GoogleLogin from './GoogleLogin'
import FacebookLogin from './FacebookLogin'
import AppleLogin from './AppleLogin'
import MicroSoftLogin from './MicroSoftLogin'
import { OauthPropTypes } from './constants'
import DiscordLogin from './DiscordLogin'

const OauthLogin = ({ usecase }: OauthPropTypes) => {
    return (
        <Wrapper>
            <GoogleLogin usecase={usecase} />
            <FacebookLogin usecase={usecase} />
            <AppleLogin usecase={usecase} />
            <MicroSoftLogin usecase={usecase} />
            <DiscordLogin />
        </Wrapper>
    )
}

export default OauthLogin

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
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

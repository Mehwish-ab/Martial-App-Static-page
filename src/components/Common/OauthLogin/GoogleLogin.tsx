import { LoginSocialGoogle } from 'reactjs-social-login'
import type { IResolveParams } from 'reactjs-social-login'
import LoginButton from './LoginButton'
import google from '../../../assets/icons/ic_google.svg'
import { OAUTH_USECASES, OauthApiValueTypes, OauthPropTypes } from './constants'
import useOauthLogin from '../../../hooks/useOauthLogin'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID!
const redirect_uri = process.env.REACT_APP_GOOGLE_REDIRECT_URL!
const GoogleLogin = ({ useCase }: OauthPropTypes): JSX.Element => {
    const { handleSignin, handleSignup } = useOauthLogin()

    const onResolve = (res: IResolveParams): void => {
        console.log('>>google res:', res)
        const payload: OauthApiValueTypes = {
            authProvider: 'GOOGLE',
            accessToken: res?.data?.access_token || '',
            ...res.data,
        }
        if (useCase === OAUTH_USECASES.login) {
            console.log('>>google ressss:', res)
            handleSignin(payload)
        } else if (useCase === OAUTH_USECASES.register) {
            handleSignup(payload)
        }
    }
    const onReject = (err: unknown): void => {
        console.log('google error', err)
    }

    return (
        <LoginSocialGoogle
            client_id={clientId}
            discoveryDocs="claims_supported"
            redirect_uri={redirect_uri}
            onResolve={onResolve}
            onReject={onReject}
            // scope="https://www.googleapis.com/auth/userinfo.email"
            scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
        >
            <LoginButton type={google as string} alt={'Google'} />
        </LoginSocialGoogle>
    )
}

export default GoogleLogin

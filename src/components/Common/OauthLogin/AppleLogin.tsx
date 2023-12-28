import { LoginSocialApple } from 'reactjs-social-login'
import type { IResolveParams } from 'reactjs-social-login'
import apple from '../../../assets/icons/ic_apple.svg'
import { OAUTH_USECASES, OauthApiValueTypes, OauthPropTypes } from './constants'
import LoginButton from './LoginButton'
import useOauthLogin from '../../../hooks/useOauthLogin'
const clientId = 'com.innovatelq.maritalschool'
const redirect_uri = process.env.REACT_APP_APPLE_REDIRECT_URL
const AppleLogin = ({ useCase }: OauthPropTypes): JSX.Element => {
    const { handleSignin, handleSignup } = useOauthLogin()
    const onResolve = (res: IResolveParams): void => {
        console.log('apple success response:', res)
        const payload: OauthApiValueTypes = {
            authProvider: 'APPLE',
            accessToken: res.data?.authorization?.code || '',
        }
        if (useCase === OAUTH_USECASES.login) {
            handleSignin(payload)
        } else if (useCase === OAUTH_USECASES.register) {
            handleSignup(payload)
        }
    }
    const onReject = (err: unknown): void => {
        console.log('apple error response:', err)
    }

    return (
        <LoginSocialApple
            client_id={clientId}
            onResolve={onResolve}
            onReject={onReject}
            scope={'name email'}
            redirect_uri={redirect_uri}
        >
            <LoginButton type={apple as string} alt={'Apple'} />
        </LoginSocialApple>
    )
}

export default AppleLogin

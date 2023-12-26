import { IResolveParams, LoginSocialApple } from 'reactjs-social-login'
import apple from '../../../assets/icons/ic_apple.svg'
import { OAUTH_USECASES, OauthApiValueTypes, OauthPropTypes } from './constants'
import LoginButton from './LoginButton'
import useOauthLogin from '../../../hooks/useOauthLogin'

const clientId = 'com.martialapp.latestservice-id' // need to change this
const AppleLogin = ({ usecase }: OauthPropTypes) => {
    const { handleSignin, handleSignup } = useOauthLogin()
    const onResolve = (res: IResolveParams) => {
        console.log('apple success response:', res)
        let payload: OauthApiValueTypes = {
            authProvider: 'APPLE',
            accessToken: res.data?.authorization?.code || '',
        }
        if (usecase === OAUTH_USECASES.login) {
            handleSignin(payload)
        } else if (usecase === OAUTH_USECASES.register) {
            handleSignup(payload)
        }
    }
    const onReject = (err: any) => {
        console.log('apple error response:', err)
    }

    return (
        <LoginSocialApple
            client_id={clientId}
            onResolve={onResolve}
            onReject={onReject}
            scope={'name email'}
            // redirect_uri="http://localhost:3000/auth/callback/apple"
            redirect_uri="https://maritalschool.innovatelq.com/auth/callback/apple"
        >
            <LoginButton type={apple} alt={'Apple'} />
        </LoginSocialApple>
    )
}

export default AppleLogin

import { LoginSocialFacebook } from 'reactjs-social-login'
import type { IResolveParams } from 'reactjs-social-login'
import LoginButton from './LoginButton'
import facebook from '../../../assets/icons/ic_facebook.svg'
import useOauthLogin from '../../../hooks/useOauthLogin'
import { OAUTH_USECASES, OauthApiValueTypes, OauthPropTypes } from './constants'

const appId = '523603052429786'

const FacebookLogin = ({ useCase }: OauthPropTypes): JSX.Element => {
    const { handleSignup, handleSignin } = useOauthLogin()
    const onResolve = (res: IResolveParams): void => {
        console.log('facebook res:', res)
        const payload: OauthApiValueTypes = {
            authProvider: 'FACEBOOK',
            accessToken: res.data?.accessToken || '',
        }
        if (useCase === OAUTH_USECASES.login) {
            handleSignin(payload)
        } else if (useCase === OAUTH_USECASES.register) {
            handleSignup(payload)
        }
    }
    const onReject = (err: unknown): void => {
        console.log('facebook error', err)
    }

    return (
        <LoginSocialFacebook
            isOnlyGetToken
            appId={appId}
            onResolve={onResolve}
            onReject={onReject}
        >
            <LoginButton type={facebook as string} alt="Facebook" />
        </LoginSocialFacebook>
    )
}
export default FacebookLogin

import { IResolveParams, LoginSocialFacebook } from 'reactjs-social-login'
import LoginButton from './LoginButton'
import facebook from '../../../assets/icons/ic_facebook.svg'
import useOauthLogin from '../../../hooks/useOauthLogin'
import { OAUTH_USECASES, OauthApiValueTypes, OauthPropTypes } from './constants'

const appId = '523603052429786'

const FacebookLogin = ({ usecase }: OauthPropTypes) => {
    const { handleSignup, handleSignin } = useOauthLogin()
    const onResolve = (res: IResolveParams) => {
        console.log('facebook res:', res)
        let payload: OauthApiValueTypes = {
            authProvider: 'FACEBOOK',
            accessToken: res.data?.accessToken || '',
        }
        if (usecase === OAUTH_USECASES.login) {
            handleSignin(payload)
        } else if (usecase === OAUTH_USECASES.register) {
            handleSignup(payload)
        }
    }
    const onReject = (err: any) => {
        console.log('facebook error', err)
    }

    return (
        <LoginSocialFacebook
            isOnlyGetToken
            appId={appId}
            onResolve={onResolve}
            onReject={onReject}
        >
            <LoginButton type={facebook} alt="Facebook" />
        </LoginSocialFacebook>
    )
}
export default FacebookLogin

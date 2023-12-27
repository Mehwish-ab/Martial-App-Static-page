import { LoginSocialGoogle } from 'reactjs-social-login'
import type { IResolveParams } from 'reactjs-social-login'
import LoginButton from './LoginButton'
import google from '../../../assets/icons/ic_google.svg'
import { OAUTH_USECASES, OauthApiValueTypes, OauthPropTypes } from './constants'
import useOauthLogin from '../../../hooks/useOauthLogin'

const clientId =
    '617581219227-ud3vvdk5req4poungvrt8i8b8os51sbt.apps.googleusercontent.com' // actual project
// const clientId =
// "457101781736-cgfvokh8l1gs4nbgpohso51t710in0fe.apps.googleusercontent.com"; //umair testing project
// const clientId =
// "225264675338-fmh7lku6vb1b6rsg544fc431dic4qu0n.apps.googleusercontent.com"; // arslan testing project

const GoogleLogin = ({ useCase }: OauthPropTypes): JSX.Element => {
    const { handleSignin, handleSignup } = useOauthLogin()
    const onResolve = (res: IResolveParams): void => {
        console.log('google res:', res)
        const payload: OauthApiValueTypes = {
            authProvider: 'GOOGLE',
            accessToken: res.data?.access_token || '',
        }
        if (useCase === OAUTH_USECASES.login) {
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
            onResolve={onResolve}
            onReject={onReject}
            scope="https://www.googleapis.com/auth/userinfo.email"
        >
            <LoginButton type={google as string} alt={'Google'} />
        </LoginSocialGoogle>
    )
}

export default GoogleLogin

// import { LoginSocialMicrosoft } from 'reactjs-social-login'
// import type { IResolveParams } from 'reactjs-social-login'
import LoginButton from './LoginButton'
import microsoft from '../../../assets/icons/ic_microsoft.svg'
import { PublicClientApplication } from '@azure/msal-browser'
import type { IPublicClientApplication } from '@azure/msal-browser'

import { useEffect, useState } from 'react'
import { OAUTH_USECASES, OauthApiValueTypes, OauthPropTypes } from './constants'
import useOauthLogin from '../../../hooks/useOauthLogin'

// // const clientId = "72b29049-5636-4656-af02-98d99e46a018"; // arslan testing project
const clientId = '95b82b00-311b-44b5-a6f8-d46da51e852c'
const config = {
    auth: {
        clientId: clientId,
        redirectUri: process.env.REACT_APP_BASE_URL,
        scope: ['openid', 'profile', 'email', 'User.read'],
        // redirectUri: "https://maritalschool.innovatelq.com/",
    },
    cache: {
        cacheLocation: 'localstorage',
        storeAuthStateInCookie: true,
    },
}

const MicroSoftLogin = ({ useCase }: OauthPropTypes): JSX.Element => {
    const [msalInstance, setMsalInstance] = useState<IPublicClientApplication>()
    const { handleSignin, handleSignup } = useOauthLogin()

    useEffect(() => {
        const initializeMsal = async (): Promise<void> => {
            try {
                const msal = new PublicClientApplication(config)
                await msal.initialize()
                setMsalInstance(msal)
            } catch (err: unknown) {
                console.log('can not register microsoft msal', err)
            }
        }

        initializeMsal()
    }, [])
    const handleClick = async (): Promise<void> => {
        if (msalInstance) {
            try {
                const res = await msalInstance.loginPopup()
                console.log('microsoft response', res)
                const payload: OauthApiValueTypes = {
                    authProvider: 'MICROSOFT',
                    accessToken: res?.accessToken || '',
                }
                if (useCase === OAUTH_USECASES.login) {
                    handleSignin(payload)
                } else {
                    handleSignup(payload)
                }
            } catch (err: unknown) {
                console.log('microsoft login catch error', err)
            }
        } else {
            console.log('microsoft MSAL not initialized yet')
        }
    }

    return (
        <>
            <div onClick={handleClick}>
                <LoginButton type={microsoft as string} alt={'Microsoft'} />
            </div>
        </>
    )
}

export default MicroSoftLogin

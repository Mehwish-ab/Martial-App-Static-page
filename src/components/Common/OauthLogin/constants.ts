export type OauthPropTypes = {
    useCase: string
}

export const OAUTH_USECASES = {
    login: 'LOGIN',
    register: 'REGISTER',
}

export type OauthApiValueTypes = {
    authProvider: string
    accessToken: string
}

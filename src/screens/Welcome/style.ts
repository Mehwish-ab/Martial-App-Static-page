import styled from 'styled-components'
import {
    fontFamilyMedium,
    pureDark2,
    tertiaryGrey8,
    whiteColor,
    darkGery,
    darkBlue,
    fontFamilyRegular,
    lightBlue3,
} from '../../components/GlobalStyle'
export const WelcomeStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: ${tertiaryGrey8};
    margin: -45px auto;
    margin-bottom: 16px;
    height: 100vh;
    p {
        margin-bottom: 0px;
    }

    .login-container {
        &-card {
            max-width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: white;
            border-radius: 6px;
            width: 100%;
            margin: auto;
            padding: 20px 12px;
            background-color: ${whiteColor};
            .title {
                color: ${pureDark2};
                font-size: 22px;
                font-family: ${fontFamilyMedium};
                line-height: 26px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                margin-bottom: 10px;
            }
            .subtitle {
                width: 75%;
                color: ${darkGery};
                font-family: ${fontFamilyRegular};
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
            }
            &-inner {
                width: 96%;
            }

            &-logo {
                text-align: center;
                img {
                    width: 164px;
                    margin-bottom: 0;
                }

                h1 {
                    font-size: 20px;
                    font-weight: 700;
                    color: #1b283f;
                }
            }
        }

        p {
            font-family: ${fontFamilyRegular};
            font-size: 14px;
            color: #000;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
        h6 {
            font-family: ${fontFamilyMedium};
            color: ${darkBlue};
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }

    .loginBtn > div > button {
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .logo {
        height: 70px;
        width: 300px;
        margin-bottom: 15px;
        img {
            height: 100%;
            width: 100%;
        }
    }
    .divider {
        border: 1px solid #d7d7d7;
    }
    .welcome {
        height: 200px;
        width: 300px;
        margin-bottom: 15px;
        img {
            height: 100%;
            width: 100%;
        }
    }

    @media screen and (max-width: 425px) {
        .login-container {
            &-card {
                padding: 20px 16px;
                &-logo {
                    h1 {
                        display: none;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 425px) {
        .subtitle {
            width: 90% !important;
        }
    }
`

export default WelcomeStyle

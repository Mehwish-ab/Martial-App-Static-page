import styled from 'styled-components'
import {
    primaryColor,
    pureDark,
    secondaryDark3,
} from '../../components/GlobalStyle'
import banner from '../../assets/icons/ic_side_banner.svg'

const ResetPasswordStyle = styled.div`
    .left-side-img {
        background-image: url(${banner as unknown as string});
        background-size: contain;
        height: 100vh;
        background-repeat: no-repeat;
    }

    .right-side {
        max-width: 575px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 90vh;
        margin: 0 auto;
        .img-logo {
            img {
                width: 332px;
                height: 66px;
            }
        }
        .main-heading {
            font-size: 28px;
            color: ${secondaryDark3};
            font-weight: 700;
            margin-top: 24px;
            line-height: 30px;
            letter-spacing: 1px;
        }
        .mini-heading {
            color: ${pureDark};
            font-size: 14px;
            font-weight: 700;
        }
        .password-input {
            h6 {
                right: 4%;
                bottom: 15%;
                color: ${primaryColor};
                cursor: pointer;
                font-size: 18px;
            }
        }
        .reset-footer {
            p {
                color: ${primaryColor};
                font-weight: 500;
                cursor: pointer;
                font-size: 18px;
            }
        }
    }
    @media screen and (max-width: 1400px) {
        .left-side-img {
            background-size: cover;
        }
        .right-side {
            max-width: 420px;
            .img-logo {
                img {
                    width: 270px;
                }
            }
            .main-heading {
                font-size: 26px;
                margin-top: 24px;
                line-height: 27px;
            }
            .password-input {
                h6 {
                    font-size: 16px;
                }
            }
            .reset-footer {
                p {
                    font-size: ${18 * 0.8}px;
                }
            }
        }
    }
    @media screen and (max-width: 1024px) {
        .right-side {
            max-width: 350px;

            .img-logo {
                img {
                    width: 230px;
                }
            }
            .main-heading {
                font-size: 24px;
                margin-top: 22px;
                line-height: 24px;
            }
            .password-input {
                h6 {
                    font-size: 14px;
                }
            }
            .reset-footer {
                p {
                    font-size: ${18 * 0.7}px;
                }
            }
        }
    }
`

export default ResetPasswordStyle

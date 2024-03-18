import styled from 'styled-components'
import {
    mediaDeviceMax,
    pureDark2,
    maastrichtBlue,
    lightDark2,
    fontFamilyMedium,
    fontFamilyRegular,
    tertiaryGrey24,
} from '../../components/GlobalStyle'

export const CreateSchoolStyled = styled.div`
    margin-bottom: 20px;
    h3 {
        font-weight: 500;
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        margin-bottom: 2px;
    }
    .form {
        padding: 20px;
        border-radius: 20px;
        @media screen and ${mediaDeviceMax.mobileBS} {
            padding: 20px 5px;
        }
    }
    @media screen and ${mediaDeviceMax.mobileBS} {
        .bVkyTH {
            width: 100% !important;
        }
    }
    .mt-20 {
        .row {
            @media screen and ${mediaDeviceMax.tablet} {
                gap: 20px;
            }
        }
    }
    .checkBoxPara {
        margin-bottom: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        font-family: ${fontFamilyRegular};
    }

    .payment_card {
        border: 1px solid #d9d9d9;
        padding: 16px;
        border-radius: 20px;
    }

    .ant-form label {
        @media screen and (${mediaDeviceMax.laptop}) {
            font-size: 14px !important;
        }
    }

    .ant-input {
        input::placeholder {
            color: ${lightDark2} !important;
        }

        @media screen and (${mediaDeviceMax.laptop}) {
            padding: 10px !important;
        }
    }

    .ant-btn {
        color: ${maastrichtBlue};
    }

    .ant-input-affix-wrapper {
        height: 50px;
        padding-top: 0;
        padding-bottom: 0;
        border-radius: 10px;
        input {
            height: 48px;
            background-color: transparent;
        }
    }
    .ant-input-affix-wrapper {
        .uploadICon {
            position: absolute;
            right: 14px;
        }
        input[type='file'] {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
        }
    }

    div > label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        span {
            color: #4f4f4f;
            font-family: ${fontFamilyRegular};
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }

    .PhoneInput .PhoneInputCountry {
        height: 50px !important;
        margin-top: 1px !important;
    }
    .PhoneInput input {
        height: 50px !important;
    }
`
export const StudentViewStyling = styled.div`
    .ant-card-bordered {
        border: none;
    }
    .ant-card-body {
        padding: 20px;
    }
    h3 {
        color: ${pureDark2};
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    @media screen and ${mediaDeviceMax.mobileBS} {
        .gZsrvq {
            width: 100%;
        }
    }

    .ant-card.ant-card-bordered {
        border-radius: 12px;
        // border: 1px solid ${tertiaryGrey24};

        .list-item {
            border-bottom: 1px solid ${tertiaryGrey24};
            padding-bottom: 8px;
            margin-bottom: 20px;

            &-title {
                color: ${lightDark2};
                font-family: ${fontFamilyRegular};
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;

                @media screen and ${mediaDeviceMax.laptop} {
                    font-size: 12px;
                }
            }

            &-value {
                margin-top: 6px;
                font-size: 16px;
                color: ${pureDark2};
                font-weight: 400;
                font-family: ${fontFamilyRegular};
                word-break: break-word;

                @media screen and ${mediaDeviceMax.laptop} {
                    font-size: 14px;
                }
            }
        }
    }
    @media screen and ${mediaDeviceMax.mobileBS} {
        .image_section {
            margin-bottom: 90px;
        }
        .profileImg > .img {
            width: 120px;
            height: 120px;
            bottom: -60px;
            left: 0;
            right: 0;
            margin: auto;
        }
        .bannerImg {
            height: 200px;
        }
    }
`

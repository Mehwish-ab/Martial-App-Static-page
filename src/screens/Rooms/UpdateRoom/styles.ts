import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    maastrichtBlue,
    mediaDeviceMax,
    pureDark2,
} from '../../../components/GlobalStyle'

export const CreateRoomsStyle = styled.div`
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
`

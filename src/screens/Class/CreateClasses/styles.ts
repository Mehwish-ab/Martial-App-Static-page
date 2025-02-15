import styled from 'styled-components'
import {
    fontFamilyMedium,
    pureDark2,
    lightDark2,
    fontFamilyRegular,
    mediaDeviceMax,
    maastrichtBlue,
} from '../../../components/GlobalStyle'

export const CreateClassStyled = styled.div`
    margin-bottom: 20px;
    .form {
        padding: 16px;
        border-radius: 12px;
        h3 {
            font-size: 18px;
            font-family: ${fontFamilyMedium};
            color: ${pureDark2};
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }

    .mt-20 {
        .row {
            @media screen and ${mediaDeviceMax.tablet} {
                gap: 20px;
            }
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

    .bannerTitle {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        font-family: ${fontFamilyRegular};
        color: ${pureDark2};
        margin-bottom: 12px;
    }

    .bannerImg {
        height: 365px;
    }

    .bannerImg .changeBannerImgButton {
        position: absolute;
        top: 314px;
        right: 10px;
    }

    .profileImg {
        display: none;
    }

    .checkBoxPara {
        margin-bottom: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        font-family: ${fontFamilyRegular};
        white-space: pre-wrap;
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

    .iGXrnw {
        margin-top: 0px !important;
    }
`

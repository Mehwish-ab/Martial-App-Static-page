import styled from 'styled-components'
import {
    fontFamilyMedium,
    pureDark2,
    lightDark2,
    fontFamilyRegular,
    mediaDeviceMax,
    tertiaryGrey24,
} from '../../../components/GlobalStyle'

export const ViewClassStyle = styled.div`
    .ant-card-body {
        padding: 20px;
    }
    h3 {
        margin: 16px 0;
        color: ${pureDark2};
        font-size: 18px;
        padding-left: 20px;
        font-family: ${fontFamilyMedium};
    }
    @media screen and ${mediaDeviceMax.mobileBS} {
        .gZsrvq {
            width: 100%;
        }
    }

    .bannerImg {
        height: 345px;
    }

    .bannerImg .changeBannerImgButton {
        position: absolute;
        top: 298px;
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

    .ant-card.ant-card-bordered {
        border-radius: 12px;
        border: 1px solid ${tertiaryGrey24};

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

                span {
                    color: #4f4f4f;
                    font-family: ${fontFamilyRegular};
                    font-size: 10px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
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
`

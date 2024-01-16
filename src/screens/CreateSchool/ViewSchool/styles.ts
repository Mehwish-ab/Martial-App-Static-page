import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    mediaDeviceMax,
    pureDark2,
    tertiaryGrey24,
} from '../../../components/GlobalStyle'

export const ViewSchoolStyled = styled.div`
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
export const ViewSchoolTabs = styled.div`
    .tab {
        overflow: hidden;
    }

    .tab button {
        background-color: inherit;
        float: left;
        border: none;
        outline: none;
        cursor: pointer;
        padding: 14px 16px;
        transition: 0.3s;
        font-size: 16px;
        font-family: ${fontFamilyRegular};
        color: ${pureDark2};
        font-weight: 400;
    }

    .tab button:hover {
        font-family: ${fontFamilyMedium};
    }

    .tab button.active {
        border-bottom: 2px solid black;
        font-family: ${fontFamilyMedium};
    }

    .tabsLink {
        display: block;
    }
`

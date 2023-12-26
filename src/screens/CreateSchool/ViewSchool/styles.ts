import styled from 'styled-components'
import {
    fontFamilyBold,
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    mediaDeviceMax,
    pureDark2,
    tertiaryGrey24,
} from '../../../components/GlobalStyle'

export const ViewSchoolStyled = styled.div`
    h3 {
        margin: 16px 0;
        color: ${pureDark2};
        font-size: 18px;
        padding-left: 20px;
        font-family: ${fontFamilyMedium};
    }

    .ant-card.ant-card-bordered {
        border-radius: 20px !important;
        border-radius: 10px;
        border: 1px solid #e0e0e0;

        .list-item {
            border-bottom: 1px solid ${tertiaryGrey24};
            padding-bottom: 8px;
            margin-bottom: 20px;

            &-title {
                color: ${lightDark2};
                font-family: ${fontFamilyRegular};
                font-size: 12px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;

                @media screen and ${mediaDeviceMax.laptop} {
                    font-size: 12px;
                }
            }

            &-value {
                font-size: 14px;
                color: ${pureDark2};
                font-weight: 400;
                font-family: ${fontFamilyRegular};

                @media screen and ${mediaDeviceMax.laptop} {
                    font-size: 14px;
                }
            }
        }
    }
`

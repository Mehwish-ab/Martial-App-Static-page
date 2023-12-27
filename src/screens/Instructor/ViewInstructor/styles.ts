import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    mediaDeviceMax,
    pureDark2,
    tertiaryGrey24,
} from '../../../components/GlobalStyle'

export const ViewInstructorStyled = styled.div`
    h3 {
        margin: 16px 0;
        color: ${pureDark2};
        font-family: ${fontFamilyMedium};
        font-size: 18px;
        font-weight: 500;
        font-style: normal;
        line-height: normal;
    }
    .checkBoxPara {
        margin-bottom: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        font-family: ${fontFamilyRegular};
    }
    .ant-card.ant-card-bordered {
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
                font-weight: 500;
                font-family: ${fontFamilyRegular};

                @media screen and ${mediaDeviceMax.laptop} {
                    font-size: 14px;
                }
            }
        }
    }
`

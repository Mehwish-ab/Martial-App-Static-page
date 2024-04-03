import Styled from 'styled-components'
import {
    darkBlue,
    fontFamilyBold,
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    mediaDeviceMax,
    pureDark2,
    tertiaryGrey24,
} from '../../components/GlobalStyle'

export const ActivityStyle = Styled.div`
 .form {
        padding: 16px;
        border-radius: 12px;
    }
    h3 {
        margin: 16px 0;
        color: ${pureDark2};
        font-size: 18px;
        padding-left: 20px;
        font-family: ${fontFamilyMedium};
    }
       .table-title {
        font-size: 23px !important;
        font-family: ${fontFamilyBold} !important;
        text-align:center
    }
    .p{
            text-align:center
    }
    @media screen and ${mediaDeviceMax.mobileBS} {
        .gZsrvq {
            width: 100%;
        }
    }

    .list-item {
        border-bottom: 1px solid ${tertiaryGrey24};
        padding-bottom: 8px;

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
            margin-top: 28px;
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
    .certificate label {
        margin-bottom: 7px;
    }
`

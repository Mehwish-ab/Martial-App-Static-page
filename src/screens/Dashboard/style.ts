import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark,
    lightDark2,
    pureDark2,
} from '../../components/GlobalStyle'

export const DashboardStyle = styled.div`
    .boxBG {
        .title {
            font-size: 18px;
            font-family: ${fontFamilyMedium};
            color: ${pureDark2};
            font-weight: 500;
        }
        p {
            font-size: 16px;
            font-family: ${fontFamilyRegular};
            color: ${lightDark2};
        }
    }
    p {
        margin: 0px;
    }
    .boxes {
        background-color: white;
        border-radius: 8px;
        padding: 16px;
        height: 167px;
        &-title {
            margin-top: 10px;
            font-size: 18px;
            font-family: ${fontFamilyMedium};
            color: ${pureDark2};
            font-weight: 500;
        }
        .threeDots {
            padding: 0px 4px;
            cursor: pointer;
        }

        .totalSchool {
            font-size: 14px;
            font-family: ${fontFamilyMedium};
            color: ${pureDark2};
            font-weight: 500;
        }
        .totalSchool_users {
            font-size: 22px;
            font-family: ${fontFamilyMedium};
            color: ${pureDark2};
            font-weight: 500;
        }
    }

    .BoxDiv {
        background-color: white;
        padding: 16px;
        border-radius: 8px;
    }

    .sub-text {
        color: #804eea;
    }

    .bottom-text {
        text-align: center;
        color: ${lightDark};
        font-family: ${fontFamilyRegular};
        font-size: 16px;
    }
`

import styled from 'styled-components'
import {
    pureDark2,
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    lightGrey12,
} from '../../../components/GlobalStyle'

export const ReportCreateStyle = styled.div`
    .title {
        font-weight: 500;
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        margin-bottom: 2px;
    }

    .sub-title {
        font-weight: 500;
        font-size: 16px;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        margin-bottom: 2px;
    }
    .description {
        margin: 7px 0 0 0;
        color: ${lightDark2};
        font-family: ${fontFamilyRegular};
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .reportList li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        cursor: pointer;
        margin: 5px 0px;
        &:hover {
            background-color: ${lightGrey12};
            border-radius: 8px;
        }
        p {
            font-weight: 500;
            font-size: 16px;
            font-family: ${fontFamilyMedium};
            color: ${pureDark2};
            margin-bottom: 2px;
        }
    }
`

import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    pureDark2,
} from '../components/GlobalStyle'

export const SchoolSuccessfulModals = styled.div`
    .mainContainer {
        &-heading {
            margin: 15px 0 0 0;
            color: ${pureDark2};
            font-family: ${fontFamilyMedium};
            font-size: 22px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
        &-subText {
            margin: 7px 0 0 0;
            color: ${pureDark2};
            font-family: ${fontFamilyRegular};
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
`

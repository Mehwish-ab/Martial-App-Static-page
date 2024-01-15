import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    mediaDeviceMax,
    pureDark2,
} from '../components/GlobalStyle'

export const SchoolSuccessfulModals = styled.div`
    .mainContainer {
        img {
            height: 79px;
            width: 79px;

            @media screen and ${mediaDeviceMax.mobileBS} {
                height: 50px;
                width: 50px;
            }
        }
        &-heading {
            margin: 15px 0 0 0;
            color: ${pureDark2};
            font-family: ${fontFamilyMedium};
            font-size: 22px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            @media screen and ${mediaDeviceMax.mobileBS} {
                font-size: 18px;
            }
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

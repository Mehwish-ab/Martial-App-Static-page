import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark3,
    mediaDeviceMax,
    pureDark2,
    tertiaryGrey21,
} from '../../../components/GlobalStyle'

export const CustomDiv = styled.div`
    margin-bottom: 20px;
    .table-heading {
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .mainWrapper {
        display: flex;
        flex-direct: row;
        align-items: center;
        justify-content: space-between;
        @media screen and ${mediaDeviceMax.tablet} {
            flex-direction: column;
            h3 {
                align-self: flex-start;
            }
            .FilterMainContainer {
                width: 100%;
                align-self: flex-end;
            }
        }
    }
    .FilterMainContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;
        gap: 12px;
    }

    .todayPlusContainer {
        display: flex;
        align-items: center;
        gap: 12px;
        @media screen and ${mediaDeviceMax.tabletS} {
            width: 100%;
        }
        .dateToday {
            @media screen and ${mediaDeviceMax.tabletS} {
                width: 100%;
            }
            & > p {
                font-size: 15px;
                font-family: ${fontFamilyMedium};
                font-style: normal;
                font-weight: 500;
                line-height: normal;
            }
        }
        & > div:last-child button {
            height: 40px;
            width: 40px;
        }
    }

    .dateRange {
        gap: 17px;
        @media screen and (${mediaDeviceMax.mobileXL}) {
            width: 100%;
        }
        p {
            color: ${lightDark3};
            font-size: 14px;
            margin-bottom: 0;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            font-family: ${fontFamilyRegular};
            > span {
                font-weight: 500;
                font-family: ${fontFamilyMedium};
            }
        }
        img {
            @media screen and (${mediaDeviceMax.mobileS}) {
                display: none;
            }
        }
    }

    .arrowsMain {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .arrowLeft,
    .arrowRight,
    .dateRange,
    .dateToday {
        border-radius: 8px;
        border: 1px solid ${tertiaryGrey21};
        background: #fff;
        color: ${lightDark3};
        padding: 10px 10px;
        height: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    p {
        margin-bottom: 0;
    }
`

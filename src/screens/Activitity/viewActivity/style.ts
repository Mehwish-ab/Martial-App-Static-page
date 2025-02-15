import styled from 'styled-components'
import {
    fontFamilyMedium,
    pureDark2,
    lightDark2,
    fontFamilyRegular,
    mediaDeviceMax,
    tertiaryGrey24,
    BallBlue,
    whiteColor,
    AntiFlashWhite,
    AlizarinCrimson,
    mediaDeviceMin,
    darkGery,
} from '../../../components/GlobalStyle'

export const ListActivityStyle = styled.div`
    background-color: #fff;
    padding: 16px 0px;
    border-radius: 20px;

    .table-heading {
        font-size: 18px !important;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        font-weight: 500;
    }

    .ant-table-thead > tr > th {
        height: 34px;
        background: transparent !important;
        border-bottom: none;
        color: ${pureDark2};
        font-weight: 500;
        padding: 4px;
        font-family: ${fontFamilyMedium};
        font-size: 16px;
        &::before {
            display: none !important;
        }
    }
    .ant-table-tbody tr > .ant-table-cell {
        height: 50px;
    }
    .ant-table-tbody > tr > .ant-table-cell,
    .ant-table-tbody > tr > .ant-table-cell a {
        font-family: ${fontFamilyRegular};
        font-size: 14px;
        color: ${darkGery};
        padding: 4px;
        font-weight: 400;
        p {
            margin-bottom: 0px;
        }
    }

    .ant-table-thead > tr > th:first-child,
    .ant-table-tbody > tr > td:first-child {
        text-align: left;
        padding: 0px 0px 0px 5px;
    }
    // .ant-table-thead > tr > th:nth-child(0),
    // .ant-table-tbody > tr > td:nth-child(5) {
    //     width: 30%;
    // }
    .ant-table-thead > tr > th:last-child,
    .ant-table-tbody > tr > td:last-child {
        text-align: center;
    }

    .ant-table-tbody > tr > td:nth-child(5) div {
        position: relative;
        width: 107px;
    }
    .ant-table-tbody > tr > td:nth-child(5) .Active button {
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 7px 10px;
        border-radius: 4px;
        background: rgb(76, 175, 80);
        width: 90px;
        height: 30px;
        color: rgb(255, 255, 255) !important;
        font-size: 14px !important;
        display: block;
        position: relative;
        text-align: center;
    }
    .ant-table-tbody > tr > td:nth-child(5) .De-Active button {
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 7px 10px;
        border-radius: 4px;
        background: ${AlizarinCrimson};
        width: 90px;
        height: 30px;
        color: rgb(255, 255, 255);
        font-size: 14px;
        display: block;
        position: relative;
        text-align: center;
    }
    .ant-table-tbody > tr > td:nth-child(5) img {
        position: absolute;
        right: 6%;
        top: -5px;
    }
    .ant-table-tbody > tr:nth-child(even) td {
        background-color: #fafafa;
    }
    .ant-table-tbody > tr:nth-child(odd) td {
        background-color: #fff;
    }
    .ant-dropdown-trigger {
        text-align: center;
    }

    // @media screen and ${mediaDeviceMax.tabletL} {
    //     .ant-table-thead > tr > th:nth-child(4),
    //     .ant-table-tbody > tr > td:nth-child(3) {
    //         display: none;
    //     }
    //     .ant-table-thead > tr > th:nth-child(2),
    //     .ant-table-thead > tr > th:nth-child(2),
    //     .ant-table-thead > tr > th:nth-child(3),
    //     .ant-table-thead > tr > th:nth-child(4) {
    //         width: 16.6%;
    //     }
    // }
    // @media screen and ${mediaDeviceMax.mobileBS} {
    //     .ant-table-thead > tr > th:nth-child(3),
    //     .ant-table-tbody > tr > td:nth-child(2) {
    //         display: none;
    //     }
    // }
    // @media screen and ${mediaDeviceMax.mobileL} {
    //     .ant-table-thead > tr > th:nth-child(2),
    //     .ant-table-tbody > tr > td:nth-child(1) {
    //         display: none;
    //     }
    // }
    // @media screen and ${mediaDeviceMax.mobileM} {
    //     .ant-table-thead > tr > th:nth-child(3),
    //     .ant-table-tbody > tr > td:nth-child(2) {
    //         display: none;
    //     }
    // }

    // pagination
    .ant-pagination {
        margin-top: 45px;
        padding: 0px 10px;
    }
    .ant-pagination li:first-child {
        @media screen and ${mediaDeviceMin.mobileBS} {
            position: absolute;
            left: 10px;
        }
    }
    .ant-pagination .ant-pagination-options {
        display: none !important;
        opacity: 0;
        visibility: hidden;
        visibility: hidden;
        z-index: -1;
    }
    .ant-pagination-prev .ant-pagination-item-link span,
    .ant-pagination-next .ant-pagination-item-link span {
        position: relative;
    }
    .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination-next .ant-pagination-item-link {
        border: none;
    }
    .ant-pagination-prev .ant-pagination-item-link span:before {
        content: 'Prev';
        font-family: ${fontFamilyMedium};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        display: block;
    }
    .ant-pagination-next .ant-pagination-item-link span:before {
        content: 'Next';
        font-family: ${fontFamilyMedium};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        display: block;
    }
    .ant-pagination-prev .ant-pagination-item-link span svg,
    .ant-pagination-next .ant-pagination-item-link span svg {
        display: none;
    }
    .ant-pagination-item {
        width: 32px !important;
        height: 32px !important;
        border-radius: 8px;
        border: 1px solid ${AntiFlashWhite};
    }
    .ant-pagination-item a {
        border-radius: 8px;
        background: ${whiteColor};
        line-height: normal;
        padding: 7px 0px 8px 0px;
    }
    .ant-pagination-item-active a {
        border-radius: 8px;
        background: ${BallBlue};
        color: ${whiteColor};
        line-height: normal;
        padding: 7px 0px 8px 0px;
    }
    .ant-pagination-total-text {
        color: #333;
        font-family: ${fontFamilyMedium};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        display: inline-block;
        > span > span {
            width: 47px;
            padding: 7px 31px 8px 9px;
            border-radius: 8px;
            border: 1px solid #f1f1f1;
            display: inline-block;
            margin: 0px 10px;
        }
    }
`

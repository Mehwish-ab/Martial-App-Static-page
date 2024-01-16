import styled from 'styled-components'
import {
    AlizarinCrimson,
    AntiFlashWhite,
    BallBlue,
    darkGery,
    fontFamilyMedium,
    fontFamilyRegular,
    mediaDeviceMax,
    mediaDeviceMin,
    pureDark2,
    whiteColor,
    // mainColor,
} from '../../../components/GlobalStyle'

export const ListInstructorStyled = styled.div`
    background-color: #fff;
    padding: 16px;
    border-radius: 10px;
    p {
        margin-bottom: 0px;
    }

    @media screen and ${mediaDeviceMin.tabletL} {
        .ant-table-content table {
            width: 100% !important;
        }
    }
    @media screen and ${mediaDeviceMax.tabletL} {
        .ant-table-content table {
            width: 100% !important;
            min-width: 1080px !important;
        }
    }

    .table-heading {
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    .ant-table-thead > tr > th {
        background: transparent !important;
        border-bottom: none !important;
        color: ${pureDark2};
        font-family: ${fontFamilyMedium};
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
        padding: 4px;
        &::before {
            display: none !important;
        }
    }

    .ant-table-tbody > tr > .ant-table-cell,
    .ant-table-tbody > tr > .ant-table-cell a {
        font-family: ${fontFamilyRegular};
        font-size: 14px;
        color: ${darkGery};
        font-style: normal;
        font-weight: 400;
        line-height: 23px;
        padding: 4px;
        p {
            margin-bottom: 0px;
        }
    }
    .ant-table-thead > tr > th {
        color: ${darkGery};
    }
    .ant-table-thead > tr > th:first-child,
    .ant-table-tbody > tr > td:first-child {
        width: 4%;
        text-align: center;
    }
    .ant-table-thead > tr > th:nth-child(2),
    .ant-table-tbody > tr > td:nth-child(2) {
        width: 6%;
    }
    .ant-table-thead > tr > th:nth-child(3),
    .ant-table-thead > tr > td:nth-child(3) {
        width: 15%;
    }
    .ant-table-thead > tr > th:nth-child(6),
    .ant-table-tbody > tr > td:nth-child(6) {
        width: 5%;
    }
    .ant-table-thead > tr > th:nth-child(5),
    .ant-table-tbody > tr > td:nth-child(5) {
        width: 12%;
    }
    .ant-table-thead > tr > th:nth-child(6),
    .ant-table-tbody > tr > td:nth-child(6) {
        width: 12%;
        padding-left: 30px;
    }

    .ant-table-thead > tr > th:nth-child(7),
    .ant-table-tbody > tr > td:nth-child(7) {
        width: 13%;
    }
    .ant-table-thead > tr > th:nth-child(4),
    .ant-table-tbody > tr > td:nth-child(4) {
        width: 23%;
    }
    .ant-table-thead > tr > th:nth-child(8),
    .ant-table-tbody > tr > td:nth-child(8) {
        width: 10%;
    }

    .ant-table-tbody > tr > td:nth-child(2),
    .ant-table-tbody > tr > th:nth-child(3),
    .ant-table-tbody > tr > td:nth-child(3) {
        text-align: left;
    }

    .ant-table-tbody > tr > td:nth-child(8) div {
        position: relative;
        width: 116px;
    }
    .ant-table-tbody > tr > td:nth-child(8) .Active button {
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
    .ant-table-tbody > tr > td:nth-child(8) .De-Active button {
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
    .ant-table-tbody > tr > td:nth-child(8) img {
        position: absolute;
        right: 17px;
        top: -5px;
    }
    .ant-table-thead > tr > th:nth-child(9),
    .ant-table-tbody > tr > td:nth-child(9) {
        text-align: center;
    }
    .ant-table-tbody > tr:nth-child(odd) td {
        background-color: #fafafa;
    }
    .ant-table-tbody > tr:nth-child(even) td {
        background-color: #fff;
    }

    // pagination
    .ant-pagination {
        margin-top: 45px;
    }
    .ant-pagination li:first-child {
        @media screen and ${mediaDeviceMin.mobileBS} {
            position: absolute;
            left: 0;
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
        content: 'prev';
        font-family: ${fontFamilyMedium};
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        display: block;
    }
    .ant-pagination-next .ant-pagination-item-link span:before {
        content: 'next';
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

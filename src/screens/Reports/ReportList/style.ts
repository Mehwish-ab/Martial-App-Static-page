import styled from 'styled-components'
import {
    pureDark2,
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark3,
    whiteColor,
    BallBlue,
    AntiFlashWhite,
    mediaDeviceMin,
} from '../../../components/GlobalStyle'

export const ReportListStyle = styled.div`
    h3 {
        font-weight: 500;
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        margin-bottom: 2px;
    }
    background-color: #fff;
    border-radius: 20px;

    .table-heading {
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    .ant-table-thead > tr > th {
        background: transparent;
        border-bottom: none;
        color: ${pureDark2};
        font-family: ${fontFamilyMedium};
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
        padding: 14.04px;
        &::before {
            display: none;
        }
    }

    .ant-table-tbody > tr > .ant-table-cell,
    .ant-table-tbody > tr > .ant-table-cell a {
        padding: 14.04px;
        font-family: ${fontFamilyRegular};
        font-size: 14px;
        color: ${lightDark3};
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }

    .ant-table-tbody > tr > td:nth-child(3),
    .ant-table-tbody > tr > td:nth-child(4),
    .ant-table-tbody > tr > td:nth-child(6),
    .ant-table-tbody > tr > td:nth-child(5) {
        color: #000;
    }
    .ant-table-tbody > tr:nth-child(odd) td {
        background-color: #fafafa;
    }
    .ant-table-tbody > tr:nth-child(even) td {
        background-color: #fff;
    }

    .ant-table-tbody > tr > td:nth-child(8),
    .ant-table-thead > tr > th:nth-child(8) {
        text-align: center;
    }

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
        display: none;
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
        width: 32px;
        height: 32px;
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

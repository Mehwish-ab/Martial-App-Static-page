import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    pureDark2,
    lightDark3,
    whiteColor,
    BallBlue,
    AntiFlashWhite,
    mediaDeviceMin,
} from '../../../components/GlobalStyle'

export const ListTransactionStyled = styled.div`
    background-color: #fff;
    padding: 16px;
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

    .ant-table-tbody > tr > td:nth-child(6) div {
        position: relative;
        width: 116px;
    }
    .ant-table-tbody > tr:nth-child(odd) > td:nth-child(6) button {
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 7px 10px;
        border-radius: 4px;
        background: #baffbd;
        width: 90px;
        height: 30px;
        color: #4caf50;
        font-size: 14px !important;
        display: block;
        position: relative;
        text-align: center;
    }
    .ant-table-tbody > tr:nth-child(even) > td:nth-child(6) button {
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 7px 10px;
        border-radius: 4px;
        background: #ffd8dc;
        width: 90px;
        height: 30px;
        color: #f4001c;
        font-size: 14px !important;
        display: block;
        position: relative;
        text-align: center;
    }

    .ant-table-tbody > tr > td:nth-child(7) button {
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 7px 10px;
        border-radius: 4px;
        background: #f2f4f4;
        width: 106px;
        height: 30px;
        color: #061229;
        display: flex;
        text-align: center;
        font-size: 14px !important;
        align-items: center;
        gap: 5px;
    }

    .ant-table-tbody > tr > td:nth-child(6) img {
        position: absolute;
        right: 17px;
        top: -5px;
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
    }
    .ant-pagination li:first-child {
        @media screen and ${mediaDeviceMin.mobileBS} {
            position: absolute;
            left: 0;
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

export const TransactionAccountStyle = styled.div`
    .stripeContainer,
    .goCardLessContainer,
    .CashContainer {
        margin-top: 16px;
        padding: 19px 20px 17px 14px;
        border-radius: 5px;
        heigth: 87px;
        h3 {
            color: ${pureDark2};
            font-family: ${fontFamilyMedium};
            font-size: 18px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
        div {
            display: flex;
            align-items: center;
            column-gap: 18px;
            p {
                color: ${pureDark2};
                font-family: ${fontFamilyMedium};
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                margin-bottom: 0px;
                span {
                    font-weight: 400;
                    font-family: ${fontFamilyRegular};
                }
            }
        }
    }
    .stripeContainer {
        border: 1px solid #d1c8ea;
        background: #e4def5;
    }

    .goCardLessContainer {
        border: 1px solid #f4e9dd;
        background: #faf3eb;
    }

    .CashContainer {
        border: 1px solid #def2e2;
        background: #ecfaef;
    }
`

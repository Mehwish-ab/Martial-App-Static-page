import styled from 'styled-components'
import {
    fontFamilyMedium,
    pureDark2,
    lightDark2,
    tertiaryGrey24,
    fontFamilyRegular,
} from '../../../components/GlobalStyle'

export const InformationTimeTableStyle = styled.div`
    background-color: #fff;
    border-radius: 10px;
    margin-top: 20px;
    padding-bottom: 40px;

    .timetable-heading {
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .list-item {
        border-bottom: 1px solid ${tertiaryGrey24};
        padding-bottom: 8px;
        &-value {
            font-family: ${fontFamilyRegular};
            color: ${pureDark2};
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }

    .ant-table-thead > tr > th {
        background: transparent;
        border-bottom: 1px solid ${tertiaryGrey24};
        color: ${pureDark2};
        font-family: ${fontFamilyMedium};
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        line-height: 22px;
        padding: 11px;
        &::before {
            display: none;
        }
    }
    .ant-table-thead > tr > th:first-child {
        padding-left: 20px;
    }

    .ant-table-tbody > tr > .ant-table-cell,
    .ant-table-tbody > tr > .ant-table-cell a {
        font-family: ${fontFamilyRegular};
        color: ${pureDark2};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 11px;
    }

    .ant-table-tbody > tr > td:first-child {
        font-weight: 500;
        font-family: ${fontFamilyMedium};
        padding-left: 20px;
    }

    .timeTableBox {
        font-family: ${fontFamilyRegular};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: ${pureDark2};
    }

    .ant-table-tbody > tr > td:nth-child(6),
    .ant-table-tbody > tr > td:nth-child(6) div {
        position: relative;
    }
    .ant-table-tbody > tr > td:nth-child(6) button {
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 7px 10px;
        border-radius: 4px;
        background: #e43535;
        width: 90px;
        height: 30px;
        color: rgb(255, 255, 255);
        font-size: 14px;
        display: block;
        position: relative;
        text-align: center;
    }
    .ant-table-tbody > tr > td:nth-child(6) img {
        position: absolute;
        left: 80px;
        top: -5px;
    }

    .ant-table-tbody > tr > td:nth-child(7) button {
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 7px 10px;
        border-radius: 4px;
        background: #bce7f8;
        width: 90px;
        height: 30px;
        color: ${pureDark2};
        font-size: 14px;
        display: block;
        position: relative;
        text-align: center;
    }

    .ant-table-tbody > tr > td:nth-child(7),
    .ant-table-thead > tr > th:nth-child(7) {
        text-align: center;
    }

    .ant-table-tbody > tr:nth-child(odd) td {
        background-color: #fff;
    }
    .ant-table-tbody > tr:nth-child(even) td {
        background-color: #fafafa;
    }
`

export const InformationTimeTableFormStyle = styled.div`
    background-color: #fff;
    padding: 16px;
    border-radius: 10px;

    .timetable-heading {
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        margin-bottom: 16px;
    }

    .list-item {
        border-bottom: 1px solid ${tertiaryGrey24};
        padding-bottom: 8px;
        margin-bottom: 20px;

        &-title {
            font-size: 12px;
            color: ${lightDark2};
            font-weight: 400;
            font-family: ${fontFamilyRegular};
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }

        &-value {
            margin-top: 6px;
            font-size: 14px;
            color: ${pureDark2};
            font-weight: 400;
            font-style: normal;
            line-height: normal;
            font-family: ${fontFamilyRegular};
        }
    }
`

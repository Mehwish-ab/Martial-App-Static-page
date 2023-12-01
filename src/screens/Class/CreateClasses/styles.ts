import styled from "styled-components";
import {
  darkBlue,
  darkGery,
  fontFamilyBold,
  fontFamilyMedium,
  pureDark2,
  lightDark2,
  lightDark3,
  fontFamilyRegular,
  // mainColor,
} from "../../../components/GlobalStyle";

export const CreateClassStyled = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 20px;

  .table-heading {
    font-size: 18px !important;
    font-family: ${fontFamilyMedium} !important;
    color: ${pureDark2};
  }
  .ant-table-thead > tr > th {
    background: transparent !important;
    border-bottom: none !important;
    color: ${darkBlue};
    font-family: ${fontFamilyMedium};
    font-size: 16px !important;
    line-height: normal;
    font-weight: 500;

    &::before {
      display: none !important;
    }
  }

  .ant-table-tbody > tr > .ant-table-cell,
  .ant-table-tbody > tr > .ant-table-cell a {
    font-family: ${fontFamilyMedium};
    font-size: 14px !important;
    color: ${darkGery}!important;
  }
  .ant-table-thead > tr > th {
    color: ${pureDark2};
  }
  .ant-table-tbody > tr > td:first-child {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${pureDark2};
    font-family: ${fontFamilyMedium};
  }

  .timeTableBox {
    font-family: ${fontFamilyRegular};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: ${pureDark2};
  }

  .ant-table-tbody > tr > td:nth-child(2) {
    div:nth-child(odd) {
      background-color: #fafafa;
    }
    div:nth-child(even) {
      background-color: #fff;
    }
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
    color: rgb(255, 255, 255) !important;
    font-size: 14px !important;
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
    color: ${pureDark2} !important;
    font-size: 14px !important;
    display: block;
    position: relative;
    text-align: center;
  }

  .ant-table-tbody > tr > td:nth-child(8),
  .ant-table-thead > tr > th:nth-child(8) {
    text-align: center;
  }

  .ant-table-tbody > tr:nth-child(odd) td {
    background-color: #fafafa;
  }
  .ant-table-tbody > tr:nth-child(even) td {
    background-color: #fff;
  }

  .timetable-heading {
    font-size: 18px !important;
    font-family: ${fontFamilyMedium} !important;
    color: ${pureDark2};
    margin-bottom: 16px;
  }
  .titleField {
    label {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: ${pureDark2};
      font-family: ${fontFamilyRegular};
    }
    input::placeholder {
      color: ${lightDark2};
    }
  }

  .fill {
    label {
      font-family: ${fontFamilyRegular};
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: ${pureDark2};
    }
    input::placeholder {
      color: ${lightDark2};
    }
  }
  .endDate {
    label {
      font-family: ${fontFamilyRegular};
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: ${pureDark2};
      margin-bottom: 9px !important;
    }
    .endDate_input {
      border-radius: 8px;
      border: 1px solid #d9d9d9;
      background: rgb(255, 255, 255);
      color: rgb(51, 51, 51);
      padding: 6px;
      height: 48px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        color: ${lightDark2};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-bottom: 0;
      }
    }
  }
  .ClassBottom-header {
    margin-top: 65px;
  }
`;

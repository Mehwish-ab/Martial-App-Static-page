import styled from "styled-components";
import {
  darkBlue,
  darkGery,
  fontFamilyBold,
  fontFamilyMedium,
  pureDark2,
  mainColor,
} from "../../../components/GlobalStyle";

export const ListBranchStyled = styled.div`
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
    color: ${pureDark2};
    font-family: ${fontFamilyMedium};
    font-size: 16px !important;
    padding: 5px 8px;


    &::before {
      display: none !important;
    }
  }

  .ant-table-tbody > tr > .ant-table-cell,
  .ant-table-tbody > tr > .ant-table-cell a {
    font-family: ${fontFamilyMedium};
    font-size: 14px !important;
    padding: 5px 8px;
    color: ${darkGery}!important;
  }

  .ant-table-thead > tr > th:first-child{
    width: 3.5%;
    text-align: center;
  }
  .ant-table-tbody > tr > td:first-child{
    text-align: center;
  }

  .ant-table-thead > tr > th:nth-child(2){
    width: 4%;
    text-align: center;
  }
  .ant-table-tbody > tr > td:nth-child(2){
    text-align: center;
  }


  .ant-table-thead > tr > th:nth-child(3){
    width: 11%;
    text-align: left;
  }
  .ant-table-tbody > tr > td:nth-child(3){
    text-align: left;
  }


  .ant-table-thead > tr > th:nth-child(4){
    width: 25%;
    // text-align: left;
  }
  .ant-table-tbody > tr > td:nth-child(4){
    width: 25%;
    // text-align: left;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // display: inline-block;
  }
  .ant-table-thead > tr > th:nth-child(5){
    // width: 40%;
    // text-align: left;
  }
  .ant-table-tbody > tr > td:nth-child(5){
    // width: 40%;
    // text-align: left;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // display: inline-block;
  }

`;

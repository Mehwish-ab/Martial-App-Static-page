import styled from "styled-components";
import {
  darkBlue,
  darkGery,
  fontFamilyBold,
  fontFamilyMedium,
  // mainColor,
} from "../../../components/GlobalStyle";

export const ListInstructorStyled = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 20px;

  .table-heading {
    font-size: 18px !important;
    font-family: ${fontFamilyMedium} !important;
    color: ${darkGery};
  }
  .ant-table-thead > tr > th {
    background: transparent !important;
    border-bottom: none !important;
    color: ${darkBlue};
    font-family: ${fontFamilyMedium};
    font-size: 16px !important;

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
  .ant-table-thead > tr > th{
    color: ${darkGery};
  }
  .ant-table-thead > tr > th:first-child, .ant-table-tbody > tr > td:first-child{
    width: 1%;
  }
  .ant-table-thead > tr > th:nth-child(2), .ant-table-tbody > tr > td:nth-child(2){
    width: 4%;
  }
  .ant-table-thead > tr > th:nth-child(3), .ant-table-thead > tr > td:nth-child(3){
    width: 15%;
  }
  .ant-table-thead > tr > th:nth-child(6), .ant-table-tbody > tr > td:nth-child(6){
    width: 5%;
  }
  .ant-table-thead > tr > th:nth-child(5), .ant-table-tbody > tr > td:nth-child(5),
  .ant-table-thead > tr > th:nth-child(6), .ant-table-tbody > tr > td:nth-child(6){
    width: 12%;
  }

  .ant-table-thead > tr > th:nth-child(7), .ant-table-tbody > tr > td:nth-child(7){
    width: 13%;
  }
  .ant-table-thead > tr > th:nth-child(4), .ant-table-tbody > tr > td:nth-child(4){
    width: 25%;
  }
  .ant-table-thead > tr > th:nth-child(8), .ant-table-tbody > tr > td:nth-child(8){
    width: 10%;
  }

  .ant-table-tbody > tr > td:nth-child(2), .ant-table-tbody > tr > th:nth-child(3), .ant-table-tbody > tr > td:nth-child(3){
    text-align: left;
  }
  .ant-table-tbody > tr > td:nth-child(4){
    color: #000 !important;
    font-size: 14px !important;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 0 !important;
    position: relative;
    top: 5px;
  }
  .ant-table-tbody > tr > td:nth-child(8) div{
    position: relative;
    width: 116px;
  }
  .ant-table-tbody > tr > td:nth-child(8) button{
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
  .ant-table-tbody > tr > td:nth-child(8) img{
    position: absolute;
    right: 17px;
    top: -5px;
  }
  .ant-table-tbody > tr:nth-child(odd) td{
    background-color: #FAFAFA;
  }
  .ant-table-tbody > tr:nth-child(even) td{
    background-color: #fff;
  }


  .table-heading{
    color: ${darkGery};
  }
`;

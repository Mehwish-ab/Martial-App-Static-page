import styled from "styled-components";
import {
  darkBlue,
  darkGery,
  fontFamilyBold,
  fontFamilyMedium,
  fontFamilyRegular,
  pureDark2,
  lightDark3,
  // mainColor,
} from "../../../components/GlobalStyle";

export const ListTimeTableStyled = styled.div`
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
 
  .ant-table-tbody > tr > td:nth-child(2), .ant-table-tbody > tr > th:nth-child(3), .ant-table-tbody > tr > td:nth-child(3){
    text-align: left;
  }
 
  .ant-table-tbody > tr > td:nth-child(2),
  .ant-table-tbody > tr > td:first-child {
    font-family: ${fontFamilyRegular} !important;
    font-size: 14px !important;
    line-height: 23px !important;
    color: ${lightDark3} !important;
  }
 
  .ant-table-tbody > tr > td:nth-child(6),
  .ant-table-tbody > tr > td:nth-child(6) div{
    position: relative;
  }
  .ant-table-tbody > tr > td:nth-child(6) button{
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
  .ant-table-tbody > tr > td:nth-child(6) img{
    position: absolute;
    left: 80px;
    top: -5px;
  }
  .ant-table-tbody > tr:nth-child(odd) td{
    background-color: #FAFAFA;
  }
  .ant-table-tbody > tr:nth-child(even) td{
    background-color: #fff;
  }

  .dateRange{
    font-size: 15px;
    font-style: normal;
    
  }

  .dateToday{
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }


  .table-heading{
    color: ${darkGery};
  }
`;

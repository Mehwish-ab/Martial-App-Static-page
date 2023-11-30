import styled from "styled-components";
import {
  darkBlue,
  darkGery,
  fontFamilyBold,
  fontFamilyMedium,
  fontFamilyRegular,
  mainColor,
  pureDark2,
} from "../../../components/GlobalStyle";

export const ListBranchStyled = styled.div`
  background-color: #fff;
  padding: 16px;
  border-radius: 20px;

  .table-heading {
    font-size: 18px !important;
    font-family: ${fontFamilyMedium};
    color: ${pureDark2};
    font-weight: 500;
  }
  .ant-table-thead > tr > th {
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

  .ant-table-tbody > tr > .ant-table-cell,
  .ant-table-tbody > tr > .ant-table-cell a {
    font-family: ${fontFamilyRegular};
    font-size: 14px;
    color: ${darkGery}!important;
    padding: 4px;
    font-weight: 400;
    p {
      margin-bottom: 0px;
    }
  }

  .ant-table-thead > tr > th:first-child, 
  .ant-table-tbody > tr > td:first-child{
    width: 3%;
  }
  .ant-table-thead > tr > th:nth-child(2), 
  .ant-table-tbody > tr > td:nth-child(2){
    width: 7%;
  }

  .ant-table-thead > tr > th:nth-child(4), 
  .ant-table-tbody > tr > td:nth-child(4){
    width: 8%;
  }
  .ant-table-tbody > tr > td:nth-child(5) p{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ant-table-thead > tr > th:nth-child(3), 
  .ant-table-tbody > tr > td:nth-child(3),
  .ant-table-thead > tr > th:nth-child(5), 
  .ant-table-tbody > tr > td:nth-child(5),
  .ant-table-thead > tr > th:nth-child(6), 
  .ant-table-tbody > tr > td:nth-child(6){
    width: 20% !important;
  }
  .ant-table-thead > tr > th:nth-child(7), 
  .ant-table-tbody > tr > td:nth-child(7),
  .ant-table-thead > tr > th:nth-child(8), 
  .ant-table-tbody > tr > td:nth-child(8){
    width: 9%;
  }

  .ant-table-thead > tr > th:nth-child(8), 
  .ant-table-tbody > tr > td:nth-child(8){
    text-align: center;
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
  }
  .ant-table-tbody > tr > td:nth-child(7) div{
    position: relative;
    width: 107px;
  }
  .ant-table-tbody > tr > td:nth-child(7) button{
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
  .ant-table-tbody > tr > td:nth-child(7) img{
    position: absolute;
    right: 6%;
    top: -5px;
  }
  .ant-table-tbody > tr:nth-child(even) td{
    background-color: #FAFAFA;
  }
  .ant-table-tbody > tr:nth-child(odd) td{
    background-color: #fff;
  }



  .ant-dropdown-trigger{
    text-align: center;
  }

`;


export const CustomDiv = styled.div`
  position: relative;
  display: flex;
  .instructorDateSection, .mainarrow, .dateRange {
    display: flex;
    align-items: center;
    gap: 12px;
}
.instructorDateSection{
  margin-right: 10px;
}
  .arrowleft, .arrowright, .dateRange, .dateToday {
    border-radius: 8px;
    border: 1px solid #E8E8E8;
    background: rgb(255, 255, 255);
    color: #333;
    font-size: 15px;
    font-family: ${fontFamilyMedium};
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 10px 10px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}
.dateRange {
  gap: 17px;
  p{
    color: #333;
    font-size: 15px;
    margin-bottom: 0;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-family: ${fontFamilyRegular};
    > span{
      font-weight: 500;
      font-family: ${fontFamilyMedium};
    }
  }

}
`;
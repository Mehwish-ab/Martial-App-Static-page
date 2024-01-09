import styled from 'styled-components'
import {
    darkBlue,
    darkGery,
    fontFamilyMedium,
    pureDark2,
    fontFamilyRegular,
} from '../../../components/GlobalStyle'

export const CreateTimeTableStyled = styled.div`
margin-top: 20px;
background-color: #fff;
border-radius: 10px;
padding-bottom: 20px;

  .tableHeading {
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
    color: ${darkBlue};
    font-family: ${fontFamilyMedium};
    font-size: 16px !important;
    line-height: normal;
    font-weight: 500;
    padding: 6px;
    &::before {
      display: none !important;
    }
  }

  .ant-table-tbody > tr > .ant-table-cell,
  .ant-table-tbody > tr > .ant-table-cell a {
    font-family: ${fontFamilyMedium};
    font-size: 14px !important;
    color: ${darkGery}!important;
    padding: 6px;
  }
  .ant-table-thead > tr > th{
    color: ${pureDark2};
  }
  .ant-table-thead > tr > th:first-child {
    padding-left: 20px;
    width: 10%;
  }
  .ant-table-tbody > tr > td:first-child {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${pureDark2};
    font-family: ${fontFamilyMedium};
    padding-left: 20px;
    width: 10%;
  }

  .timeTableBox{
    font-family: ${fontFamilyRegular};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: ${pureDark2};    
  }
 
  .ant-table-tbody > tr > td:nth-child(2){
    div:nth-child(odd){
      background-color: #FAFAFA;
    }
    div:nth-child(even){
      background-color: #fff;
    }
  }
 
  .ant-table-tbody > tr > td:nth-child(7),
  .ant-table-tbody > tr > td:nth-child(7) div{
    position: relative;
  }
  .ant-table-tbody > tr > td:nth-child(7) button{
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 7px 10px;
    border-radius: 4px;
    background: #E43535;
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
    left: 80px;
    top: -5px;
  }
  
  .ant-table-tbody > tr > td:nth-child(8) button{
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 7px 10px;
    border-radius: 4px;
    background:#BCE7F8;
    width: 90px;
    height: 30px;
    color: ${pureDark2} !important;
    font-size: 14px !important;
    display: block;
    position: relative;
    text-align: center;
  }

  .ant-table-tbody > tr > td:nth-child(9),
  .ant-table-thead > tr > th:nth-child(9){
    text-align: center;
  }

  .ant-table-tbody > tr:nth-child(odd) td{
    background-color: #FAFAFA;
  }
  .ant-table-tbody > tr:nth-child(even) td{
    background-color: #fff;
  }
}
`

export const FilterTimeTableStyled = styled.div`
    .timetable-heading {
        font-family: ${fontFamilyMedium};
        color: ${pureDark2};
        margin-bottom: 16px;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    .ant-picker.customtimepicker {
        height: 40px;
        border-radius: 5px;
        border: 1px solid #e0e0e0;
    }
`

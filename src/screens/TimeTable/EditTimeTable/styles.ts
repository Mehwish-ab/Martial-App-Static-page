import styled from 'styled-components'
import {
    darkBlue,
    darkGery,
    fontFamilyMedium,
    pureDark2,
    fontFamilyRegular,
    AlizarinCrimson,
    tertiaryGrey24,
    lightDark2,
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
   .ant-table-tbody > tr > td:nth-child(6)  div {
        position: relative;
        width: 107px;
    }
    .ant-table-tbody > tr > td:nth-child(6)  .Active button {
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
    .ant-table-tbody > tr > td:nth-child(6)  .De-Active button {
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
    .ant-table-tbody > tr > td:nth-child(6)  img {
        position: absolute;
        right: 6%;
        top: -5px;
    }
 
 
  .ant-table-tbody > tr > td:nth-child(7) ,
  .ant-table-tbody > tr > td:nth-child(7)  div{
    position: relative;
  }
  .ant-table-tbody > tr > td:nth-child(7)  button{
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
  .ant-table-tbody > tr > td:nth-child(7)  img{
    position: absolute;
    left: 80px;
    top: -5px;
  }
  
  .ant-table-tbody > tr > td:nth-child(7)  button{
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

  .ant-table-tbody > tr > td:nth-child(8),
  .ant-table-thead > tr > th:nth-child(8){
    text-align: center;
  }

  .ant-table-tbody > tr:nth-child(odd) td{
    background-color: #FAFAFA;
  }
  .ant-table-tbody > tr:nth-child(even) td{
    background-color: #fff;
  }
}

.ant-table-row-level-0 .ant-table-cell > div{
  margin: 10px 0px 0px;
  height: 50px;
}
.ant-table-row-level-0 .ant-table-cell:last-child{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 10px;
  height: 100%;
   > div {
    height: 50px;
    margin: 10px 0px 0px;
  }
}

.ant-table-row-level-0 .ant-table-cell:first-child > div{
  padding-top: 10px;
}

.ant-table-row-level-0 .ant-table-cell:nth-child(7) > div{
  padding-top: 5px;
}
.ant-table-row-level-0 .ant-table-cell:nth-child(6) > div{
  padding-top: 5px;
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

import styled from "styled-components";
import {
  AlizarinCrimson,
  Apple,
  Diamond,
  GrayX11,
  darkGery,
  fontFamilyMedium,
  fontFamilyRegular,
  lightDark2,
  lightDark3,
  mediaDeviceMax,
  pureDark,
  pureDark2,
  tertiaryGrey10,
  tertiaryGrey24,
  whiteColor,
} from "../../../components/GlobalStyle";

export const ViewFranchiseStyled = styled.div`
margin-bottom: 20px;
  h3 {
    margin: 16px 0;
    color: ${pureDark2};
    font-family: ${fontFamilyMedium};
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    line-height: normal;
  }

  .ant-card.ant-card-bordered {
    border-radius: 20px !important;
    border-radius: 10px;
    border: 1px solid #E0E0E0;

    .list-item {
      border-bottom: 1px solid ${tertiaryGrey24};
      padding-bottom: 8px;
      margin-bottom: 20px;

      &-title {
        color: ${lightDark2};
        font-family: ${fontFamilyRegular};
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        @media screen and ${mediaDeviceMax.laptop} {
          font-size: 12px;
        }
      }

      &-value {
        font-size: 14px;
        color: ${pureDark2};
        font-weight: 500;
        font-family: ${fontFamilyRegular};

        @media screen and ${mediaDeviceMax.laptop} {
          font-size: 14px;
        }
      }
    }
  }
`;

export const CustomDiv = styled.div`
  position: relative;
  display: flex;
`;


export const AddPaymentMethod = styled.div`

.table-heading {
  margin: 16px 0;
  color: ${pureDark2};
  font-family: ${fontFamilyMedium};
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  line-height: normal;
}

.ant-card.ant-card-bordered {
  border-radius: 10px;

  .list-item {
    border-bottom: 1px solid ${tertiaryGrey24};
    padding-bottom: 8px;
    margin-bottom: 20px;

    &-title {
      color: ${lightDark2};
      font-family: ${fontFamilyRegular};
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      @media screen and ${mediaDeviceMax.laptop} {
        font-size: 12px;
      }
    }

    &-value {
      font-size: 14px;
      color: ${pureDark2};
      font-weight: 500;
      font-family: ${fontFamilyRegular};

      @media screen and ${mediaDeviceMax.laptop} {
        font-size: 14px;
      }
    }
  }
}

.ant-table-thead > tr > th {
  background: transparent !important;
  border-bottom: none !important;
  color: ${pureDark2};
  font-family: ${fontFamilyRegular};
  font-size: 16px !important;
  &::before {
    display: none !important;
  }
}

.ant-table table {
  border-radius: 20px;
  background: ${whiteColor};
  padding: 16px 20px;
}

.ant-table-tbody > tr > .ant-table-cell,
.ant-table-tbody > tr > .ant-table-cell a {
  font-family: ${fontFamilyMedium};
  font-size: 14px !important;
  color: ${darkGery}!important;
}

.ant-table-tbody > tr > .ant-table-cell,
.ant-table-tbody > tr > .ant-table-cell a {
  font-family: ${fontFamilyRegular};
  font-size: 14px !important;
  color: ${darkGery}!important;
}
.ant-table-thead > tr > th{
  color: ${darkGery};
  font-family: ${fontFamilyMedium};
  font-size: 16px;
  font-weight: 500;
}
.ant-table-thead > tr > td{
  color: ${darkGery};
  font-family: ${fontFamilyRegular};    
  font-size: 14px !important;
  line-height: 23px;
  font-weight: 400;
}
.ant-table-thead > tr > th, 
.ant-table-tbody > tr > td{
  width: 19%;
  font-size: 16px;
  font-family: ${fontFamilyMedium};
  font-style: normal;
  font-weight: 400;
  line-height: 22px; 
  padding: 11px 20px;
}

.ant-table-thead > tr > th:last-child, 
.ant-table-tbody > tr > td:last-child{
  width: 5%;
  text-align: center;
}
.ant-table-thead > tr > th:nth-child(8), 
.ant-table-tbody > tr > td:nth-child(8){
  text-align: center;
}

.ant-table-tbody > tr > td:nth-child(2), .ant-table-tbody > tr > th:nth-child(3), .ant-table-tbody > tr > td:nth-child(3){
  text-align: left;
}
.ant-table-tbody > tr > td:nth-child(4){
  color: ${pureDark} !important;
  font-size: 14px !important;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0 !important;
  position: relative;
}
.ant-table-tbody > tr > td:nth-child(4) div, .ant-table-tbody > tr > td:nth-child(5) div{
  position: relative;
  width: 107px;
}
.ant-table-tbody > tr > td:nth-child(4) .Live button, 
.ant-table-tbody > tr > td:nth-child(5) .Active button{
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 7px 10px;
  border-radius: 4px;
  background: ${Apple};
  width: 90px;
  height: 30px;
  color: ${whiteColor} !important;
  font-size: 14px !important;
  display: block;
  position: relative;
  text-align: center;
}
.ant-table-tbody > tr > td:nth-child(4) .Test button{
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 7px 10px;
  border-radius: 4px;
  background: ${GrayX11};
  width: 90px;
  height: 30px;
  color: ${lightDark3} !important;
  font-size: 14px !important;
  display: block;
  position: relative;
  text-align: center;
}
.ant-table-tbody > tr > td:nth-child(5) .Inactive button{
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 7px 10px;
  border-radius: 4px;
  background: ${AlizarinCrimson};
  width: 90px;
  height: 30px;
  color: ${whiteColor} !important;
  font-size: 14px !important;
  display: block;
  position: relative;
  text-align: center;
}
.ant-table-tbody > tr > td:nth-child(4) img, .ant-table-tbody > tr > td:nth-child(5) img{
  position: absolute;
  right: 6%;
  top: -5px;
}


.ant-table-tbody > tr:nth-child(6) > td:nth-child(4) img,
.ant-table-tbody > tr:nth-child(6) > td:nth-child(5) img{
  visibility: hidden;
}
.ant-table-tbody > tr:nth-child(6) > td:nth-child(5) button{
  background-color: ${Diamond} !important;
  color: ${lightDark3} !important;
  font-size: 14px !important;
  display: block;
  position: relative;
  text-align: center;
  width: 90px;
  height: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 7px 10px;
  border-radius: 4px;
}
.ant-table-tbody > tr:nth-child(6) > td:nth-child(4) button{
  background-color: transparent !important;
  color: ${lightDark3} !important;
}
.ant-table-tbody > tr:nth-child(2n) td {
  background-color: transparent !important;
}

.ant-table table > .ant-table-tbody  > tr:nth-child(odd){
  background-color: ${whiteColor};
}
.ant-table table > .ant-table-tbody > tr:nth-child(even){
  background-color: ${tertiaryGrey10};
}
.ant-pagination{
  display: none;
}
`;

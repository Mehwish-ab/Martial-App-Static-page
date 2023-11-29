import styled from "styled-components";
import {
  fontFamilyBold,
  fontFamilyMedium,
  fontFamilyRegular,
  lightDark2,
  mediaDeviceMax,
  pureDark2,
  tertiaryGrey24,
} from "../../../components/GlobalStyle";

export const ViewFranchiseStyled = styled.div`
  h3 {
    margin: 16px 0;
    color: ${pureDark2};
    font-size: 18px;
    font-weight: 500;
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
  .instructorDateSection, .mainarrow, .dateRange {
    display: flex;
}
  .arrowleft, .arrowright, .dateRange, .dateToday {
    border-radius: 8px;
    border: 1px solid rgb(232, 232, 232);
    background: rgb(255, 255, 255);
    color: rgb(51, 51, 51);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 10px 10px;
    margin-right: 20px;
    height: 40px;
    cursor: pointer;
}
.dateRange {
  p{
    margin-right: 10px;
    color: rgb(51, 51, 51);
    font-size: 15px;
  }
  img{
    margin-left: 10px;
  }
}
`;
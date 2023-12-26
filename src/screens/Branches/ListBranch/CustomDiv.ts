import styled from "styled-components";
import {
  fontFamilyMedium,
  fontFamilyRegular
} from "../../../components/GlobalStyle";



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
`;

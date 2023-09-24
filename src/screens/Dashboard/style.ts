import styled from "styled-components";
import {
  fontFamilyMedium,
  lightGrey4,
  primaryColor,
  secondaryDark3,
  tertiaryDark,
  whiteColor,
} from "../../components/GlobalStyle";

export const RoleAndCommisionsSytled = styled.div`
  margin-top: 24px;

  p {
    font-size: 12px;
    margin-bottom: 0;
    color: ${secondaryDark3};
    font-family: ${fontFamilyMedium};
  }
  .row:not(:first-child) {
    .card {
      margin-top: 26px;
      padding: 10px;
      background: ${whiteColor};
      box-shadow: 0px 0px 2px ${tertiaryDark};
      border-radius: 2px;
      border: none;
      cursor: pointer;
    }
  }
  .row:first-child {
    margin-top: 12px;
  }
`;
export const WeeklyTotalIncomeStyled = styled.div`
  .red-line {
    height: 2px;
    background-color: ${primaryColor};
    max-width: 120px;
  }
  margin-top: 24px;
  p {
    font-size: 12px;
    margin-bottom: 0;
    color: ${secondaryDark3};
    font-family: ${fontFamilyMedium};
  }
  .card {
    cursor: pointer;
    .title {
      font-family: ${fontFamilyMedium};
      font-size: 14px;
    }
    .sub_title {
      color: ${lightGrey4};
    }
  }
  .row:not(:first-child) {
    .card {
      margin-top: 26px;
      padding: 10px;
      background: ${whiteColor};
      box-shadow: 0px 0px 2px ${tertiaryDark};
      border-radius: 2px;
      border: none;
      cursor: pointer;
    }
  }
`;

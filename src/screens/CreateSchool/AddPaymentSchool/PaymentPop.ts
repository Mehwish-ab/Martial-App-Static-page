import styled from "styled-components";
import { fontFamilyMedium, fontFamilyRegular, lightDark2, mediaDeviceMax, pureDark2, tertiaryGrey24 } from "../../../components/GlobalStyle";

export const PaymentPop = styled.div`
h3{
    font-family: ${fontFamilyMedium};
    color: ${pureDark2};
    font-size: 18px;
    line-height: normal;
    font-style: normal;
    font-weight: 500;
}
.loginPassword > input{
    padding: 7.5px;
    padding-left: 0;
  }

  .loginPassword > input::placeholder{
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      font-size: 16px;
      font-family: ${fontFamilyRegular};
      color: ${lightDark2};
  }

  .loginPassword > input{
      color: ${lightDark2};
  }

  .sc-koXPp ihgywj{
    color: ${pureDark2};
  }

  .ant-card.ant-card-bordered {
    border-radius: 10px;
    border: 1px solid #E0E0E0;
    .ant-card-body{
        padding: 8px;
    }
    }

  .list-item {
    border-bottom: 1px solid ${tertiaryGrey24};
    padding-bottom: 6px;

    &-title {
      color: ${lightDark2};
      font-family: ${fontFamilyRegular};
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 6px;
      padding-left: 7px;

      @media screen and ${mediaDeviceMax.laptop} {
        font-size: 12px;
      }
    }

    &-value {
      font-size: 14px;
      color: ${pureDark2};
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      font-family: ${fontFamilyRegular};
      padding-left: 7px;

      @media screen and ${mediaDeviceMax.laptop} {
        font-size: 14px;
      }
    }
  }
}

`;
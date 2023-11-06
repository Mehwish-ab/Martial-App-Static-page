import styled from "styled-components";
import {
  fontFamilyBold,
  fontFamilyMedium,
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

    .list-item {
      border-bottom: 1px solid ${tertiaryGrey24};
      padding-bottom: 8px;
      margin-bottom: 20px;

      &-title {
        font-size: 14px;
        color: ${lightDark2};
        font-weight: 500;
        font-family: ${fontFamilyMedium};

        @media screen and ${mediaDeviceMax.laptop} {
          font-size: 12px;
        }
      }

      &-value {
        font-size: 16px;
        color: ${pureDark2};
        font-weight: 500;
        font-family: ${fontFamilyBold};

        @media screen and ${mediaDeviceMax.laptop} {
          font-size: 14px;
        }
      }
    }
  }
`;

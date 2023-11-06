import styled from "styled-components";
import {
  darkBlue,
  fontFamilyBold,
  fontFamilyMedium,
  fontFamilyRegular,
  lightDark2,
  pureDark2,
  tertiaryGrey24,
} from "../../../components/GlobalStyle";
import img from "../../../assets/icons/list-style-check.png";
export const SubscribeFranchiseStyled = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 20px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    font-family: ${fontFamilyBold};
    color: ${pureDark2};
  }

  .subscriptions {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;

    .plan {
      width: 410px;
      min-heigth: 500px;
      border: 1px solid ${tertiaryGrey24};
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 16px;
      margin-right: 16px;

      &-heading {
        font-size: 18px;
        font-weight: 400;
        font-family: ${fontFamilyRegular};
        color: ${pureDark2};
        margin-bottom: 20px;
      }

      &-price {
        font-size: 23px;
        font-weight: 500;
        font-family: ${fontFamilyMedium};
        color: ${darkBlue};
        margin-bottom: 20px;
      }

      &-description {
        margin-bottom: 20px;

        &-heading {
          font-size: 18px;
          font-weight: 500;
          font-family: ${fontFamilyBold};
          color: ${pureDark2};
          margin-bottom: 5px;
        }

        &-para {
          font-size: 14px;
          font-weight: 400;
          font-family: ${fontFamilyRegular};
          color: ${lightDark2};
          line-height: 1.5;
          word-spacing: 2px;
        }
      }

      &-features {
        margin-bottom: 20px;

        &-heading {
          font-size: 18px;
          font-weight: 500;
          font-family: ${fontFamilyBold};
          color: ${pureDark2};
          margin-bottom: 5px;
        }

        &-list {
          list-style-image: url("${img}");
          padding-left: 1rem;

          &-item {
            font-size: 16px;
            font-family: ${fontFamilyRegular};
            color: ${lightDark2};
            margin-bottom: 10px;
          }
        }
      }
    }
  }
`;

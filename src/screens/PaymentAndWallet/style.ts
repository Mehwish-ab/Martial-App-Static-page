import styled from "styled-components";
import {
  fontFamilyMedium,
  lightColor1,
  lightGrey,
  lightGrey2,
  primaryColor,
  pureDark,
  secondaryDark4,
  tertiaryGrey6,
  whiteColor,
} from "../../components/GlobalStyle";
import { lightDark } from "../../components/GlobalStyle";
import { secondaryGrey } from "../../components/GlobalStyle";

const PaymentAndWalletStyle = styled.div`
  padding-top: 20px;
  margin: 0 auto;
  padding: 14px;
  margin-top: 40px;
  border-radius: 5px;
  .heading {
    padding-bottom: 6px;
    border-bottom: 4px solid ${pureDark};
    display: inline-block;
    margin-bottom: 14px;
  }
  .left-side {
    padding: 12px;
    width: 100%;
    &-inner-section {
      border: 1px solid ${lightGrey2};
      height: 72vh;
      overflow-y: auto;
      .credit-card-side {
        background: ${whiteColor};
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        .no-cards-found {
          height: 70vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .head-bar {
          padding: 10px;

          &-title {
            font-size: 16px;
            color: ${pureDark};
            font-family: ${fontFamilyMedium};
            padding: 0 14px;
          }
        }
        .payments {
          padding: 16px;
          display: flex;
          flex-direction: column;

          @media screen and (max-width: 480px) {
            height: auto;
          }
          .delete-icon {
            background-color: ${primaryColor};
            padding: 6px;
            border-radius: 7px;
            height: 34px;
            cursor: pointer;
          }
          .select {
            height: 26px;
            cursor: pointer;
          }
          .cards-section {
            flex: 1;
            overflow-y: auto;
            &-type {
              border-bottom: 1px solid ${tertiaryGrey6};
              margin-top: 16px;

              &-title {
                font-size: 16px;
                font-weight: 700;
              }
              &-subtitle {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
  .right-side {
    padding: 12px;

    &-placeholder {
      width: 100%;
    }
    .inner-section {
      border: 1px solid ${lightGrey2};
      height: 72vh;
      position: relative;
      .center-section {
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        .comming-soon-text {
          color: ${secondaryGrey};
          font-size: 20px;
          margin-top: 6px;
        }
      }
    }
  }

  h6 {
    font-family: ${fontFamilyMedium};
    font-size: 18px;
  }
  .amount {
    font-family: ${fontFamilyMedium};
  }
  .credit-section {
    background-color: ${primaryColor};
    padding: 10px;

    .title {
      color: ${whiteColor};
    }
  }
  .add-card-section {
    background-color: ${whiteColor};
    padding: 10px;
    color: ${secondaryDark4};
    border: 1px solid ${lightGrey2};

    .title {
      font-family: ${fontFamilyMedium};
    }
  }
  .add-bank-section {
    background-color: ${whiteColor};
    padding: 10px;
    border: 1px solid ${lightGrey2};

    .title {
      font-family: ${fontFamilyMedium};
    }
  }
`;

export default PaymentAndWalletStyle;

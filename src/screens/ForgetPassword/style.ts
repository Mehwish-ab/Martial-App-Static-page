import styled from "styled-components";
import {
  basicColor,
  fontFamilyMedium,
  primaryColor,
  tertiaryGrey12,
  tertiaryGrey8,
  whiteColor,
} from "../../components/GlobalStyle";

export const ForgetPasswordStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background: ${tertiaryGrey8};
  margin: 0 auto;

  p {
    margin-bottom: 0px;
  }
  .forget-password-container {
    &-card {
      max-width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 6px;
      width: 100%;
      margin: auto;
      padding: 20px 12px;
      background-color: ${whiteColor} &-form {
        width: 96%;
      }
      .title {
        color: #061229;
        font-size: 22px;
        font-family: ${fontFamilyMedium};
        margin-bottom: 0;
      }
      .forget-password-text {
        font-size: 14px;
      }

      &-logo {
        text-align: center;

        img {
          width: 164px;
          margin-bottom: 0;
        }

        h1 {
          font-size: 20px;
          font-weight: 700;
          color: #1b283f;
        }
      }
    }
    .terms-conditions {
      max-width: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .signup-text {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: ${primaryColor};
      text-decoration: none;
    }
    p {
      font-size: 14px;
      font-weight: normal;
      color: #8e8e93;
    }
    h6 {
      font-size: 14px;
      font-weight: normal;
      color: ${basicColor};
    }
  }
  .is-invalid {
    border: 1px solid red;
    border-radius: 5px;
    background: white;
    border-radius: 2px;
    padding: 10px;
    width: 100%;
    width: -moz-available;
    outline: none;
    margin-bottom: 8px;
  }
  .customInput,
  .customPasswordInput {
    background: white;
    border: 1px solid #c6c6c8;
    border-radius: 2px;
    padding: 10px;
    width: 100%;
    width: -moz-available;
    outline: none;
    margin-bottom: 8px;
  }
  .forget_password {
    color: ${primaryColor};
    font-size: 14px;
    text-decoration: none;
    font-family: "EnnVisionsMedium" !important;
  }
  .remember-password {
    &-text {
      color: ${tertiaryGrey12};
    }
  }
  .ant-input-suffix {
    margin-left: 30px;
  }
  .logo {
    height: 60px;
    width: 155px;
    margin-bottom: 20px;
  }
  .line {
    display: none;
  }

  @media screen and (max-width: 425px) {
    .forget-password-container {
      &-card {
        padding: 3px;
        &-logo {
          h1 {
            display: none;
          }
        }
      }
    }
    .signup-text {
      p {
        font-size: 14px;
      }
      h6 {
        font-size: 14px;
        margin-left: 3px;
      }
    }
    .line {
      display: inline;
      width: 90%;
      margin-bottom: 6px;
    }
  }
`;

export default ForgetPasswordStyle;

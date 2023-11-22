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
      max-width: 498px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 20px;
      width: 100%;
      margin: auto;
      padding: 25px 23px 19px;
      background-color: ${whiteColor};
      &-inner {
        width: 100%;
      }
      .title {
        color: #000;
        font-size: 22px;
        font-family: ${fontFamilyMedium};
        margin-bottom: 0;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      .forget-password-text {
        color: #000;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        font-size: 14px;
      }



      .phone-input-fields{
        margin-top: 17px;
      }

      .PhoneInput {
        /* border: 1px solid black; */
        width: 100%;
        height: 48px;
        /* border: 1px solid rgb(198, 198, 200); */
        border-radius: 8px;
      }
      .PhoneInput .PhoneInputCountry {
        width: 80px;
        position: relative;
        padding: 0 11px;
        font-weight: normal;
        font-size: 14px;
        text-align: center;
        background-color: #fff;
        transition: all 0.3s;
        justify-content: center;
        border: 1px solid #EAEAEA;
        border-right: none;
        margin-right: 0;
      }
      .country-left-to-right-border-radius {
        border-radius: 8px 0 0 8px;
      }
      .country-right-to-left-border-radius {
        border-radius: 0 8px 8px 0;
      }
      .PhoneInput input {
        width: 100%;
        height: 48px;
        padding: 0 11px;
        background-color: transparent;
        border: 1px solid #EAEAEA;
        border-left: none;
        outline: 0;
        transition: all 0.3s linear;
        appearance: textfield !important;
        font-family: EnnVisionsMedium;
        font-size: 14px;
      }
      .phone-number-right-to-left-border-radius {
        border-radius: 8px 0 0 8px;
      }
      .phone-number-left-to-right-border-radius {
        border-radius: 0 8px 8px 0;
      }
      .PhoneInput input::placeholder {
        font-family: EnnVisionsMedium;
        color: rgb(198, 198, 200);
      }
      .custom-phone-input-label {
        display: block;
        color: rgb(27, 40, 63);
        text-transform: capitalize;
        font-size: 16px !important;
        font-family: EnnVisionsMedium, sans-serif;
        margin-bottom: 10px;
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
      font-size: 16px;
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
    font-size: 16px;
    text-decoration: none;
    font-family: "EnnVisionsMedium" !important;
  }
  .remember-password {
    &-text {
      color: ${tertiaryGrey12};
    }
  }
  .ant-input-suffix {
    // margin-left: 30px;
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
        padding-left: 3px;
        padding-right: 3px;

        &-inner{
          width: 90%;
        }
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

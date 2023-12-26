import styled from "styled-components";
import {
  basicColor,
  fontFamilyMedium,
  primaryColor,
  tertiaryGrey12,
  tertiaryGrey8,
  whiteColor,
  lightGrey9,
  pureDark2,
  lightDark3,
  tertiaryGrey24,
  fontFamilyRegular,
  lightDark2,
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
      padding: 0px 23px 19px;
      background-color: ${whiteColor};
      &-inner {
        width: 100%;
      }
      .title {
        color: #000;
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-top: 14px;
        margin-bottom: 0;
      }
      .forget-password-text {
        color: ${lightGrey9};
        font-family: ${fontFamilyRegular};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 0px 26px;
        margin-bottom: 0;
      }

     

      .forget-password-phoneNumber{
        font-size: 18px;
        font-family: ${fontFamilyMedium};
        color: ${lightGrey9};
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin: 8px 0px 20px 0px;

      }

      .forget-password-container-card-form{
        label{
          color: ${pureDark2};
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          font-size: 16px;
          margin-bottom: 8px;
        }
        input{
          padding: 10px;
        }
      }

      .ant-input-affix-wrapper + div{
        text-align: right !important;
      }

      .create-title{
        color: ${pureDark2};
        font-family: ${fontFamilyMedium};
        margin-bottom: 0;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        margin-top: 26px;
        font-size: 22px;
      }

      .create-password-text{
        color: ${lightDark3};
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

  
      .closeButtonIcon{
        position: absolute;
        right: 0px;
        top: 10px;
        cursor: pointer;
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
  .forget-password-OTPtext{
    color: ${pureDark2};
    font-family: ${fontFamilyRegular};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 13px;
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
    height: 52px;
    border: 1px solid #E43535;
    border-radius: 5px;
    background: white;
    border-radius: 10px;
    padding: 3.4px 11px;
    width: 100%;
    width: -moz-available;
    outline: none;
    margin-bottom: 2px;
    input{
      font-style: normal;
      font-family: ${fontFamilyRegular};
      color: ${lightDark2};
      font-weight: 400;
      line-height: normal;
      font-size: 16px;
      ::placeholder{
        font-style: normal;
        font-family: ${fontFamilyRegular};
        color: ${lightDark2};
        font-weight: 400;
        line-height: normal;
        font-size: 16px;
      }
    }
  }
  .customInput,
  .customPasswordInput {
    height: 52px;
    background: white;
    border: 1px solid ${tertiaryGrey24};
    border-radius: 10px;
    padding: 3.4px 11px;
    width: 100%;
    width: -moz-available;
    outline: none;
    input{
      font-style: normal;
      font-family: ${fontFamilyRegular};
      color: ${lightDark2};
      font-weight: 400;
      line-height: normal;
      font-size: 16px;
      ::placeholder{
        font-style: normal;
        font-family: ${fontFamilyRegular};
        color: ${lightDark2};
        font-weight: 400;
        line-height: normal;
        font-size: 16px;
      }
    }
  }
  
  .forget_password {
    color: ${primaryColor};
    font-size: 16px;
    text-decoration: none;
    font-family: ${fontFamilyMedium};
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

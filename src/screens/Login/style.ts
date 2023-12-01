import styled from "styled-components";
import {
  fontFamilyMedium,
  lightDark3,
  pureDark,
  pureDark2,
  tertiaryGrey12,
  tertiaryGrey8,
  whiteColor,
  darkGery,
  tertiaryGrey24,
  lightDark2,
  mainColor,
  darkBlue,
  fontFamilyRegular,
} from "../../components/GlobalStyle";

export const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${tertiaryGrey8};
  margin: 0 auto;
  margin-bottom: 16px;
  height: 100vh;
  p {
    margin-bottom: 0px;
  }

  .login-container {
    &-card {
      max-width: 485px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 6px;
      width: 100%;
      margin: auto;
      padding: 20px 12px;
      background-color: ${whiteColor};
      .title{
        color: ${pureDark2};
        font-size: 22px;
        font-family: ${fontFamilyMedium};
        line-height: 26px;
      }
      .subtitle {
        width: 75%;
        color: ${darkGery}
        margin: 10px auto 0;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
      }
      &-inner{
          width: 96%;
        }
      &-form {
        width: 100%;
        .login-input-fields {
           > div:first-child label{
            line-height: 19px;
            margin-bottom: 10px;
            font-family: ${fontFamilyMedium};
            font-size: 16px;
            color: ${pureDark2};
          }
          > div:nth-child(2) label{
            line-height: 19px;
            margin-bottom: 10px;
            font-family: ${fontFamilyMedium};
            font-size: 16px;
            color: ${pureDark2};
          }
      }

  
      .login-text {
        font-size: 16px;
        color: ${lightDark3};
        margin-top: 12px;
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
      color: ${darkBlue};
      font-size: 14px;
      font-style: normal;
      line-height: normal;
      font-family: ${fontFamilyMedium};

    }
    p {
      font-size: 14px;
      font-weight: normal;
      color: ${pureDark};
    }
    h6 {
      font-size: 14px;
      font-weight: normal;
      color: ${darkBlue};
    }
  }

  .loginBtn > div > button{
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .is-invalidEmail{
    padding: 13px 21px !important;
  }
  
  .is-invalid {
    border: 1px solid red;
    background: white;
    border-radius: 8px;
    width: 100%;
    width: -moz-available;
    outline: none;
    margin-bottom: 2px;
  }

  .customPasswordInput {
    background: white;
    border: 1px solid ${tertiaryGrey24};
    border-radius: 8px !important;
    width: 100%;
    padding: 4px 11px !important;
    width: -moz-available;
    outline: none;    
    input::placeholder {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: ${lightDark2};
    }
  }

  .customInput{
    background: white;
    border: 1px solid ${tertiaryGrey24};
    border-radius: 8px !important;
    width: 100%;
    padding: 13px 21px !important;
    width: -moz-available;
    font-family: ${fontFamilyRegular};
    outline: none;    
  }
  .customInput::placeholder {
    font-size: 16px;
    font-style: normal;
    line-height: normal;
    font-family: ${fontFamilyRegular};
    color: ${lightDark2};
  }

  input[type="text"] + div, 
  .ant-input-affix-wrapper + div{
    text-align: right !important;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: normal;
  }

  p{
    line-height: normal;
  }

  input[type="text"]:hover {
    border-color: #40a9ff;
    border-right-width: 1px;
    z-index: 1;
  }

  .loginInvalidPassword > input{
    padding: 10px !important;
    }

  .loginPassword > input{
    padding: 10px !important;
  }


  .forget_password {
    color: ${mainColor};
    font-size: 16px;
    font-weight: 500;
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
  
  @media screen and (max-width: 425px) {
    .login-container {
      &-card {
        padding: 20px 16px;
        &-logo {
          h1 {
            display: none;
          }
        }
      }
    }
    .signup-text {
      
      p,a {
        font-size: 14px;
      }
      h6 {
        font-size: 14px;
        margin-left: 3px;
        font-weight: 500;
      }
    }
    
  }
`;

export default LoginStyle;

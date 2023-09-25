import styled from "styled-components";
import {
  basicColor,
  fontFamilyMedium,
  lightDark3,
  primaryColor,
  pureDark,
  pureDark2,
  tertiaryGrey12,
  tertiaryGrey8,
  whiteColor,
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
      &-form {
        width: 96%;
        .login-input-fields {
          &-field {
            margin-top: 20px;
          }
        }
      }
      .title {
        color: ${pureDark2};
        font-size: 22px;
        font-family: ${fontFamilyMedium};
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
      color: ${primaryColor};
      font-size: 16px;

    }
    p {
      font-size: 16px;
      font-weight: normal;
      color: ${pureDark};
    }
    h6 {
      font-size: 14px;
      font-weight: normal;
      color: ${basicColor};
    }
  }
  .is-invalid {
    border: 1px solid red;
    background: white;
    border-radius: 8px;
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
    margin-left: 30px;
  }
  .logo {
    height: 60px;
    width: 155px;
    margin-bottom: 20px;
  }
  
  @media screen and (max-width: 425px) {
    .login-container {
      &-card {
        padding: 20px 3px;
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
      }
    }
   
  }
`;

export default LoginStyle;

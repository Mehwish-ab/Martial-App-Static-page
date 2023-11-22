import styled from "styled-components";
import {
  darkBlue,
  fontFamilyMedium,
  lightDark2,
  lightDark3,
  lightGrey9,
  primaryColor,
  pureDark2,
  secondaryDark3,
  tertiaryGrey12,
  tertiaryGrey24,
  tertiaryGrey8,
} from "../../../components/GlobalStyle";

const RegisterStyle = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  background: ${tertiaryGrey8};
  margin: 0 auto;
  overflow-y: auto;
  margin-bottom: 16px;
 
  .signup-text {
    display: flex;
    justify-content:center;
    align-items:center;

    p,a,h6 {
        font-size: 14px;
        margin-bottom: 0
      }
      a{
        font-family: ${fontFamilyMedium};
        text-decoration: underline;
        color: ${darkBlue};
        margin: 0 2px;
      }
      h6{
        color: ${darkBlue};
      }
      a:hover{
        text-decoration: none;
      }
  }

  .role-section {
    font-family: ${fontFamilyMedium};
    .roles {
      border: 1px solid ${tertiaryGrey24};
    }
  }
  .inner-container {
    padding-top: 8px;
    &-card {
      &-inner{
        width: 100%;
      }
      .title {
        font-family: ${fontFamilyMedium};
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        color: ${pureDark2};
      }
      .message {
        color: ${lightDark3};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      max-width: 485px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 20px;
      width: 100%;
      margin: auto;
      padding: 28px 23px 24px;
      &-form {
        width: 100%;
      }
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

  .customInput::placeholder{
    font-style: normal;
    color: ${lightDark2};
    font-weight: 400;
    line-height: normal;
    font-size: 16px;
  }

  .ant-input-suffix {
    // margin-left: 30px;
  }
  
  .createUserPassword div {
    input::placeholder{
      font-style: normal;
      color: ${lightDark2};
      font-weight: 400;
      line-height: normal;
      font-size: 16px;
  }
  }

  @media screen and (max-width: 425px) {
    .inner-container {
      &-card {
        padding: 7px 14px;
        &-logo {
          h1 {
            display: none;
          }
        }
      }
    }
    a,p{
      font-size:14px
    }
  }
`;

export default RegisterStyle;

export const CreatedUserModalStyle = styled.div`
  text-align: center;
  margin: 0 auto;
  height: 93vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .inner-container {
    max-width: 420px;
    background: #ffffff;
    box-shadow: 0px 0px 16px #00000017;
    border-radius: 7px;
    padding: 18px;
    img {
      height: 60px;
      margin-bottom: 12px;
      width: 190px;
    }
    .account-created {
      font-family: "EnnVisionsMedium";
      font-size: 19px;
    }
    .message {
      margin-top: 14px;
      font-size: 16px;
      width: 90%;
      margin: 0 auto;
      color: ${secondaryDark3};
      padding-bottom: 10px;
      border-bottom: 1px solid ${tertiaryGrey12};
    }
  }
`;

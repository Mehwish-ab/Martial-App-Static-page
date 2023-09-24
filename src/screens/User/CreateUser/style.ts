import styled from "styled-components";
import {
  fontFamilyMedium,
  lightGrey9,
  primaryColor,
  secondaryDark3,
  tertiaryGrey12,
  tertiaryGrey24,
  tertiaryGrey8,
} from "../../../components/GlobalStyle";

const RegisterStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${tertiaryGrey8};
  margin: 0 auto;
  overflow-y: auto;
  margin-bottom: 16px;
  p,
  a {
    font-size: 14px;
    margin-bottom: 0px;
  }
  .signup-text {
    display: flex;
  }

  .role-section {
    font-family: ${fontFamilyMedium};
    .roles {
      border: 1px solid ${tertiaryGrey24};
    }
  }
  .inner-container {
    margin-top: 8px;
    &-card {
      .title {
        font-family: ${fontFamilyMedium};
        font-size: 20px;
      }
      .message {
        font-size: 16px;
        color: ${lightGrey9};
      }
      max-width: 485px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      border-radius: 6px;
      width: 96%;
      margin: auto;

      padding: 20px 12px;
      &-form {
        width: 96%;
      }
    }
  }

  a {
    font-family: ${fontFamilyMedium};
    text-decoration: none;
    color: ${primaryColor};
    margin: 0 2px;
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

  .ant-input-suffix {
    margin-left: 30px;
  }

  @media screen and (max-width: 425px) {
    .inner-container {
      &-card {
        padding: 3px;
        &-logo {
          h1 {
            display: none;
          }
        }
      }
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

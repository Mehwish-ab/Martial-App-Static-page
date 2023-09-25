import styled from "styled-components";
import {
  basicColor,
  lightGrey7,
  primaryColor,
  tertiaryGrey8,
} from "../../../components/GlobalStyle";

export const ForgetGenerateOtpStyle = styled.div`
  text-align: center;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${tertiaryGrey8};

  .inner-container {
    max-width: 420px;
    background: #ffffff;
    box-shadow: 0px 0px 16px #00000017;
    border-radius: 7px;
    padding: 18px;
    .message {
      margin-top: 14px;
      font-size: 13px;
      color: ${lightGrey7};
    }
    .invalid-password {
      color: ${primaryColor};
    }
  }

  .signup-text {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: ${primaryColor};
      text-decoration: none;
      font-family: "EnnVisionsMedium";
    }
    p {
      font-size: 16px;
      font-weight: normal;
      color: #8e8e93;
    }
    h6 {
      margin-top: -8px;
      padding: 0;
      font-size: 14px;
      font-weight: normal;
      color: ${basicColor};
    }
  }
`;

export default ForgetGenerateOtpStyle;

import styled from "styled-components";
import {
  lightGrey7,
  pureDark,
  tertiaryGrey4,
  tertiaryGrey8,
} from "../../../components/GlobalStyle";

export const ForgetVerifyOtpStyle = styled.div`
  text-align: center;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${tertiaryGrey8};
  margin: 0 10px;

  .inner-container {
    width: 100%;
    max-width: 430px;
    background: #ffffff;
    box-shadow: 0px 0px 16px #00000017;
    border-radius: 7px;
    padding: 18px;
    .title {
      font-size: 16px;
      color: ${pureDark};
      font-family: "EnnVisionsBold";
      margin-top: 6px;
    }
    img {
      height: 60px;
      margin-bottom: 12px;
    }
    .number {
      color: ${pureDark};
      font-size: 14px;
    }
    .message {
      margin-top: 4px;
      font-size: 14px;
      margin-bottom: 0;
      color: ${lightGrey7};
    }
    .resend-box {
      &-time {
        color: ${tertiaryGrey4};
        font-size: 14px;
      }
    }
  }
`;
export default ForgetVerifyOtpStyle;

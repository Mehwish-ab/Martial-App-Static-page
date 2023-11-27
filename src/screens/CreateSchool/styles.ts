import styled from "styled-components";
import { darkBlue, mediaDeviceMax,pureDark2, maastrichtBlue, lightDark2 } from "../../components/GlobalStyle";

export const CreateSchoolStyled = styled.div`
  h3 {
    color: ${pureDark2};
    font-size: 18px;
  }

  .mt-20 {
    .row {
      @media screen and ${mediaDeviceMax.tablet} {
        gap: 20px;
      }
    }
  }
  .form {
    padding: 16px;
    // border-bottom-left-radius: 20px;
    // border-bottom-right-radius: 20px;
    border-radius: 20px;
  }

  .payment_card {
    border: 1px solid #d9d9d9;
    padding: 16px;
    border-radius: 20px;
  }

  .ant-form label {
    font-size: 16px !important;
    font-family: EnnVisionsMedium, sans-serif;
    color: ${pureDark2};

    @media screen and (${mediaDeviceMax.laptop}) {
      font-size: 14px !important;
    }
  }

  .ant-input {
    padding: 14px !important;
    &::placeholder{
      color: ${lightDark2} !important;
    }

    @media screen and (${mediaDeviceMax.laptop}) {
      padding: 10px !important;
    }
  }
  .PhoneInput,
  .PhoneInputInput {
    height: 53px !important;
  }
  .ant-btn{
    background: linear-gradient(270deg, #C0E9F9 0.21%, #A2DDF3 97.73%);
    color: ${maastrichtBlue};
  }
`;

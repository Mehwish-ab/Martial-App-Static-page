import styled from "styled-components";
import { darkBlue, mediaDeviceMax } from "../../components/GlobalStyle";

export const CreateSchoolStyled = styled.div`
  h3 {
    color: ${darkBlue};
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

    @media screen and (${mediaDeviceMax.laptop}) {
      font-size: 14px !important;
    }
  }

  .ant-input {
    padding: 14px !important;

    @media screen and (${mediaDeviceMax.laptop}) {
      padding: 10px !important;
    }
  }
  .PhoneInput,
  .PhoneInputInput {
    height: 53px !important;
  }
`;

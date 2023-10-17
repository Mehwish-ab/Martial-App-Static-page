import styled from "styled-components";
import { darkBlue } from "../../components/GlobalStyle";

export const CreateSchoolStyled = styled.div`
  h3 {
    color: ${darkBlue};
    font-size: 18px;
  }

  .form {
    padding: 16px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  .payment_card {
    border: 1px solid #d9d9d9;
    padding: 16px;
    border-radius: 20px;
  }

  .ant-form label {
    font-size: 16px !important;
    font-family: EnnVisionsMedium, sans-serif;
  }

  .ant-input {
    padding: 14px !important;
  }
  .PhoneInput,
  .PhoneInputInput {
    height: 53px !important;
  }
`;

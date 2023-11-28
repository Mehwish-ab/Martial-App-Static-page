import styled from "styled-components";
import { darkBlue, mediaDeviceMax, pureDark2, maastrichtBlue, lightDark2, fontFamilyMedium } from "../../components/GlobalStyle";

export const CreateSchoolStyled = styled.div`


.form {
  padding: 16px;
  border-radius: 20px;
    h3 {
      font-size: 18px;
      font-family: ${fontFamilyMedium};
      color: ${pureDark2};
    }
  }
.mt-20 {
  .row {
    @media screen and ${mediaDeviceMax.tablet} {
      gap: 20px;
    }
  }
}

  .payment_card {
    border: 1px solid #d9d9d9;
    padding: 16px;
    border-radius: 20px;
  }

  .ant-form label {
    @media screen and (${mediaDeviceMax.laptop}) {
      font-size: 14px !important;
    }
  }

  .ant-input {
    input::placeholder{
      color: ${lightDark2} !important;
    }

    @media screen and (${mediaDeviceMax.laptop}) {
      padding: 10px !important;
    }
  }
  
  .ant-btn{
    background: linear-gradient(270deg, #C0E9F9 0.21%, #A2DDF3 97.73%);
    color: ${maastrichtBlue};
  }
`;

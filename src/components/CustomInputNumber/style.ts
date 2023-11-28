import styled from "styled-components";
import { fontFamilyMedium, fontFamilyRegular, lightGrey2, pureDark2, tertiaryGrey21 } from "../GlobalStyle";

const CustomInputStyle = styled.div`
  width: 100%;
  margin-bottom: 10px;

  label {
    font-size: 13px;
    text-transform: capitalize;
    display: block;
    margin-bottom: 7px ;
  }
`;

export default CustomInputStyle;

export const CustomPhoneInputStyle = styled.div`
  label {
    font-family: ${fontFamilyRegular};
    font-size: 16px;
    color: ${pureDark2};
  }
  .ant-input-number-input {
    font-family: ${fontFamilyMedium};
  }
  .ant-input-number-group .ant-input-number {
    padding: 6px !important;
    border: 1px solid ${tertiaryGrey21};
    border-left: none !important;
    border-radius: 0 10px 10px 0;
  }
  .ant-input-number-group-addon {
    width: 80px;
    border-radius: 10px 0 0 10px;
    border: 1px solid ${tertiaryGrey21};
    border-right: none !important;
  }
`;

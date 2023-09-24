import styled from "styled-components";
import { fontFamilyMedium, lightGrey2 } from "../GlobalStyle";

const CustomInputStyle = styled.div`
  width: 100%;
  margin-bottom: 10px;

  label {
    font-size: 13px;
    text-transform: capitalize;
    display: block;
    margin-bottom: 10px;
  }
`;

export default CustomInputStyle;

export const CustomPhoneInputStyle = styled.div`
  label {
    font-family: ${fontFamilyMedium};
  }
  .ant-input-number-input {
    font-family: ${fontFamilyMedium};
  }
  .ant-input-number-group .ant-input-number {
    padding: 6px !important;
    border: 1px solid rgb(198, 198, 200) !important;
    border-radius: 0 8px 8px 0 !important;
  }
  .ant-input-number-group-addon {
    width: 80px;
    border-radius: 8px 0 0 8px;
    border: 1px solid rgb(198, 198, 200);
  }
`;

import styled from "styled-components";
import { fontFamilyRegular, lightBlue2, lightDark2, pureDark2, secondaryDark3 } from "../GlobalStyle";

type customTextareaProps = {
  height: string;
};
export const CustomTextAreaContaienr = styled.div<customTextareaProps>`
  margin-bottom: 7px;

  label {
    font-size: 16px;
    text-transform: capitalize;
    color: ${pureDark2};
    font-family: ${fontFamilyRegular};
    display: block;
    margin-bottom: 7px;
  }
  .customInput.ant-input {
    background: white;
    border-radius: 8px;
    padding: 10px;
    height: ${(props) => props.height};
    &::placeholder{
      color: ${lightDark2};
      font-family: ${fontFamilyRegular};
      font-size: 14px;
      line-height: 22px;
    }
  }
  textarea.ant-input {
    height: ${(props) => props.height};
  }
`;

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
    font-weight: 400;
    color: ${pureDark2};
    font-family: ${fontFamilyRegular};
    display: block;
    margin-bottom: 7px;
  }
  .customInput.ant-input {
    border: 1px solid #E0E0E0;
    background: white;
    border-radius: 10px;
    font-family: ${fontFamilyRegular};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: ${lightDark2};
    padding: 10px;
    height: ${(props) => props.height};
    &::placeholder{
      color: ${lightDark2};
      font-weight: 400;
      font-family: ${fontFamilyRegular};
      font-size: 14px;
      line-height: 22px;
    }
  }
  textarea.ant-input {
    border: 1px solid #E0E0E0;
    background: white;
    border-radius: 10px;
    font-family: ${fontFamilyRegular};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: ${lightDark2};
    padding: 10px;
    height: ${(props) => props.height};
  }

  textarea.ant-input:hover{
    border-color: rgb(64, 169, 255);
    border-width: 1px;
    z-index: 1;
  }
`;

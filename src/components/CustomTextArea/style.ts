import styled from "styled-components";
import { lightBlue2, pureDark2, secondaryDark3 } from "../GlobalStyle";

type customTextareaProps = {
  height: string;
};
export const CustomTextAreaContaienr = styled.div<customTextareaProps>`
  margin-bottom: 10px;

  label {
    font-size: 16px;
    text-transform: capitalize;
    color: ${pureDark2};
    font-family: EnnVisionsMedium;
    display: block;
    margin-bottom: 10px;
  }
  .customInput.ant-input {
    background: white;
    border-radius: 10px;
    padding: 10px;
    height: ${(props) => props.height};
  }
  textarea.ant-input {
    height: ${(props) => props.height};
  }
`;

import styled from "styled-components";

type customTextareaProps = {
  height: string;
};
export const CustomTextAreaContaienr = styled.div<customTextareaProps>`
  margin-bottom: 10px;

  label {
    font-size: 13px;
    text-transform: capitalize;
    display: block;
    margin-bottom: 10px;
  }
  .customInput.ant-input {
    background: white;
    border-radius: 5px;
    padding: 10px;
    height: ${(props) => props.height};
  }
  textarea.ant-input {
    height: ${(props) => props.height};
  }
`;

import styled from "styled-components";
import { tertiaryGrey7 } from "../GlobalStyle";

type CustomSelectProps = {
  padding: string;
  border: string;
  bgColor: string;
  fontFamily: string;
  labelFamily: string;
  labelFont: string;
  labelMarginBottom: string;
  fontSize: string;
};

export const CustomSelectStyle = styled.div<CustomSelectProps>`
  width: 100%;

  label {
    font-size: 13px;
    text-transform: capitalize;
    display: block;
    font-family: ${(props) => props.labelFamily};
    margin-bottom: ${(props) => props.labelMarginBottom};
    font-size: ${(props) => props.labelFont};
  }
  .ant-select-arrow {
    color: #000000;
    img {
      height: 10px !important;
    }
  }

  .ant-select-selection-placeholder {
    color: ${tertiaryGrey7};
  }

  .ant-select {
    background: ${(props) => props.bgColor};
    border: ${(props) => props.border};
    border-radius: 3px;
    width: 100%;
    padding: ${(props) => props.padding} !important;
    font-size: ${(props) => props.fontSize};
  }
`;
export default CustomSelectStyle;

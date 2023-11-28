import styled from "styled-components";
import { lightDark2, mediaDeviceMax, pureDark2, tertiaryGrey7 } from "../GlobalStyle";

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
    text-transform: capitalize;
    color: ${pureDark2};
    display: block;
    font-family: ${(props) => props.labelFamily};
    margin-bottom: ${(props) => props.labelMarginBottom};
    font-size: ${(props) => props.labelFont};
  }
  .ant-select-arrow {
    color: #000000;
    img {
      height: 10px !important;

      @media screen and (${mediaDeviceMax.laptop}) {
        height: 8px !important;
      }
    }
  }

  .ant-select-selection-placeholder {
    color: ${lightDark2};
  }

  .ant-select {
    height: 50px;
    background: ${(props) => props.bgColor};
    border: ${(props) => props.border};
    border-radius: 10px;
    color: ${pureDark2};
    width: 100%;
    padding: ${(props) => props.padding};
    font-size: ${(props) => props.fontSize};
    &::placeholder {
      color: ${lightDark2};
    }

    @media screen and (${mediaDeviceMax.laptop}) {
      padding: 7px !important;
      font-size: 14px !important;
    }
  }
  .custom-select-inner .ant-select-selector{
    padding: 0 !important;
  }
`;
export default CustomSelectStyle;

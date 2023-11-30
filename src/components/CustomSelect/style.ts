import styled from "styled-components";
import { fontFamilyMedium, fontFamilyRegular, lightDark2, mediaDeviceMax, pureDark2, tertiaryGrey7 } from "../GlobalStyle";

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
    font-weight: 400;
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
    font-weight: 400;
    font-family: ${fontFamilyRegular};
    font-size: 16px;
  }
  .ant-select-selection-item{
    color: ${lightDark2};
    font-weight: 400;
    font-family: ${fontFamilyRegular};
    font-size: 16px;
  }
  .ant-select-item{
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    font-family: ${fontFamilyRegular};
  }

  .ant-select {
    height: 50px;
    background: ${(props) => props.bgColor};
    border: ${(props) => props.border};
    border-radius: 10px;
    font-family: ${fontFamilyRegular};
    color: ${lightDark2};
    font-weight: 400;
    width: 100%;
    padding: ${(props) => props.padding};
    font-size: ${(props) => props.fontSize};
    input::placeholder {
      color: ${lightDark2};
      font-weight: 400;
      font-family: ${fontFamilyRegular}
      font-size: 16px;
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

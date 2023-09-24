import styled from "styled-components";

type CustomDateProps = {
  padding: string;
  bgColor: string;
  border: string;
  fontFamily: string;
  labelFamily: string;
};
export const CustomDatePickerStyle = styled.div<CustomDateProps>`
  margin-bottom: 10px;
  width: 100%;
  .ant-picker {
    border: ${(props) => props.border};
  }
  .ant-input {
    border: ${(props) => props.border} !important;
    border: 1px solid red;
    background-color: red;
  }
  label {
    font-size: 14px;
    text-transform: capitalize;
    font-family: ${(props) => props.labelFamily};
    display: block;
    margin-bottom: 10px;
  }

  .ant-picker.customdatepicker {
    width: 100% !important;
    padding: ${(props) => props.padding};
    border-radius: 5px !important;
    background-color: ${(props) => props.bgColor};
    border: ${(props) => props.border};
    font-family: ${(props) => props.fontFamily};
  }
  .ant-picker {
    padding: ${(props) => props.padding};
    width: 100%;
  }
`;
export default CustomDatePickerStyle;

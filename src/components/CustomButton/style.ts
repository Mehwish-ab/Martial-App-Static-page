import styled from "styled-components";

type CustomButtonProps = {
  textTransform: string;
  color: string;
  padding: string;
  border: string;
  margin: string;
  fontFamily: string;
  bgcolor: string;
  width: string;
  fontSize: string;
  borderRadius: string;
};
const CustomButtonStyle = styled.div<CustomButtonProps>`
  width: ${(props) => props.width};

  .ant-btn {
    outline: none;
    background-color: linear-gradient(270.24deg, #C0E9F9 0.21%, #A2DDF3 97.73%);
    ;
    color: ${(props) => props.color};
    padding: ${(props) => props.padding};
    font-size: ${(props) => props.fontSize};
    border-radius: 10px;
    text-transform: ${(props) => props.textTransform};
    width: -moz-available;
    width: -webkit-fill-available;
    height: auto;
    margin: ${(props) => props.margin};
    border: ${(props) => props.border};
    font-family: ${(props) => props.fontFamily};
    cursor: pointer;
    line-height: normal;
    &:hover {
      outline: none;
    }
  }
`;

export default CustomButtonStyle;

import styled from "styled-components";

type CustomLinkStyleProps = {
  color: string;
  fontSize: string;
  textDecoration: string;
  fontFamily: string;
};
const CustomLinkStyle = styled.div<CustomLinkStyleProps>`
  a {
    color: ${(props) => props.color};
    font-size: ${(props) => props.fontSize};
    text-decoration: ${(props) => props.textDecoration};
    font-family: ${(props) => props.fontFamily};
  }
`;

export default CustomLinkStyle;

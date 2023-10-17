import styled from "styled-components";
import { secondaryDark3, whiteColor } from "../GlobalStyle";

export const NavbarStyle = styled.div`
  // width: 10;
  // border: 1px solid black;
  margin-bottom: 16px;
  .navbar-select {
    min-width: 300px;
    .ant-select-selector {
      height: 60px !important;
      align-items: center;
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
    }
  }

  .custom-input {
    height: 60px;
    // min-width: 400px;
    border-top-right-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
  }
`;
export default NavbarStyle;

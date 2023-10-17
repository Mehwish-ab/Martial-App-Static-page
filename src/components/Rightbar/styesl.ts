import styled from "styled-components";
import { darkBlue, mediaDeviceMax, mediaDeviceMin } from "../GlobalStyle";

export const RightbarStyled = styled.div`
  // width: 430px;

  .custom-card {
    border-radius: 10px;
    margin: 20px auto;
    padding: 20px 0px;
  }
  h3,
  a {
    font-size: 22px;
    font-family: "EnnVisions", sans-serif;
    color: ${darkBlue};
    font-weight: 500;
  }
  a {
    font-size: 16px;
    margin-right: 20px;
    margin-left: 20px;
    text-decoration: none;
  }

  .language-select-inner {
    position: relative;
    top: unset;
    right: unset;
  }
`;

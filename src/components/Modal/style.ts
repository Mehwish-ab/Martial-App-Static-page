import styled from "styled-components";
import { fontFamilyMedium, whiteColor } from "../GlobalStyle";

const CustomModalStyle = styled.div`
  .close-icon {
    position: absolute;
    top: 10px;
    right: 0px;
    z-index: 2000;
    height: 46px;

    cursor: pointer;
    border-radius: 50%;
    &:hover {
      background-color: rgba(10, 37, 64, 0.35);
    }
  }
`;

export default CustomModalStyle;

export const LoadingOverlayStyle = styled.div`
  .message {
    color: ${whiteColor};
    font-family: ${fontFamilyMedium};
    text-align: center;
    font-size: 22px;
    margin-bottom: 0;
  }
`;

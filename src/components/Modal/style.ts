import styled from "styled-components";
import { fontFamilyMedium, whiteColor } from "../GlobalStyle";

const CustomModalStyle = styled.div`
background-color: #fff;
padding: 14px;
border-radius: 10px;
position: relative;

  .close-icon {
      position: absolute;
      top: 12px;
      right: 12px;
      cursor: pointer;
      border-radius: 10px;
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

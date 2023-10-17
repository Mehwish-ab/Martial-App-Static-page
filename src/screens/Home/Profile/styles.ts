import styled from "styled-components";
import {
  mediaDeviceMax,
  mediaDeviceMin,
} from "../../../components/GlobalStyle";

export const ProfileStyled = styled.div`
  .profileImg {
    .img {
      width: 224px !important;
      height: 224px !important;
      bottom: -100px !important;
      img {
        width: 224px !important;
        height: 224px !important;
      }
    }
  }

  .profile_section {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding-bottom: 16px;
    padding-top: 16px;

    .profile {
      width: 70%;
      margin-left: auto;
      padding: 0 10px;

      @media screen and (${mediaDeviceMax.laptopL}) {
        margin-left: 0;
      }
      h1 {
        font-size: 54px;
        color: #000000;
        font-weight: 500;
        margin-bottom: 16px;
      }
      p {
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
`;

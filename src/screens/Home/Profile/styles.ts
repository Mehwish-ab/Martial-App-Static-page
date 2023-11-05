import styled from "styled-components";
import {
  mediaDeviceMax,
  mediaDeviceMin,
} from "../../../components/GlobalStyle";

export const ProfileStyled = styled.div`
  // .profileImg {
  //   .img {
  //     width: 224px !important;
  //     height: 224px !important;
  //     bottom: -100px !important;

  //     @media screen and (max-width: 1480px) {
  //       width: 200px !important;
  //       height: 200px !important;
  //       bottom: -50px !important;
  //     }

  //     img {
  //       width: 224px !important;
  //       height: 224px !important;

  //       @media screen and (max-width: 1480px) {
  //         width: 170px !important;
  //         height: 170px !important;
  //       }
  //     }
  //   }
  // }

  .profile_section {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 16px;

    .profile {
      // width: 70%;
      // margin-left: auto;
      padding: 0 10px;

      @media screen and (max-width: 1480px) {
        // width: 100%;
        // margin-left: 0;
        margin-top: 16px;
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

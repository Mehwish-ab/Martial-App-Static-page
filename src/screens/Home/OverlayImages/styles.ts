import styled from "styled-components";
import { whiteColor } from "../../../components/GlobalStyle";

export const OverlayImagesStyled = styled.div`
  .image_section {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .bannerImg {
    height: 280px;
    position: relative;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
      border: 1px solid white;
    }

    .changeBannerImgButton {
      position: absolute;
      top: 5px;
      right: 10px;
    }
  }

  .profileImg {
    position: relative;
  }

  .profileImg {
    > .img {
      position: absolute;
      bottom: 20px;
      left: 20px;
      width: 170px;
      height: 170px;
      display: block;
      z-index: 0;

      > img {
        width: 170px;
        height: 170px;
        object-fit: cover;
        border-radius: 20px;
        border: 1px solid white;
      }
    }
    .changeProfileImgButton {
      position: absolute;
      bottom: 8px;
      right: 10px;
    }
  }
  .ant-btn-icon-only{
    border-radius: 6px;
    border: 0.5px solid rgb(193, 223, 223);
    background: ${whiteColor};
    width: 31px;
    height: 30px;
    padding: 0px 0px;
    line-height: normal;
    img{
      position: relative;
      top: -1px;
    }
  }
`;

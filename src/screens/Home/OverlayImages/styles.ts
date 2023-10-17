import styled from "styled-components";

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
      z-index: 9;

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
      top: 5px;
      right: 10px;
    }
  }
`;

import styled from "styled-components";
import {
  fontFamilyMedium,
  lightBlue3,
  lightGrey3,
  mediaDeviceMax,
  primaryColor,
  pureDark,
  pureDark2,
  secondaryDark4,
  whiteColor,
} from "../../components/GlobalStyle";
import banner from "../../assets/images/ic_image_1.png";

export const HomeStyle = styled.div`
  .arrow-box {
    position: absolute;
    bottom: 6%;
    right: 5%;
    border-radius: 50%;
    cursor: pointer;
  }
`;
export const HeroSectionStyle = styled.div`
  background: url(${banner});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  margin-top: -70px;
  .inner-container {
    height: 100vh;
    &-main-heading {
      font-size: 52px;
      color: ${whiteColor};
      margin: 0;
      .house-up {
        font-family: ${fontFamilyMedium};
      }
    }

    .purchase-btns {
      max-width: 300px;
      margin-top: 45px;
      background-color: ${whiteColor};
      border-radius: 7px;
      height: 50px;
      padding: 3px;
      .active {
        background-color: ${primaryColor};
        height: 100%;
        border-radius: 4px;
        color: ${whiteColor};
      }
      button {
        background: transparent;
        font-size: 18px;
      }
    }

    .location-select-section {
      max-width: 1000px;
      margin-top: 45px;
      background-color: ${whiteColor};
      border-radius: 7px;
      .title {
        color: ${pureDark};
        font-size: 16px;
        font-family: ${fontFamilyMedium};
      }
      .sub-title {
        color: ${secondaryDark4};
        font-size: 14px;
      }
      .property-type {
        border-left: 1px solid ${lightGrey3};
        height: 70%;
        .search-box {
          background-color: ${primaryColor};
          border-radius: 4px;
          padding: 12px;
          img {
            vertical-align: super;
          }
        }
      }
    }

    .hero-footer {
      background-color: ${whiteColor};
      margin-top: 70px;
    }

    .icon {
      cursor: pointer;
      &:not(:first-child) {
        margin-left: 12px;
      }
    }
  }
`;
export const GlobalContainer = styled.div`
  display: flex;
  margin: 0 0 0 16px;
  gap: 16px;
  @media screen and (max-width: 991px) {
    margin-left: 0;
  }

  .content-left-width {
    margin-left: 250px;

    @media screen and (max-width: 991px) {
      margin-left: 0;
    }
  }

  .page-content {
    margin-left: 16px;
    // margin-right: 400px;
  }

  .right-sider-width {
    flex: 0 0 400px !important;
    max-width: 400px !important;
    width: 430px !important;
    display: block;
    @media screen and (max-width: 1670px) {
      flex: 0 0 300px !important;
      max-width: 300px !important;
      width: 330px !important;
    }

    @media screen and (max-width: 1200px) {
      flex: 0 0 200px !important;
      max-width: 200px !important;
      width: 100% !important;
    }

    @media screen and ${mediaDeviceMax.tabletL} {
      display: none !important;
    }
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
`;

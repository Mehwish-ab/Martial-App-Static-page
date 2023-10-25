import styled from "styled-components";
import {
  fontFamilyBold,
  mediaDeviceMax,
  secondaryDark3,
  tertiaryGrey21,
  whiteColor,
} from "../GlobalStyle";

export const NavbarStyle = styled.div`
  margin-bottom: 16px;

  .logo {
    display: none;
    width: 100%;
    text-align: center;

    img {
      width: 70px;
    }
    @media screen and ${mediaDeviceMax.tablet} {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .top-side {
    .left-bar {
      flex: 1;

      .custom-input {
        height: 60px;
        border-top-right-radius: 10px !important;
        border-bottom-right-radius: 10px !important;

        @media screen and ${mediaDeviceMax.tabletL} {
          height: 50px;
        }

        @media screen and ${mediaDeviceMax.tablet} {
          display: none;
        }
      }

      .navbar-select {
        max-width: 300px;
        width: 100%;
        display: inline-block;
        @media screen and ${mediaDeviceMax.tabletL} {
          max-width: 200px;
        }
        @media screen and ${mediaDeviceMax.tabletB} {
          max-width: 150px;
        }
        @media screen and ${mediaDeviceMax.tablet} {
          display: none;
        }
        .ant-select-selector {
          height: 60px !important;
          align-items: center;
          border-top-left-radius: 10px !important;
          border-bottom-left-radius: 10px !important;

          @media screen and ${mediaDeviceMax.tabletL} {
            height: 50px !important;
          }
        }
      }
    }
  }

  .date-time-area {
    background: #fff;
    border-radius: 10px;
    border: 1px solid ${tertiaryGrey21};
    display: block;

    @media screen and (max-width: 1300px) {
      display: none;
    }

    .date {
      font-family: ${fontFamilyBold};
      margin-left: 5px;
    }
  }

  .notification-area {
    background: #fff;
    border-radius: 10px;
    position: relative;

    > div {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;

      > .ant-btn {
        padding-top: 0;
        padding-bottom: 0;
        border-radius: 0;
        box-shadow: none;
      }
      > .ant-btn-icon-only {
        vertical-align: 0;
      }
    }

    .notification-count {
      position: absolute;
      top: -32px;
      right: 7px;
      content: "";
      z-index: 1;
      color: white;
      &::before {
        content: "";
        position: absolute;
        top: 21px;
        right: -5px;
        width: 20px;
        height: 20px;
        background: red;
        border-radius: 50%;
        z-index: -1;
      }
    }
  }

  .menu-toggler {
    display: none;
    @media screen and (max-width: 991px) {
      display: block;
    }

    button {
      border-radius: 10px;
      border: 1px solid ${tertiaryGrey21};
      width: 50px;
      height: 50px;
    }
  }
`;
export default NavbarStyle;

export const NavbarRow2Styled = styled.div`
  display: none;
  @media screen and ${mediaDeviceMax.tablet} {
    display: block;
  }
  .left-bar {
    flex: 1;
    margin-top: 10px;

    .custom-input {
      height: 50px;
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
      @media screen and ${mediaDeviceMax.mobileBS} {
        border-radius: 10px !important;
      }
    }

    .navbar-select {
      width: 100%;
      max-width: 150px;
      display: inline-block;

      @media screen and ${mediaDeviceMax.mobileBS} {
        display: none;
      }
      .ant-select-selector {
        height: 50px !important;
        align-items: center;
        border-top-left-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
      }
    }
  }
`;
export const NavbarSmallScreenStyled = styled.div`
  display: none;

  @media screen and ${mediaDeviceMax.tabletL} {
    display: block;
  }

  .logo {
    width: 70px;

    @media screen and ${mediaDeviceMax.mobileXL} {
      width: 50px;
    }
  }
`;

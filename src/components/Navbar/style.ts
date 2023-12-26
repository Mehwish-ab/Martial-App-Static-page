import styled from "styled-components";
import {
  fontFamilyBold,
  mediaDeviceMax,
  tertiaryGrey21,
  lightDark2,
  fontFamilyRegular,
  fontFamilyMedium,
  pureDark2,
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
  .profileName{
    display: inline-block;
    font-size: 16px;
    font-style: normal;
    line-height: normal;
    margin-left: 10px;
    font-family: ${fontFamilyRegular};
    color: ${pureDark2};
    @media screen and ${mediaDeviceMax.mobileM} {
      margin-left: 6px;
    }
  }
  
  .top-side {
    .right-bar{
      gap: 16px;
    }
    .left-bar {
      flex: 1;

      .custom-input {
        height: 40px;
        border: none;
        border-bottom: 10px;
        border-radius: unset;
        border-bottom: 1px solid #EAEAEA;
        max-width: 347px;
        border-radius: 9px;
        font-family: ${fontFamilyRegular};
        input::placeholder{
          color: #4F4F4F !important;
          font-family: ${fontFamilyRegular};
          
        }
        @media screen and ${mediaDeviceMax.tabletL} {
          height: 50px;
        }

        @media screen and ${mediaDeviceMax.tabletS} {
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
          height: 50px !important;
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
      top: -15px;
      right: 5px;
      content: "";
      z-index: 1;
      color: white;
      font-size: 10px;
      &::before {
        content: "";
        position: absolute;
        top: 25px;
        right: -4.5px;
        width: 14px;
        height: 14px;
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
  @media screen and ${mediaDeviceMax.tabletS} {
    display: block;
  }
  .left-bar {
    flex: 1;
    margin-top: 10px;

    .custom-input {
      height: 40px;
      border: none;
      border-bottom: 10px;
      border-radius: unset;
      border-bottom: 1px solid black;

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
  .top-side .navbarSearchField > .ant-input::-webkit-input-placeholder ,
  .top-side .navbarSearchField > .ant-input::placeholder ,
   input:placeholder-shown, 
   #root .ant-input::-webkit-input-placeholder  {
    color: ${lightDark2} !important;
    opacity: 1 !important;
  }
`;

export const DropDownStyling = styled.div`
.ant-btn-icon-only {
  width: 24px;
  height: 32px;
        
      }
`;

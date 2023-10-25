import styled from "styled-components";
import { lightBlue3, pureDark2 } from "../GlobalStyle";

export const NavigationMenuStyled = styled.div`
  .ant-menu {
    padding-top: 50px;
    padding-top: 20px;

    border-radius: 20px;

    &-item {
      height: 47px !important;
    }
    &-item,
    &-submenu {
      width: 90% !important;
      margin-left: auto;
      margin-right: auto;
      justify-content: flex-start !important;
      transition: all 0.3s !important;
      &::after {
        border-right: 0 !important;
      }
      span {
        font-weight: 400;
        font-size: 16px;
        color: ${pureDark2} !important;
      }
    }

    &-sub {
      background: white !important;
    }

    &-item-active,
    &-item-selected {
      background: ${lightBlue3}!important;
      border-radius: 10px;
      justify-content: center !important;
      padding-left: 16px !important;
      font-weight: 500;
      span {
        flex: none !important;
        font-weight: 700;
      }
    }
  }
`;

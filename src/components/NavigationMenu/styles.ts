import styled from "styled-components";
import { lightBlue3, pureDark2 } from "../GlobalStyle";

export const NavigationMenuStyled = styled.div`
  .ant-menu {
    padding-top: 20px;
    border: none;
    
    &-item {
      height: 47px !important;
      padding-left: 0 !important; 
      &:hover{
        padding-left: 0;
      }
    }
    &-item,
    &-submenu {
      width: 90% !important;
      margin-left: auto;
      margin-right: auto;
      justify-content: flex-start !important;
      transition: all 0.3s !important;
      .ant-menu-item:active, .ant-menu-submenu-title:active {
        background: transparent !important;
        font-weight: 700;
    }
      > .ant-menu-submenu-title{
        padding-left: 0 !important;
        transition: all 0.3s !important;
        &:active{
          font-weight: 500;
          font-size: 18px;
        }
        &:active{

          font-weight: 500;
        }
        + ul{
          padding-top: 00px !important;
          transition: all 0.3s !important;
        }
      }
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
      background: transparent !important;
      padding-left: 0px !important;
      font-weight: 500;
      font-size: 18px;
      span {
        flex: none !important;
        font-size: 18px;
        font-weight: 700;

      }
    }
  }


`;

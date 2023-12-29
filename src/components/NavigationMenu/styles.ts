import styled from 'styled-components'
import { fontFamilyMedium, pureDark2 } from '../GlobalStyle'

export const NavigationMenuStyled = styled.div`
    .ant-menu {
        padding-top: 20px;
        border: none;

        &-item {
            height: 47px !important;
            padding-left: 0 !important;
            display: block !important;
            &:hover {
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
            .ant-menu-item:active,
            .ant-menu-submenu-title:active {
                background: transparent !important;
                font-family: ${fontFamilyMedium};
            }
            > .ant-menu-submenu-title {
                width: 100%;
                padding-left: 0 !important;
                transition: all 0.3s !important;
                &:active {
                    font-family: ${fontFamilyMedium};
                    font-size: 16px;
                }
                &:active {
                    font-family: ${fontFamilyMedium};
                }
                + ul {
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
        &-item {
        }
        &-sub {
            background: white !important;
        }

        &-item-active,
        &-item-selected {
            width: 100%;
            background: transparent !important;
            padding-left: 0px !important;
            font-family: ${fontFamilyMedium};
            font-size: 16px;
            span {
                flex: none !important;
                font-size: 16px;
                font-family: ${fontFamilyMedium};
            }
        }
    }
`

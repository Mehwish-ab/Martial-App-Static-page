import styled from 'styled-components'
import {
    fontFamilyRegular,
    mediaDeviceMax,
    pureDark2,
    pureDark,
    lightBlue3,
    fontFamilyMedium,
    whiteColor,
} from '../../GlobalStyle'

export const whenScreenIs1024AndLess = `@media screen and ${mediaDeviceMax.laptop}`

export const NavbarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0px;
    background-color: #fff;
    margin-bottom: 5px;

    .dropdown-toggle {
        border: 1px solid ${pureDark2};
        &::after {
            display: none;
        }
    }

    .loginBtn {
        font-size: 16px;
        font-style: normal;
        // font-weight: 500;
        line-height: normal;
        color: #ffff; /* Color of the button text */
        border-radius: 5px;
    }
    .separator {
        color: #ffff; /* Color of the separator */
        padding: 0 10px; /* Adjust spacing as needed */
    }
    .app-logo {
        .brand_text {
            font-size: 18px;
            color: ${pureDark};
            display: block;
            ${whenScreenIs1024AndLess} {
                font-size: 16px;
            }
            @media screen and ${mediaDeviceMax.mobileXL} {
                display: none;
            }
        }
    }

    .toggler {
        display: none;

        ${whenScreenIs1024AndLess} {
            display: block;
        }
    }

    .app-navbar {
        display: flex;
        flex-direction: row;
    }

    .app-nav-link {
        color: #000000;
        font-weight: 400;
        font-family: ${fontFamilyRegular};
        text-decoration: none;
        font-size: 16px;
        transition: all 0.2s ease-in-out;

        ${whenScreenIs1024AndLess} {
            font-size: 14px;
        }
    }
    .mobile-nav {
        position: absolute;
    }
`

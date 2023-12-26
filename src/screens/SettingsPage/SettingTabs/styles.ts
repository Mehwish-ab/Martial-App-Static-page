import styled from 'styled-components'
import {
    fontFamilyMedium,
    fontFamilyRegular,
    lightDark2,
    pureDark2,
} from '../../../components/GlobalStyle'

export const TabsStyling = styled.div`
    .TabsMainContainer {
        margin: 0 auto;
    }

    .tabs-component {
        display: flex;
        align-items: start;
        column-gap: 20px;
    }

    .tabs-component [role='tablist'] {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        width: 30%;
        padding: 5px 0px;
    }

    .tabs-component [role='tablist'] button {
        height: 40px;
        text-align: left;
        background-color: transparent;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        cursor: pointer;
        outline: none;
        background-color: #fff;
        font-family: ${fontFamilyRegular};
        color: ${pureDark2};
        font-size: 16px;
        font-weight: 400;
        line-height: normal;
    }

    .tabs-component [role='tablist'] button.active,
    .tabs-component [role='tablist'] button:focus,
    .tabs-component [role='tablist'] button:hover {
        font-family: ${fontFamilyMedium};
        font-weight: 500;
    }

    .tabs-component [role='tablist'] button.active {
        font-family: ${fontFamilyMedium};
        font-weight: 500;
    }

    .tabs-component [role='tabpanel'] {
        padding: 16px 20px;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        width: 70%;
    }

    .tabs-component [role='tabpanel'] {
        .panel-heading {
            h3 {
                font-family: ${fontFamilyMedium};
                font-weight: 500;
                color: ${pureDark2};
                font-size: 16px;
                line-height: normal;
            }
            p {
                font-family: ${fontFamilyRegular};
                color: ${lightDark2};
                font-size: 14px;
                font-weight: 400;
                line-height: normal;
            }
        }
        .panel-body {
            height: 75px;
            align-items: center;
            border-top: 1px solid #e0e0e0;
            &-heading {
                font-family: ${fontFamilyMedium};
                color: ${pureDark2};
                font-size: 14px;
                font-weight: 500;
                line-height: normal;
            }
            &-text {
                font-family: ${fontFamilyRegular};
                color: ${lightDark2};
                font-size: 14px;
                font-weight: 400;
                line-height: normal;
            }
            &-link {
                font-family: ${fontFamilyRegular};
                color: #1877f2;
                font-size: 14px;
                font-weight: 400;
                line-height: normal;
                text-align: right;
                text-decoration: none;
                cursor: pointer;
            }
            &-link:hover {
                text-decoration: underline;
            }
        }
    }
`

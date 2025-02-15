import styled from 'styled-components'
import {
    fontFamilyRegular,
    lightDark2,
    mediaDeviceMin,
    pureDark2,
} from '../GlobalStyle'

export const CustomCheckboxListStyled = styled.div`
    .checkboxes_row {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(1, 1fr);
    }
    .checkbox_col {
        label {
            font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            font-family: ${fontFamilyRegular};
            white-space: nowrap;
            input[type='checkbox'] {
                width: 24px;
                height: 24px;
                cursor: pointer;
                border-radius: 1px;
                accent-color: #3d86af;
            }
        }
    }

    @media screen and ${mediaDeviceMin.mobileL} {
        .checkboxes_row {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and ${mediaDeviceMin.tabletL} {
        .checkboxes_row {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media screen and ${mediaDeviceMin.laptop} {
        .checkboxes_row {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media screen and ${mediaDeviceMin.laptopL} {
        .checkboxes_row {
            grid-template-columns: repeat(5, 1fr);
        }
    }
    @media screen and ${mediaDeviceMin.desktop} {
        .checkboxes_row {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(8, 1fr);
        }
    }

    .invalid-activity {
        color: red;
        text-align: end;
        margin-left: 3px;
        font-size: 12px;
        letter-spacing: 1px;
    }
`

export const CheckboxesSelectStyled = styled.div`
    overflow: hidden;
    width: 100%;
    margin-top: 20px;
    .title {
        font-family: ${fontFamilyRegular};
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 7px;
        color: ${pureDark2};
        display: block;
    }
`

export const CheckboxSelectTriggerStyled = styled.div`
    width: 100%;
    height: 50px;
    border: 1px solid #e0e0e0;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    color: ${lightDark2};
    font-family: ${fontFamilyRegular};
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
        font-family: ${fontFamilyRegular};
        font-size: 16px;
        font-weight: 400;
        color: ${lightDark2};
    }
`

import styled from 'styled-components'
import { fontFamilyRegular, lightDark2, pureDark2 } from '../GlobalStyle'

type CustomDateProps = {
    padding: string
    bgColor: string
    border: string
    fontFamily: string
    labelFamily: string
}
export const CustomDatePickerStyle = styled.div<CustomDateProps>`
    .ant-input {
        border: ${(props) => props.border};
        border: 1px solid red;
        background-color: red;
        &::placeholder {
            font-family: ${fontFamilyRegular};
            font-size: 16px;
            color: ${lightDark2};
            font-weight: 400;
        }
    }
    label {
        font-size: 16px;
        text-transform: capitalize;
        color: ${pureDark2};
        font-weight: 500;
        font-family: ${(props) => props.labelFamily};
        display: block;
        margin-bottom: 7px;
    }

    .ant-picker.customDatePicker {
        height: 50px;
        width: 100%;
        padding: ${(props) => props.padding};
        background-color: ${(props) => props.bgColor};
        border: ${(props) => props.border};
        border-radius: 10px;
        font-family: ${(props) => props.fontFamily};
        .ant-picker-input > input {
            font-family: ${fontFamilyRegular};
            font-size: 16px;
            color: ${lightDark2};
            font-weight: 400;
            &::placeholder {
                font-family: ${fontFamilyRegular};
                font-size: 16px;
                color: ${lightDark2};
                font-weight: 400;
            }
        }
    }
    .customDatePicker:focus,
    .customDatePicker:hover {
        border-color: #40a9ff;
        border-width: 1px;
    }
`

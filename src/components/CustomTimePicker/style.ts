import styled from 'styled-components'
import { fontFamilyRegular, lightDark2, pureDark2 } from '../GlobalStyle'

type CustomTimeProps = {
    padding: string
    bgColor: string
    border: string
    fontFamily: string
    labelFamily: string
}

export const CustomTimePickerStyle = styled.div<CustomTimeProps>`
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
        font-style: normal;
        line-height: 20px;
        margin-bottom: 7px;
    }

    .ant-picker.customTimePicker {
        max-width: 184px;
        width: 100%;
        height: 40px;
        padding: ${(props) => props.padding};
        background-color: ${(props) => props.bgColor};
        border-radius: 5px;
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
`

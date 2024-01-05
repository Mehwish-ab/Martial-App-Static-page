import styled from 'styled-components'

type CustomDateProps = {
    padding: string
    bgColor: string
    border: string
    fontFamily: string
    labelFamily: string
}
export const CustomDatePickerStyle = styled.div<CustomDateProps>`
    width: 100%;
    .ant-picker {
        border: ${(props) => props.border};
    }
    .ant-input {
        border: ${(props) => props.border} !important;
        border: 1px solid red;
        background-color: red;
    }
    label {
        font-size: 16px;
        text-transform: capitalize;
        font-family: ${(props) => props.labelFamily};
        display: block;
        margin-bottom: 8px;
    }

    .ant-picker.customdatepicker {
        height: 50px;
        width: 100% !important;
        padding: ${(props) => props.padding};
        background-color: ${(props) => props.bgColor};
        border: ${(props) => props.border};
        border-radius: 10px;
        font-family: ${(props) => props.fontFamily};
    }
    .ant-picker {
        padding: ${(props) => props.padding};
        width: 100%;
    }
`

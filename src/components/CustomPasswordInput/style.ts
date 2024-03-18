import styled from 'styled-components'
import { basicColor } from '../GlobalStyle'

type CustomPasswordInputTypes = {
    fontFamily: string
    border: string
    padding: string
    placeholderFamily: string
    placeholderFont: string
    fontSize: string
    labelMarginBottom: string
    labelFont: string
    labelFamily: string
    placeholderColor: string
}

export const CustomPasswordInputStyle = styled.div<CustomPasswordInputTypes>`
    label {
        font-size: ${(props) => props.labelFont};
        font-family: ${(props) => props.labelFamily};
        margin-bottom: ${(props) => props.labelMarginBottom};
    }

    .ant-input {
        font-family: ${(props) => props.fontFamily};
        font-size: ${(props) => props.fontSize};
        &::placeholder {
            font-family: ${(props) => props.placeholderFamily};
            font-size: ${(props) => props.placeholderFont};
            color: ${(props) => props.placeholderColor};
        }
    }

    .customPasswordInput {
        background: white;
        border-radius: 8px;
        padding: ${(props) => props.padding};
    }
    .customInput {
        border-radius: 10px;
        margin-bottom: 0px;
    }

    .ant-input-suffix span {
        font-size: 12px;
        font-weight: normal;
        color: ${basicColor};
        cursor: pointer;
        font-family: ${(props) => props.fontFamily};
    }
    .ant-input-affix-wrapper {
        border: ${(props) => props.border};
        border-radius: 10px;
    }
`

export default CustomPasswordInputStyle

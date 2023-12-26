import styled from 'styled-components'
import { fontFamilyMedium } from '../GlobalStyle'

const InputFieldStyle = styled.div<any>`
    width: 100%;
    margin-top: ${(props) => props.marginTop};

    .ant-input {
        padding: ${(props) => props.padding} !important;
        border: ${(props) => props.border};
        border-radius: ${(props) => props.borderRadius};
        text-align: ${(props) => props.textAlign};
    }
    .ant-input-affix-wrapper {
        padding: 0;
        border-radius: 10px;
    }
    .ant-input-suffix {
        // margin-right: 10px;
    }
`

export default InputFieldStyle

export const TextFieldStyle = styled.div<any>`
    width: 100%;
    margin-top: ${(props) => props.marginTop};
    label {
        font-family: ${fontFamilyMedium};
        margin-bottom: ${(props) => props.labelMarginBottom};
    }

    .ant-input {
        padding: ${(props) => props.padding} !important;
        border: ${(props) => props.border};
        border-radius: ${(props) => props.borderRadius};
        text-align: ${(props) => props.textAlign};
        font-family: ${(props) => props.fontFamily};
        &::placeholder {
            font-family: ${(props) => props.fontFamily};
        }
    }
    .ant-input-affix-wrapper {
        padding: 0;
        border-radius: 10px;
    }
    .ant-input-suffix {
        // margin-right: 10px;
    }
`

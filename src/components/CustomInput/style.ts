import styled from 'styled-components'
import { FieldStyleBasicProps } from '../FormControl'
import { lightDark2, pureDark2, secondaryDark3 } from '../GlobalStyle'

interface InputStyleProps extends FieldStyleBasicProps {
    fontSize: string
    fontFamily: string
    border: string
    padding: string
    placeholderFont: string
    placeholderFamily: string
    marginBottom: string
    borderRadius: string
    labelFont: string
    labelMarginBottom: string
    labelFamily: string
}
const CustomInputStyle = styled.div<InputStyleProps>`
    width: 100%;

    label {
        display: block;
        color: ${pureDark2};
        font-weight: 500;
        text-transform: capitalize;
        font-size: ${(props) => props.labelFont};
        font-family: ${(props) => props.labelFamily};
        margin-bottom: ${(props) => props.labelMarginBottom};
    }

    .ant-input {
        height: 50px;
        padding: ${(props) => props.padding};
        border: 'none';
        font-weight: 400;
        color: ${lightDark2};
        font-family: ${(props) => props.fontFamily};
        font-size: ${(props) => props.fontSize};
        border-radius: ${(props) => props.borderRadius};
        &::placeholder {
            font-family: ${(props) => props.placeholderFamily};
            font-size: ${(props) => props.placeholderFont};
            color: ${lightDark2};
            font-weight: 400;
        }
    }
`

export default CustomInputStyle

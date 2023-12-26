import { Input } from 'antd'
import { TextFieldStyle } from './style'

type TextFieldFieldProps = {
    name: string
    label?: string
    value?: string | number | null
    textAlign?: string
    placeholder: string
    labelMarginBottom?: string
    padding: string
    type?: string
    border?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    fontFamily?: string
    onBlur?: any
}

const TextField: React.FC<TextFieldFieldProps> = ({
    name,
    value,
    label,
    type = 'text',
    textAlign = 'left',
    placeholder,
    onChange,
    padding = '8px 8px',
    labelMarginBottom = '10px',
    border = '1px solid #EFEFF4',
    fontFamily = 'EnnVisionsMedium',
    onBlur,
}) => {
    console.log({ border })
    return (
        <>
            <TextFieldStyle
                bgColor="white"
                border={border}
                padding={padding}
                marginTop="0px"
                borderRadius="0px"
                textAlign={textAlign}
                labelMarginBottom={labelMarginBottom}
                fontFamily={fontFamily}
            >
                {label && <label htmlFor={name}>{label}</label>}
                <Input
                    placeholder={placeholder}
                    value={value ?? ''}
                    type={type}
                    name={name}
                    id={name}
                    onBlur={onBlur}
                    onChange={onChange}
                />
            </TextFieldStyle>
        </>
    )
}

export default TextField

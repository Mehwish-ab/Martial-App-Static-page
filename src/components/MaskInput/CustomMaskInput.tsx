import InputMask from 'react-input-mask'
import MaskInputStyle from './style'

type CustomMaskInputProps = {
    name: string
    maskChar: string
    mask: string
    type: string
    label: string
    placeholder: string
    setValue: (e: any) => void
}
const CustomMaskInput = ({
    name,
    mask,
    maskChar,
    type,
    label,
    placeholder,
    setValue,
}: CustomMaskInputProps) => {
    return (
        <MaskInputStyle>
            <label htmlFor={name}>{label}</label>
            <InputMask
                type={type}
                name={mask}
                id={name}
                mask={mask}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                maskChar={maskChar}
            />
        </MaskInputStyle>
    )
}

export default CustomMaskInput

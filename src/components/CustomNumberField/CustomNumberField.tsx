import { Field, ErrorMessage } from 'formik'
import ErrorMsg from '../ErrorMessage'
import { Input, Space } from 'antd'
import CustomInputStyle from './style'
import { fontFamilyRegular, tertiaryGrey24 } from '../GlobalStyle'

type CustomNumberField = {
    label: string
    prefix: string
    defaultValue: string
    maxLength: string
    disabled: string
    feetPlaceholder: string
    inchPlaceholder: string
    className: string
    name: string
    feetName: string
    inchName: string
    onFocus?: boolean
    onKeyUp?: () => void
    value: string
    fontFamily?: 'EnnVisions' | 'EnnVisionsMedium' | 'EnnVisionsBold'
    bgColor?: string
    border?: string
    padding?: string
    showErrorMessage?: boolean
    fontSize?: string
    suffix?: null | React.ReactNode
    readyOnly?: boolean
    type: string
    labelMarginBottom?: string
    labelFamily?: 'EnnVisions' | 'EnnVisionsMedium' | 'EnnVisionsBold'
    placeholderFamily?: 'EnnVisions' | 'EnnVisionsMedium' | 'EnnVisionsBold'
    placeholderFont?: string
    marginBottom?: string
    borderRadius?: string
    labelFont?: string
    max: string
}

const CustomNumberField: React.FC<CustomNumberField> = ({
    prefix,
    defaultValue,
    maxLength,
    disabled,
    feetPlaceholder,
    inchPlaceholder,
    placeholderFamily = fontFamilyRegular,
    placeholderFont = '16px',
    className,
    name,
    feetName,
    inchName,
    fontSize = '16px',
    fontFamily = fontFamilyRegular,
    bgColor = 'white',
    border = `1px solid ${tertiaryGrey24}`,
    padding = '10px',
    showErrorMessage = true,
    suffix = null,
    readyOnly = false,
    label,
    labelMarginBottom = '7px',
    labelFamily = fontFamilyRegular,
    labelFont = '16px',
    type = 'text',
    marginBottom = '10px',
    borderRadius = '10px',
    max,
    onKeyUp,
}: CustomNumberField) => {
    return (
        <CustomInputStyle
            fontFamily={fontFamily}
            bgColor={bgColor}
            border={border}
            padding={padding}
            labelFont={labelFont}
            labelFamily={labelFamily}
            labelMarginBottom={labelMarginBottom}
            fontSize={fontSize}
            placeholderFamily={placeholderFamily}
            placeholderFont={placeholderFont}
            marginBottom={marginBottom}
            borderRadius={borderRadius}
        >
            <label htmlFor={name}>{label}</label>
            <Space.Compact className="w-100">
                <Field name={feetName} id={feetName}>
                    {({ field }: any) => (
                        <Input
                            disabled={disabled}
                            prefix={prefix}
                            className={className}
                            type={type}
                            readOnly={readyOnly}
                            maxLength={12}
                            placeholder={feetPlaceholder}
                            defaultValue={defaultValue}
                            {...field}
                            suffix={suffix}
                            onKeyUp={onKeyUp}
                        />
                    )}
                </Field>
                <Field name={inchName} id={inchName}>
                    {({ field }: any) => (
                        <Input
                            disabled={disabled}
                            prefix={prefix}
                            className={className}
                            type={type}
                            readOnly={readyOnly}
                            maxLength={12}
                            max={max}
                            placeholder={inchPlaceholder}
                            defaultValue={defaultValue}
                            {...field}
                            suffix={suffix}
                            onKeyUp={onKeyUp}
                        />
                    )}
                </Field>
            </Space.Compact>
            {showErrorMessage && (
                <ErrorMessage name={name} component={ErrorMsg} />
            )}
        </CustomInputStyle>
    )
}

export default CustomNumberField

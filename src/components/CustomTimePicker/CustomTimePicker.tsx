import { TimePicker } from 'antd'
import { Field, ErrorMessage } from 'formik'
import { CustomTimePickerStyle } from './style'
import ErrorMsg from '../ErrorMessage'
import timeIcon from '../../assets/icons/ic_clock.svg'
const CustomTimePickerNew = (props: {
    [x: string]: any
    name: any
    placeholder: any
    label: any
    bgColor?: 'white' | undefined
    border?: '1px solid #c6c6c8;' | undefined
    padding?: '8px' | undefined
    fontFamily?: 'EnnVisions' | undefined
    labelFamily?: 'EnnVisions' | undefined
    marginBottom?: '10px' | undefined
    onChange: any
    showErrorMessage?: true | undefined
}): JSX.Element => {
    const {
        name,
        placeholder,
        label,
        bgColor = 'white',
        border = '1px solid #c6c6c8;',
        padding = '8px',
        fontFamily = 'EnnVisions',
        labelFamily = 'EnnVisions',
        marginBottom = '10px',
        onChange,
        showErrorMessage = true,
        ...rest
    } = props

    return (
        <CustomTimePickerStyle
            fontFamily={fontFamily}
            labelFamily={labelFamily}
            bgColor={bgColor}
            border={border}
            padding={padding}
        >
            {label && <label htmlFor={name}>{label}</label>}
            <Field name={name} id={name} {...rest}>
                {({ form }: any) => (
                    <TimePicker
                        className="customTimePicker"
                        placeholder={placeholder}
                        allowClear={false}
                        suffixIcon={
                            <img
                                src={timeIcon}
                                alt="time-icon"
                                width={19}
                                height={19}
                            />
                        }
                        name={name}
                        format="hh:mm A"
                        id={name}
                        {...rest}
                        onChange={(_, timeString) => {
                            if (onChange) {
                                onChange(timeString)
                            } else {
                                form.setFieldValue(name, timeString)
                            }
                        }}
                    />
                )}
            </Field>
            {showErrorMessage && (
                <ErrorMessage name={name} component={ErrorMsg} />
            )}
        </CustomTimePickerStyle>
    )
}

export default CustomTimePickerNew

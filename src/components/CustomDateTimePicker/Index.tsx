/* eslint-disable @typescript-eslint/no-unused-vars */
import { TimePicker } from 'antd'
import { Field, ErrorMessage } from 'formik'
import { CustomDatePickerStyle } from '../CustomDatePicker/style'
import ErrorMsg from '../ErrorMessage'
import timeIcon from '../../assets/icons/ic_clock.svg'
import moment from 'moment'
const CustomTimePicker = (props: {
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
        <CustomDatePickerStyle
            fontFamily={fontFamily}
            labelFamily={labelFamily}
            bgColor={bgColor}
            border={border}
            padding={padding}
        >
            {label && <label htmlFor={name}>{label}</label>}
            <Field name={name} id={name} {...rest}>
                {({ form }: any) => (
                    <div>
                        <TimePicker
                            className="customtimepicker"
                            placeholder={placeholder}
                            suffixIcon={<img src={timeIcon} alt="time-icon" />}
                            name={name}
                            format="hh:mm A" // 12-hour time format with AM/PM
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
                    </div>
                )}
            </Field>
            {showErrorMessage && (
                <ErrorMessage name={name} component={ErrorMsg} />
            )}
        </CustomDatePickerStyle>
    )
}

export default CustomTimePicker

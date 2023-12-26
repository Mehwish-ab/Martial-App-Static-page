import { DatePicker } from 'antd'
import { Field, ErrorMessage } from 'formik'
import CustomDatePickerStyle from './style'
import ErrorMsg from '../ErrorMessage'
import dateIcon from '../../assets/icons/ic_blog_calender.svg'

const CustomDatePicker = (props: any) => {
    const {
        name,
        placeholder,
        label,
        options,
        bgColor = 'white',
        border = '1px solid #c6c6c8;',
        padding = '8px',
        title,
        fontFamily = 'EnnVisions',
        labelFamily = 'EnnVisions',
        marginBottom = '10px',
        onChange,
        showErroMessage = true,
        ...rest
    } = props

    console.log({ marginBottom, showErroMessage })
    return (
        <CustomDatePickerStyle
            fontFamily={fontFamily}
            labelFamily={labelFamily}
            bgColor={bgColor}
            border={border}
            padding={padding}
        >
            <label htmlFor={name}>{label}</label>
            <Field name={name} id={name} {...rest}>
                {({ field, form, meta }: any) => {
                    return (
                        // <Form.Item name={name}>
                        <div>
                            <DatePicker
                                className="customdatepicker"
                                placeholder={placeholder}
                                suffixIcon={
                                    <img src={dateIcon} alt="calender-icon" />
                                }
                                name={name}
                                id={name}
                                {...rest}
                                onChange={(_, dateString) => {
                                    if (onChange) {
                                        onChange(dateString)
                                    } else {
                                        form.setFieldValue(name, dateString)
                                    }
                                }}
                            />
                        </div>
                        // </Form.Item>
                    )
                }}
            </Field>
            {showErroMessage && (
                <ErrorMessage name={name} component={ErrorMsg} />
            )}
        </CustomDatePickerStyle>
    )
}

export default CustomDatePicker

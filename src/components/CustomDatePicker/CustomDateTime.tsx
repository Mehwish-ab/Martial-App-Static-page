import { DatePicker } from 'antd'
import { ErrorMessage, Field } from 'formik'
import { CustomDatePickerStyle } from './style'
import ErrorMsg from '../ErrorMessage'
import dateIcon from '../../assets/images/dateCalander.svg'
import moment from 'moment'
import { fontFamilyRegular, tertiaryGrey24 } from '../GlobalStyle'

const CustomDateTimePicker = (props: {
    [x: string]: any
    name: any
    placeholder: any
    label: any
    options: any
    bgColor?: 'white' | undefined
    border?: '1px solid #c6c6c8;' | undefined
    padding?: '8px' | undefined
    title: any
    fontFamily?: 'EnnVisions' | undefined
    labelFamily?: 'EnnVisions' | undefined
    marginBottom?: '10px' | undefined
    onChange: any
    showErroMessage?: true | undefined
}): JSX.Element => {
    const {
        name,
        placeholder,
        label,
        // options,
        bgColor = 'white',
        border = `1px solid ${tertiaryGrey24}`,
        padding = '8px 10px',
        // title,
        fontFamily = fontFamilyRegular,
        labelFamily = fontFamilyRegular,
        marginBottom = '10px',
        onChange,
        begin,
        showErroMessage = true,
        ...rest
    } = props

    // const disabledDate: RangePickerProps<Moment>['disabledDate'] = (
    //     current
    // ) => {
    //     // Use Moment type for current parameter
    //     // Can not select days before today and today
    //     return current && current < moment().startOf('day')
    // }
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
                {({ form }: any) => (
                    <div>
                        <DatePicker
                            className="customDatePicker"
                            placeholder={placeholder}
                            allowClear={false}
                            suffixIcon={
                                <img src={dateIcon} alt="calender-icon" />
                            }
                            name={name}
                            format="DD-MM-YY / hh:mm A"
                            {...rest}
                            // disabledDate={disabledDate}
                            showTime={true} // Set showTime to false to exclude the time part                            disabledDate={disabledDate}
                            onChange={(_, dateString) => {
                                if (onChange) {
                                    onChange(dateString)
                                } else {
                                    form.setFieldValue(name, dateString)
                                }
                            }}

                            // defaultValue={begin || startOfWeekMonday}
                        />
                    </div>
                )}
            </Field>
            {showErroMessage && (
                <ErrorMessage name={name} component={ErrorMsg} />
            )}
        </CustomDatePickerStyle>
    )
}

export default CustomDateTimePicker

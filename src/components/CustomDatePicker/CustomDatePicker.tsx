import { Field, ErrorMessage } from 'formik'
import { CustomDatePickerStyle } from '../CustomDatePicker/style'
import ErrorMsg from '../ErrorMessage'
import dateIcon from '../../assets/images/dateCalander.svg'
import moment from 'moment'
import { fontFamilyRegular, tertiaryGrey24 } from '../GlobalStyle'
import { DatePicker } from 'formik-antd'
moment.locale('en', {
    week: {
        dow: 1,
    },
})

const startOfWeekMonday = moment().startOf('week')
const CustomDatePicker = (props: {
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
    // const startOfWeekMonday = moment().startOf('isoWeek') // 'isoWeek' starts from Monday
    // console.log({ marginBottom, showErroMessage })
    // console.log('>> placeholder', placeholder)

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
                {({ form }: any) => {
                    return (
                        <div>
                            <DatePicker
                                className="customDatePicker"
                                placeholder={placeholder}
                                allowClear={false}
                                suffixIcon={
                                    <img src={dateIcon} alt="calender-icon" />
                                }
                                name={name}
                                // id={name}
                                format="dddd, MMM DD, YYYY"
                                {...rest}
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

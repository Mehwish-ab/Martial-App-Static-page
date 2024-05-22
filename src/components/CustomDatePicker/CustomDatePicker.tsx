import { Field, ErrorMessage } from 'formik'
import { CustomDatePickerStyle } from '../CustomDatePicker/style'
import ErrorMsg from '../ErrorMessage'
import dateIcon from '../../assets/images/dateCalander.svg'
import moment, { Moment } from 'moment' // Import Moment type from moment library
import { fontFamilyRegular, tertiaryGrey24 } from '../GlobalStyle'
import { DatePicker } from 'formik-antd'
import { RangePickerProps } from 'rc-picker/lib/RangePicker'

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
    startDate?: string
    endDate?: string
    value: any
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
        startDate,
        endDate,
        value,
        showErroMessage = true,
        ...rest
    } = props

    // Define the disabledDate function to restrict date selection
    const disabledDate: RangePickerProps<Moment>['disabledDate'] = (
        current
    ) => {
        // Use Moment type for current parameter
        // Disable dates outside the range of startDate and endDate
        if (startDate && current < moment(startDate, 'YYYY-MM-DD')) {
            return true
        }
        if (endDate && current > moment(endDate, 'YYYY-MM-DD')) {
            return true
        }
        return false
    }
    const disableDDate: RangePickerProps<Moment>['disabledDate'] = (
        current
    ) => {
        // Use Moment type for current parameter
        // Disable dates outside the range of startDate and endDate

        return current && current < moment().startOf('day')
    }

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
                                <img src={dateIcon} alt="calendar-icon" />
                            }
                            name={name}
                            value={value}
                            format="dddd, MMM DD, YYYY"
                            {...rest}
                            disabledDate={
                                startDate && endDate
                                    ? disabledDate
                                    : disableDDate
                            }
                            showTime={false} // Set showTime to false to exclude the time part                            disabledDate={disabledDate}
                            onChange={(_, dateString) => {
                                if (onChange) {
                                    onChange(dateString)
                                } else {
                                    form.setFieldValue(name, dateString)
                                }
                            }}
                            // disabledDate={(date) => {
                            //     // Disable dates earlier than the current date
                            //     return date && date < currentDate
                            // }}
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

export default CustomDatePicker

// import { Field, ErrorMessage } from 'formik'
// import { CustomDatePickerStyle } from '../CustomDatePicker/style'
// import ErrorMsg from '../ErrorMessage'
// import dateIcon from '../../assets/images/dateCalander.svg'
// import moment, { Moment } from 'moment' // Import Moment type from moment library
// import { fontFamilyRegular, tertiaryGrey24 } from '../GlobalStyle'
// import { DatePicker } from 'formik-antd'
// import { RangePickerProps } from 'rc-picker/lib/RangePicker'

// moment.locale('en', {
//     week: {
//         dow: 1,
//     },
// })

// const startOfWeekMonday = moment().startOf('week')

// const CustomDatePicker = (props: {
//     [x: string]: any
//     name: any
//     placeholder: any
//     label: any
//     options: any
//     bgColor?: 'white' | undefined
//     border?: '1px solid #c6c6c8;' | undefined
//     padding?: '8px' | undefined
//     title: any
//     fontFamily?: 'EnnVisions' | undefined
//     labelFamily?: 'EnnVisions' | undefined
//     marginBottom?: '10px' | undefined
//     onChange: any
//     showErroMessage?: true | undefined

// }): JSX.Element => {
//     const {
//         name,
//         placeholder,
//         label,
//         // options,
//         bgColor = 'white',
//         border = `1px solid ${tertiaryGrey24}`,
//         padding = '8px 10px',
//         // title,
//         fontFamily = fontFamilyRegular,
//         labelFamily = fontFamilyRegular,
//         marginBottom = '10px',
//         onChange,
//         begin,
//         showErroMessage = true,
//         ...rest
//     } = props

//     const disabledDate: RangePickerProps<Moment>['disabledDate'] = (
//         current
//     ) => {
//         // Use Moment type for current parameter
//         // Can not select days before today and today
//         return current && current < moment().startOf('day')
//     }

//     return (
//         <CustomDatePickerStyle
//             fontFamily={fontFamily}
//             labelFamily={labelFamily}
//             bgColor={bgColor}
//             border={border}
//             padding={padding}
//         >
//             <label htmlFor={name}>{label}</label>
//             <Field name={name} id={name} {...rest}>
//                 {({ form }: any) => (
//                     <div>
//                         <DatePicker
//                             className="customDatePicker"
//                             placeholder={placeholder}
//                             allowClear={false}
//                             suffixIcon={
//                                 <img src={dateIcon} alt="calender-icon" />
//                             }
//                             name={name}
//                             format="dddd, MMM DD, YYYY"
//                             {...rest}
//                             disabledDate={disabledDate}
//                             showTime={false} // Set showTime to false to exclude the time part                            disabledDate={disabledDate}
//                             onChange={(_, dateString) => {
//                                 if (onChange) {
//                                     onChange(dateString)
//                                 } else {
//                                     form.setFieldValue(name, dateString)
//                                 }
//                             }}
//                             // disabledDate={(date) => {
//                             //     // Disable dates earlier than the current date
//                             //     return date && date < currentDate
//                             // }}
//                             // defaultValue={begin || startOfWeekMonday}
//                         />
//                     </div>
//                 )}
//             </Field>
//             {showErroMessage && (
//                 <ErrorMessage name={name} component={ErrorMsg} />
//             )}
//         </CustomDatePickerStyle>
//     )
// }

// export default CustomDatePicker

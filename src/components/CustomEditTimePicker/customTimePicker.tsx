import { TimePicker } from 'formik-antd'
import { Field, ErrorMessage } from 'formik'
import { CustomDatePickerStyle } from '../CustomDatePicker/style'
import ErrorMsg from '../ErrorMessage'
import timeIcon from '../../assets/icons/ic_clock.svg'
import moment, { Moment } from 'moment'
import { valuesIn } from 'lodash'

const CustomEditTimePicker = (props: {
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
    value: any
    showErrorMessage?: true | undefined
    minTime?: string | undefined // Add minTime prop
    maxTime?: string | undefined // Add maxTime prop
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
        minTime, // Destructure minTime prop
        maxTime, // Destructure maxTime prop
        value,
        ...rest
    } = props

    // Define the disabledTime function
    const disabledTime = (startTime: any, endTime: any): any => {
        const disabledHours = (): any => {
            const hours: number[] = []
            const startHour = startTime ? moment(startTime, 'HH:mm').hour() : 0
            const endHour = endTime ? moment(endTime, 'HH:mm').hour() : 23

            // Push hours before startHour
            for (let i = 0; i < startHour; i++) {
                hours.push(i)
            }

            // Push hours after endHour
            for (let i = endHour + 1; i < 24; i++) {
                hours.push(i)
            }

            return hours
        }

        const disabledMinutes = (selectedHour: number): any => {
            const minutes: number[] = []
            const startMinute =
                startTime && moment(startTime, 'HH:mm').hour() === selectedHour
                    ? moment(startTime, 'HH:mm').minute()
                    : 0
            const endMinute =
                endTime && moment(endTime, 'HH:mm').hour() === selectedHour
                    ? moment(endTime, 'HH:mm').minute()
                    : 59

            // Push minutes before startMinute
            for (let i = 0; i < startMinute; i++) {
                minutes.push(i)
            }

            // Push minutes after endMinute
            for (let i = endMinute + 1; i < 60; i++) {
                minutes.push(i)
            }

            return minutes
        }

        return {
            disabledHours,
            disabledMinutes,
        }
    }

    //const initialTime = moment(value, 'HH:mm:ss').format('hh:mm A')
    const initialTime = value ? moment(value, 'HH:mm:ss') : null

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
                            value={initialTime}
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
                            disabledTime={() => disabledTime(minTime, maxTime)}
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

export default CustomEditTimePicker

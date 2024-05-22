import { TimePicker } from 'formik-antd'
import { Field, ErrorMessage } from 'formik'
import { CustomDatePickerStyle } from '../CustomDatePicker/style'
import ErrorMsg from '../ErrorMessage'
import timeIcon from '../../assets/icons/ic_clock.svg'
import moment, { Moment } from 'moment'
import { valuesIn } from 'lodash'

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
    value: any
    showErrorMessage?: true | undefined
    minTime?: string // Add minTime prop
    maxTime?: string // Add maxTime prop
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
    const disabledTime = (current: Moment): any => {
        const disabledHours = (): any => {
            const hours: number[] = []
            const minHour = minTime ? moment(minTime, 'HH:mm').hour() : 0
            const maxHour = maxTime ? moment(maxTime, 'HH:mm').hour() : 23

            for (let i = 0; i < minHour; i++) {
                hours.push(i)
            }

            for (let i = maxHour + 1; i < 24; i++) {
                hours.push(i)
            }

            return hours
        }

        const disabledMinutes = (selectedHour: number): any => {
            const minutes: number[] = []
            const minMinute =
                minTime && moment(minTime, 'HH:mm').hour() === selectedHour
                    ? moment(minTime, 'HH:mm').minute()
                    : 0
            const maxMinute =
                maxTime && moment(maxTime, 'HH:mm').hour() === selectedHour
                    ? moment(maxTime, 'HH:mm').minute()
                    : 59

            for (let i = 0; i < minMinute; i++) {
                minutes.push(i)
            }

            for (let i = maxMinute + 1; i < 60; i++) {
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
                            disabledTime={disabledTime}
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
